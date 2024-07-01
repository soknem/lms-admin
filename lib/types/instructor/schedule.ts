// **** Schedule *****
export type ScheduleType = {
  uuid: string;
  startTime: string;
  endTime: string;
  description: string;
  lectureDate: string;
  status: number;
  teachingType: "lecture" | "lab" | "seminar" | "workshop"; // Add other types if necessary
  courseTitle: string;
  classCode: string;

};

export type StatusOption = {
  label: string;
  value: string;
};
