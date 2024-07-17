import {istadLmsApi} from "@/lib/api";

export const stuAdmissionApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStuAdmissions: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/student-admissions?pageNumber=${page}&pageSize=${pageSize}`,
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
        }),
    })
})
export const {
    useGetStuAdmissionsQuery,
    useGetAllStudentAdmissionByAdmissionUuidQuery,
    useCreateStudentAdmissionMutation
} = stuAdmissionApi;