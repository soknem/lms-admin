import { istadLmsApi } from "@/lib/api";

export const attendanceApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAttendance: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/attendances?pageNumber=${page}&pageSize=${pageSize}`,
        }),

    })
})

export const {
    useGetAttendanceQuery
} = attendanceApi;