import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { ScheduleType ,InstructorCourseType} from "@/lib/types/instructor/schedule";

// Define the initial state using the ScheduleState type
type ScheduleState = {
    schedules: ScheduleType[];
    courses: InstructorCourseType[];

}

const initialState: ScheduleState = {
    schedules: [] ,
    courses: [],

}

const scheduleSlice = createSlice({
    name: "scheduleSlice",
    initialState,
    reducers: {
        setSchedule: (state, action: PayloadAction<ScheduleType[]>) => {
            state.schedules = action.payload;
        },
        setCourses: (state, action: PayloadAction<InstructorCourseType[]>) => {
            state.courses = action.payload;

        },
    },
});


export const { setSchedule,setCourses } = scheduleSlice.actions;
export const selectSchedule = (state: RootState) => state.schedule.schedules;
export const selectCourses = (state: RootState) => state.course.courses;

export default scheduleSlice.reducer;
