import {istadLmsApi} from "@/lib/api";

export const academicYearApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAcademicYears: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/academic-years?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'AcademicYears', id: 'LIST'}],
        }),
        createAcademicYear: builder.mutation({
            query: (newAcademicYear) => ({
                url: '/academic-years',
                method: 'POST',
                body: newAcademicYear,
            }),
            invalidatesTags: [{type: 'AcademicYears', id: 'LIST'}],
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
            invalidatesTags: [{type: 'AcademicYears', id: 'LIST'}],
        }),
        enableAcademicYearByAlias: builder.mutation<void, string>({
            query: (alias) => ({
                url: `/academic-years/${alias}/enable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'AcademicYears', id: 'LIST'}],
        }),

        disableAcademicYearByAlias: builder.mutation<void, string>({
            query: (alias) => ({
                url: `/academic-years/${alias}/disable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'AcademicYears', id: 'LIST'}],
        }),
    }),

})
export const {
    useGetAcademicYearsQuery,
    useCreateAcademicYearMutation,
    useGetAcademicYearByAliasQuery,
    useEditAcademicYearByAliasMutation,
    useEnableAcademicYearByAliasMutation,
    useDisableAcademicYearByAliasMutation,
} = academicYearApi;