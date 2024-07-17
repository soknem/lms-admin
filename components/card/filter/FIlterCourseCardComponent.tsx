'use client';

import React, {useEffect, useState, useCallback} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {addOrUpdateFilter, removeFilter} from '@/lib/features/filters/filterSlice';
import {useFilterCoursesMutation} from '@/lib/features/admin/academic-management/courses/courseApi';
import {RootState} from '@/lib/store';

const CourseFilterComponent: React.FC = () => {
    const dispatch = useDispatch();
    const courseFilterState = useSelector((state: RootState) => state.filter.course);
    const [filterCourses, {data, error, isLoading}] = useFilterCoursesMutation();

    const applyFilter = useCallback(async () => {
        const {globalOperator, specsDto} = courseFilterState;
        const body = {globalOperator, specsDto};
        try {
            const result = await filterCourses({pageNumber: 0, pageSize: 25, body}).unwrap();
        } catch (err) {
            console.error('Failed to filter courses from API:', err);
        }
    }, [courseFilterState, filterCourses]);

    useEffect(() => {
        applyFilter();
    }, [applyFilter]);

    const handleClassChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = event.target.value;
        dispatch(addOrUpdateFilter({
            filterType: 'course',
            filter: {column: 'alias', value, operation: 'LIKE', joinTable: 'subject'}
        }));
    };

    const resetClassFilter = () => {
        dispatch(removeFilter({filterType: 'course', column: 'alias'}));
    };

    return (
        <div>
            <div>
                <label>Class:</label>
                <select value='' onChange={handleClassChange}>
                    <option value="">Select class</option>
                    <option value="Java">Java</option>
                    <option value="Web">Web</option>
                    <option value="Git">Git</option>
                </select>
                <button onClick={resetClassFilter}>Reset</button>
            </div>
            {isLoading && <p>Loading...</p>}
        </div>
    );
};

export default CourseFilterComponent;
