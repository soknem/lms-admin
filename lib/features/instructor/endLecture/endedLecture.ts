// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const endedLectureApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getEndedLecture: builder.query<any,void>({
            query: () => `/instructors/courses/f7d61f90-4cd3-4aa2-a306-98c1dec74db6/lectures?status=3`,
        }),
    }),
});

export const {
    useGetEndedLectureQuery,
} = endedLectureApi;
