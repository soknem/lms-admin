// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const currentLectureApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentLecture: builder.query<any,void>({
            query: () => `/instructors/courses/87ac12b1-4744-452e-94dd-8455041e1f04/lectures`,
        }),
    }),
});

export const {
    useGetCurrentLectureQuery,
} = currentLectureApi;
