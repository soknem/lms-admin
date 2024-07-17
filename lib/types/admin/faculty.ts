// **** Faculty *****
export type FacultyType = {
    alias: string,
    name: string,
    description: string,
    address: string,
    logo: string,
    isDeleted: boolean,
    isDraft: boolean

};

// **** Degree *****
export type DegreeType = {
    alias: string,
    level: string,
    numberOfYear: number,
    description: string,
    isDeleted: boolean,
    isDraft: boolean
};

// **** Study Program *****
// export type StudyProgramType = {
//     alias: string,
//     studyProgramName: string,
//     description: string,
//     logo: string,
//     isDeleted: boolean,
//     isDraft: boolean,
//     degree: {
//         alias: string,
//         level: string,
//     },
//     faculty: {
//         alias: string,
//         name: string,
//     }
// };

export type StudyProgramType = {
    alias: string,
    studyProgramName: string,
    description: string,
    logo: string,
    isDeleted: boolean,
    isDraft: boolean,
    facultyAlias: string,
    degreeAlias: string,
};

// export type EditStudyProgramType = {
//     alias: string,
//     studyProgramName: string,
//     description: string,
//     logo: string,
//     isDraft: boolean,
// };


export type SetupStudyProgramType = {
    alias: string;
    title: string;
    description: string;
    logo: string;
    practice: number;
    internship: number;
    theory: number;
    duration: number;
    credit: number;
    isDraft: boolean;
    isDeleted: boolean;
    yearOfStudy: string;
};

export type AddSubjectType = {
    aliasOfSubjects: string;
    uuid: string;
    semester: number;
    year: number;
};

// **** Subjects *****
export type SubjectType = {
    alias: string,
    title: string;
    logo: string;
    duration: number;
    theory: number;
    practice: number;
    internship: number;
    description: string;
    isDraft: boolean;
    // semester: number;
};

export type StatusOption = {
    label: string;
    value: string;
};

export type AcademicYearType = {
    alias: string,
    academicYear: string,
    status: number,
    isDraft: boolean,
    isDeleted: boolean,
}

export type ShiftType = {
    alias: string,
    name: string,
    startTime: string,
    endTime: string,
    weekday: boolean,
    isDraft: boolean,
    description: string
}