import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { semesterAssessementType} from "@/lib/types/admin/academics";

type AssessmentState = {
    assessments: semesterAssessementType[];
}

const initialState: AssessmentState = {
    assessments: [] ,
}

const assessmentEachSemesterSlice = createSlice({
    name: "assessmentEachSemesterSlice",
    initialState,
    reducers: {
        setEachSemesterAssessment: (state, action: PayloadAction<semesterAssessementType[]>) => {
            state.assessments = action.payload;
        },
       
    }
})

export const { setEachSemesterAssessment } = assessmentEachSemesterSlice.actions;
export const selectEachSemesterAssessment = (state: RootState) => state.eachSemesterAssessment.assessments;


export default assessmentEachSemesterSlice.reducer;