import { istadLmsApi } from "@/lib/api";

export const lectureApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getLecture: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/lectures?pageNumber=${page}&pageSize=${pageSize}`,
        }),

    })
})

export const {
    useGetLectureQuery
} = lectureApi;