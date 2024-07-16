import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import type {RootState} from "@/lib/store";
import {UserStudentDetailType} from "@/lib/types/admin/user";

type StudentState = {
    data: any;
    students: UserStudentDetailType[];
    totalElements: number;
}

const initialState: StudentState = {
    students: [] ,
    totalElements: 0
}

const studentSlice = createSlice({
    name: "studentSlice",
    initialState,
    reducers: {

        setStudent: (state, action: PayloadAction<{ students: UserStudentDetailType[], totalElements: number }>) => {
            state.students = action.payload.students;
            state.totalElements = action.payload.totalElements;
        },

    }
})

export const { setStudent } = studentSlice.actions;
export const selectStudents = (state: RootState) => state.student.students;
export const selectStudentByUuid = (state: RootState, studentUuid: string) => {
    return state.student.students.find(stu => stu.uuid === studentUuid);
};
export const selectTotalStudentCount = (state: RootState) => state.student.totalElements;
export const selectFemaleStudentCount = (state: RootState) => state.student.students.filter(stu => stu.gender === 'F').length;
export const selectMaleStudentCount = (state: RootState) => state.student.students.filter(stu => stu.gender === 'M').length;

export default studentSlice.reducer;