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
            invalidatesTags: [{type:'StudentData' , id:"LIST"}]
        }),



        getStudentSettings: builder.query<any, void>({
            query: () => `/students/setting`,
            providesTags: [{type:'StudentData' , id:"LIST"}]
        }),


        uploadProfileImage: builder.mutation<any, any>({
            query: (image) => ({
                url: `/medias/upload-single`,
                method: 'POST',
                body: image,
            }),
            invalidatesTags: [{type:'FileProfile' , id:"LIST"}]
        })
    }),
});

export const {
    usePatchStudentSettingsMutation,
    useGetStudentSettingsQuery,
    useUploadProfileImageMutation
} = studentSettingApi;
