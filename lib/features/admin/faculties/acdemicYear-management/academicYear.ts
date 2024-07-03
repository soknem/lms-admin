import {istadLmsApi} from "@/lib/api";

export const academicYearApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAcademicYears: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/academic-years?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        createAcademicYear: builder.mutation({
            query: (newAcademicYear) => ({
                url: '/academic-years',
                method: 'POST',
                body: newAcademicYear,
            }),
        }),
        getAcademicYearByAlias: builder.query({
            query: (alias) => ({
                url: `/academic-years/${alias}`,
                method: 'GET',
            }),
        }),
        editAcademicYearByAlias: builder.mutation({
            query: ({alias, updatedData}) => ({
                url: `/academic-years/${alias}`,
                method: 'PATCH',
                body: updatedData,
            }),
        }),
    }),

})
export const {
    useGetAcademicYearsQuery,
    useCreateAcademicYearMutation,
    useGetAcademicYearByAliasQuery,
    useEditAcademicYearByAliasMutation
} = academicYearApi;