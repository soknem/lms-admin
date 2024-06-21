import {istadLmsApi} from "@/lib/api";

export const degreeApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getDegrees: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/degrees?page=${page}&page_size=${pageSize}`,
        }),
    })
})
export const {
    useGetDegreesQuery,
} = degreeApi;