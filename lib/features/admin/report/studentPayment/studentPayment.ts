// studentApi.ts
import { istadLmsApi } from "@/lib/api";
import { StudentPaymentReportData } from "@/lib/types/admin/report";

export const studentPaymentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentPayment: builder.query<StudentPaymentReportData, void>({
            query: () => `/reports/student-payments`,
        }),
    }),
});

export const {
    useGetStudentPaymentQuery,
} = studentPaymentApi;
