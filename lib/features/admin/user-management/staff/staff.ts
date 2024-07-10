import { istadLmsApi } from "@/lib/api";

export const staffApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaff: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 25 }) =>
                `/users/not-students?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{ type: 'Staffs', id: 'LIST' }],
        }),
        getStaffByUuid: builder.query({
            query: (uuid) => `/users/${uuid}`,
            // providesTags: [{ type: 'CoursesByUuid', id: 'LIST' }],
        }),
        addStaff: builder.mutation({
            query: (newStaff) => ({
                url: '/admins',
                method: 'POST',
                body: newStaff,
            }),
            invalidatesTags: [{ type: 'Staffs', id: 'LIST' }],
        }),

    })
})

export const {
    useGetStaffQuery,
    useGetStaffByUuidQuery,
    useAddStaffMutation,
} = staffApi;