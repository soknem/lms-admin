// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const instructorCourseApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getInstructorCourse: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 25 }) =>
                `/instructors/detail?pageNumber=${page}&pageSize=${pageSize}`,
        }),
    }),
});

export const {
    useGetInstructorCourseQuery,
} = instructorCourseApi;
