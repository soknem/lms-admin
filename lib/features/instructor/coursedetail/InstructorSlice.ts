// intcoursedetailSlice.ts

import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IntCourseDetail } from '@/lib/types/instructor/coursedetail/int-coursedetail';
import {RootState} from "@/lib/store"; // Adjust path as per your project

interface IntCourseDetailState {
    intcoursedetails: IntCourseDetail[];
}

const initialState: IntCourseDetailState = {
    intcoursedetails: [],
};

const intcoursedetailSlice = createSlice({
    name: 'intcoursedetail',
    initialState,
    reducers: {
        setIntCoursedetail: (state, action: PayloadAction<IntCourseDetail[]>) => {
            state.intcoursedetails = action.payload;
        },
    },
});

export const { setIntCoursedetail } = intcoursedetailSlice.actions;

export const selectIntCoursedetail = (state: RootState) => state.instructorCourseDetail.intcoursedetails;

export default intcoursedetailSlice.reducer;
