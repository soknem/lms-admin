export type AttendanceT = {
    uuid: string;
    status: number;
    note: string;
    // student: {
    //     uuid: string;
    //     cardId: string;
    //     studentStatus: number;
    //     profileImage: string;
    //     nameEn: string;
    //     nameKh: string;
    //     gender: string;
    //     email: string;
    //     username: string;
    //     phoneNumber: string;
    //     guardianRelationShip: string;
    //     familyPhoneNumber: string;
    //     birthPlace: string;
    //     currentAddress: string;
    //     biography: string;
    //     dob: string;
    //     bacIiGrade: string;
    //     highSchoolCertificate: string | null;
    //     vocationTrainingCertificate: string | null;
    //     anyValuableCertificate: string | null;
    // };
    // lecture: {
    //     uuid: string;
    //     startTime: string;
    //     endTime: string;
    //     description: string;
    //     lectureDate: string;
    //     isDeleted: boolean;
    //     isDraft: boolean;
    //     status: number;
    //     teachingType: string;
    //     classCode: string | null;
    // };
    student: string;
    lecture:string
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
