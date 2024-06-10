import { AdmissionType, StudentAdmissionType } from "../types/admin/admission";
import {
  DegreeType,
  FacultyType,
  SetupStudyProgramType,
  StudyProgramType,
  SubjectType,
} from "../types/admin/faculty";
import { CurriculumType, SlideType, VideoType } from "../types/admin/materials";
import { PaymentType } from "../types/admin/payments";
import { UserStudentType } from "../types/admin/user";
import { ScheduleType } from "../types/instructor/schedule";

export async function getFaculties(): Promise<FacultyType[]> {
  const res = await fetch(
    "https://6657f7365c3617052646673e.mockapi.io/api/v1/faculties"
  );
  const data = await res.json();

  // console.log("data from page: ",data);
  return data;
}

export async function getDegree(): Promise<DegreeType[]> {
  const res = await fetch(
    "https://6657f7365c3617052646673e.mockapi.io/api/v1/faculties"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

export async function getStudyProgram(): Promise<StudyProgramType[]> {
  const res = await fetch(
    "https://665d2809e88051d604058d84.mockapi.io/api/v1/study_program"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

export async function getSetupStudyProgram(): Promise<SetupStudyProgramType[]> {
  const res = await fetch(
    "https://6657f7365c3617052646673e.mockapi.io/api/v1/study_program_setup"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

export async function getSubject(): Promise<SubjectType[]> {
  const res = await fetch(
    "https://665d2809e88051d604058d84.mockapi.io/api/v1/subjects"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

export async function getPayment(): Promise<PaymentType[]> {
  const res = await fetch(
    "https://6657f7365c3617052646673e.mockapi.io/api/v1/payments"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

export async function getAdmission(): Promise<AdmissionType[]> {
  const res = await fetch(
    "https://6661345863e6a0189fe8dba0.mockapi.io/api/v1/admissions"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

export async function getStudentAdmission(): Promise<StudentAdmissionType[]> {
  const res = await fetch(
    "https://6661345863e6a0189fe8dba0.mockapi.io/api/v1/student-admission"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

export async function getCurriculum(): Promise<CurriculumType[]> {
  const res = await fetch(
    "https://6661345863e6a0189fe8dba0.mockapi.io/api/v1/curriculumns"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

export async function getSlide(): Promise<SlideType[]> {
  const res = await fetch(
    "https://6661345863e6a0189fe8dba0.mockapi.io/api/v1/slides"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

export async function getVideo(): Promise<VideoType[]> {
  const res = await fetch(
    "https://6661345863e6a0189fe8dba0.mockapi.io/api/v1/videos"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

// Instructor Schedule
export async function getSchedule(): Promise<ScheduleType[]> {
  const res = await fetch(
    "https://6665da37d122c2868e41f992.mockapi.io/api/v1/schedules"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}

// User Student
export async function getStudent(): Promise<UserStudentType[]> {
  const res = await fetch(
    "https://6665da37d122c2868e41f992.mockapi.io/api/v1/students"
  );
  const data = await res.json();
  // console.log("data from page: ",data);
  return data;
}
