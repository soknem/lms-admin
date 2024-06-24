import { istadLmsApi } from "@/lib/api";

export const assessmentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAssessment: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/scores?pageNumber=${page}&pageSize=${pageSize}`,
        }),

    })
})

export const {
    useGetAssessmentQuery
} = assessmentApi;