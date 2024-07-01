import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { ScheduleType } from "@/lib/types/instructor/schedule";

type ScheduleState = {
    schedules: ScheduleType[];
}

const initialState: ScheduleState = {
    schedules: [],
}

const scheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {
        setSchedule: (state, action: PayloadAction<ScheduleType[]>) => {
            state.schedules = action.payload;
        },
        addSchedule: (state, action: PayloadAction<ScheduleType>) => {
            state.schedules.push(action.payload);
        },
    }
})

export const { setSchedule, addSchedule } = scheduleSlice.actions;

export const selectSchedule = (state: RootState) => state.schedule.schedules;

export default scheduleSlice.reducer;
