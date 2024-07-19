// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const studentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudent: builder.query<any, { generation: string, studyProgram: string, academicYear: string }>({
            query: ({ generation, studyProgram, academicYear }) => ({
                url: `/reports/students`,
                params: {
                    'classes.generation.alias': generation,
                    'classes.studyProgram.alias': studyProgram,
                    'classes.academicYear.alias': academicYear,
                },
            }),
        }),
    }),
});

export const {
    useGetStudentQuery,

} = studentApi;
