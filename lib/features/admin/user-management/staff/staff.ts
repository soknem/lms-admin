import { istadLmsApi } from "@/lib/api";

export const staffApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaff: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/users/not-students?pageNumber=${page}&pageSize=${pageSize}`,
        }),

    })
})

export const {
    useGetStaffQuery
} = staffApi;