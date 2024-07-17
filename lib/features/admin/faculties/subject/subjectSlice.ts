import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {SubjectType} from "@/lib/types/admin/faculty";

type SubjectState = {
    subjects: SubjectType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: SubjectState = {
    subjects: [],
    isLoading: false,
    error: null,
}

const subjectsSlice = createSlice({
    name: "subjectsSlice",
    initialState,
    reducers: {
        setSubjects: (state, action: PayloadAction<SubjectType[]>) => {
            state.subjects = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addSubject: (state, action: PayloadAction<SubjectType>) => {
            state.subjects.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {addSubject, setSubjects} = subjectsSlice.actions;
export const selectSubject = (state: RootState) => state.subject.subjects;
export const selectLoading = (state: RootState) => state.subject.isLoading;
export const selectError = (state: RootState) => state.subject.error;


export default subjectsSlice.reducer;