import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {SectionType} from "@/lib/types/admin/materials";

type SectionState = {
    sections: SectionType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: SectionState = {
    sections: [],
    isLoading: false,
    error: null,
}

const sectionSlice = createSlice({
    name: "sectionSlice",
    initialState,
    reducers: {
        setSections: (state, action: PayloadAction<SectionType[]>) => {
            state.sections = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addSection: (state, action: PayloadAction<SectionType>) => {
            state.sections.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {addSection, setSections} = sectionSlice.actions;
export const selectSection = (state: RootState) => state.section.sections;
export const selectLoading = (state: RootState) => state.section.isLoading;
export const selectError = (state: RootState) => state.section.error;


export default sectionSlice.reducer;