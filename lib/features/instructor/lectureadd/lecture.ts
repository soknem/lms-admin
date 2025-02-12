import { istadLmsApi } from "@/lib/api";

export const lectureApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getLecture: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/lectures?pageNumber=${page}&pageSize=${pageSize}`,
        }),
        addLecture: builder.mutation({
            query: (newLecture) => ({
                url: '/lectures',
                method: 'POST',
                body: newLecture,
            }),
        }),
        enableLecture: builder.mutation<void, string>({
            query: (lectureUuid) => ({
                url: `/lectures/${lectureUuid}/enable`,
                method: 'PUT',
            }),
        }),
        disableLecture: builder.mutation<void, string>({
            query: (lectureUuid) => ({
                url: `/lectures/${lectureUuid}/disable`,
                method: 'PUT',
            }),
        }),
        updateLecture: builder.mutation<any, { uuid: string, updatedData: any }>({
            query: ({ uuid, updatedData }) => ({
                url: `/lectures/${uuid}`,
                method: 'PATCH',
                body: updatedData,
            }),
        }),

    })
})

export const {
    useGetLectureQuery,
    useAddLectureMutation,
    useEnableLectureMutation,
    useDisableLectureMutation,
    useUpdateLectureMutation

} = lectureApi;