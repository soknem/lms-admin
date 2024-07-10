export type CourseDetailProps = {
    params: {
        uuid: string;
    };
    searchParams?: {
        [key: string]: string | string[] | undefined;
    };
};

export type CourseType = {
    onClick: () => void;
    uuid: string;
    title: string;
    credit: number;
    logo: string;
    description: string;
    instructorAvatar: string | null;
    instructorName: string | null;
    year: number;
    semester: number;
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
    instructorName: string | null;
    instructorProfileImage: string | null;
    position: string | null;
    studentProfileImage: string[];
    classesStart: Date | null;
};

export type CourseDetailHeaderProps = {
    allData: CourseDetail;
};
