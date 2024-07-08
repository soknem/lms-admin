import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import {AssessmentType} from "@/lib/types/instructor/assessment";

type AssessmentState = {
    assessments: AssessmentType[];

}

const initialState: AssessmentState = {
    assessments: [] ,

}

const assessmentSlice = createSlice({
    name: "assessmentSlice",
    initialState,
    reducers: {
        setAssessment: (state, action: PayloadAction<AssessmentType[]>) => {
            state.assessments = action.payload;
        },


        },

});


export const { setAssessment} = assessmentSlice.actions;
export const selectAssessment = (state: RootState) => state.intructorAssessment.assessments;
export const selectCourses = (state: RootState) => state.intructorAssessment.assessments;

export default assessmentSlice.reducer;
