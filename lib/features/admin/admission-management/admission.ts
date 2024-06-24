import {istadLmsApi} from "@/lib/api";

export const admissionApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAdmissions: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/admissions?pageNumber=${page}&pageSize=${pageSize}`,
        }),
    })
})
export const {
    useGetAdmissionsQuery,
} = admissionApi;