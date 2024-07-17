// studentSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { StudentReportData } from '@/lib/types/admin/report';

type StudentState = {
    students: StudentReportData[];
    loading: boolean;
    error: string | null;
};

const initialState: StudentState = {
    students: [],
    loading: false,
    error: null,
};

const studentSlice = createSlice({
    name: 'student',
    initialState,
    reducers: {
        getStudentStart(state) {
            state.loading = true;
            state.error = null;
        },
        getStudentSuccess(state, action: PayloadAction<StudentReportData[]>) {
            state.loading = false;
            state.students = action.payload;
        },
        getStudentFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { getStudentStart, getStudentSuccess, getStudentFailure } = studentSlice.actions;

export const selectStudentData = (state: RootState) => state.student.students;

export default studentSlice.reducer;
