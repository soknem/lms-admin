import { istadLmsApi } from "@/lib/api";

export const shiftApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getShift: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 10 }) =>
                `/shifts?pageNumber=${page}&pageSize=${pageSize}`,
        }),
      

    })
})

export const {
   

} = shiftApi;