import {istadLmsApi} from "@/lib/api";

export const degreeApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getDegrees: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/degrees?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'Degrees', id: 'LIST'}],
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
        enableDegreeByAlias: builder.mutation<void, string>({
            query: (alias) => ({
                url: `/degrees/${alias}/enable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Degrees', id: 'LIST'}],
        }),

        disableDegreeByAlias: builder.mutation<void, string>({
            query: (alias) => ({
                url: `/degrees/${alias}/disable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Degrees', id: 'LIST'}],
        }),
    })
})
export const {
    useGetDegreesQuery,
    useCreateDegreeMutation,
    useGetDegreeByAliasQuery,
    useEditDegreeByAliasMutation,
    useEnableDegreeByAliasMutation,
    useDisableDegreeByAliasMutation,
} = degreeApi;