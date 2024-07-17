// types.ts
export type InCourseType = {
    uuid: string;
    title: string ;
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

export type InstructorCourseType = {
    uuid: string;
    nameEn: string;
    nameKh: string;
    username: string;
    gender: string;
    profileImage: string;
    courses: InCourseType[];
};
