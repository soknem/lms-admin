// **** Schedule *****
export type ScheduleType = {
  uuid: string;
  startTime: string;
  endTime: string;
  description: string;
  lectureDate: string;
  status: number;
  teachingType: string;
  courseTitle: string;
  classCode: string;

};

export type ScheduleTypee = {
  subject: string;
  date: string;
  session: string;
  class: string;
  id: string;
  status: string;
};


// types.ts
export type InCourseType = {
  uuid: string;
  title: string;
  credit: number;
  logo: string;
  description: string;
  instructorAvatar: string | null;
  instructorName: string | null;
  year: number;
  semester: number;
};

export type InstructorCourseType = {
  uuid: string;
  nameEn: string;
  nameKh: string;
  username: string;
  gender: string;
  avatar: string;
  courses: InCourseType[];
};


export type StatusOption = {
  label: string;
  value: string;
};
