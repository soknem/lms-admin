'use client';

import React, { useState, useEffect, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateFilter, removeFilter } from '@/lib/features/filters/filterSlice';
import { useFilterClassesMutation } from '@/lib/features/admin/academic-management/classes/classApi';
import { RootState } from '@/lib/store';
import { addClass, Class } from '@/lib/features/admin/academic-management/classes/classSlice';
import ClassResultCardComponent from "@/components/card/filter/ClassResultCardComponent";
import {GenerationType} from "@/lib/types/admin/academics";

const ClassFilterComponent: React.FC = () => {

    // Initialize useDispatch hook to dispatch actions to Redux store
    const dispatch = useDispatch();

    // Select class filter state from Redux store using useSelector hook
    const classFilterState = useSelector((state: RootState) => state.filter.class);

    // Select generations array from Redux store using useSelector hook
    const generations = useSelector((state: RootState) => state.generation.generations);

    // Custom hook for mutation related to class filtering
    const [filterClasses, { data, error, isLoading }] = useFilterClassesMutation();

    // State to manage selected generation for filtering classes
    const [generation, setGeneration] = useState('');

    // State to hold filtered classes data
    const [filteredData, setFilteredData] = useState<Class[]>([]);

    // Effect hook to handle data from filterClasses mutation
    useEffect(() => {
        if (data) {

            // Dispatch action to add filtered classes to Redux state
            dispatch(addClass(data.content));

            // Update local state with filtered classes
            setFilteredData(data.content);
        }
    }, [data, dispatch]);

    // Memoized function to apply class filter
    const applyFilter = useCallback(async () => {
        const { globalOperator, specsDto } = classFilterState;
        const body = { globalOperator, specsDto };

        try {
            const result = await filterClasses({ pageNumber: 0, pageSize: 25, body }).unwrap();

            // Update local state with filtered classes
            setFilteredData(result.content);
        } catch (err) {
            console.error('Failed to filter classes from API:', err); // Log error if filtering classes fails
        }
    }, [classFilterState, filterClasses]);

    // Effect hook to apply filter when component mounts or classFilterState changes
    useEffect(() => {
        applyFilter();
    }, [applyFilter]);

    // Event handler for generation dropdown change event
    const handleGenerationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        // Update local state with selected generation
        setGeneration(value);

        // Dispatch action to add or update filter based on selected generation
        dispatch(addOrUpdateFilter({ filterType: 'class', filter: { column: 'alias', value, operation: 'LIKE', joinTable: 'generation' } }));
    };

    // Function to reset generation filter
    const resetGenerationFilter = () => {
        setGeneration(''); // Reset local state for selected generation
        dispatch(removeFilter({ filterType: 'class', column: 'alias' })); // Dispatch action to remove generation filter
    };


    return (
        <div>
            <div>
                <label>Generation:</label>
                <select value={generation} onChange={handleGenerationChange}>
                    <option value="">Select generation</option>
                    {generations.map((generation: GenerationType) => (
                        <option key={generation.alias} value={generation.alias}>
                            {generation.name}
                        </option>
                    ))}
                </select>
                <button onClick={resetGenerationFilter}>Reset Generation</button>
            </div>
            {isLoading && <p>Loading...</p>}
            {filteredData.length > 0 && (
                <div>
                    {filteredData.map((result: Class) => (
                        <ClassResultCardComponent key={result.uuid} result={result} />
                    ))}
                </div>
            )}
        </div>
    );
};


export default ClassFilterComponent;
