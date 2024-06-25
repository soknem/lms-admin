
// **** Generation *****
export type GenerationType = {
    name: string;
  startYear: number;
  endYear: number;
  alias: string;
  isDeleted: boolean;
  isDraft: boolean;
  description?: string;
};

export type CreateGenerationType = {
    name: string;
    startYear: number;
    endYear: number;
    alias: string;
    isDraft: boolean;
    description?: string;
};



export type OptionType = {
  label: string;
  value: string;
};

// **** Class *****
export type ClassType = {
    alias: string
    className: string
    studyProgramAlias: string
    shiftAlias: string
    generationAlias: string
    isDelete: boolean
    isDraft: boolean
    studentAliases: string[]
    instructorAias: string[]
}


export type StudentType = {
    nameEn: string,
    nameKh: string,
    alias: string,
    gender: string,
    email: string,
    password: string,
    profileImage: string,
    phoneNumber: string,
    cityOrProvince: string,
    khanOrDistrict: string,
    sangkatOrCommune: string,
    street: string,
    status: number,
    cardId: string,
}

export type InstructorType = {
    nameEn: string,
    nameKh: string,
    alias: string,
    gender: string,
    email: string,
    password: string,
    profileImage: string,
    phoneNumber: string,
    cityOrProvince: string,
    khanOrDistrict: string,
    sangkatOrCommune: string,
    street: string,
    status: boolean,
    cardId: string,
    inCharged: boolean
}

export type CourseType = {
    subject: string,
    startDate: Date,
    endDate: Date,
    status: boolean,
    instructor: string,
    semester: number,
    year: number,
    visibility: boolean
}



export type TranscriptType = {
  cardId: string,
  nameEn: string,
  gender: string,
  dob: string,
  class: string,
  studyProgram: string,
  year: number,
  semester1: number,
  semester2: number,
  gpa: number,
  total: number,
  status: number
}

export type semesterAssessementType = {
  cardId: string,
  nameEn: string,
  gender: string,
  dob: string,
  class: string,
  subjects: SubjectType[],
  grade: string,
  total: number,
  status: number
}

export type SubjectType = {
  subjectName: string,
  score: number
};

// export type courseAssessmentType = {
//   uuid: string
//   cardId: string,
//   nameEn: string,
//   gender: string,
//   dob: string,
//   class: string,
//   course: string,
//   midtermExamScore: number,
//   finalExamScore: number,
//   attendanceScore: number,
//   assignmentScore: number,
//   miniProjectScore: number,
//   activityScore: number,
//   status: number
// }

//response course assessment
export type courseAssessmentType = {
    uuid: string;
    activityScore: number;
    attendanceScore: number;
    midtermExamScore: number;
    finalExamScore: number;
    miniProjectScore: number;
    assignmentScore: number;
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
    course: {
        uuid: string;
        title: string;
        credit: number | null;
    } | null;
    isDeleted: boolean;
};

export type courseAssessmentTableType = {
    uuid: string;
    cardId: string;
    nameEn: string;
    gender: string;
    dob: string;
    class: string;
    course: string;
    midtermExamScore: number;
    finalExamScore: number;
    attendanceScore: number;
    assignmentScore: number;
    miniProjectScore: number;
    activityScore: number;
    status: number;
};

//response lecture
export type lectureRespondType = {
    uuid: string;
    startTime: string;
    endTime: string;
    description: string;
    lectureDate: string;
    isDeleted: boolean;
    isDraft: boolean;
    status: number;
    teachingType: string;
    classCode: string;
    course: {
        uuid: string;
        title: string;
        instructor: {
            uuid: string;
            nameEn: string;
        } | null;
    };
}

// export type LectureType = {
//     // alias: string,
//     startTime: string,
//     endTime: string,
//     description: string,
//     lectureDate: string,
//     status: number,
//     // courseAlias: string,
//     // additional on not have in api
//     teachingType: string,
//     isDelete: boolean,
//     class: string,
//     instructor: string,
//     course: string
//
// }

export type LectureType = {
    uuid: string;
    //session is the combination of start time and end time
    session: string;
    lectureDate: string;
    isDeleted: boolean;
    isDraft: boolean;
    status: number;
    teachingType: string;
    classCode: string;
    courseTitle: string;
    courseUuid: string;
    instructorName: string;
    instructorUuid: string
}