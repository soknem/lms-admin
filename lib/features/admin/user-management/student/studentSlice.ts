import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { courseAssessmentType } from "@/lib/types/admin/academics";

type StudentState = {
    students: any[];
}

const initialState: StudentState = {
    students: [] ,
}

const studentSlice = createSlice({
    name: "studentSlice",
    initialState,
    reducers: {
        setStudent: (state, action: PayloadAction<courseAssessmentType[]>) => {
            state.students = action.payload;
        },

    }
})

export const { setStudent } = studentSlice.actions;
export const selectStudent = (state: RootState) => state.student.students;


export default studentSlice.reducer;