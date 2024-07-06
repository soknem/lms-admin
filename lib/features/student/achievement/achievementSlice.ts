// achievementSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@/lib/store";
import { Achievement } from "@/lib/types/student/achievement";

type AchievementState = {
    achievements: Achievement[];
    loading: boolean;
    error: string | null;
};

const initialState: AchievementState = {
    achievements: [],
    loading: false,
    error: null,
};

const achievementSlice = createSlice({
    name: "achievement",
    initialState,
    reducers: {
        setAchievements: (state, action: PayloadAction<Achievement[]>) => {
            state.achievements = action.payload;
            state.loading = false;
            state.error = null;
        },
        setLoading: (state) => {
            state.loading = true;
            state.error = null;
        },
        setError: (state, action: PayloadAction<string>) => {
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { setAchievements, setLoading, setError } = achievementSlice.actions;

export const selectAchievements = (state: RootState) => state.achievement.achievements;
export const selectLoading = (state: RootState) => state.achievement.loading;
export const selectError = (state: RootState) => state.achievement.error;

export default achievementSlice.reducer;
