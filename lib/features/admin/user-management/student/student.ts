import { istadLmsApi } from "@/lib/api";

export const studentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudent: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/students?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        getStudentByUuid: builder.query({
            query: (uuid) => `/students/detail/${uuid}`,
            providesTags: [{ type: 'SingleStudent', id: 'LIST' }],
        }),
        updateStudentByUuid: builder.mutation<any, { uuid: string, updatedData: any }>({
            query: ({uuid, updatedData}) => ({
                url: `/students/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{ type: 'SingleStudent', id: 'LIST' }]
        }),

    })
})

export const {
    useGetStudentQuery,
    useGetStudentByUuidQuery,
    useUpdateStudentByUuidMutation,
} = studentApi;