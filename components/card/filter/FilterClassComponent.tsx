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
    const dispatch = useDispatch();
    const classFilterState = useSelector((state: RootState) => state.filter.class); // Separate class filter state
    const generations = useSelector((state: RootState) => state.generation.generations); // get generations from store
    const [filterClasses, { data, error, isLoading }] = useFilterClassesMutation();

    const [generation, setGeneration] = useState('');
    const [filteredData, setFilteredData] = useState<Class[]>([]);

    useEffect(() => {
        if (data) {
            dispatch(addClass(data.content));
            setFilteredData(data.content);
        }
    }, [data, dispatch]);

    const applyFilter = useCallback(async () => {
        const { globalOperator, specsDto } = classFilterState;
        const body = { globalOperator, specsDto };

        try {
            const result = await filterClasses({ pageNumber: 0, pageSize: 25, body }).unwrap();
            setFilteredData(result.content);
        } catch (err) {
            console.error('Failed to filter classes from API:', err);
        }
    }, [classFilterState, filterClasses]);

    useEffect(() => {
        applyFilter();
    }, [applyFilter]);

    const handleGenerationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setGeneration(value);
        dispatch(addOrUpdateFilter({ filterType: 'class', filter: { column: 'alias', value, operation: 'LIKE', joinTable: 'generation' } }));
    };

    const resetGenerationFilter = () => {
        setGeneration('');
        dispatch(removeFilter({ filterType: 'class', column: 'alias' }));
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
