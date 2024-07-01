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
        getClassByUuid: builder.query({
            query: (uuid) => `/classes/${uuid}`,
        }),
        enableClass: builder.mutation<void, string>({
            query: (classUuid) => ({
                url: `/classes/${classUuid}/enable`,
                method: 'PUT',
            }),
        }),
        disableClass: builder.mutation<void, string>({
            query: (classUuid) => ({
                url: `/classes/${classUuid}/disable`,
                method: 'PUT',
            }),
        }),
        updateClasses: builder.mutation<void, string>({
            query: (classUuid) => ({
                url: `/classes/${classUuid}`,
                method: 'PATCH',
            }),
        }),

    })
});

export const {
    useGetClassesQuery,
    useUpdateClassesMutation,
    useFilterClassesMutation,
    useGetClassByUuidQuery,
    useEnableClassMutation,
    useDisableClassMutation,
} = classApi;
