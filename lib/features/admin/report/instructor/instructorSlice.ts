import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { InstructorReportData } from '@/lib/types/admin/report';

type InstructorState = {
    instructors: InstructorReportData[];
    loading: boolean;
    error: string | null;
};

const initialState: InstructorState = {
    instructors: [],
    loading: false,
    error: null,
};

const instructorSlice = createSlice({
    name: 'instructor',
    initialState,
    reducers: {
        getInstructorStart(state) {
            state.loading = true;
            state.error = null;
        },
        getInstructorSuccess(state, action: PayloadAction<InstructorReportData[]>) {
            state.loading = false;
            state.instructors = action.payload;
        },
        getInstructorFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { getInstructorStart, getInstructorSuccess, getInstructorFailure } = instructorSlice.actions;

export const selectInstructorData = (state: RootState) => state.instructor.instructors;

export default instructorSlice.reducer;
