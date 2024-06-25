// filterSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootFilterState, FilterState, Filter } from '@/lib/types/filter/filterTypes';

const initialState: RootFilterState = {

    //it use for difference state of filter
    generation: { globalOperator: 'AND', specsDto: [] },
    class: { globalOperator: 'AND', specsDto: [] },
    course: { globalOperator: 'AND', specsDto: [] },
    // Initialize other filter types if needed
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setGlobalOperator(state, action: PayloadAction<{ filterType: string; operator: 'AND' | 'OR' }>) {
            const { filterType, operator } = action.payload;
            if (!state[filterType]) {
                state[filterType] = { globalOperator: 'AND', specsDto: [] };
            }
            state[filterType].globalOperator = operator;
        },
        addOrUpdateFilter(state, action: PayloadAction<{ filterType: string; filter: Filter }>) {
            const { filterType, filter } = action.payload;
            if (!state[filterType]) {
                state[filterType] = { globalOperator: 'AND', specsDto: [] };
            }
            const existingFilterIndex = state[filterType].specsDto.findIndex(f => f.column === filter.column);
            if (existingFilterIndex >= 0) {
                state[filterType].specsDto[existingFilterIndex] = filter;
            } else {
                state[filterType].specsDto.push(filter);
            }
        },
        removeFilter(state, action: PayloadAction<{ filterType: string; column: string }>) {
            const { filterType, column } = action.payload;
            if (state[filterType]) {
                state[filterType].specsDto = state[filterType].specsDto.filter(filter => filter.column !== column);
            }
        },
        resetFilters(state, action: PayloadAction<string>) {
            if (state[action.payload]) {
                state[action.payload].specsDto = [];
            }
        },
    },
});

export const { setGlobalOperator, addOrUpdateFilter, removeFilter, resetFilters } = filterSlice.actions;
export default filterSlice.reducer;
