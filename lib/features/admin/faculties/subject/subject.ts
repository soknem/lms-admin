import { istadLmsApi } from "@/lib/api";

export const subjectApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubjects: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/subjects?pageNumber=${page}&pageSize=${pageSize}`,
        }),
    })
})

export const {
    useGetSubjectsQuery
} = subjectApi;