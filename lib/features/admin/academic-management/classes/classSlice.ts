import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '@/lib/store';

// Define types using type aliases
export type StudyProgram = {
    alias: string;
    studyProgramName: string;
};

export type Shift = {
    alias: string;
    name: string;
    startTime: string;
    endTime: string;
};

export type Generation = {
    alias: string;
    name: string;
};

export type CourseInfo = {
    uuid: string;
    title: string;
    credit: number | null;
};

export type Class = {
    uuid: string;
    classCode: string;
    description: string;
    isDeleted: boolean;
    isDraft: boolean;
    status: number;
    instructor: string | null;
    studyProgram: StudyProgram;
    shift: Shift;
    generation: Generation;
    students: any[]; // Assuming students are an array of objects
    courses: CourseInfo[];
};

export type ClassState = {
    content: Class[];
    pageable: {
        pageNumber: number;
        pageSize: number;
        sort: {
            empty: boolean;
            sorted: boolean;
            unsorted: boolean;
        };
        offset: number;
        paged: boolean;
        unpaged: boolean;
    };
    last: boolean;
    totalPages: number;
    totalElements: number;
    first: boolean;
    size: number;
    number: number;
    sort: {
        empty: boolean;
        sorted: boolean;
        unsorted: boolean;
    };
    numberOfElements: number;
    empty: boolean;
    isLoading: boolean;
    error: string | null;
};

const initialState: ClassState = {
    content: [],
    pageable: {
        pageNumber: 0,
        pageSize: 25,
        sort: {
            empty: false,
            sorted: true,
            unsorted: false,
        },
        offset: 0,
        paged: true,
        unpaged: false,
    },
    last: true,
    totalPages: 1,
    totalElements: 2,
    first: true,
    size: 25,
    number: 0,
    sort: {
        empty: false,
        sorted: true,
        unsorted: false,
    },
    numberOfElements: 2,
    empty: false,
    isLoading: false,
    error: null,
};

const classSlice = createSlice({
    name: 'classes',
    initialState,
    reducers: {
        setClasses(state, action: PayloadAction<Class[]>) {
            state.content = action.payload;
            state.isLoading = false;
            state.error = null;
        },

        addClass(state, action: PayloadAction<Class>) {
            state.content.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },

    },
});

export const { setClasses, addClass} = classSlice.actions;
export const selectClasses = (state: RootState) => state.class


export default classSlice.reducer;
