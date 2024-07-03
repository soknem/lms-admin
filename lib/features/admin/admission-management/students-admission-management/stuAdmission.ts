import {istadLmsApi} from "@/lib/api";

export const stuAdmissionApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStuAdmissions: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/student-admissions?pageNumber=${page}&pageSize=${pageSize}`,
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
    useCreateStudentAdmissionMutation
} = stuAdmissionApi;