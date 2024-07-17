// studentApi.ts
import {istadLmsApi} from "@/lib/api";

export const instructorCourseApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getInstructorCourse: builder.query<any, void>({
            query: () => `/instructors/courses`,
            providesTags: [{type: 'InstructorSetting', id: 'LIST'}],
        }),


        getInstructorCourseByUuid: builder.query<any, { uuid: string }>({
            query: ({uuid}) => `/instructors/course/${uuid}`,
        }),


        getSubjectCourse: builder.query<any, { pageNumber: string, pageSize: string }>({
            query: ({pageNumber, pageSize}) => `/subjects?pageNumber=${pageNumber}&pageSize=${pageSize}`,
        }),


        getInstructorByUuid: builder.query<any, { uuid: string }>(
            {
                query: ({uuid}) => `/instructors/${uuid}`,
                providesTags: [{type: 'InstructorSetting', id: 'LIST'}],
            }),


        updateSettingInstructor: builder.mutation<any, any>({
            query: (settingInstructor) => (
                {
                    url: `/instructors/setting`,
                    method: 'PATCH',
                    body: settingInstructor,
                }

            ),
            invalidatesTags: [{type: 'InstructorSetting', id: 'LIST'},{type: 'PfImage', id: 'LIST'}],
        }),


        getDataSettingInstructor: builder.query<any, void>({
            query: () => `/instructors/setting`,
            providesTags: [{type: 'InstructorSetting', id: 'LIST'}],
        }),

    }),
});

export const {
    useGetInstructorCourseQuery,
    useGetInstructorCourseByUuidQuery,
    useGetSubjectCourseQuery,
    useGetInstructorByUuidQuery,
    useUpdateSettingInstructorMutation,
    useGetDataSettingInstructorQuery
} = instructorCourseApi;
