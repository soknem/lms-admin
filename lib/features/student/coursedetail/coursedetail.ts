// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const studentCourseDetailApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentCourseDetail: builder.query<any,void>({
            query: () => `/students/course/120e2c4f-a98d-48ce-9772-96921349cd8f`,
        }),
    }),
});

export const {
    useGetStudentCourseDetailQuery,
} = studentCourseDetailApi;
