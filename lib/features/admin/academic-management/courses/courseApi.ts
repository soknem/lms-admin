import { istadLmsApi } from "@/lib/api";

export const courseApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getCourses: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/courses?page=${page}&page_size=${pageSize}`,
        }),
        filterCourses: builder.mutation<any, { pageNumber: number, pageSize: number, body: any }>({
            query: ({ pageNumber, pageSize, body }) => ({
                url: `/courses/filter?pageNumber=${pageNumber}&pageSize=${pageSize}`,
                method: 'POST',
                body,
            }),
        }),
    })
});

export const {
    useGetCoursesQuery,
    useFilterCoursesMutation,
} = courseApi;
