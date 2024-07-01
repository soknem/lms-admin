import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { CourseDetail } from "@/lib/types/student/coursedetail/coursedetail";

type CourseDetailState = {
    coursedetails: CourseDetail[];
};

const initialState: CourseDetailState = {
    coursedetails: [],
};

const coursedetailSlice = createSlice({
    name: "coursedetail",
    initialState,
    reducers: {
        setCoursedetail: (state, action: PayloadAction<CourseDetail[]>) => {
            state.coursedetails = action.payload; // Ensure this matches the state property name
        },
    },
});

export const { setCoursedetail } = coursedetailSlice.actions;
export const selectCoursedetail = (state: RootState) => state.courseDetail.coursedetails;

export default coursedetailSlice.reducer;
