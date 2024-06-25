import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import { courseAssessmentType } from "@/lib/types/admin/academics";
import {lectureRespondType} from "@/lib/types/admin/academics";

type LectureState = {
    lectures: lectureRespondType[];
}

const initialState: LectureState = {
    lectures: [] ,
}

const lectureSlice = createSlice({
    name: "lectureSlice",
    initialState,
    reducers: {
        setLecture: (state, action: PayloadAction<lectureRespondType[]>) => {
            state.lectures = action.payload;
        },

    }
})

export const { setLecture } = lectureSlice.actions;

export const selectLecture = (state: RootState) => state.lecture.lectures;

export default lectureSlice.reducer;