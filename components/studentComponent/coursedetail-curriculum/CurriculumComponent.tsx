import React from 'react'
import curriculumList from './MenuCurriculum'; // Adjust the path as needed
import courseDetails from './CourseDetails'; // Adjust the path as needed

export default function CurriculumComponent() {
  return (
    
    <div className="p-10">
    <h2 className="text-2xl font-bold text-primary mb-2">
      {courseDetails.title}
    </h2>
    <p className="text-gray-80 mb-2 w-[990px]">
      {courseDetails.description}
    </p>
    <h3 className="text-2xl font-bold text-primary mb-4">
      What you'll learn in this course?
    </h3>
    <ul className="list-disc pl-5 text-gray-80">
      {curriculumList.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  </div>
);

}
