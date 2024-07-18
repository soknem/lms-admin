import { createSlice } from '@reduxjs/toolkit';
import {RootState} from "@/lib/store";

const initialState = {
    title: '',
};

const getCourseTitleSlice = createSlice({
    name: 'singleCourse',
    initialState,
    reducers: {
        setCourseTitle: (state, action) => {
            state.title = action.payload;
            localStorage.setItem('courseTitle', action.payload);
        },
    },
});

export const { setCourseTitle } = getCourseTitleSlice.actions;

// Selector to get the course title
export const selectCourseTitle = (state : RootState) => state.singleCourse.title;

export default getCourseTitleSlice.reducer;
