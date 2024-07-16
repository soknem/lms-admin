import { istadLmsApi } from "@/lib/api";

export const instructorApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getInstructor: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/instructors?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{ type: 'Instructors', id: 'LIST' }],
        }),
        addInstructor: builder.mutation({
            query: (newInstructor) => ({
                url: '/instructors',
                method: 'POST',
                body: newInstructor,
            }),
            invalidatesTags: [{ type: 'Instructors', id: 'LIST' }],
        }),
        getInsAllCourseByUuid: builder.query({
            query: (insUuid) => `/instructors/all-courses/${insUuid}`,
        }),
        getInsCurrentCourseByUuid: builder.query({
            query: (insUuid) => `/instructors/current-courses/${insUuid}`,
        }),
        getInsDetailByUuid: builder.query({
            query: (insUuid) => `/instructors/detail/${insUuid}`,
            providesTags: [{ type: 'SingleIns', id: 'LIST' }],
        }),

    })
})

export const {
   useGetInstructorQuery,
    useAddInstructorMutation,
    useGetInsAllCourseByUuidQuery,
    useGetInsCurrentCourseByUuidQuery,
    useGetInsDetailByUuidQuery,
} = instructorApi;