// **** Curriculum *****
export type CurriculumType = {
  title: string;
  course: string;
  description: string;
  type: string;
  status: number;
};

// **** Slide *****
export type SlideType = {
  title: string;
  course: string;
  description: string;
  type: string;
  status: number;
};

// **** Video *****
export type VideoType = {
  title: string;
  course: string;
  description: string;
  type: string;
  status: number;
};

export type StatusOption = {
  label: string;
  value: number;
};
