import {istadLmsApi} from "@/lib/api";

export const admissionApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdmissions: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/admissions?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'Admissions', id: 'LIST'}],
        }),
        createAdmission: builder.mutation({
            query: (newAdmission) => ({
                url: '/admissions',
                method: 'POST',
                body: newAdmission,
            }),
            invalidatesTags: [{type: 'Admissions', id: 'LIST'}],
        }),

        getAdmissionByAlias: builder.query({
            query: (uuid) => ({
                url: `/admissions/${uuid}`,
                method: 'GET',
            }),
        }),
        editAdmissionByAlias: builder.mutation({
            query: ({uuid, updatedData}) => ({
                url: `/admissions/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{type: 'Admissions', id: 'LIST'}],
        }),
        updateStatusByUuid: builder.mutation({
            query: ({uuid, status}) => ({
                url: `/admissions/${uuid}/status`,
                method: 'PUT',
                body: status,
            }),
            invalidatesTags: [{type: 'Admissions', id: 'LIST'}],
        }),
        enableAdmissionByAlias: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `/admissions/${uuid}/enable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Admissions', id: 'LIST'}],
        }),
        disableAdmissionByAlias: builder.mutation<void, string>({
            query: (uuid) => ({
                url: `/admissions/${uuid}/disable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Admissions', id: 'LIST'}],
        }),
    })
})
export const {
    useGetAdmissionsQuery,
    useCreateAdmissionMutation,
    useGetAdmissionByAliasQuery,
    useEditAdmissionByAliasMutation,
    useEnableAdmissionByAliasMutation,
    useDisableAdmissionByAliasMutation,
    useUpdateStatusByUuidMutation,
} = admissionApi;