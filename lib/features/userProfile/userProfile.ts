import { istadLmsApi } from "@/lib/api";

export const classApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getProfile: builder.query<any,{}>({
            query: () => `/users/view-profile`,
            providesTags: [{type:'PfImage' , id:"LIST"}]
        }),
    })
});

export const {
    useGetProfileQuery
} = classApi;
