// **** Curriculum *****
export type CurriculumType = {
  title: string;
  course: string;
  description: string;
  type: string;
  status: number;
  subject: string;
  file: string;
};

// **** Slide *****
export type SlideType = {
  title: string;
  course: string;
  description: string;
  type: string;
  status: number;
  subject: string;
  file: string;
};

// **** Video *****
export type VideoType = {
  title: string;
  course: string;
  description: string;
  type: string;
  status: number;
  subject: string;
  file: string;
};

export type StatusOption = {
  label: string;
  value: number;
};
