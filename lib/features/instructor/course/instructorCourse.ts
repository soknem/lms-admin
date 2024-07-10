// studentApi.ts
import { istadLmsApi } from "@/lib/api";

export const instructorCourseApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getInstructorCourse: builder.query<any,void>({
            query: () => `/instructors/courses`,
        }),
        getInstructorCourseByUuid: builder.query<any,{uuid : string}>({
            query: ({uuid}) => `/instructors/course/${uuid}`,
        }),
        getSubjectCourse: builder.query<any,{pageNumber : string , pageSize : string }>({
                query: ({pageNumber,pageSize}) => `/subjects?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        }),
        getInstructorByUuid: builder.query<any,{uuid : string}>({
            query: ({uuid}) => `/instructors/${uuid}`,
        }),
    }),
});

export const {
    useGetInstructorCourseQuery,
    useGetInstructorCourseByUuidQuery,
    useGetSubjectCourseQuery,
    useGetInstructorByUuidQuery,
} = instructorCourseApi;
