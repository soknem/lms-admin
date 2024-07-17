import {istadLmsApi} from "@/lib/api";

export const paymentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/payments?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        createPayment: builder.mutation({
            query: (newPayment) => ({
                url: '/payments',
                method: 'POST',
                body: newPayment,
            }),
        }),
    })
})
export const {
    useGetPaymentsQuery,
    useCreatePaymentMutation,
} = paymentApi;