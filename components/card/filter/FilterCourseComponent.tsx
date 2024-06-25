'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addOrUpdateFilter, removeFilter } from '@/lib/features/filters/filterSlice';
import { useFilterCoursesMutation } from '@/lib/features/admin/academic-management/courses/courseApi';
import { RootState } from '@/lib/store';
import { addCourse, Course } from '@/lib/features/admin/academic-management/courses/courseSlice';
import CourseResultCardComponent from "@/components/card/filter/CourseResultCardComponent";
import { Class } from '@/lib/features/admin/academic-management/classes/classSlice'; // import the Class type

const CourseFilterComponent: React.FC = () => {
    const dispatch = useDispatch();
    const courseFilterState = useSelector((state: RootState) => state.filter.course); // Separate course filter state
    const classes = useSelector((state: RootState) => state.class.content); // get classes from store
    const [filterCourses, { data, error, isLoading }] = useFilterCoursesMutation();

    const [selectedClass, setSelectedClass] = useState('');
    const [filteredData, setFilteredData] = useState<Course[]>([]);

    useEffect(() => {
        if (data) {
            dispatch(addCourse(data.content));
            setFilteredData(data.content);
        }
    }, [data, dispatch]);

    const applyFilter = useCallback(async () => {
        const { globalOperator, specsDto } = courseFilterState;
        const body = { globalOperator, specsDto };

        try {
            const result = await filterCourses({ pageNumber: 0, pageSize: 25, body }).unwrap();
            setFilteredData(result.content);
            console.log('Filter request body:', JSON.stringify(body, null, 2));
        } catch (err) {
            console.log('Filter request body:', JSON.stringify(body, null, 2));
            console.error('Failed to filter courses from API:', err);
        }
    }, [courseFilterState, filterCourses]);

    useEffect(() => {
        applyFilter();
    }, [applyFilter]);

    const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        setSelectedClass(value);
        dispatch(addOrUpdateFilter({ filterType: 'course', filter: { column: 'classCode', value, operation: 'EQUAL', joinTable: 'oneClass' } }));
    };

    const resetClassFilter = () => {
        setSelectedClass('');
        dispatch(removeFilter({ filterType: 'course', column: 'classCode' }));
    };

    return (
        <div>
            <div>
                <label>Class:</label>
                <select value={selectedClass} onChange={handleClassChange}>
                    <option value="">Select class</option>
                    {classes.map((cls: Class) => (
                        <option key={cls.uuid} value={cls.classCode}>
                            {cls.classCode}
                        </option>
                    ))}
                </select>
                <button onClick={resetClassFilter}>Reset Class</button>
            </div>
            {isLoading && <p>Loading...</p>}
            {filteredData.length > 0 && (
                <div>
                    {filteredData.map((course: Course) => (
                        <CourseResultCardComponent key={course.uuid} course={course} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default CourseFilterComponent;
