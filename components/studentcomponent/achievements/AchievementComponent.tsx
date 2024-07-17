// AchievementTable.tsx
import React from "react";
import { AchievementTableProps } from "@/lib/types/student/achievement";
import YearSemesterTable from "@/components/studentcomponent/achievements/YearSemesterTable";


export default function AchievementTable({ allData }: AchievementTableProps) {

    console.log("  DATA IN COMPONENT : " , allData)
    const tableData = allData.content.map((yearOfStudy, index) => {
        let rowNumber = 1;
        return {
            year: yearOfStudy.year,
            semester: yearOfStudy.semester,
            courses: yearOfStudy.course.map(course => ({
                NO: rowNumber++,
                title: course.title,
                score: course.score,
                credit: course.credit,
                grade: course.grade,
            }))
        };
    });

    return (
        <section className="grid mt-4 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-9 grid-cols-1 gap-x-6 gap-y-9 w-full p-9">
            {tableData.map((yearOfStudy, index) => (
                <YearSemesterTable
                    key={index}
                    year={yearOfStudy.year}
                    semester={yearOfStudy.semester}
                    courses={yearOfStudy.courses}
                />
            ))}
        </section>
    );
}
