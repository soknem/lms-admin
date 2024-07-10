// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const endedLectureApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getEndedLecture: builder.query<any,void>({
            query: () => `/instructors/courses/df370ffb-ca74-414f-b3f1-2575d8e02cbf/lectures?status=3`,
        }),
    }),
});

export const {
    useGetEndedLectureQuery,
} = endedLectureApi;
