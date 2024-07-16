// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const currentLectureApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentLecture: builder.query<any,void>({
            query: () => `/instructors/courses/96457aa5-2790-4ad8-88e7-e767e0a1f49a/lectures`,
        }),
    }),
});

export const {
    useGetCurrentLectureQuery,
} = currentLectureApi;
