import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

// Define types using type aliases
export type Subject = {
    alias: string;
    title: string;
    practice: number;
    internship: number;
    theory: number;
    duration: number;
    logo: string;
};

export type YearOfStudy = {
    uuid: string;
    year: number;
    semester: number;
    subjects: Subject[];
};

export type Student = {
    uuid: string;
    nameEn: string | null;
    nameKh: string | null;
    username: string | null;
    email: string | null;
    phoneNumber: string | null;
    dob: string | null;
    gender: string | null;
    profileImage: string | null;
};

export type OneClass = {
    uuid: string;
    classCode: string;
};

export type Course = {
    uuid: string;
    isDeleted: boolean;
    subject: Subject;
    instructor: string | null;
    oneClass: OneClass;
    students: Student[];
    yearOfStudy: YearOfStudy;
    [key: string]: any;
};

export type CourseState = {
    courses: Course[];
    isLoading: boolean;
    error: string | null;
};

const initialState: CourseState = {
    courses: [],
    isLoading: false,
    error: null,
};

const courseSlice = createSlice({
    name: 'courses',
    initialState,
    reducers: {
        setCourses(state, action: PayloadAction<Course[]>) {
            state.courses = action.payload;
            state.isLoading = false;
            state.error = null;
        },

        addCourse(state, action: PayloadAction<Course>) {
            state.courses.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    },
});

export const { setCourses, addCourse } = courseSlice.actions;


export default courseSlice.reducer;
