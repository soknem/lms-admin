
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import {CurrentType, StudentAttendanceType} from "@/lib/types/instructor/lecture";


type StudentAttendanceState = {
    studentAttendances: StudentAttendanceType[];
    loading: boolean;
    error: string | null;
};

const initialState: StudentAttendanceState = {
    studentAttendances: [],
    loading: false,
    error: null,
};

const studentAttendanceSlice = createSlice({
    name: "studentAttendance",
    initialState,
    reducers: {
        setStudentAttendances: (state, action: PayloadAction<StudentAttendanceType[]>) => {
            state.studentAttendances = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setStudentAttendances, setLoading, setError } = studentAttendanceSlice.actions;

export const selectStudentAttendances = (state: RootState) => state.studentAttendance.studentAttendances;
export const selectLoading = (state: RootState) => state.studentAttendance.loading;
export const selectError = (state: RootState) => state.current.error;

export default studentAttendanceSlice.reducer;
