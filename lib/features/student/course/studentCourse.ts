// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const studentCourseApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentCourse: builder.query<any,void>({
            query: () => `/students/courses`,
        }),
    }),
});

export const {
    useGetStudentCourseQuery,
} = studentCourseApi;
