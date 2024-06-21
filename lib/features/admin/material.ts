import {istadLmsApi} from "@/lib/api";

export const materialApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getSlides: builder.query<Body, { page: number; pageSize: number }>({
                query: ({page = 0, pageSize = 10}) =>
                    `/materials/filter?page=${page}&page_size=${pageSize}`,
            },
        ),
    })
})
export const {
    useGetSlidesQuery,
} = materialApi;