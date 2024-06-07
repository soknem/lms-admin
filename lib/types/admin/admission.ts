// **** Admissions *****
export type AdmissionType = {
  academic_year: string;
  start_date: string;
  end_date: string;
  telegram_group: string;
  remark: string;
  status: string;
};

// ****Student Admissions *****
export type StudentAdmissionType = {
  profile: {
    name: string;
    profile: string;
  };
  email: string;
  degree: string;
  shift: string;
  study_program: string;
  status: string;
  generation: string;
};

export type StatusOption = {
  label: string;
  value: string;
};
