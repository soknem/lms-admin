'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {addOrUpdateFilter, removeFilter} from '@/lib/features/filters/filterSlice'
import {useFilterGenerationsMutation} from '@/lib/features/admin/academic-management/generation/generation';
import {addGeneration} from '@/lib/features/admin/academic-management/generation/generationSlice';
import { RootState } from '@/lib/store';
import { RootFilterState } from '@/lib/types/filter/filterTypes';
import { GenerationType } from "@/lib/types/admin/academics";

const GenerationDropdown: React.FC = () => {

    // Initialize useDispatch hook to dispatch actions to Redux store
    const dispatch = useDispatch();

    // Select generation filter state from Redux store using useSelector hook
    //get specific filter state(generation state of filter state[there are many filter state])
    const generationFilterState = useSelector((state: RootState) => state.filter.generation);

    // Custom hook for mutation related to generation filtering
    const [filterGenerations, { data, isLoading, error }] = useFilterGenerationsMutation();

    // State to hold filtered data of type GenerationType array(for display this component)
    const [filteredData, setFilteredData] = useState<GenerationType[]>([]);

    // Memoized function to construct request body for API based on generation filter state
    const constructRequestBody = useCallback((generationFilter: RootFilterState['generation']) => {
        const { globalOperator, specsDto } = generationFilter;
        return specsDto.length > 0 ? { globalOperator, specsDto } : {};
    }, []);

    // Function to fetch generations based on current filter state
    const fetchGenerations = useCallback(async () => {
        const requestBody = constructRequestBody(generationFilterState);

        try {
            // Perform API call to filter generations
            const result = await filterGenerations({ pageNumber: 0, pageSize: 10, body: requestBody }).unwrap();

            // Dispatch action to add filtered generations to Redux state
            dispatch(addGeneration(result.content));

            // Update local state with filtered generations
            setFilteredData(result.content);
        } catch (error) {
            console.error('Failed to fetch generations:', error);
        }
    }, [generationFilterState, filterGenerations, dispatch, constructRequestBody]);

    // Effect hook to fetch generations when component mounts or when filter state changes
    useEffect(() => {
        fetchGenerations();
    }, [fetchGenerations]);

    // Event handler for select dropdown change event
    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;

        // Dispatch action to remove filter if 'All Generations' option is selected
        if (value === 'all') {
            dispatch(removeFilter({ filterType: 'generation', column: 'isActive' }));

        } else {

            // Determine isActive value based on selected option ('Active Generations' or 'Inactive Generations')
            const isActive = value === 'active' ? "true" : "false";

            // Dispatch action to add or update filter based on selected option
            dispatch(addOrUpdateFilter({ filterType: 'generation', filter: { column: 'isActive', value: isActive, operation: 'EQUAL', joinTable: null } }));
        }
    };

    return (
        <div>
            <label htmlFor="generationFilter">Select Generation Filter: </label>
            <select id="generationFilter" onChange={handleChange}>
                <option value="all">All Generations</option>
                <option value="active">Active Generations</option>
                <option value="inactive">Inactive Generations</option>
            </select>
            {isLoading && <p>Loading...</p>}
            <div>
                {filteredData.length > 0 && filteredData.map((generation: GenerationType) => (
                    <div key={generation.alias}>{generation.name}</div>
                ))}
            </div>
        </div>
    );
};

export default GenerationDropdown;
