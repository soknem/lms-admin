'use client'
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store";
import { useGetAssessmentQuery } from "@/lib/features/instructor/assessment/assessment";
import {selectAssessment, setAssessment} from "@/lib/features/instructor/assessment/assessmentSlice";
import { InstructorCourseAssessmentColumns } from "@/components/instructorcomponent/assessments/columns";
import { InstructorCourseAssesmentDataTable } from "@/components/instructorcomponent/assessments/data-table";
import { AssessmentType } from "@/lib/types/instructor/assessment";

export default function Assessments() {
    const dispatch = useDispatch();
    const { data, error } = useGetAssessmentQuery();

    // Select assessment from Redux store
    const assessment: AssessmentType[] = useSelector((state: RootState) => selectAssessment(state));

    // Effect to update Redux store on data change
    useEffect(() => {
        if (data ) {
            dispatch(setAssessment(data.content));

        }
        if (error) {
            console.error("Failed to load assessment", error);
        }
    }, [data, error, dispatch]);

    return (
        <main className="flex flex-col h-full w-full p-9">
            <h2 className="text-4xl text-lms-primary font-bold">Assessment</h2>
            <InstructorCourseAssesmentDataTable columns={InstructorCourseAssessmentColumns} data={assessment} />
        </main>
    );
}
