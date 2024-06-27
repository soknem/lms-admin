
// courseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import {InstructorCourseType} from "@/lib/types/instructor/course";

type CourseState = {
    courses: InstructorCourseType[];
    loading: boolean;
    error: string | null;
};

const initialState: CourseState = {
    courses: [],
    loading: false,
    error: null,
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<InstructorCourseType[]>) => {
            state.courses = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setCourses, setLoading, setError } = courseSlice.actions;

export const selectCourses = (state: RootState) => state.course.courses;
export const selectLoading = (state: RootState) => state.course.isLoading;
export const selectError = (state: RootState) => state.course.error;

export default courseSlice.reducer;
