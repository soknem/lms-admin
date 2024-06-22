import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import {GenerationType} from "@/lib/types/admin/academics";

type GenerationState = {
    generations: GenerationType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: GenerationState = {
    generations: [] ,
    isLoading: false,
    error: null,
}

const generationSlice = createSlice({
    name: "generationSlice",
    initialState,
    reducers: {
        setGenerations: (state, action: PayloadAction<GenerationType[]>) => {
            state.generations = action.payload;
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
        addGeneration: (state, action: PayloadAction<GenerationType>) => {
            state.generations.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const { addGeneration,setGenerations, setLoading, setError } = generationSlice.actions;
export const selectGeneration = (state: RootState) => state.generation.generations;
export const selectLoading = (state: RootState) => state.generation.isLoading;
export const selectError = (state: RootState) => state.generation.error;


export default generationSlice.reducer;