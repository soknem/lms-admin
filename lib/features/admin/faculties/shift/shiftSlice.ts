import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {ShiftType} from "@/lib/types/admin/faculty";

type ShiftState = {
    shifts: ShiftType[];
    isLoading: boolean;
    error: string | null;
}

const initialState: ShiftState = {
    shifts: [],
    isLoading: false,
    error: null,
}

const shiftSlice = createSlice({
    name: "shiftSlice",
    initialState,
    reducers: {
        setShifts: (state, action: PayloadAction<ShiftType[]>) => {
            state.shifts = action.payload;
            state.isLoading = false;
            state.error = null;
        },
        addShift: (state, action: PayloadAction<ShiftType>) => {
            state.shifts.push(action.payload);
            state.isLoading = false;
            state.error = null;
        },
    }
})

export const {setShifts, addShift} = shiftSlice.actions;
export const selectShift = (state: RootState) => state.shift.shifts;
export const selectLoading = (state: RootState) => state.shift.isLoading;
export const selectError = (state: RootState) => state.shift.error;


export default shiftSlice.reducer;