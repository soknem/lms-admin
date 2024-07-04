import { istadLmsApi } from "@/lib/api";

export const classApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getClasses: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/classes?page=${page}&page_size=${pageSize}`,
            providesTags: [{ type: 'Classes', id: 'LIST' }],
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
            invalidatesTags: [{ type: 'Classes', id: 'LIST' }],
        }),
        disableClass: builder.mutation<void, string>({
            query: (classUuid) => ({
                url: `/classes/${classUuid}/disable`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'Classes', id: 'LIST' }],
        }),
        updateClasses: builder.mutation<any, { uuid: string, updatedData: any }>({
            query: ({uuid, updatedData}) => ({
                url: `/classes/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{ type: 'Classes', id: 'LIST' }],
        }),
        addClass: builder.mutation({
            query: (newClass) => ({
                url: '/classes',
                method: 'POST',
                body: newClass,
            }),
            invalidatesTags: [{ type: 'Classes', id: 'LIST' }],
        }),
        getClassCourseByUuid: builder.query({
            query: (uuid) => `/classes/${uuid}/courses`,
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
    useAddClassMutation,
    useGetClassCourseByUuidQuery
} = classApi;
