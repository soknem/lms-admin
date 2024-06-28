import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/store";
import {ClassDetailResponseType} from "@/lib/types/admin/academics";

type detailClassesState = {
    detailClasses: ClassDetailResponseType[];
}

const initialState : detailClassesState = {
    detailClasses: [] ,
}

const detailClassesSlice = createSlice({
    name: "detailClassesSlice",
    initialState,
    reducers: {
        setDetailClasses: (state, action: PayloadAction<ClassDetailResponseType[]>) => {
            state.detailClasses = action.payload;
        },

    }
})

export const { setDetailClasses } = detailClassesSlice.actions;
export const selectDetailClasses = (state: RootState) => state.detailClasses.detailClasses;
export const selectDetailClassCoursesByUuid = (state: RootState, classUuid: string) => {
    const classDetail = state.detailClasses.detailClasses.find(cls => cls.uuid === classUuid);
    return classDetail ? classDetail.courses : [];
};

export default detailClassesSlice.reducer;