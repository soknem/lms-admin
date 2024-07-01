import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import {LectureRespondType,ShiftResponseType} from "@/lib/types/admin/academics";

type shiftState = {
    shifts: ShiftResponseType[];
}

const initialState: shiftState = {
    shifts: [] ,
}

const shiftSlice = createSlice({
    name: "shiftSlice",
    initialState,
    reducers: {
        setShift: (state, action: PayloadAction<ShiftResponseType[]>) => {
            state.shifts = action.payload;
        },


    }
})

export const { setShift } = shiftSlice.actions;

export const selectShift = (state: RootState) => state.shift.shifts;

export default shiftSlice.reducer;