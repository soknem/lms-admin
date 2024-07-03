import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {AcademicYearType} from "@/lib/types/admin/faculty";

type AcademicYearState = {
    academicYears: AcademicYearType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AcademicYearState = {
    academicYears: [],
    isLoading: false,
    error: null,
}

const academicYearSlice = createSlice({
    name: "degreeSlice",
    initialState,
    reducers: {
        setAcademicYears: (state, action: PayloadAction<AcademicYearType[]>) => {
            state.academicYears = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addAcademicYear: (state, action: PayloadAction<AcademicYearType>) => {
            state.academicYears.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {setAcademicYears, addAcademicYear} = academicYearSlice.actions;
export const selectAcademicYear = (state: RootState) => state.academicYear.academicYears;
export const selectLoading = (state: RootState) => state.academicYear.isLoading;
export const selectError = (state: RootState) => state.academicYear.error;


export default academicYearSlice.reducer;