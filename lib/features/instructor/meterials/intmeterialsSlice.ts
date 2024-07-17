import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {MaterialType} from "@/lib/types/instructor/materials";

type MaterialState = {
    materials: MaterialType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: MaterialState = {
    materials: [],
    isLoading: false,
    error: null,
}

const materialSlice = createSlice({
    name: "materialSlice",
    initialState,
    reducers: {
        setMaterials: (state, action: PayloadAction<MaterialType[]>) => {
            state.materials = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addMaterial: (state, action: PayloadAction<MaterialType>) => {
            state.materials.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {addMaterial, setMaterials} = materialSlice.actions;
export const selectMaterial = (state: RootState) => state.intmaterial.materials;
export const selectLoading = (state: RootState) => state.intmaterial.isLoading;
export const selectError = (state: RootState) => state.intmaterial.error;


export default materialSlice.reducer;