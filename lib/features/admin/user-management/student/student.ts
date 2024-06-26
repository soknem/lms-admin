import { istadLmsApi } from "@/lib/api";

export const studentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudent: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/students/detail?pageNumber=${page}&pageSize=${pageSize}`,
        }),

    })
})

export const {
    useGetStudentQuery
} = studentApi;