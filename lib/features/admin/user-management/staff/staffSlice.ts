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
// export const selectStaffByUUID = createSelector(
//     [selectStaffs, (state: RootState, uuid: string) => uuid],
//     (staffs, uuid) => staffs.find(staff => staff.uuid === uuid)
// );

export const selectStaffByUUID = (state: RootState, staffUuid: string) => {
    const staffDetail = state.staff.staffs.find(stf => stf.uuid === staffUuid);
    return staffDetail ? staffDetail.position : [];
};

export default staffSlice.reducer;