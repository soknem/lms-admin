
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

export type LectureType = {
  // alias: string,
  startTime: string,
  endTime: string,
  description: string,
  lectureDate: string,
  status: number,
  // courseAlias: string,
  // additional on not have in api
  teachingType: string,
  isDelete: boolean,
  class: string,
  instructor: string,
  course: string

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

export type courseAssessmentType = {
  cardId: string,
  nameEn: string,
  gender: string,
  dob: string,
  class: string,
  course: string,
  mitTerm: number,
  final: number,
  att: number,
  assgmt: number,
  mp: number,
  act: number,
  grade: string,
  total: number,
  status: number
}
