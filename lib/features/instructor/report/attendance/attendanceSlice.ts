// import { createSlice, PayloadAction } from "@reduxjs/toolkit";
// import type { RootState } from "@/lib/store";
// import { courseAssessmentType } from "@/lib/types/admin/academics";
// import {AttendanceTableType} from "@/lib/types/instructor/report";
//
// type AttendanceState = {
//     attendances: AttendanceTableType[];
// }
//
// const initialState: AttendanceState = {
//     attendances: [] ,
// }
//
// const attendanceSlice = createSlice({
//     name: "attendanceSlice",
//     initialState,
//     reducers: {
//         setAttendance: (state, action: PayloadAction<AttendanceTableType[]>) => {
//             state.attendances = action.payload;
//         },
//
//     }
// })
//
//
// export const { setAttendance} = attendanceSlice.actions;
//
// export const selectAttendance = (state: RootState) => state.attendance.attendances;
//
//
// export default attendanceSlice.reducer;