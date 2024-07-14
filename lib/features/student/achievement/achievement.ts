// studentApi.ts
import {istadLmsApi} from "@/lib/api";

export const studentAchievementApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentAchievement: builder.query<any, void>({
            query: () => `/students/achievement`,
        }),
        getYearOfStudyAchievement: builder.query<any, void>({
            query: () => `/students/year-of-study-achievement`,
        }),
    }),
});



export const {
    useGetStudentAchievementQuery,
    useGetYearOfStudyAchievementQuery,
} = studentAchievementApi;
