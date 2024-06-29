import {istadLmsApi} from "@/lib/api";

export const facultyApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getFaculties: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/faculties?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        createFaculty: builder.mutation({
            query: (newFaculty) => ({
                url: '/faculties',
                method: 'POST',
                body: newFaculty,
            }),
        }),
    })
})
export const {
    useGetFacultiesQuery,
    useCreateFacultyMutation
} = facultyApi;