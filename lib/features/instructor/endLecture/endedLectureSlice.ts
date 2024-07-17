
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import {CurrentType, EndedLectureType} from "@/lib/types/instructor/lecture";


type EndedState = {
    endeds: EndedLectureType[];
    loading: boolean;
    error: string | null;
};

const initialState: EndedState = {
    endeds: [],
    loading: false,
    error: null,
};

const endedSlice = createSlice({
    name: "ended",
    initialState,
    reducers: {
        setEndeds: (state, action: PayloadAction<EndedLectureType[]>) => {
            state.endeds = action.payload;
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

export const { setEndeds, setLoading, setError } = endedSlice.actions;

export const selectEndeds = (state: RootState) => state.ended.endeds;
export const selectLoading = (state: RootState) => state.ended.loading;
export const selectError = (state: RootState) => state.ended.error;

export default endedSlice.reducer;
