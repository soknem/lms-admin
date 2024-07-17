import {istadLmsApi} from "@/lib/api";

export const setupStudyProgramApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getYearStuPros: builder.query({
            query: (alias) =>
                `study-programs/${alias}/year-of-studies`,
        }),
        getYearOfStudyUUID: builder.mutation({
            query: ({studyProgramAlias, year}) => ({
                url: `year-of-studies/study-programs/years`,
                method: 'POST',
                body: {studyProgramAlias, year},
            }),
        }),

        addSubjectToYearOfStudy: builder.mutation({
            query: ({uuid, addSubToStuProgram}) => ({
                url: `/year-of-studies/${uuid}/subjects`,
                method: 'POST',
                body: addSubToStuProgram,
            }),
        }),
    })
})
export const {
    useGetYearStuProsQuery,
    useGetYearOfStudyUUIDMutation,
    useAddSubjectToYearOfStudyMutation
} = setupStudyProgramApi;