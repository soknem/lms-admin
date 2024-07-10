import {istadLmsApi} from "@/lib/api";

export const sectionApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAllSection: builder.query<any, { page: number; pageSize: number }>({
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
    })
})
export const {
    useGetAllSectionQuery,
    useCreateSectionMutation,
} = sectionApi;