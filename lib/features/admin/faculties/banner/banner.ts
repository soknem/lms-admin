import {istadLmsApi} from "@/lib/api";

export const bannerApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getBanners: builder.query<any, { page: number; pageSize: number }>({
            query: ({page = 0, pageSize = 10}) =>
                `/banners?pageNumber=${page}&pageSize=${pageSize}`,
            providesTags: [{type: 'Banners', id: 'LIST'}],
        }),
        createBanner: builder.mutation({
            query: (newBanner) => ({
                url: '/banners',
                method: 'POST',
                body: newBanner,
            }),
            invalidatesTags: [{type: 'Banners', id: 'LIST'}],
        }),
        getBannerByAlias: builder.query({
            query: (alias) => ({
                url: `/banners/${alias}`,
                method: 'GET',
            }),
        }),
        editBannerByAlias: builder.mutation({
            query: ({alias, updatedData}) => ({
                url: `/banners/${alias}`,
                method: 'PATCH',
                body: updatedData,
            }),
            invalidatesTags: [{type: 'Banners', id: 'LIST'}],
        }),
        enableBannerByAlias: builder.mutation<void, string>({
            query: (alias) => ({
                url: `/banners/${alias}/enable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Banners', id: 'LIST'}],
        }),

        disableBannerByAlias: builder.mutation<void, string>({
            query: (alias) => ({
                url: `/banners/${alias}/disable`,
                method: 'PUT',
            }),
            invalidatesTags: [{type: 'Banners', id: 'LIST'}],
        }),
    })
})
export const {
    useGetBannersQuery,
    useCreateBannerMutation,
    useGetBannerByAliasQuery,
    useEditBannerByAliasMutation,
    useEnableBannerByAliasMutation,
    useDisableBannerByAliasMutation,
} = bannerApi;