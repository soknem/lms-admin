import {configureStore} from '@reduxjs/toolkit'
import authSlice from './features/auth/authSlice'
import {istadLmsApi} from "@/lib/api";
import generationSlice from "@/lib/features/admin/academic-management/generation/generationSlice";
import degreeSlice from "@/lib/features/admin/faculties/degree/degreeSlice";
import filterSlice from "@/lib/features/filters/filterSlice";
import facultySlice from "@/lib/features/admin/faculties/faculty/facultySlice";
import studyProgramSlice from "@/lib/features/admin/faculties/studyProgram/studyProgramSlice";
import subjectSlice from "@/lib/features/admin/faculties/subject/subjectSlice";
import studentSlice from "@/lib/features/admin/user-management/student/studentSlice";
import courseSlice from "@/lib/features/admin/academic-management/courses/courseSlice";
import admissionSlice from "@/lib/features/admin/admission-management/admissionSlice";
import paymentSlice from "@/lib/features/admin/payment-management/paymentSlice";
import materialsSlice from "@/lib/features/admin/materials/materialsSlice";
import lectureSlice from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import classSlice from '@/lib/features/admin/academic-management/classes/classSlice';
import staffSlice from "@/lib/features/admin/user-management/staff/staffSlice";
import fileSlice from "@/lib/features/uploadfile/fileSlice";
import detailClassesSlice from "@/lib/features/admin/academic-management/detail-classes/detailClassesSlice";
import yearStuProSlice from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuProSlice";
import academicYearSlice from "@/lib/features/admin/faculties/acdemicYear-management/academicYearSlice";
import stuAdmissionSlice
    from "@/lib/features/admin/admission-management/students-admission-management/stuAdmissionSlice";
import shiftSlice from "@/lib/features/admin/faculties/shift/shiftSlice";
import assessmentEachSemesterSlice
    from "@/lib/features/admin/academic-management/assesment/assessmentEachSemesterSlice";
import singleClassSlice from "@/lib/features/admin/academic-management/detail-classes/singleClassSlice";
import scheduleSlice from "@/lib/features/instructor/schedule/scheduleSlice";
import attendanceSlice from "@/lib/features/instructor/report/attendance/attendanceSlice";
import intmeterialsSlice from "@/lib/features/instructor/meterials/intmeterialsSlice";
import intassessmentSlice from "@/lib/features/instructor/assessment/assessmentSlice";
import currentLectureSlice from "@/lib/features/instructor/lecture/currentLectureSlice";
import endedLectureSlice from "@/lib/features/instructor/endLecture/endedLectureSlice";
import teachingSlice from "@/lib/features/instructor/report/timesheet/techingHistory/teachingSlice";
import studentAttendanceSlice from "@/lib/features/instructor/studentAttendance/studentAttendanceSlice";
import {studentCourseApi} from "@/lib/features/student/course/studentCourse";
import {instructorCourseApi} from "@/lib/features/instructor/course/instructorCourse";
import sectionSlice from "@/lib/features/admin/materials/subjectMaterialSection/sectionSlice";
import {studentAchievementApi} from "@/lib/features/student/achievement/achievement";
import userProfileSlice from "@/lib/features/userProfile/userProfileSlice";
import {studentSettingApi} from "@/lib/features/student/setting/StudentSetting";
import {paymentApi} from "@/lib/features/instructor/report/timesheet/payment/payment";
import bannerSlice from "@/lib/features/admin/faculties/banner/bannerSlice";
import getCourseTitleSlice from "@/lib/features/instructor/course/getCourseTitleSlice";


export const makeStore = () => {
    return configureStore({
        reducer: {
            [istadLmsApi.reducerPath]: istadLmsApi.reducer,
            studentCourseApi: studentCourseApi.reducer,
            instructorCourseApi: instructorCourseApi.reducer,
            studentAchievementApi: studentAchievementApi.reducer,
            studentSettingApi: studentSettingApi.reducer,
            paymentApi: paymentApi.reducer,
            auth: authSlice,
            generation: generationSlice,
            filter: filterSlice,
            eachSemesterAssessment: assessmentEachSemesterSlice,
            lecture: lectureSlice,
            degree: degreeSlice,
            faculty: facultySlice,
            banner: bannerSlice,
            student: studentSlice,
            studyProgram: studyProgramSlice,
            setupStudyProgram: yearStuProSlice,
            subject: subjectSlice,
            academicYear: academicYearSlice,
            admission: admissionSlice,
            studentAdmission: stuAdmissionSlice,
            shift: shiftSlice,
            payment: paymentSlice,
            course: courseSlice,
            material: materialsSlice,
            section: sectionSlice,
            class: classSlice,
            staff: staffSlice,
            file: fileSlice,
            detailClasses: detailClassesSlice,
            singleClass: singleClassSlice,
            schedule: scheduleSlice,
            attendance: attendanceSlice,
            intmaterial: intmeterialsSlice,
            intructorAssessment: intassessmentSlice,
            current: currentLectureSlice,
            ended: endedLectureSlice,
            teaching: teachingSlice,
            studentAttendance: studentAttendanceSlice,
            userProfile: userProfileSlice,
            singleCourse: getCourseTitleSlice
        },
        middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(istadLmsApi.middleware),
    })
}

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>
export type AppDispatch = AppStore['dispatch']
