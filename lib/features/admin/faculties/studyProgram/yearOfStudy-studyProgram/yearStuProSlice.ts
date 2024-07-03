import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {SetupStudyProgramType} from "@/lib/types/admin/faculty";

type SetupStudyProgramState = {
    setupStudyPrograms: SetupStudyProgramType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: SetupStudyProgramState = {
    setupStudyPrograms: [],
    isLoading: false,
    error: null,
}

const yearStuProSlice = createSlice({
    name: "yearStuProSlice",
    initialState,
    reducers: {
        setSetupStudyPrograms: (state, action: PayloadAction<SetupStudyProgramType[]>) => {
            state.setupStudyPrograms = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addSetupStudyProgram: (state, action: PayloadAction<SetupStudyProgramType>) => {
            state.setupStudyPrograms.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {addSetupStudyProgram, setSetupStudyPrograms} = yearStuProSlice.actions;
export const selectSetupStuPro = (state: RootState) => state.setupStudyProgram.setupStudyPrograms;
export const selectLoading = (state: RootState) => state.setupStudyProgram.isLoading;
export const selectError = (state: RootState) => state.setupStudyProgram.error;


export default yearStuProSlice.reducer;