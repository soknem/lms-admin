// types.ts



export type Course = {
    uuid: string;
    score : number;
    title: string;
    credit: number;
    grade: string;
}


export type YearOfStudy = {
    year: number;
    semester: number;
    courses: Course[];
}



export type Achievement = {
    nameEn: string;
    nameKh: string;
    dob: string;
    degree: string;
    major: string;
    avatar: string;
    profileImage: string;
    yearOfStudiesStudents: YearOfStudy[];
};



// Type of object
export type AchievementTableType = {
    NO: number;
    courseTitle: string;
    score: number;
    credit: number;
    grade: string;
};



export const labelsTitle = [
    "Name (KH)",
    "Name (EN)",
    "Date of Birth",
    "Degree",
    "Major",
];


export type AchievementTableProps = {
    data: Achievement;
};

export type YearSemesterTableProps = {
    year: number;
    semester: number;
    courses: {
        NO: number;
        courseTitle: string;
        score: number;
        credit: number;
        grade: string;
    }[];
};





