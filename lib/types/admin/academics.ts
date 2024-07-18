
// **** Generation *****
import {CourseInfo, Generation, Shift, StudyProgram} from "@/lib/features/admin/academic-management/classes/classSlice";

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
export type ClassTableFormType = {
    uuid: string;
    classCode: string;
    classStart: string;
    classEnd: string;
    shift: string;
    studyProgram: string;
    generation: string;
    academicYear: string;
    instructor: string;
    isDraft: boolean;
    isDeleted: boolean;
    status: number;
}

export type Class = {
    uuid: string;
    classCode: string;
    description: string;
    isDeleted: boolean;
    isDraft: boolean;
    status: number;
    instructor: string | null;
    studyProgram: StudyProgram;
    shift: Shift;
    generation: Generation;
    students: any[]; // Assuming students are an array of objects
    courses: CourseInfo[];
};

export type ClassCreateType = {
    classCode: string,
    description: string,
    classStart: string,
    classEnd: string,
    year: number,
    generationAlias: string,
    studyProgramAlias: string,
    shiftAlias: string,
    instructorUuid: string,
    studentUuid: any,
    academicYearAlias: string,
    isDraft: boolean,
    status: number,
}

export type ClassUpdateType = {
    classCode: string,
    classStart: string,
    classEnd: string,
    instructorUuid: string,
    isDraft: boolean,
    status: number,
}

export type ShortClassType = {
    uuid: string;
    classCode: string;
}


export type ShortCourseType = {
    uuid: string;
    title: string;
}

export type ShortCourseStudentType = {
    uuid: string;
    title: string;
    score: string;
    credit: string;
    grade: string;
}

export type StudentType = {
    uuid: string;
    cardId: string;
    studentStatus: number;
    profileImage: string;
    nameEn: string;
    nameKh: string;
    gender: string;
    email: string;
    username: string;
    phoneNumber: string;
    guardianRelationShip: string;
    familyPhoneNumber: string | null;
    birthPlace: string | null;
    currentAddress: string | null;
    biography: string;
    dob: string;
    bacIiGrade: string;
    highSchoolCertificate: string | null;
    vocationTrainingCertificate: string | null;
    anyValuableCertificate: string | null;
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
    uuid: string
    subject: string,
    startDate: Date,
    endDate: Date,
    status: boolean,
    instructor: string,
    semester: number,
    year: number,
    visibility: boolean,
    isDeleted: boolean,
}

export type ResCourseType = {
    uuid: string;
    isDeleted: boolean;
    subject: {
        alias: string;
        title: string;
    };
    instructor: any; // You can replace 'any' with a more specific type if available
    oneClass: {
        uuid: string;
        classCode: string;
    };
    courseStart: Date | null; // Adjust 'Date' with the appropriate type if 'courseStart' varies
    status: number;
    courseEnd: Date | null; // Adjust 'Date' with the appropriate type if 'courseEnd' varies
    yearOfStudy: {
        uuid: string;
        year: number;
        semester: number;
    };
}

export type TranscriptType = {
    uuid: string,
  cardId: string,
  nameEn: string,
  gender: string,
  dob: string,
  studyProgram: string,
  year: number,
  semester1Score: number,
  semester2Score: number,
  gpa: number,
 average: number,
  status: number
}

export type semesterAssessementType = {
    cardId: string;
    nameEn: string;
    gender: string;
    dob: string;
    classCode: string; // changed from "class" to "classCode" to match data
    academicYear: string | null; // added to match data
    courses: { [key: string]: number }; // changed from "subjects" to "courses" to match data
    grade: string;
    gpa: number; // added to match data
    total: number;
    status: number;
}

export type CourseShortType = {
    title: string,
  score: number
};

export type IntcourseAssessmentType = {
  uuid: string
  cardId: string,
  nameEn: string,
  gender: string,
  dob: string,
  class: string,
  course: string,
  midtermExamScore: number,
  finalExamScore: number,
  attendanceScore: number,
  assignmentScore: number,
  miniProjectScore: number,
  activityScore: number,
  status: number
}

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

//response lecture
export type LectureRespondType = {
    uuid: string;
    startTime: string;
    endTime: string;
    lectureDate: string;
    isDeleted: boolean;
    isDraft: boolean;
    status: number;
    teachingType: string;
    classCode: string;
    courseTitle: string;
    courseUuid: string;
    instructorName: string;
    instructorUuid: string;
    session?: string;
}

export type FormLectureType = {
    startTime: string;
    endTime: string;
    lectureDate: string;
    isDraft: boolean;
    status: number;
    teachingType: string;
    courseUuid: string;
}

// class

export type GenerationShortType = {
    alias: string;
    name: string;
}

export type ShiftType = {
    alias: string;
    startTime: string;
    endTime: string;
    name: string;
    weekday: boolean;
    description: string;
    isDeleted: boolean;
    isDraft: boolean;
}

export type StudyProgramShortType = {
    alias: string;
    studyProgramName: string;
}

export type ClassDetailResponseType = {
    uuid: string;
    classCode: string;
    courses: ShortCourseType[];
    generation: GenerationShortType;
    instructor: string;

    isDeleted: boolean;
    isDraft: boolean;
    status: number;
    year: number

    students: any[];
    studyProgram: StudyProgramShortType;

    academicYear: {
        alias: string;
        academicYear: string;
    }

    shift: {
        alias: string;
        name: string;
    }

}

// === Shift ====
export type ShiftResponseType = {
    alias: string;
    name: string;
    startTime: string;
    endTime: string;
    weekday: string;
    description: string;
    isDeleted: string;
    isDraft: string;
}

// Assessment Student Response
// export type StudentAssessmentType = {
//     uuid: string;
//     cardId: string;
//     studentStatus: string;
//     nameEn: string;
//
//
// }