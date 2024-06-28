import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {DegreeType} from "@/lib/types/admin/faculty";

type DegreeState = {
    degrees: DegreeType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: DegreeState = {
    degrees: [],
    isLoading: false,
    error: null,
}

const yearOfStudySlice = createSlice({
    name: "degreeSlice",
    initialState,
    reducers: {
        setDegrees: (state, action: PayloadAction<DegreeType[]>) => {
            state.degrees = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addDegree: (state, action: PayloadAction<DegreeType>) => {
            state.degrees.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {addDegree, setDegrees} = yearOfStudySlice.actions;
export const selectDegree = (state: RootState) => state.degree.degrees;
export const selectLoading = (state: RootState) => state.degree.isLoading;
export const selectError = (state: RootState) => state.degree.error;


export default yearOfStudySlice.reducer;