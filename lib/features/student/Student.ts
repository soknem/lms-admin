import { istadLmsApi } from "@/lib/api";

export const studentApi = istadLmsApi.injectEndpoints({
    endpoints: (builder) => ({
        getStudentCourses: builder.query<any, void>({
            query: () => ({
                url: `/students/courses`,
                method: 'GET',
            }),
        }),
        getStudentAchievement:builder.query<any,void>(
            {
                query:()=>({
                    url:`/students/achievement`,
                    method:'GET',
                })
            }
        ),
        updateStudentSetting: builder.mutation<any, any>({
            query: (studentSetting) => ({
                url: `/students/setting`,
                method: 'POST',
                body: studentSetting,
            }),
        }),
    }),
});


export const {
    useGetStudentCoursesQuery,
    useUpdateStudentSettingMutation,
    useGetStudentAchievementQuery,
} = studentApi;
