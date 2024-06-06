import {
  DegreeType,
  FacultyType,
  StudyProgramType,
  SubjectType,
} from "../types/admin/faculty";
import { PaymentType } from "../types/admin/payments";

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
    "https://6657f7365c3617052646673e.mockapi.io/api/v1/degrees"
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
