export type AssessmentType={
    uuid: string;
    activityScore: number;
    attendanceScore: number;
    midtermExamScore: number;
    finalExamScore: number;
    miniProjectScore: number;
    assignmentScore: number;
    classCode: string;
    grade: string;
    total: number;
    course:string;
    student: string;
    isDeleted: boolean;
    };


export type OptionType = {
    label: string;
    value: string;
};
