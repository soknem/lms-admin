// studentApi.ts
import { istadLmsApi } from "@/lib/api";


export const studentCourseApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentCourse: builder.query<any, void>({
            query: () => `/students/courses`,
        }),
        getCourseDetail: builder.query<any, { uuid: string }>({
            query: ({ uuid }) => `/students/course/${uuid}`,
        }),
    }),
});

export const {
    useGetStudentCourseQuery,
    useGetCourseDetailQuery,
} = studentCourseApi;

