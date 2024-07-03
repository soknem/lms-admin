import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { ScheduleType } from "@/lib/types/instructor/schedule";

// Define the initial state using the ScheduleState type
type ScheduleState = {
    schedules: ScheduleType[];
}

const initialState: ScheduleState = {
    schedules: [] ,
}

const scheduleSlice = createSlice({
    name: "scheduleSlice",
    initialState,
    reducers: {
        setSchedule: (state, action: PayloadAction<ScheduleType[]>) => {
            state.schedules = action.payload;
        },

    }
})



export const { setSchedule } = scheduleSlice.actions;
export const selectSchedule = (state: RootState) => state.schedule.schedules;

export default scheduleSlice.reducer;
