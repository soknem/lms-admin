import {istadLmsApi} from "@/lib/api";

export const degreeApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getDegrees: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/degrees?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        createDegree: builder.mutation({
            query: (newDegree) => ({
                url: '/degrees',
                method: 'POST',
                body: newDegree,
            }),
        }),
        getDegreeByAlias: builder.query({
            query: (alias) => ({
                url: `/degrees/${alias}`,
                method: 'GET',
            }),
        }),
        editDegreeByAlias: builder.mutation({
            query: ({alias, updatedData}) => ({
                url: `/degrees/${alias}`,
                method: 'PATCH',
                body: updatedData,
            }),
        }),

    })
})
export const {
    useGetDegreesQuery,
    useCreateDegreeMutation,
    useGetDegreeByAliasQuery,
    useEditDegreeByAliasMutation
} = degreeApi;