'use client'
import React, {useEffect} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {FacultyTable} from "@/components/admincomponent/faculties/faculty/data-table";
import {facultyColumns} from "@/components/admincomponent/faculties/faculty/columns";
import {DegreeTable} from "@/components/admincomponent/faculties/degree/data-table";
import {degreeColumns} from "@/components/admincomponent/faculties/degree/columns";
import {StudyProgramTable} from "@/components/admincomponent/faculties/studygrogram/data-table";
import {studyProgramColumns} from "@/components/admincomponent/faculties/studygrogram/columns";
// import {SubjectTable} from "@/components/admincomponent/faculties/subject/data-table";
// import {subjectColumns} from "@/components/admincomponent/faculties/subject/columns";
import {useAppSelector} from "@/lib/hook";
import {selectToken} from "@/lib/features/auth/authSlice";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculty";
import {useGetDegreesQuery} from "@/lib/features/admin/degree";
import {useGetStudyProgramsQuery} from "@/lib/features/admin/studyprogram";

export default function Page() {
    const token = useAppSelector(selectToken);

    // console.log("token from admin: ", token)

    const {
        data: facultiesData,
        error: facultiesError,
        isLoading: facultiesLoading,
        isFetching: facultiesFetching
    } = useGetFacultiesQuery({
        page: 0,
        pageSize: 10,
    });

    const {
        data: degreesData,
        error: degreesError,
        isLoading: degreesLoading,
        isFetching: degreesFetching
    } = useGetDegreesQuery({
        page: 0,
        pageSize: 10,
    });

    const {
        data: studyProgramsData,
        error: studyProgramsError,
        isLoading: studyProgramsLoading,
        isFetching: studyProgramsFetching
    } = useGetStudyProgramsQuery({
        page: 0,
        pageSize: 10,
    });

    useEffect(() => {
        if (facultiesData) {
            console.log('Fetched Faculties Data:', facultiesData.content);
        }
        if (facultiesError) {
            console.error('Error fetching faculties:', facultiesError);
        }
    }, [facultiesData, facultiesError]);

    useEffect(() => {
        if (degreesData) {
            console.log('Fetched Degrees Data:', degreesData.content);
        }
        if (degreesError) {
            console.error('Error fetching degrees:', degreesError);
        }
    }, [degreesData, degreesError]);

    useEffect(() => {
        if (studyProgramsData) {
            console.log('Fetched study Programs Data:', studyProgramsData.content);
        }
        if (studyProgramsError) {
            console.error('Error fetching study Programs:', studyProgramsError);
        }
    }, [studyProgramsData, studyProgramsError]);

    if (facultiesLoading || degreesLoading || studyProgramsLoading) return <div>Loading...</div>;

    return (
        <section className="flex flex-col h-full w-full p-9 dark:bg-gray-900 dark:text-black">
            <section>
                <h1 className="mb-6 text-3xl font-bold text-lms-primary dark:text-blue-400">
                    Faculty Management
                </h1>

                <Tabs defaultValue="faculty" className="w-full">
                    <TabsList className="dark:bg-gray-800">
                        <TabsTrigger
                            value="faculty"
                            className="dark:text-gray-300 dark:hover:text-white"
                        >
                            Faculty
                        </TabsTrigger>
                        <TabsTrigger
                            value="degree"
                            className="dark:text-gray-300 dark:hover:text-white"
                        >
                            Degree
                        </TabsTrigger>
                        <TabsTrigger
                            value="study-program"
                            className="dark:text-gray-300 dark:hover:text-white"
                        >
                            Study Program
                        </TabsTrigger>
                        <TabsTrigger
                            value="subject"
                            className="dark:text-gray-300 dark:hover:text-white"
                        >
                            Subject
                        </TabsTrigger>
                    </TabsList>

                    <TabsContent value="faculty">
                        <FacultyTable columns={facultyColumns} data={facultiesData.content}/>
                    </TabsContent>

                    <TabsContent value="degree">
                        <DegreeTable columns={degreeColumns} data={degreesData.content}/>
                    </TabsContent>

                    <TabsContent value="study-program">
                        <StudyProgramTable columns={studyProgramColumns} data={studyProgramsData.content}/>
                    </TabsContent>

                    <TabsContent value="subject">
                        {/*<SubjectTable columns={subjectColumns} data={subData}/>*/}
                    </TabsContent>
                </Tabs>
            </section>
        </section>
    );
}
