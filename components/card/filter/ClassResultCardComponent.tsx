import React from 'react';

interface StudyProgram {
    alias: string;
    studyProgramName: string;
}

interface Shift {
    alias: string;
    name: string;
    startTime: string;
    endTime: string;
}

interface Generation {
    alias: string;
    name: string;
}

interface Student {
    uuid: string;
    nameEn: string;
    nameKh: string;
    username: string;
    email: string;
    phoneNumber: string;
    dob: string;
    gender: string;
    profileImage: string;
}

interface Course {
    uuid: string;
    title: string;
    credit: number | null;
}

interface Class {
    uuid: string;
    classCode: string;
    description: string;
    isDeleted: boolean;
    isDraft: boolean;
    status: number;
    instructor: string | null;
    studyProgram: StudyProgram;
    shift: Shift;
    generation: Generation;
    students: Student[];
    courses: Course[];
}

interface ClassResultCardProps {
    result: Class;
}

const ClassResultCardComponent: React.FC<ClassResultCardProps> = ({ result }) => {
    return (
        <div className="max-w-sm mx-auto bg-white shadow-md rounded-lg overflow-hidden my-4">
            <div className="px-6 py-4">
                <div className="font-bold text-xl mb-2">{result.classCode}</div>
                <p className="text-gray-700 text-base">{result.description}</p>
                <div className="mt-4">
                    <h4 className="font-semibold">Study Program:</h4>
                    <p>{result.studyProgram.studyProgramName}</p>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold">Shift:</h4>
                    <p>{result.shift.name} ({result.shift.startTime} - {result.shift.endTime})</p>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold">Generation:</h4>
                    <p>{result.generation.name}</p>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold">Courses:</h4>
                    <ul className="list-disc list-inside">
                        {result.courses.map((course) => (
                            <li key={course.uuid}>{course.title}</li>
                        ))}
                    </ul>
                </div>
                <div className="mt-4">
                    <h4 className="font-semibold">Students:</h4>
                    <ul className="list-disc list-inside">
                        {result.students.map((student) => (
                            <li key={student.uuid}>{student.nameEn} ({student.username})</li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default ClassResultCardComponent;
