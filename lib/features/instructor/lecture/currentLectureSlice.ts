
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import {CurrentType} from "@/lib/types/instructor/lecture/lecture";


type CurrentState = {
    currents: CurrentType[];
    loading: boolean;
    error: string | null;
};

const initialState: CurrentState = {
    currents: [],
    loading: false,
    error: null,
};

const currentSlice = createSlice({
    name: "current",
    initialState,
    reducers: {
        setCurrents: (state, action: PayloadAction<CurrentType[]>) => {
            state.currents = action.payload;
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

export const { setCurrents, setLoading, setError } = currentSlice.actions;

export const selectCurrents = (state: RootState) => state.current.currents;
export const selectLoading = (state: RootState) => state.current.loading;
export const selectError = (state: RootState) => state.current.error;

export default currentSlice.reducer;
