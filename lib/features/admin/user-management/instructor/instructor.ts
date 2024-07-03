import { istadLmsApi } from "@/lib/api";

export const instructorApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getInstructor: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/instructors?pageNumber=${page}&pageSize=${pageSize}`,
        }),

    })
})

export const {
   useGetInstructorQuery
} = instructorApi;