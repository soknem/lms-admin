import { istadLmsApi } from "@/lib/api";

export const academicYearApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAcademicYear: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/academic-years?pageNumber=${page}&pageSize=${pageSize}`,
        }),

    })
})

export const {
    useGetAcademicYearQuery
} = academicYearApi;