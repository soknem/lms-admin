import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {StudyProgramType} from "@/lib/types/admin/faculty";

type StudyProgramState = {
    studyPrograms: StudyProgramType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: StudyProgramState = {
    studyPrograms: [],
    isLoading: false,
    error: null,
}

const studyProgramSlice = createSlice({
    name: "studyProgramSlice",
    initialState,
    reducers: {
        setStudyPrograms: (state, action: PayloadAction<StudyProgramType[]>) => {
            state.studyPrograms = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addStudyProgram: (state, action: PayloadAction<StudyProgramType>) => {
            state.studyPrograms.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {addStudyProgram, setStudyPrograms} = studyProgramSlice.actions;
export const selectStudyProgram = (state: RootState) => state.studyProgram.studyPrograms;
export const selectLoading = (state: RootState) => state.studyProgram.isLoading;
export const selectError = (state: RootState) => state.studyProgram.error;


export default studyProgramSlice.reducer;