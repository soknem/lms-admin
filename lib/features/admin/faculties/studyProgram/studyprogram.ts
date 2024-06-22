import {istadLmsApi} from "@/lib/api";

export const studyProgramApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudyPrograms: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/study-programs?page=${page}&page_size=${pageSize}`,
        }),
    })
})
export const {
    useGetStudyProgramsQuery,
} = studyProgramApi;