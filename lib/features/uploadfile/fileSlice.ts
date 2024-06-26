import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";

type fileState = {
    files: string[];
    isLoading: boolean;
    error: string | null;
}

const initialState: fileState = {
    files: [],
    isLoading: false,
    error: null,
}

const fileSlice = createSlice({
    name: "fileSlice",
    initialState,
    reducers: {
        setFiles: (state, action: PayloadAction<string[]>) => {
            state.files = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addFile: (state, action: PayloadAction<string>) => {
            state.files.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {setFiles, addFile} = fileSlice.actions;
export const selectFile = (state: RootState) => state.file.files;
export const selectLoading = (state: RootState) => state.file.isLoading;
export const selectError = (state: RootState) => state.file.error;

export default fileSlice.reducer;