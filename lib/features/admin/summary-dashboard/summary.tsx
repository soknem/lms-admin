import { istadLmsApi } from "@/lib/api";

export const summaryApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getSummaryByUuid: builder.query({
            query: () => `/summary-dashboards`,
        }),
    }),
});

export const {
    useGetSummaryByUuidQuery,
} = summaryApi;
