import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import {istadLmsApi} from "@/lib/api";
import generationSlice from "@/lib/features/admin/academic-management/generation/generationSlice";
import facultySlice from "@/lib/features/admin/faculties/faculty/facultySlice";
import degreeSlice from "@/lib/features/admin/faculties/degree/degreeSlice";
import studyProgramSlice from "@/lib/features/admin/faculties/studyProgram/studyProgramSlice";
import subjectSlice from "@/lib/features/admin/faculties/subject/subjectSlice";
import assessmentSlice from "@/lib/features/admin/academic-management/assesment/assessmentSlice";
import studentSlice from "@/lib/features/admin/user-management/student/studentSlice";
import lectureSlice from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import admissionSlice from "@/lib/features/admin/admission-management/admissionSlice";
import paymentSlice from "@/lib/features/admin/payment-management/paymentSlice";


export const makeStore = () => {
    return configureStore({
        reducer: {
            [istadLmsApi.reducerPath]: istadLmsApi.reducer,
            auth: authSlice,
            generation: generationSlice,
            assessment: assessmentSlice,
            student: studentSlice,
            lecture: lectureSlice,
            faculty: facultySlice,
            degree: degreeSlice,
            studyProgram: studyProgramSlice,
            subject: subjectSlice,
            admission: admissionSlice,
            payment: paymentSlice,
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(istadLmsApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
