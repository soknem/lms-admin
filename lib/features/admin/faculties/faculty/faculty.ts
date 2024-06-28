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
        editFacultyByAlias: builder.mutation({
            query: ({alias, updatedData}) => ({
                url: `/faculties/${alias}`,
                method: 'PATCH',
                body: updatedData,
            }),
        }),
        getFacultyByAlias: builder.query({
            query: (alias) => ({
                url: `/faculties/${alias}`,
                method: 'GET',
            }),
        }),
    })
})
export const {
    useGetFacultiesQuery,
    useCreateFacultyMutation,
    useEditFacultyByAliasMutation,
    useGetFacultyByAliasQuery
} = facultyApi;