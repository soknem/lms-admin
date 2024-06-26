import {istadLmsApi} from "@/lib/api";

export const admissionApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdmissions: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/admissions?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        createAdmission: builder.mutation({
            query: (newAdmission) => ({
                url: '/admissions',
                method: 'POST',
                body: newAdmission,
            }),
        }),
    })
})
export const {
    useGetAdmissionsQuery,
    useCreateAdmissionMutation,
} = admissionApi;