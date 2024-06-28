export type AttentType = {
  startTime: string;
  endTime: string;
  fullName: string;
  cardId: string;
  status: string;
  class: string;
  semester: string;
  course: string;
  description: string;
  isDelete: boolean;
  p: string;
  ea: string;
  gender: string;
  total: number;
  };

export type AttendanceTableType ={
     uuid: string;
     nameEn: string;
     gender: string;
     course: string;
     class: string;
     p: string;
     ea: string;
     total: number;
     status: string;
    student: {
        uuid: string;
        nameEn: string;
        nameKh: string;
        username: string;
        email: string;
        phoneNumber: string;
        dob: string;
        gender: string;
        profileImage: string;
    };

}