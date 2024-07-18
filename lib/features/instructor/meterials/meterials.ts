import {istadLmsApi} from "@/lib/api";

export const materialApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaterials: builder.query<any, { page: number; pageSize: number, fileType: string }>({
            query: ({page = 0, pageSize = 10, fileType}) =>
                `/instructors/materials/${fileType}?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'Materials', id: 'LIST'}],
        }),

        filterFiles: builder.mutation<any, { pageNumber: number, pageSize: number, body: any }>({
            query: ({pageNumber, pageSize, body}) => ({
                url: `/instructors/materials/filter?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'POST',
                body,
            }),
        }),
        getIntsSubjects: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 0}) =>
                `/instructors/subjects?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        createMaterial: builder.mutation({
            query: (newMaterials) => ({
                url: `/instructors/materials`,
                method: 'POST',
                body: newMaterials,
            }),
            invalidatesTags: [{type: 'Materials', id: 'LIST'}],
        }),

        getMaterialByAlias: builder.query({
            query: (uuid) => ({
                url: `/instructors/materials/${uuid}`,
                method: 'GET',
            }),
        }),

        updateMaterialByAlias: builder.mutation({
            query: ({uuid, updatedData}) => ({
                url: `/instructors/materials/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{type: 'Materials', id: 'LIST'}],
        }),
    })
})
export const {
    useGetMaterialsQuery,
    useGetIntsSubjectsQuery,
    useFilterFilesMutation,
    useCreateMaterialMutation,
    useGetMaterialByAliasQuery,
    useUpdateMaterialByAliasMutation,

} = materialApi;