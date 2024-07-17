// studentAttendanceSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentAttendanceType } from '@/lib/types/instructor/lecture/lecture';
import {RootState} from "@/lib/store";

interface StudentAttendanceState {
    studentAttendances: StudentAttendanceType[];
}

const initialState: StudentAttendanceState = {
    studentAttendances: [],
};

const studentAttendanceSlice = createSlice({
    name: 'studentAttendance',
    initialState,
    reducers: {
        setStudentAttendances(state, action: PayloadAction<StudentAttendanceType[]>) {
            state.studentAttendances = action.payload;
        },
    },
});

export const { setStudentAttendances } = studentAttendanceSlice.actions;
export const selectStudentAttendances = (state: RootState) => state.studentAttendance.studentAttendances;
export default studentAttendanceSlice.reducer;
