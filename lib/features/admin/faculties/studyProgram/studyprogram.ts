import {istadLmsApi} from "@/lib/api";

export const studyProgramApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudyPrograms: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/study-programs?pageNumber=${page}&page_size=${pageSize}`,
        }),
        createStuProgram: builder.mutation({
            query: (newStuProgram) => ({
                url: '/study-programs',
                method: 'POST',
                body: newStuProgram,
            }),
        }),
    })
})
export const {
    useGetStudyProgramsQuery,
    useCreateStuProgramMutation,
} = studyProgramApi;