import {istadLmsApi} from "@/lib/api";

export const fileApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getFilesByName: builder.query({
            query: (fileName) => ({
                url: `medias/${fileName}`,
                method: 'GET',
            }),
        }),
        createSingleFile: builder.mutation({
            query: (fileData) => ({
                url: `medias/upload-single`,
                method: 'POST',
                body: fileData,
            }),
        }),
    }),
})
export const {
    useGetFilesByNameQuery,
    useCreateSingleFileMutation,
} = fileApi;