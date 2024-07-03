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

export type StatusOption = {
  label: string;
  value: string;
};
