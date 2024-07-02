import { istadLmsApi } from "@/lib/api";

export const studentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudent: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/students?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        getStudentByUuid: builder.query({
            query: (uuid) => `/students/detail/${uuid}`,
        }),

    })
})

export const {
    useGetStudentQuery,
    useGetStudentByUuidQuery,
} = studentApi;