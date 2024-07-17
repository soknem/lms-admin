// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const studentSettingApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        patchStudentSettings: builder.mutation<any, any>({
            query: (settings) => ({
                url: `/students/setting`,
                method: 'PATCH',
                body: settings,
            }),
        }),

        getStudentSettings: builder.query<any, void>({
            query: () => `/students/setting`,
        }),

        getStudents: builder.query<any, { pageNumber: number, pageSize: number }>({
            query: ({ pageNumber, pageSize }) => `/students?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        }),
        uploadProfileImage: builder.mutation<any, any>({
            query: (image) => ({
                url: `/medias/upload-single`,
                method: 'POST',
                body: image,
            }),
        })
    }),
});

export const {
    usePatchStudentSettingsMutation,
    useGetStudentSettingsQuery,
    useUploadProfileImageMutation,
    useGetStudentsQuery,
} = studentSettingApi;
