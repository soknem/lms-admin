import { istadLmsApi } from "@/lib/api";

export const assessmentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAssessment: builder.query<any, { page: number; pageSize: number; courseUuid: string; classUuid: string }>({
            query: ({ page = 0, pageSize = 10 ,courseUuid, classUuid}) =>
                `/scores/filters?pageNumber=${page}&pageSize=${pageSize}&course.uuid=${courseUuid}&course.oneClass.uuid=${classUuid}`,
            providesTags: [{ type: 'AllEachCourse', id: 'LIST' }],
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
        updateCourseAssessment: builder.mutation<any, { uuid: string, updatedData: any }>({
            query: ({uuid, updatedData}) => ({
                url: `/scores/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{ type: 'AllEachCourse', id: 'LIST' }],
        }),

    })
})

export const {
    useGetAssessmentQuery,
    useGetTranscriptsMutation,
    useGetSemestersMutation,
    useUpdateCourseAssessmentMutation
} = assessmentApi;