import { istadLmsApi } from "@/lib/api";

export const resetPasswordApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        updatePassword: builder.mutation<any, { newPassword: string; confirmPassword: string; }>({
            query: ({ newPassword, confirmPassword }) => ({
                url: `/auth/passwords`,
                method: "PUT",
                body: { newPassword, confirmPassword },
            }),
        }),
    })
})

export const {
    useUpdatePasswordMutation
} = resetPasswordApi;