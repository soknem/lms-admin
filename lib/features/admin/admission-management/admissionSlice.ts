import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {AdmissionType} from "@/lib/types/admin/admission";

type AdmissionState = {
    admissions: AdmissionType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: AdmissionState = {
    admissions: [],
    isLoading: false,
    error: null,
}

const admissionSlice = createSlice({
    name: "admissionSlice",
    initialState,
    reducers: {
        setAdmissions: (state, action: PayloadAction<AdmissionType[]>) => {
            state.admissions = action.payload;
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
        addAdmission: (state, action: PayloadAction<AdmissionType>) => {
            state.admissions.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {addAdmission, setAdmissions, setLoading, setError} = admissionSlice.actions;
export const selectAdmission = (state: RootState) => state.admission.admissions;
export const selectLoading = (state: RootState) => state.admission.isLoading;
export const selectError = (state: RootState) => state.admission.error;


export default admissionSlice.reducer;