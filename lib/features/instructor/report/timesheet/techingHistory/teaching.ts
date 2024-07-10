import { istadLmsApi } from "@/lib/api";

export const teachingApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getTeaching: builder.query<any,void>({
            query: () => `/reports/teaching-histories`,
        }),

    }),
});

export const {
    useGetTeachingQuery,
} =teachingApi;
