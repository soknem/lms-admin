// Or from '@reduxjs/toolkit/query' if not using the auto-generated hooks
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {RootState} from "./store";
import {setAccessToken} from "./features/auth/authSlice";
// initialize an empty api service that we'll inject endpoints into later as needed

// Setting up prepareHeaders to include the token in the headers
const baseQuery = fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_ISTAD_LMS_API_URL,
    prepareHeaders: (headers, {getState}) => {
        const token = (getState() as RootState).auth.token;
        // if we have a token, let's set the authorization header
        if (token) {
            headers.set("authorization", `Bearer ${token}`);
        }
        return headers;
    },
});

// args: for the request details // api: for Redux api object // extraOptions: for additional
const baseQueryWithReAuth = async (args: any, api: any, extraOptions: any) => {
    // check result of each query. if it's a 401, we'll try to re-authenticate
    let result = await baseQuery(args, api, extraOptions);
    if (result.error?.status === 401) {
        const res = await fetch(`${process.env.NEXT_PUBLIC_LMS_URL}/api/refresh/`, {
            method: "POST",
            credentials: "include",
        });
        if (res.ok) {
            const data = await res.json();
            api.dispatch(setAccessToken(data.accessToken));
            // re-run the query with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            const res = await fetch(`${process.env.NEXT_PUBLIC_LMS_URL}/api/logout`, {
                method: "POST",
                credentials: "include",
            });
            const data = await res.json();
            console.log(data);
        }
    }
    return result;
};
export const istadLmsApi = createApi({
    reducerPath: "istadLmsApi",
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({}),
    tagTypes: [
        'Generations',
        'Classes',
        'Faculties',
        'Degrees',
        'StudyPrograms',
        'StudentData',
        'Subjects',
        'AcademicYears',
        'Banners',
        'StudentFromClass',
        'Courses',
        'CoursesByUuid',
        'StudentFromClass',
        'SingleClass',
        'Instructors',
        'InstructorSetting',
        'Staffs',
        'Admissions',
        'FileProfile',
        'PfImage',
        'Materials',
        'Sections',
        'Payments',
        'SingleStaff',
        'SingleIns',
        'SingleStaffAuthorities',
        'AllEachCourse',
        'SingleStudent',
        'StudentAdmissions',
        'studentApi',
    ]

});