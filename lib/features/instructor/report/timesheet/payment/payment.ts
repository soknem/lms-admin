import { istadLmsApi } from "@/lib/api";

export const paymentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getPayment: builder.query<any,void>({
            query: () => `/reports/instructor-payments`,
        }),

    }),
});

export const {
    useGetPaymentQuery,
} =paymentApi;
