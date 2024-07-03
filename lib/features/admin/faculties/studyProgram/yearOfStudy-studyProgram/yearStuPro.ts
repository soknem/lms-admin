import {istadLmsApi} from "@/lib/api";

export const setupStudyProgramApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getYearStuPros: builder.query({
            query: (alias) =>
                `study-programs/${alias}/year-of-studies`,
        }),
    })
})
export const {
    useGetYearStuProsQuery
} = setupStudyProgramApi;