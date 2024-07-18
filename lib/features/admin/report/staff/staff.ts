// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const staffApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStaff: builder.query<any,void>({
            query: () => `/reports/staffs`,
        }),

    }),
});

export const {
    useGetStaffQuery,

} = staffApi;
