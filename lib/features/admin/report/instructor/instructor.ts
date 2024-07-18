// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const instructorApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getInstructor: builder.query<any,void>({
            query: () => `/reports/instructors`,
        }),

    }),
});

export const {
    useGetInstructorQuery,

} = instructorApi;
