import {istadLmsApi} from "@/lib/api";

export const materialApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getMaterials: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/instructors/materials?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        filterFiles: builder.mutation<any, { pageNumber: number, pageSize: number, body: any }>({
            query: ({pageNumber, pageSize, body}) => ({
                url: `/instructors/materials/filter?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'POST',
                body,
            }),
        }),
        createMaterial: builder.mutation({
            query: (newMaterials) => ({
                url: `/instructors/materials`,
                method: 'POST',
                body: newMaterials,
            }),
        }),
    })
})
export const {
    useGetMaterialsQuery,
    useFilterFilesMutation,
    useCreateMaterialMutation,
} = materialApi;