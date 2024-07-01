import {istadLmsApi} from "@/lib/api";

export const subjectApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getSubjects: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/subjects?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        createSubject: builder.mutation({
            query: (newSubject) => ({
                url: '/subjects',
                method: 'POST',
                body: newSubject,
            }),
        }),
        editSubjectByAlias: builder.mutation({
            query: ({alias, updatedData}) => ({
                url: `/subjects/${alias}`,
                method: 'PATCH',
                body: updatedData,
            }),
        }),
        getSubjectByAlias: builder.query({
            query: (alias) => ({
                url: `/subjects/${alias}`,
                method: 'GET',
            }),
        }),
    })
})

export const {
    useGetSubjectsQuery,
    useCreateSubjectMutation,
    useEditSubjectByAliasMutation,
    useGetSubjectByAliasQuery
} = subjectApi;