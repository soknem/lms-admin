export type CourseDetail = {
    year: number;
    semester: number;
    courseTitle: string;
    courseDescription: string;
    courseLogo: string;
    credit: number;
    theory: number;
    practice: number;
    internship: number;
    instructorName: string;
    userProfileImage: string;
    position: string;
    linkGit : string;
    linkLinkedin : string;
    linkTelegram : string;
    uploadCv : string;
    identityCard : string;
    studentProfileImage: string[];
    classesStart: Date;
};


export type InstructorType = {
    uuid: string | null;
    nameEn: string | null;
    instructorProfileImage: string | null;
};


export type ModulesType = {
    title: string;
    content: string;
};


export type CurriculumType = {
    modules: ModulesType[] | null;
};



export type CourseResponse = {
    year: number | null;
    semester: number | null;
    courseTitle: string ;
    courseDescription: string | null;
    courseLogo: string | null;
    credit: number | null;
    theory: number | null;
    practice: number | null;
    internship: number | null;
    instructor: InstructorType;
    position: string | null;
    studentProfileImage: string[];
    classesStart: string | null;
    curriculum?: CurriculumType | null;
};



export type CourseType = {
    onClick: () => void;
    uuid: string;
    title: string;
    credit: number;
    logo: string;
    description: string;
    instructorProfileImage: string | null;
    instructorName: string | null;
    progress: number;
    year: number;
    semester: number;
};