export type IntCourseDetail = {
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
    position: 'INSTRUCTOR' | 'ASSISTANT' | 'LECTURER'; // Add other positions if necessary
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
    year: number;
    semester: number;
};