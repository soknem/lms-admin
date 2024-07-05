// src/lib/features/student/course/courseSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { StudentCourseType, CourseType } from "@/lib/types/student/course";

type CourseState = {
    courses: StudentCourseType[];
    courseDetail: CourseType | null;
    isLoading: boolean;
    error: string | null;
};

const initialState: CourseState = {
    courses: [],
    courseDetail: null,
    isLoading: false,
    error: null,
};

const courseSlice = createSlice({
    name: "course",
    initialState,
    reducers: {
        setCourses: (state, action: PayloadAction<StudentCourseType[]>) => {
            state.courses = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setCourseDetail: (state, action: PayloadAction<CourseType>) => {
            state.courseDetail = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.isLoading = true;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.isLoading = false;
            state.error = action.payload;
        },
    },
});

export const { setCourses, setCourseDetail, setLoading, setError } = courseSlice.actions;

export const selectCourses = (state: RootState) => state.course.courses;
export const selectLoading = (state: RootState) => state.course.isLoading;
export const selectError = (state: RootState) => state.course.error;

export default courseSlice.reducer;
