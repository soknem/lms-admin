import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { ClassDetailResponseType } from "@/lib/types/admin/academics";

type singleClassState = {
    singleClass: ClassDetailResponseType | null;
};

const initialState: singleClassState = {
    singleClass: null,
};

const singleClassSlice = createSlice({
    name: "singleClass",
    initialState,
    reducers: {
        setSingleClass: (state, action: PayloadAction<ClassDetailResponseType>) => {
            state.singleClass = action.payload;
        },
    },
});

export const { setSingleClass } = singleClassSlice.actions;
export const selectSingleClass = (state: RootState) => state.singleClass.singleClass ;


export default singleClassSlice.reducer;
