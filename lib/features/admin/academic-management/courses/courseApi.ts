import { istadLmsApi } from "@/lib/api";

export const courseApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/courses?page=${page}&page_size=${pageSize}`,
        }),
        filterCourses: builder.mutation<any, { pageNumber: number, pageSize: number, body: any }>({
            query: ({ pageNumber, pageSize, body }) => ({
                url: `/courses/filter?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'POST',
                body,
            }),
        }),
        enableCourse: builder.mutation<void, string>({
            query: (courseUuid) => ({
                url: `/courses/${courseUuid}/enable`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
        }),
        disableCourse: builder.mutation<void, string>({
            query: (courseUuid) => ({
                url: `/courses/${courseUuid}/disable`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
        }),
        addInstructorToCourse: builder.mutation({
            query: ({ courseUuid, instructorUuid }) => ({
                url: `/courses/${courseUuid}/instructors/${instructorUuid}`,
                method: 'POST',
            }),
            invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
        }),
        removeInstructorFromCourse: builder.mutation({
            query: ({ courseUuid, instructorUuid }) => ({
                url: `/courses/${courseUuid}/instructors/${instructorUuid}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
        }),
        getCourseByUuid: builder.query({
            query: (uuid) => `/courses/${uuid}`,
            providesTags: [{ type: 'CoursesByUuid', id: 'LIST' }],
        }),
        updateCourse: builder.mutation<any, { uuid: string, updatedData: any }>({
            query: ({uuid, updatedData}) => ({
                url: `/courses/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{ type: 'Courses', id: 'LIST' }],
        }),
    })
});

export const {
    useGetCoursesQuery,
    useFilterCoursesMutation,
    useDisableCourseMutation,
    useEnableCourseMutation,
    useAddInstructorToCourseMutation,
    useRemoveInstructorFromCourseMutation,
    useGetCourseByUuidQuery,
    useUpdateCourseMutation

} = courseApi;
