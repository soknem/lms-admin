// CourseResultCardComponent.tsx
import React from 'react';
// import { Course } from '@/lib/features/admin/academic-management/courses/courseSlice

interface CourseResultCardProps {
    course: any;
}

const CourseResultCardComponent: React.FC<CourseResultCardProps> = ({ course }) => {
    return (
        <div>
            <h3>{course.subject.alias}</h3>
            {/* Display other course details if needed */}
        </div>
    );
};

export default CourseResultCardComponent;
