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
    nameEn: string,
    nameKh: string,
    email: string,
    highSchool: string,
    phoneNumber: string,
    dob: string,
    pob: string,
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
    shiftAlias: string,
    studyProgramAlias: string,
    degreeAlias: string,
    admission: string,
    diplomaSession: string,
    classStudent: string,
    highSchoolCertificate: string,
    vocationTrainingIiiCertificate: string,
    anyValuableCertificate: string,
    uuid: string,
};

export type StatusOption = {
    label: string;
    value: number;
};
