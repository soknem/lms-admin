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
        editDegree: builder.mutation({
            query: ({alias, editDegree}) => ({
                url: `/degrees/${alias}`,
                method: 'PATCH',
                body: editDegree,
            }),
        }),
    })
})
export const {
    useGetDegreesQuery,
    useCreateDegreeMutation,
    useEditDegreeMutation
} = degreeApi;