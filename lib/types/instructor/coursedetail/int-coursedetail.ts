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