// studentSettingSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { StudentSetting } from '@/lib/types/student/StudentSetting';
import { RootState } from '@/lib/store';

type StudentSettingState = {
    studentSettings: StudentSetting | null;
    loading: boolean;
    error: string | null;
};

const initialState: StudentSettingState = {
    studentSettings: null,
    loading: false,
    error: null,
};

const studentProfileSlice = createSlice({
    name: 'studentSetting',
    initialState,
    reducers: {
        setStudentSetting: (state, action: PayloadAction<StudentSetting>) => {
            state.studentSettings = action.payload;
        },
    },
});

export const { setStudentSetting } = studentProfileSlice.actions;

export const selectStudentSettings = (state: RootState) => state.studentSetting.studentSettings;
export const selectLoading = (state: RootState) => state.studentSetting.loading;
export const selectError = (state: RootState) => state.studentSetting.error;

export default studentProfileSlice.reducer;
