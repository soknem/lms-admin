import { istadLmsApi } from "@/lib/api";

export const attendanceApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAttendance: builder.query<any,void>({
            query: () => `/reports/attendances`,
        }),

    }),
});

export const {
    useGetAttendanceQuery,
} = attendanceApi;
