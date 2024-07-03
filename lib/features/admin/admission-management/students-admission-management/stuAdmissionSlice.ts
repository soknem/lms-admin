import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {StudentAdmissionType} from "@/lib/types/admin/admission";

type StuAdmissionState = {
    stuAdmissions: StudentAdmissionType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: StuAdmissionState = {
    stuAdmissions: [],
    isLoading: false,
    error: null,
}

const stuAdmissionSlice = createSlice({
    name: "stuAdmissionSlice",
    initialState,
    reducers: {
        setStuAdmissions: (state, action: PayloadAction<StudentAdmissionType[]>) => {
            state.stuAdmissions = action.payload;
            state.isLoading = false;
            state.error = null;
        },

        addStuAdmission: (state, action: PayloadAction<StudentAdmissionType>) => {
            state.stuAdmissions.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {setStuAdmissions, addStuAdmission} = stuAdmissionSlice.actions;
export const selectStuAdmission = (state: RootState) => state.studentAdmission.stuAdmissions;
export const selectLoading = (state: RootState) => state.studentAdmission.isLoading;
export const selectError = (state: RootState) => state.studentAdmission.error;


export default stuAdmissionSlice.reducer;