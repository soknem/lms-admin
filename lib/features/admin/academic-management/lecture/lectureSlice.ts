import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import {LectureRespondType} from "@/lib/types/admin/academics";

type LectureState = {
    lectures: LectureRespondType[];
}

const initialState: LectureState = {
    lectures: [] ,
}

const lectureSlice = createSlice({
    name: "lectureSlice",
    initialState,
    reducers: {
        setLecture: (state, action: PayloadAction<LectureRespondType[]>) => {
            state.lectures = action.payload;
        },
        addLecture: (state, action: PayloadAction<LectureRespondType>) => {
            state.lectures.push(action.payload);
        },

    }
})

export const { setLecture ,addLecture} = lectureSlice.actions;

export const selectLecture = (state: RootState) => state.lecture.lectures;

export default lectureSlice.reducer;