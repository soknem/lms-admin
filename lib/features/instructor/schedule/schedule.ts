// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const scheduleApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getSchedule: builder.query<any, { page: number; pageSize: number }>({
            query: ({ page = 0, pageSize = 25 }) =>
                `/instructors/schedule?pageNumber=${page}&pageSize=${pageSize}`,
        }),
    }),
});

export const {
    useGetScheduleQuery,
} = scheduleApi;
