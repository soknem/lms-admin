// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const instructorCourseApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getInstructorCourse: builder.query<any, void>({
            query: () => `/students/courses`,
        }),
    }),
});

export const {
    useGetInstructorCourseQuery,
} = instructorCourseApi;
