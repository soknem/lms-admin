import {istadLmsApi} from "@/lib/api";

export const setupStudyProgramApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getYearStuPros: builder.query({
            query: (alias) =>
                `study-programs/${alias}/year-of-studies`,
        }),
        getYearOfStudyUUID: builder.mutation({
            query: (newStuProgram) => ({
                url: '/semester',
                method: 'POST',
                // StuProAlias, Year(static), Semester,
                body: newStuProgram,
            }),
        }),
        addSubjectToYearOfStudy: builder.mutation({
            query: (newStuProgram) => ({
                url: '/year-of-studies/uuid/subjects',
                method: 'POST',
                // StuProAlias, Year(static), Semester,
                body: newStuProgram,
            }),
        }),
    })
})
export const {
    useGetYearStuProsQuery,
    useGetYearOfStudyUUIDMutation,
    useAddSubjectToYearOfStudyMutation
} = setupStudyProgramApi;