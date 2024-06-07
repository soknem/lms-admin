import { Stringifier } from "postcss";

// **** Generation *****
export type GenerationType = {
  generation: string;
  startYear: string;
  endYear: string;
  status: string;
  alias: string;
};

export type OptionType = {
  label: string;
  value: string;
};

// **** Class *****
export type ClassType = {
    alias: string
    className: string
    description: string
    studyProgramAlias: string
    shiftAlias: string
    generationAlias: string
    isDelete: boolean
    isDraft: boolean
    studentAliases: string[]
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