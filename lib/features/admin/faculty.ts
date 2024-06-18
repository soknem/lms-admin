import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const token = process.env.NEXT_PUBLIC_API_TOKEN;

export const facultyApi = createApi({
    reducerPath: "facultyApi", // The name of the slice of state that will be managed by this api
    baseQuery: fetchBaseQuery({
        baseUrl: process.env.NEXT_PUBLIC_ISTAD_LMS_API_URL,
        prepareHeaders: (headers) => {
            // Optionally set additional headers here
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    endpoints: (builder) => ({
        getFaculties: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/faculties?page=${page}&page_size=${pageSize}`,
        }),
    })
})

// Export hooks for usage in components, which are
export const {
    useGetFacultiesQuery,
} = facultyApi;