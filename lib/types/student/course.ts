export type PropsParam = {
    params: {
        uuid: string;
    };
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
};

export type CourseType = {
    uuid: string;
    title: string;
    credit: number | null;
    logo: string | null;
    description: string | null;
    instructorAvatar: string | null;
    instructorProfileImage : string | null;
    instructorName: string | null;
    progress: number | null;
    year: number | null;
    semester: number | null;
};

export type StudentCourseType = {
    uuid: string;
    nameEn: string;
    nameKh: string;
    username: string;
    gender: string;
    avatar: string;
    profileImage: string;
    courses: CourseType[];
};





export type InstructorType = {
    uuid: string;
    nameEn: string | null;
    instructorProfileImage: string | null;
};



export type Module = {
    title: string;
    content: string;
};

export type Curriculum = {
    modules: Module[] | null;
};



export type CourseDetail = {
    year: number;
    semester: number;
    courseTitle: string;
    courseDescription: string;
    courseLogo: string;
    credit: number;
    theory: number;
    practice: number;
    internship?: number;
    instructor: InstructorType | null;
    position: string | null;
    studentProfileImage: string[];
    classesStart: Date | null;
    curriculum?: Curriculum | null;
};

export type CourseDetailHeaderProps = {
    allData: CourseDetail;
};
