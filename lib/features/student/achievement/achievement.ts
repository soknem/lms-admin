// studentApi.ts
import {istadLmsApi} from "@/lib/api";
import {Achievement} from "@/lib/types/student/achievement";

export const studentApi = istadLmsApi.injectEndpoints({
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
} = studentApi;
