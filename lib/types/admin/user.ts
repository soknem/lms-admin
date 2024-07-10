// **** User Student *****
import {ShortClassType, ShortCourseStudentType} from "@/lib/types/admin/academics";
import {Course} from "@/lib/features/admin/academic-management/courses/courseSlice";

export type UserStudentType = {
  card_id: number;
  email: string;
  name_en: string;
  name_kh: string;
  gender: string;
  dob: string;
  ph_number: string;
  fam_ph_number: string;
  pob: string;
  address: string;
  bio: string;
  status: string;
  high_school: string;
  guaedian_rel: string;
  know_istad: string;
  class_stu: string;
  diploma: string;
  grade: string;
  shift: string;
  degree: string;
  study_pro: string;
};

export type UserStudentDetailType = {
  uuid: string;
  cardId: string;
  nameEn: string;
  nameKh: string;
  username: string;
  email: string;
  phoneNumber: string;
  dob: string;
  gender: string;
  studentStatus: number;
  profileImage: string;
  currentAddress: string;
  birthPlace: string;
  classes : ShortClassType[];
  courses: ShortCourseStudentType[];
}

export type UserStuType = {
  uuid: string;
  cardId: string;
  nameEn: string;
  nameKh: string;
  username: string;
  email: string;
  phoneNumber: string;
  dob: string;
  gender: string;
  studentStatus: number;
}

export type StatusOption = {
  label: string;
  value: string;
};

export type UserStaffType = {
  card_id: number;
  email: string;
  name_en: string;
  name_kh: string;
  gender: string;
  dob: string;
  ph_number: string;
  fam_ph_number: string;
  pob: string;
  address: string;
  bio: string;
  linkedIn: string;
  github: string;
  status: string;
};

export type UserStaffDetailType = {
  uuid: string;
  nameEn: string;
  nameKh: string;
  username: string;
  position: string;
  email: string;
  phoneNumber: string;
  dob: string;
  gender: string;
  profileImage: string;
  currentAddress: string;
  birthPlace: string;
}

