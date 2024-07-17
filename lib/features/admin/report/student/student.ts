// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const studentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudent: builder.query<any,void>({
            query: () => `/reports/students`,
        }),

    }),
});

export const {
    useGetStudentQuery,

} = studentApi;
