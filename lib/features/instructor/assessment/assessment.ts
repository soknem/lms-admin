// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const assessmentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getAssessment: builder.query<any,void>({
            query: () => `/instructors/assessments`,
        }),


    }),
});

export const {
    useGetAssessmentQuery,
} = assessmentApi;
