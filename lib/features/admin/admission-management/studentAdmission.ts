import {istadLmsApi} from "@/lib/api";

export const studentAdmissionApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentAdmissions: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/student-admissions?pageNumber=${page}&pageSize=${pageSize}`,
        }),
    })
})
export const {
  useGetStudentAdmissionsQuery
} = studentAdmissionApi;