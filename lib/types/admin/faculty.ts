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
    description: string,
    isDeleted: boolean,
    isDraft: boolean
};

// **** Study Program *****
export type StudyProgramType = {
    alias: string,
    studyProgramName: string,
    description: string,
    logo: string,
    isDeleted: boolean,
    isDraft: boolean,
    degree: {
        alias: string,
        level: string,
    },
    faculty: {
        alias: string,
        name: string,
    }
};

export type SetupStudyProgramType = {
    id: string;
    subject: string;
    study_program: string;
    semester: string;
    hour: number;
    theory: number;
    practice: number;
    internship: number;
    status: string;
};

// **** Subjects *****
export type SubjectType = {
    subject: string;
    logo: string;
    hour: number;
    theory: number;
    practice: number;
    internship: number;
    description: string;
    status: string;
};

export type StatusOption = {
    label: string;
    value: string;
};
