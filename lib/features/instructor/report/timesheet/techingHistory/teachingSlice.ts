
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import {TeachingType} from "@/lib/types/instructor/teachingtype";


type TeachingState = {
    teachings: TeachingType[];
    loading: boolean;
    error: string | null;
};

const initialState: TeachingState = {
    teachings: [],
    loading: false,
    error: null,
};

const teachingSlice = createSlice({
    name: "teaching",
    initialState,
    reducers: {
        setTeachings: (state, action: PayloadAction<TeachingType[]>) => {
            state.teachings = action.payload;
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

export const { setTeachings, setLoading, setError } = teachingSlice.actions;

export const selectTeachings = (state: RootState) => state.teaching.teachings;
export const selectLoading = (state: RootState) => state.teaching.loading;
export const selectError = (state: RootState) => state.teaching.error;

export default teachingSlice.reducer;
