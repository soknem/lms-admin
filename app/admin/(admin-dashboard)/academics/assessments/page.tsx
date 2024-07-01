'use client'
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";

// transcript import
import {TranscriptType} from "@/lib/types/admin/academics";
import transcripts from "@/app/admin/(admin-dashboard)/academics/assessments/data/transcripts.json"

//each semester import
import {semesterAssessementType} from "@/lib/types/admin/academics";
import semesterAssessments from "@/app/admin/(admin-dashboard)/academics/assessments/data/semesterAssessments.json"

//each course import
import {courseAssessmentType , courseAssessmentTableType} from "@/lib/types/admin/academics";
import courseAssesment from "@/app/admin/(admin-dashboard)/academics/assessments/data/courseAssesment.json"
import React, {useEffect} from "react";
import {TranscriptDataTable} from "@/components/admincomponent/academics/assesments/transcript/data-table";
import {TranscriptColumns} from "@/components/admincomponent/academics/assesments/transcript/columns";
import {CourseAssesmentDataTable} from "@/components/admincomponent/academics/assesments/eachCourse/data-table";
import {CourseAssessmentColumns} from "@/components/admincomponent/academics/assesments/eachCourse/columns";
import {SemesterDataTable} from "@/components/admincomponent/academics/assesments/eachSemester/data-table";
import {
    eachSemesterColumn,
}
    from "@/components/admincomponent/academics/assesments/eachSemester/columns";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetAssessmentQuery} from "@/lib/features/admin/academic-management/assesment/assessment";
import {
    selectAssessment,setAssessment
} from "@/lib/features/admin/academic-management/assesment/assessmentSlice";

export default function Assessment() {

    const dispatch = useDispatch<AppDispatch>();

    const { data, error, isLoading } = useGetAssessmentQuery({ page: 0, pageSize: 10 });

    const CourseAssessmentData = useSelector((state: RootState) => selectAssessment(state));

    useEffect(() => {
        if(data) {
            dispatch(setAssessment(data.content))
        }
        if(error){
            console.error("failed to load assessment", error);
        }
    }, [data, error, dispatch]);

    // console.log("assessment from page: " , CourseAssessmentData)

    const transcriptData: TranscriptType[] = transcripts;

    const semesterData: semesterAssessementType[] = semesterAssessments;

    // filter course data from response
    // const transformData = (data: courseAssessmentType[]): courseAssessmentTableType[] => {
    //     return data.map(item => ({
    //         uuid: item.uuid,
    //         cardId: 'N/A',
    //         nameEn: item.student.nameEn,
    //         gender: item.student.gender,
    //         dob: item.student.dob,
    //         class:  'N/A',
    //         course: item.course ? item.course.title : 'N/A',
    //         midtermExamScore: item.midtermExamScore,
    //         finalExamScore: item.finalExamScore,
    //         attendanceScore: item.attendanceScore,
    //         assignmentScore: item.assignmentScore,
    //         miniProjectScore: item.miniProjectScore,
    //         activityScore: item.activityScore,
    //         status: item.isDeleted ? 0 : 1,
    //     }));
    // };

    // const courseData: courseAssessmentTableType[] = transformData(CourseAssessmentData);

    // console.log("data after filter: " , courseData)

    return (
        <main className="flex flex-col gap-4 h-full w-full p-9">
            <h2 className="text-3xl text-lms-primary font-bold">Assesments</h2>
            <Tabs defaultValue="transcript" className="w-full">

                <TabsList className="grid w-[400px] grid-cols-3">
                    <TabsTrigger value="transcript">Transcript</TabsTrigger>
                    <TabsTrigger value="semester">Each Semester</TabsTrigger>
                    <TabsTrigger value="course">Each Courses</TabsTrigger>
                </TabsList>

                <TabsContent value="transcript">
                    <TranscriptDataTable columns={TranscriptColumns} data={transcriptData}/>
                </TabsContent>

                <TabsContent value="semester">
                    <SemesterDataTable columns={eachSemesterColumn} data={semesterData}/>
                </TabsContent>

                <TabsContent value="course">
                    {/*<CourseAssesmentDataTable columns={CourseAssessmentColumns} data={courseData}/>*/}

                </TabsContent>
            </Tabs>
        </main>
    );
}