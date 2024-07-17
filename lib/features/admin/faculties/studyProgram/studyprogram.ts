import {istadLmsApi} from "@/lib/api";

export const studyProgramApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudyPrograms: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/study-programs?pageNumber=${page}&page_size=${pageSize}`,
            providesTags: [{type: 'StudyPrograms', id: 'LIST'}],

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
        getByStudyProgramAndYear: builder.mutation({
            query: ({studyProgramAlias, year}) => ({
                url: `year-of-studies/study-programs/years`,
                method: 'POST',
                body: {studyProgramAlias, year},
            }),
        }),

        enableStudyProgramByAlias: builder.mutation<void, string>({
            query: (alias) => ({
                url: `/study-programs/${alias}/enable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'StudyPrograms', id: 'LIST'}],
        }),

        disableStudyProgramByAlias: builder.mutation<void, string>({
            query: (alias) => ({
                url: `/study-programs/${alias}/disable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'StudyPrograms', id: 'LIST'}],
        }),

    })
})
export const {
    useGetStudyProgramsQuery,
    useCreateStuProgramMutation,
    useEditStuProByAliasMutation,
    useGetStuProByAliasQuery,
    useGetByStudyProgramAndYearMutation,
    useEnableStudyProgramByAliasMutation,
    useDisableStudyProgramByAliasMutation,
} = studyProgramApi;