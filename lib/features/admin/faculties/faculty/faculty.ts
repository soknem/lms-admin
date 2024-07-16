import {istadLmsApi} from "@/lib/api";

export const facultyApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getFaculties: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/faculties?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'Faculties', id: 'LIST'}],
        }),
        createFaculty: builder.mutation({
            query: (newFaculty) => ({
                url: '/faculties',
                method: 'POST',
                body: newFaculty,
            }),
            invalidatesTags: [{type: 'Faculties', id: 'LIST'}],
        }),
        editFacultyByAlias: builder.mutation({
            query: ({alias, updatedData}) => ({
                url: `/faculties/${alias}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{type: 'Faculties', id: 'LIST'}],
        }),
        getFacultyByAlias: builder.query({
            query: (alias) => ({
                url: `/faculties/${alias}`,
                method: 'GET',
            }),
        }),
        enableFacultyByAlias: builder.mutation<void, string>({
            query: (alias) => ({
                url: `/faculties/${alias}/enable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Faculties', id: 'LIST'}],
        }),

        disableFacultyByAlias: builder.mutation<void, string>({
            query: (alias) => ({
                url: `/faculties/${alias}/disable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Faculties', id: 'LIST'}],
        }),
    })
})
export const {
    useGetFacultiesQuery,
    useCreateFacultyMutation,
    useEditFacultyByAliasMutation,
    useGetFacultyByAliasQuery,
    useEnableFacultyByAliasMutation,
    useDisableFacultyByAliasMutation,
} = facultyApi;