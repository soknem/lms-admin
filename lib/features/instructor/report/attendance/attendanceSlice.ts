import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import {AttendanceT} from "@/lib/types/instructor/report";

// Define the initial state using the ScheduleState type
type AttendanceState = {
    attendances: AttendanceT[];

}

const initialState: AttendanceState = {
    attendances: [] ,

}

const attendanceSlice = createSlice({
    name: "attendanceSlice",
    initialState,
    reducers: {
        setAttendance: (state, action: PayloadAction<AttendanceT[]>) => {
            state.attendances = action.payload;
        },
    },
});


export const { setAttendance } = attendanceSlice.actions;
export const selectAttendance = (state: RootState) => state.attendance.attendances;

export default attendanceSlice.reducer;
