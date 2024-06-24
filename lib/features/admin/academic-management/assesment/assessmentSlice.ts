import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { courseAssessmentType } from "@/lib/types/admin/academics";

type AssessmentState = {
    assessments: courseAssessmentType[];
}

const initialState: AssessmentState = {
    assessments: [] ,
}

const assessmentSlice = createSlice({
    name: "assessmentSlice",
    initialState,
    reducers: {
        setAssessment: (state, action: PayloadAction<courseAssessmentType[]>) => {
            state.assessments = action.payload;
        },
       
    }
})

export const { setAssessment } = assessmentSlice.actions;
export const selectAssessment = (state: RootState) => state.assessment.assessments;


export default assessmentSlice.reducer;