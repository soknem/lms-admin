// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const instructorCourseDetailApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getInstructorCourseDetail: builder.query<any,void>({
            query: () => `/instructors/course/ce50dbce-7c41-4402-b6d3-3c834c081ba3`,
        }),
    }),
});

export const {
    useGetInstructorCourseDetailQuery,
} = instructorCourseDetailApi;
