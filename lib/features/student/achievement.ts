import { istadLmsApi } from "@/lib/api";

export const achievementApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getFaculties: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/faculties?page=${page}&page_size=${pageSize}`,
        }),
    })
})

export const {
    achievementQuery
} = achievementApi;