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
            providesTags: [{ type: 'SingleClass', id: 'LIST' }],
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
            providesTags: [{ type: 'Courses', id: 'LIST' }],
        }),
        deleteStudentFromClass: builder.mutation<void, { classUuid: string, studentUuid: string }>({
            query: ({ classUuid, studentUuid }) => ({
                url: `/classes/${classUuid}/students/${studentUuid}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'StudentFromClass', id: 'LIST' }],
        }),
        getStudentFromClass: builder.query({
            query: (uuid) => `/classes/${uuid}/students`,
            providesTags: [{ type: 'StudentFromClass', id: 'LIST' }],
        }),
        addStudentToClass: builder.mutation({
            query: ({ classUuid, studentAdmissionUuid }) => ({
                url: `/classes/${classUuid}/students`,
                method: 'POST',
                body: {
                    studentAdmissionUuid,
                },
            }),
            invalidatesTags: [
                { type: 'StudentFromClass', id: 'LIST' },
                { type: 'SingleClass', id: 'LIST' },
            ],

        }),
        // getSummary: builder.query({
        //     query: () => `/summary-dashboards`,
        // }),

        getSummary: builder.query<any,{}>({
            query: () => `/summary-dashboards`,
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
    useGetClassCourseByUuidQuery,
    useDeleteStudentFromClassMutation,
    useGetStudentFromClassQuery,
    useAddStudentToClassMutation,
    useGetSummaryQuery
} = classApi;
