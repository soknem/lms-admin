import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { courseAssessmentType } from "@/lib/types/admin/academics";
import {UserStudentDetailType} from "@/lib/types/admin/user";

type StudentState = {
    students: UserStudentDetailType[];
}

const initialState: StudentState = {
    students: [] ,
}

const studentSlice = createSlice({
    name: "studentSlice",
    initialState,
    reducers: {
        setStudent: (state, action: PayloadAction<UserStudentDetailType[]>) => {
            state.students = action.payload;
        },

    }
})

export const { setStudent } = studentSlice.actions;
export const selectStudent = (state: RootState) => state.student.students;


export default studentSlice.reducer;