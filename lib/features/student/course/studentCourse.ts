// studentApi.ts
import { istadLmsApi } from "@/lib/api";


export const studentCourseApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentCourse: builder.query<any, void>({
            query: () => `/students/courses`,
            providesTags: [{type:'StudentData' , id:"LIST"}]
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

