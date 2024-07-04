import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import {istadLmsApi} from "@/lib/api";
import generationSlice from "@/lib/features/admin/academic-management/generation/generationSlice";
import degreeSlice from "@/lib/features/admin/faculties/degree/degreeSlice";
import filterSlice from "@/lib/features/filters/filterSlice";
import facultySlice from "@/lib/features/admin/faculties/faculty/facultySlice";
import studentCourseSlice from "@/lib/features/student/course/studentCourseSlice";
import achievementSlice from "@/lib/features/student/achievement/achievementSlice";
import studyProgramSlice from "@/lib/features/admin/faculties/studyProgram/studyProgramSlice";
import subjectSlice from "@/lib/features/admin/faculties/subject/subjectSlice";
import assessmentSlice from "@/lib/features/admin/academic-management/assesment/assessmentEachSemesterSlice";
import studentSlice from "@/lib/features/admin/user-management/student/studentSlice";
import courseSlice from "@/lib/features/admin/academic-management/courses/courseSlice";
import admissionSlice from "@/lib/features/admin/admission-management/admissionSlice";
import paymentSlice from "@/lib/features/admin/payment-management/paymentSlice";
import materialsSlice from "@/lib/features/admin/materials/materialsSlice";
import lectureSlice from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import classSlice from '@/lib/features/admin/academic-management/classes/classSlice';
import staffSlice from "@/lib/features/admin/user-management/staff/staffSlice";
import fileSlice from "@/lib/features/uploadfile/fileSlice";
import instructorcourseSlice from "@/lib/features/instructor/course/instructorcourseSlice";
import detailClassesSlice from "@/lib/features/admin/academic-management/detail-classes/detailClassesSlice";
import yearStuProSlice from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuProSlice";
import academicYearSlice from "@/lib/features/admin/faculties/acdemicYear-management/academicYearSlice";
import stuAdmissionSlice
    from "@/lib/features/admin/admission-management/students-admission-management/stuAdmissionSlice";
import shiftSlice from "@/lib/features/admin/faculties/shift/shiftSlice";
import assessmentEachSemesterSlice
    from "@/lib/features/admin/academic-management/assesment/assessmentEachSemesterSlice";


export const makeStore = () => {
    return configureStore({
        reducer: {
            [istadLmsApi.reducerPath]: istadLmsApi.reducer,
            auth: authSlice,
            generation: generationSlice,
            filter: filterSlice,
            eachSemesterAssessment: assessmentEachSemesterSlice,
            lecture: lectureSlice,
            degree: degreeSlice,
            faculty: facultySlice,
            studentCourse: studentCourseSlice,
            achievement: achievementSlice,
            studyProgram: studyProgramSlice,
            setupStudyProgram: yearStuProSlice,
            subject: subjectSlice,
            academicYear: academicYearSlice,
            admission: admissionSlice,
            studentAdmission: stuAdmissionSlice,
            shift: shiftSlice,
            payment: paymentSlice,
            student: studentSlice,
            course: courseSlice,
            material: materialsSlice,
            class: classSlice,
            staff: staffSlice,
            file: fileSlice,
            instructorCourse: instructorcourseSlice,
            detailClasses: detailClassesSlice,

        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(istadLmsApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
