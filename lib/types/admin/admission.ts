// **** Admissions *****
export type AdmissionType = {
    uuid: string;
    status: number;
    remark: string;
    openDate: string;
    endDate: string;
    academicYearAlias: string;
    telegramLink: string;
    isDeleted: boolean;
};

// ****Student Admissions *****
export type StudentAdmissionType = {
    uuid: string,
    nameEn: string,
    nameKh: string,
    email: string,
    highSchool: string,
    phoneNumber: string,
    dob: string,
    birthPlace: string,
    bacIiGrade: string,
    gender: string,
    avatar: string,
    address: string,
    guardianContact: string,
    guardianRelationShip: string,
    knownIstad: string,
    identity: string,
    biography: string,
    isDeleted: boolean,
    shift: string,
    studyProgram: string,
    degree: string,
    admission: string
}

export type StatusOption = {
    label: string;
    value: number;
};
