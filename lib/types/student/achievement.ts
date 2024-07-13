// studentTypes.ts

export type StudentAchievement = {
    nameEn: string;
    nameKh: string;
    dob: string;
    degree: string;
    major: string;
    profileImage: string;
    avatar: string;

}



export type YearOfStudyAchievementContent = {
    year: number;
    semester: number;
    course: Course[];
}





export type Course = {
    NO?: number;
    title: string;
    score: number;
    credit: number;
    grade: string ;
}

export type YearOfStudy = {
    year: number;
    semester: number;
    course: Course[];
}


export type YearSemesterTableProps = {
    year: number;
    semester: number;
    courses: Course[];
}





export type YearOfStudyAchievement = {
    content: YearOfStudy[];
}

export type AchievementTableProps = {
    allData: YearOfStudyAchievement;
}
