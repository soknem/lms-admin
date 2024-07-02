import { istadLmsApi } from "@/lib/api";

export const generationApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getGeneration: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/generations?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{ type: 'Generations', id: 'LIST' }],
        }),
        createGeneration: builder.mutation({
            query: (newGeneration) => ({
                url: '/generations',
                method: 'POST',
                body: newGeneration,
            }),
            // for auto refetch data
            invalidatesTags: [{ type: 'Generations', id: 'LIST' }],
        }),
        filterGenerations: builder.mutation<any, { pageNumber: number, pageSize: number, body: any }>({
            query: ({ pageNumber, pageSize, body }) => ({
                url: `/generations/filter?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'POST',
                body: body,
            }),
        }),
        disableGeneration: builder.mutation<void, string>({
            query: (genAlias) => ({
                url: `/generations/${genAlias}/disable`,
                method: 'PUT',
            }),
            // for auto refetch data
            invalidatesTags: [{ type: 'Generations', id: 'LIST' }],
        }),
        enableGeneration: builder.mutation<void, string>({
            query: (genAlias) => ({
                url: `/generations/${genAlias}/enable`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'Generations', id: 'LIST' }],
        }),
    })
})

export const {
    useGetGenerationQuery,
    useCreateGenerationMutation,
    useFilterGenerationsMutation,
    useEnableGenerationMutation,
    useDisableGenerationMutation,
} = generationApi;