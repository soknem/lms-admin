// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const currentLectureApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getCurrentLecture: builder.query<any,void>({
            query: () => `/instructors/courses/4104d479-bd45-4610-84dc-ab15de1bd0ef/lectures`,
        }),
    }),
});

export const {
    useGetCurrentLectureQuery,
} = currentLectureApi;
