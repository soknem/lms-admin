// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const studentSettingApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentSettings: builder.mutation<any, any>({
            query: (settings) => ({
                url: `/students/setting`,
                method: 'PATCH',
                body: settings,
            }),
        }),
        getStudents: builder.query<any, { pageNumber: number, pageSize: number }>({
            query: ({ pageNumber, pageSize }) => `/students?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        }),
    }),
});

export const {
    useGetStudentSettingsMutation,
    useGetStudentsQuery,
} = studentSettingApi;
