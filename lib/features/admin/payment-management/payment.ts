import {istadLmsApi} from "@/lib/api";

export const paymentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getPayments: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/payments?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'Payments', id: 'LIST'}],
        }),
        createPayment: builder.mutation({
            query: (newPayment) => ({
                url: '/payments',
                method: 'POST',
                body: newPayment,
            }),
            invalidatesTags: [{type: 'Payments', id: 'LIST'}],
        }),
        getPaymentByUuid: builder.query({
            query: (uuid) => ({
                url: `/payments/${uuid}`,
                method: 'GET',
            }),

        }),
        editPaymentByUuid: builder.mutation({
            query: ({uuid, updatedData}) => ({
                url: `/payments/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{type: 'Payments', id: 'LIST'}],
        }),
    })
})
export const {
    useGetPaymentsQuery,
    useCreatePaymentMutation,
    useGetPaymentByUuidQuery,
    useEditPaymentByUuidMutation
} = paymentApi;