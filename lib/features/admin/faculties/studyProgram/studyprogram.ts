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
        editStuProByAlias: builder.mutation({
            query: ({alias, updatedData}) => ({
                url: `/study-programs/${alias}`,
                method: 'PATCH',
                body: updatedData,
            }),
        }),
        getStuProByAlias: builder.query({
            query: (alias) => ({
                url: `/study-programs/${alias}`,
                method: 'GET',
            }),
        }),
    })
})
export const {
    useGetStudyProgramsQuery,
    useCreateStuProgramMutation,
    useEditStuProByAliasMutation,
    useGetStuProByAliasQuery
} = studyProgramApi;