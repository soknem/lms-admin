// studentApi.ts
import {istadLmsApi} from "@/lib/api";
import {Achievement} from "@/lib/types/student/achievement";

export const studentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentAchievement: builder.query<any, void>({
            query: () => `/students/achievement`,
        }),
    }),
});



export const {
    useGetStudentAchievementQuery,
} = studentApi;
