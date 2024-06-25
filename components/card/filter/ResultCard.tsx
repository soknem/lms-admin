// components/ResultCard.tsx
import React from 'react';

interface ResultCardProps {
    result: any;
}

const ResultCard: React.FC<ResultCardProps> = ({ result }) => {
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg p-6 bg-white">
            <img className="w-full h-48 object-cover" src={result.subject.logo} alt={result.subject.title} />
            <div className="px-6 py-4">
                <h3 className="font-bold text-xl mb-2">{result.subject.title}</h3>
                <p className="text-gray-700 text-base">UUID: {result.uuid}</p>
                <p className="text-gray-700 text-base">Subject Alias: {result.subject.alias}</p>
                <p className="text-gray-700 text-base">Year: {result.yearOfStudy.year}</p>
                <p className="text-gray-700 text-base">Semester: {result.yearOfStudy.semester}</p>
            </div>
            <div className="px-6 pt-4 pb-2">
                <span className="block text-gray-700 font-semibold mb-2">Students:</span>
                <ul className="list-disc list-inside">
                    {result.students.map((student: any) => (
                        <li key={student.uuid} className="text-gray-700">{student.uuid}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default ResultCard;
