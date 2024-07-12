import {istadLmsApi} from "@/lib/api";

export const sectionApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSection: builder.query({
            query: ({page = 0, pageSize = 10}) =>
                `/materials-sections?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        createSection: builder.mutation({
            query: (newSection) => ({
                url: `/materials-sections`,
                method: 'POST',
                body: newSection,
            }),
        }),
        getAllBySubjectAlias: builder.query({
            query: (alias) => ({
                url: `/materials-sections/subjects/${alias}`,
                method: 'GET',
            }),
        }),
    })
})
export const {
    useGetAllSectionQuery,
    useCreateSectionMutation,
    useGetAllBySubjectAliasQuery
} = sectionApi;