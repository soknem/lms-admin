export type AttendanceT = {
    classCode: string;
    p: number;
    ea: number;
    ua: number;
    totalScore: number;
     course: {
         uuid: string;
         title: string;

     };
     student: {
         cardId: string;
         uuid: string;
         nameEn: string;
         gender: string;
         status: string | null;

     };

};





export type AttendanceType = {
  startTime: string;
  endTime: string;
  fullName: string;
  cardId: string;
  gender: string;
  status: string;
  class: string;
  semester: string;
  course: string;
  description: string;
  isDelete: boolean;
  p: string;
  ea: string;
  total: number;
  };


export type AttendanceTableType ={
    uuid: string;
    nameEn: string;
    nameKh: string;
    gender: string;
    email: string;
    phoneNumber: string;
    educations: string | null;
    skills: string | null;
    birthPlace: string | null;
    currentAddress: string | null;
    bio: string | null;
    dob: string;
    linkGit: string | null;
    linkLinkedin: string | null;
    linkTelegram: string | null;
    uploadCv: string | null;
    identityCard: string | null;




}

export type StatusOption = {
    label: string;
    value: number;
};
