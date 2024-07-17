export type CurrentType = {
    uuid: string;
    startTime: string;
    endTime: string;
    description: string | null;
    lectureDate: string;
    status: number;
    teachingType: string;
    courseTitle: string;
    classCode: string;
};
export type EndedLectureType = {
    uuid: string;
    startTime: string;
    endTime: string;
    description: string | null;
    lectureDate: string;
    status: number;
    teachingType: string;
    courseTitle: string;
    classCode: string;
};


export type StudentAttendanceType = {
    uuid: string;
    status: number;
    note: string;
    student: {
        uuid: string;
        cardId: string;
        nameEn: string;
    }
};
