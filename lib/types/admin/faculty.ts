// **** Facult *****
export type FacultyType = {
  id: string;
  name: string;
  description: string;
  logo: string;
  status: string;
};

// **** Degree *****
export type DegreeType = {
  id: string;
  level: string;
  description: string;
  create_by: string;
  status: string;
};

// **** Study Program *****
export type StudyProgramType = {
  id: string;
  name: string;
  logo: string;
  degree: string;
  faculty: string;
  status: boolean;
};

// **** Subjects *****
export type SubjectType = {
  subject: string;
  logo: string;
  hour: number;
  theory: number;
  practice: number;
  internship: number;
  description: string;
  status: boolean;
};


export type StatusOption = {
  label: string;
  value: string;
};