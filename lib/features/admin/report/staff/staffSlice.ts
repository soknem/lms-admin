// studentSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/lib/store';
import {StaffReportData} from '@/lib/types/admin/report';

type StaffState = {
    staffs: StaffReportData[];
    loading: boolean;
    error: string | null;
};

const initialState: StaffState = {
    staffs: [],
    loading: false,
    error: null,
};

const staffSlice = createSlice({
    name: 'staff',
    initialState,
    reducers: {
        getStaffStart(state) {
            state.loading = true;
            state.error = null;
        },
        getStaffSuccess(state, action: PayloadAction<StaffReportData[]>) {
            state.loading = false;
            state.staffs = action.payload;
        },
        getStaffFailure(state, action: PayloadAction<string>) {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { getStaffStart, getStaffSuccess, getStaffFailure } = staffSlice.actions;

export const selectStaffData = (state: RootState) => state.staff.staffs;

export default staffSlice.reducer;
