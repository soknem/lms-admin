import { istadLmsApi } from "@/lib/api";

export const generationApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getGeneration: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/generations?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        createGeneration: builder.mutation({
            query: (newGeneration) => ({
                url: '/generations',
                method: 'POST',
                body: newGeneration,
            }),
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
        }),
        enableGeneration: builder.mutation<void, string>({
            query: (genAlias) => ({
                url: `/generations/${genAlias}/enable`,
                method: 'PUT',
            }),
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