import {istadLmsApi} from "@/lib/api";

export const materialApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        filterFiles: builder.mutation<any, { pageNumber: number, pageSize: number, body: any }>({
            query: ({pageNumber, pageSize, body}) => ({
                url: `/materials/filter?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'POST',
                body,
            }),
        })
    })
})
export const {
    useFilterFilesMutation
} = materialApi;