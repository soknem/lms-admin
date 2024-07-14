import { istadLmsApi } from "@/lib/api";

export const staffApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({

        // **** Get All Staff *****
        getStaff: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 25 }) =>
                `/users/except-students?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{ type: 'Staffs', id: 'LIST' }],
        }),

        // **** Get Single Staff *****
        getStaffByUuid: builder.query({
            query: (uuid) => `/users/${uuid}`,
            providesTags: [{ type: 'SingleStaff', id: 'LIST' }],
        }),

        // **** Staff Add *****
        addStaff: builder.mutation({
            query: (newStaff) => ({
                url: '/admins',
                method: 'POST',
                body: newStaff,
            }),
            invalidatesTags: [{ type: 'Staffs', id: 'LIST' }],
        }),

        // **** Staff Update *****
        updateStaff: builder.mutation<any, { uuid: string, updatedData: any }>({
            query: ({uuid, updatedData}) => ({
                url: `/admins/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{ type: 'Staffs', id: 'LIST' }],
        }),

        // **** Staff Enable & Disable *****
        enableStaff: builder.mutation<void, string>({
            query: (staffUuid) => ({
                url: `/users/${staffUuid}/enable`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'SingleStaff', id: 'LIST' },{ type: 'SingleIns', id: 'LIST' }],
        }),
        disableStaff: builder.mutation<void, string>({
            query: (staffUuid) => ({
                url: `/users/${staffUuid}/disable`,
                method: 'PUT',
            }),
            invalidatesTags: [{ type: 'SingleStaff', id: 'LIST' },{ type: 'SingleIns', id: 'LIST' }],
        }),

        // **** Staff Authority *****
        getStaffAuthoritiesByUuid: builder.query({
            query: (uuid) => `/users/authority/${uuid}`,
            providesTags: [{ type: 'SingleStaffAuthorities', id: 'LIST' }],
        }),
        updateStaffAuthorities: builder.mutation<any, { uuid: string, updatedData: any }>({
            query: ({uuid, updatedData}) => ({
                url: `/users/authority/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{ type: 'SingleStaffAuthorities', id: 'LIST' }]
        }),

    })
})

export const {
    useGetStaffQuery,
    useGetStaffByUuidQuery,
    useAddStaffMutation,
    useUpdateStaffMutation,
    useEnableStaffMutation,
    useDisableStaffMutation,
    useGetStaffAuthoritiesByUuidQuery,
    useUpdateStaffAuthoritiesMutation
} = staffApi;