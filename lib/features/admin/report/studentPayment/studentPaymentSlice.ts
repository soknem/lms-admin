// studentPaymentSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import { StudentPaymentReportData } from '@/lib/types/admin/report';

type StudentState = {
    studentPayments: StudentPaymentReportData | null;
    loading: boolean;
    error: string | null;
};

const initialState: StudentState = {
    studentPayments: null,
    loading: false,
    error: null,
};

const studentPaymentSlice = createSlice({
    name: 'studentPayment',
    initialState,
    reducers: {
        getStudentPaymentStart(state) {
            state.loading = true;
            state.error = null;
        },
        getStudentPaymentSuccess(state, action: PayloadAction<StudentPaymentReportData>) {
            state.loading = false;
            state.studentPayments = action.payload;
        },
        getStudentPaymentFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { getStudentPaymentStart, getStudentPaymentSuccess, getStudentPaymentFailure } = studentPaymentSlice.actions;

export const selectStudentPaymentData = (state: RootState) => state.studentPayment.studentPayments;

export default studentPaymentSlice.reducer;
