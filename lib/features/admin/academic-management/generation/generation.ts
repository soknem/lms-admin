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
    })
})

export const {
    useGetGenerationQuery,
    useCreateGenerationMutation
} = generationApi;