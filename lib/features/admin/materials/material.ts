import {istadLmsApi} from "@/lib/api";

export const materialApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaterials: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/materials?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'Materials', id: 'LIST'}],
        }),
        filterFiles: builder.mutation<any, { pageNumber: number, pageSize: number, body: any }>({
            query: ({pageNumber, pageSize, body}) => ({
                url: `/materials/filter?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'POST',
                body,
            }),
            invalidatesTags: [{type: 'Materials', id: 'LIST'}],
        }),
        createMaterial: builder.mutation({
            query: (newMaterials) => ({
                url: `/materials`,
                method: 'POST',
                body: newMaterials,
            }),
            invalidatesTags: [{type: 'Materials', id: 'LIST'}],
        }),

        getMaterialByAlias: builder.query({
            query: (uuid) => ({
                url: `/materials/${uuid}`,
                method: 'GET',
            }),
        }),

        updateMaterialByAlias: builder.mutation({
            query: ({uuid, updatedData}) => ({
                url: `/materials/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{type: 'Materials', id: 'LIST'}],
        }),
    })
})
export const {
    useGetMaterialsQuery,
    useFilterFilesMutation,
    useCreateMaterialMutation,
    useGetMaterialByAliasQuery,
    useUpdateMaterialByAliasMutation,
} = materialApi;