// types.ts
export type CourseType = {
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
    courses: CourseType[];
};
