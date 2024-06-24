import {istadLmsApi} from "@/lib/api";

export const facultyApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getFaculties: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/faculties?pageNumber=${page}&pageSize=${pageSize}`,
        }),
    })
})
export const {
    useGetFacultiesQuery,
} = facultyApi;