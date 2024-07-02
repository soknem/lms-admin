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
    // profile: {
    //     name: string;
    //     profile: string;
    // };
    // email: string;
    // degree: string;
    // shift: string;
    // study_program: string;
    // status: string;
    // generation: string;


    "uuid": "26a45336-d612-46e6-906e-1fd7696c7c06",
    "nameEn": "rothana1",
    "nameKh": "រតនា",
    "email": "rothana1@gmail.com",
    "highSchool": "takeo highSchool",
    "phoneNumber": "021456894",
    "dob": "2002-10-22",
    "birthPlace": null,
    "bacIiGrade": "A",
    "gender": "Male",
    "avatar": "",
    "address": "123 Main Street",
    "guardianContact": "+1987654321",
    "guardianRelationShip": "Parent",
    "knownIstad": "By social media",
    "identity": "",
    "biography": "ដោយសារខ្ញុំចង់ចឹង teacher , ពេល disabled ចឹងខ្ញុំអោយវា draft  ដែរ, ព្រោះយើងអត់អាច public  degree ដែល disabled",
    "isDeleted": false,
    "shift": string,
    "studyProgram": string,
    "degree": {
        "alias": "Bachelor-Degree",
        "level": "Bachelor Degree"
    },
    "admission": {
        "uuid": "e3d77f25-97f4-4294-88c3-2738eb9225ef",
        "status": 2
    }
};

export type StatusOption = {
    label: string;
    value: number;
};
