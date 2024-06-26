// **** Admissions *****
export type AdmissionType = {
    academicYear: string;
    openDate: string;
    endDate: string;
    telegramLink: string;
    remark: string;
    status: number;
    isDeleted: boolean;
};

// ****Student Admissions *****
export type StudentAdmissionType = {
    profile: {
        name: string;
        profile: string;
    };
    email: string;
    degree: string;
    shift: string;
    study_program: string;
    status: string;
    generation: string;
};

export type StatusOption = {
    label: string;
    value: number;
};
