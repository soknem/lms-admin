import {istadLmsApi} from "@/lib/api";

export const sectionApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSection: builder.query({
            query: ({page = 0, pageSize = 10}) =>
                `/materials-sections?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'Sections', id: 'LIST'}],
        }),
        createSection: builder.mutation({
            query: (newSection) => ({
                url: `/materials-sections`,
                method: 'POST',
                body: newSection,
            }),
            invalidatesTags: [{type: 'Sections', id: 'LIST'}],
        }),
        getAllBySubjectAlias: builder.query({
            query: (alias) => ({
                url: `/materials-sections/subjects/${alias}`,
                method: 'GET',
            }),
        }),

        getSectionByUuid: builder.query({
            query: (uuid) => ({
                url: `/materials-sections/${uuid}`,
                method: 'GET',
            }),
        }),
        updateSection: builder.mutation({
            query: ({uuid, updatedData}) => ({
                url: `/materials-sections/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{type: 'Sections', id: 'LIST'}],
        }),
    })
})
export const {
    useGetAllSectionQuery,
    useCreateSectionMutation,
    useGetAllBySubjectAliasQuery,
    useGetSectionByUuidQuery,
    useUpdateSectionMutation,

} = sectionApi;