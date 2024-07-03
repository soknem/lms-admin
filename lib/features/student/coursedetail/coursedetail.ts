// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const studentCourseDetailApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentCourseDetail: builder.query<any,void>({
            query: () => `/students/course/d63a034b-9e88-4d4f-b90f-c08fe18d1e85`,
        }),
    }),
});

export const {
    useGetStudentCourseDetailQuery,
} = studentCourseDetailApi;
