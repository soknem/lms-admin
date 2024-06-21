import { istadLmsApi } from "@/lib/api";

export const studentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({

        // get all products
        getProducts: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 1, pageSize = 10 }) =>
                `api/products/?page=${page}&page_size=${pageSize}`,
        }),

        // get single product
        getProductById: builder.query<any, number>({
            query: (id) => `api/products/${id}/`,
        }),

        // update a product
        updateProduct: builder.mutation<any, { id: number; updatedProduct: object }>({
            query: ({ id, updatedProduct }) => ({
                url: `/api/products/${id}/`,
                method: "PATCH",
                body: updatedProduct,
            }),
        }),

        // get student achievement
        getStudentAchievement: builder.query<any, void>({
            query: () => `students/achievement`,
        }),
    })
})

export const {
    useGetProductsQuery,
    useGetProductByIdQuery,
    useUpdateProductMutation,
    useGetStudentAchievementQuery,
} = studentApi;
