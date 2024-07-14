export type AssessmentType={
    uuid: string;
    activityScore: number;
    attendanceScore: number;
    midtermExamScore: number;
    finalExamScore: number;
    miniProjectScore: number;
    assignmentScore: number;
    classCode: string;
    grade: string | null;
    total: number;
    course: {
        uuid: string;
        title: string;
    };
    student: {
        uuid: string;
        nameEn: string;
        cardId: string;
        gender: 'male' | 'female'; // Adjust according to actual data if needed
        dob: string; // Consider using a Date type if dates are manipulated
        status: string; // Adjust according to actual data type if needed
    };
}


export type OptionType = {
    label: string;
    value: string;
};
