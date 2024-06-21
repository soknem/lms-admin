import {createSlice, PayloadAction} from '@reduxjs/toolkit';

interface Filter {
    column: string;
    value: string;
    operation: string;
    joinTable?: string | null;
}

interface FilterState {
    globalOperator: 'AND' | 'OR';
    specsDto: Filter[];
}

const initialState: FilterState = {
    globalOperator: 'AND',
    specsDto: [],
};

const filterSlice = createSlice({
    name: 'filter',
    initialState,
    reducers: {
        setGlobalOperator(state, action: PayloadAction<'AND' | 'OR'>) {
            state.globalOperator = action.payload;
        },
        addOrUpdateFilter(state, action: PayloadAction<Filter>) {
            const existingFilterIndex = state.specsDto.findIndex(
                filter => filter.column === action.payload.column
            );
            if (existingFilterIndex >= 0) {
                // Update the existing filters's value
                state.specsDto[existingFilterIndex] = action.payload;
            } else {
                // Add new filters
                state.specsDto.push(action.payload);
            }
        },
        removeFilter(state, action: PayloadAction<string>) {
            state.specsDto = state.specsDto.filter(filter => filter.column !== action.payload);
        },
        resetFilters(state) {
            state.specsDto = [];
        },
    },
});

export const {setGlobalOperator, addOrUpdateFilter, removeFilter, resetFilters} = filterSlice.actions;
export default filterSlice.reducer;
