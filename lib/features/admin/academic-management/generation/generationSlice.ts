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
        addGeneration: (state, action: PayloadAction<GenerationType>) => {
            state.generations.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const { addGeneration,setGenerations } = generationSlice.actions;
export const selectGeneration = (state: RootState) => state.generation.generations;


export default generationSlice.reducer;