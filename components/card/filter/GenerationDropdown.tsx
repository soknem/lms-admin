'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateFilter, removeFilter } from '@/lib/features/filters/filterSlice';
import { useFilterGenerationsMutation } from '@/lib/features/admin/academic-management/generation/generation';
import { addGeneration } from '@/lib/features/admin/academic-management/generation/generationSlice';
import { RootState } from '@/lib/store';
import { RootFilterState } from '@/lib/types/filter/filterTypes';
import {GenerationType} from "@/lib/types/admin/academics"; // Import the type here

const GenerationDropdown: React.FC = () => {

    const dispatch = useDispatch();
    const generationFilterState = useSelector((state: RootState) => state.filter.generation); // Access only the generation part of the filter state
    const [filterGenerations, { data, isLoading, error }] = useFilterGenerationsMutation();
    const [filteredData, setFilteredData] = useState<GenerationType[]>([]);

    const constructRequestBody = useCallback((generationFilter: RootFilterState['generation']) => {
        const { globalOperator, specsDto } = generationFilter;
        return specsDto.length > 0 ? { globalOperator, specsDto } : {};
    }, []);

    const fetchGenerations = useCallback(async () => {
        const requestBody = constructRequestBody(generationFilterState);

        try {
            const result = await filterGenerations({ pageNumber: 0, pageSize: 10, body: requestBody }).unwrap();
            dispatch(addGeneration(result.content));
            setFilteredData(result.content);
        } catch (error) {
            console.error('Failed to fetch generations:', error);
        }
    }, [generationFilterState, filterGenerations, dispatch, constructRequestBody]);

    useEffect(() => {
        fetchGenerations();
    }, [fetchGenerations]);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        if (value === 'all') {
            dispatch(removeFilter({ filterType: 'generation', column: 'isActive' }));
        } else {
            const isActive = value === 'active' ? "true" : "false";
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
            {/*{error && <p>Error: {error.message}</p>}*/}
            <div>
                {filteredData.length > 0 && filteredData.map((generation: GenerationType) => (
                    <div key={generation.alias}>{generation.name}</div>
                ))}
            </div>
        </div>
    );
};

export default GenerationDropdown;
