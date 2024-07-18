import {istadLmsApi} from "@/lib/api";

export const stuAdmissionApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStuAdmissions: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/student-admissions?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'StudentAdmissions', id: 'LIST'}],
        }),
        getAllStudentAdmissionByAdmissionUuid: builder.query({
            query: (uuid) => ({
                url: `/admissions/${uuid}/students`,
                method: 'GET',
            }),
        }),
        createStudentAdmission: builder.mutation({
            query: (newStudentAdmission) => ({
                url: '/student-admissions',
                method: 'POST',
                body: newStudentAdmission,
            }),
            invalidatesTags: [{type: 'StudentAdmissions', id: 'LIST'}],
        }),
        updateStuAdmsByUuid: builder.mutation({
            query: ({uuid, updatedData}) => ({
                url: `/student-admissions/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{type: 'StudentAdmissions', id: 'LIST'}],
        }),
        getStuAdmsByUuid: builder.query({
            query: (uuid) => ({
                url: `/student-admissions/${uuid}`,
                method: 'GET',
            }),
        }),
    })
})
export const {
    useGetStuAdmissionsQuery,
    useGetAllStudentAdmissionByAdmissionUuidQuery,
    useCreateStudentAdmissionMutation,
    useUpdateStuAdmsByUuidMutation,
    useGetStuAdmsByUuidQuery,
} = stuAdmissionApi;