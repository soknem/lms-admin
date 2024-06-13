// **** User Student *****
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