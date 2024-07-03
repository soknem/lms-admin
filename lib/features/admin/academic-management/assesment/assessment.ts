import { istadLmsApi } from "@/lib/api";

export const assessmentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAssessment: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/scores?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        getTranscripts: builder.mutation<any, {
            studyProgramAlias: string;
            generationAlias: string;
            year: number;
        }>({
            query: (body) => ({
                url: '/scores/transcripts',
                method: 'POST',
                body,
            }),
        }),
        getSemesters: builder.mutation<any, {
            studyProgramAlias: string;
            generationAlias: string;
            year: number;
            semester: number;
        }>({
            query: (body) => ({
                url: '/scores/semesters',
                method: 'POST',
                body,
            }),
        }),

    })
})

export const {
    useGetAssessmentQuery,
    useGetTranscriptsMutation,
    useGetSemestersMutation
} = assessmentApi;