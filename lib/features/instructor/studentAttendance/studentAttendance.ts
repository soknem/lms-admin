// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const studentAttendanceApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentAttendance: builder.query<any,void>({
            query: () => `/instructors/lectures/80de7e78-97d9-4638-9471-b631c29a9bd5/attendances`,
        }),
    }),
});

export const {
    useGetStudentAttendanceQuery,
} = studentAttendanceApi;
