import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { courseAssessmentType } from "@/lib/types/admin/academics";
import {UserStaffDetailType} from "@/lib/types/admin/user";

type StaffState = {
    staffs: UserStaffDetailType[];
}

const initialState: StaffState = {
    staffs: [] ,
}

const staffSlice = createSlice({
    name: "staffSlice",
    initialState,
    reducers: {
        setStaff: (state, action: PayloadAction<UserStaffDetailType[]>) => {
            state.staffs = action.payload;
        },

    }
})

export const { setStaff } = staffSlice.actions;
export const selectStaff = (state: RootState) => state.staff.staffs ;


export default staffSlice.reducer;