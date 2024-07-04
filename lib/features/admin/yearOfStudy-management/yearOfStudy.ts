import {istadLmsApi} from "@/lib/api";


export const yearOfStudyApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        addSubjectsByAlias: builder.mutation({
            query: ({uuid, aliasOfSubjects}) => ({
                url: `year-of-studies/${uuid}/subjects`,
                method: 'POST',
                body: {aliasOfSubjects},
            }),
        }),
    })
})
export const {} = yearOfStudyApi;