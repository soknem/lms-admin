import {FacultyType} from "@/lib/types/admin/faculty";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";

type FacultyState = {
    faculties: FacultyType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: FacultyState = {
    faculties: [],
    isLoading: false,
    error: null,
}

const facultySlice = createSlice({
    name: "facultySlice",
    initialState,
    reducers: {
        setFaculties: (state, action: PayloadAction<FacultyType[]>) => {
            state.faculties = action.payload;
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
        addFaculty: (state, action: PayloadAction<FacultyType>) => {
            state.faculties.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {addFaculty, setFaculties, setLoading, setError} = facultySlice.actions;
export const selectFaculty = (state: RootState) => state.faculty.faculties;
export const selectLoading = (state: RootState) => state.faculty.isLoading;
export const selectError = (state: RootState) => state.faculty.error;

export default facultySlice.reducer;