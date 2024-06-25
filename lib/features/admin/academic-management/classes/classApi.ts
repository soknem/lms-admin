import { istadLmsApi } from "@/lib/api";

export const classApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getClasses: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/classes?page=${page}&page_size=${pageSize}`,
        }),
        filterClasses: builder.mutation<any, { pageNumber: number, pageSize: number, body: any }>({
            query: ({ pageNumber, pageSize, body }) => ({
                url: `/classes/filter?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'POST',
                body,
            }),
        }),
    })
});

export const {
    useGetClassesQuery,
    useFilterClassesMutation,
} = classApi;
