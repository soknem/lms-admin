'use client'
import React, {useEffect} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {FacultyTable} from "@/components/admincomponent/faculties/faculty/data-table";
import {facultyColumns} from "@/components/admincomponent/faculties/faculty/columns";
import {DegreeTable} from "@/components/admincomponent/faculties/degree/data-table";
import {degreeColumns} from "@/components/admincomponent/faculties/degree/columns";
import {StudyProgramTable} from "@/components/admincomponent/faculties/studygrogram/data-table";
import {studyProgramColumns} from "@/components/admincomponent/faculties/studygrogram/columns";
import {selectToken} from "@/lib/features/auth/authSlice";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculties/faculty/faculty";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";

import {useGetDegreesQuery} from "@/lib/features/admin/faculties/degree/degree";
import {selectDegree, setDegrees} from "@/lib/features/admin/faculties/degree/degreeSlice";
import {useGetStudyProgramsQuery} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {selectStudyProgram, setStudyPrograms} from "@/lib/features/admin/faculties/studyProgram/studyProgramSlice";
import {selectSubject, setSubjects} from "@/lib/features/admin/faculties/subject/subjectSlice";
import {SubjectTable} from "@/components/admincomponent/faculties/subject/data-table";
import {subjectColumns} from "@/components/admincomponent/faculties/subject/columns";
import {useGetSubjectsQuery} from "@/lib/features/admin/faculties/subject/subject";
import {
    selectError,
    selectFaculty,
    selectLoading,
    setFaculties
} from "@/lib/features/admin/faculties/faculty/facultySlice";
import CourseFilterComponent from "@/components/card/filter/FIlterCourseCardComponent";
import Error404Component from "@/components/errorPage/Error404Component";

export default function Page() {
    const dispatch = useDispatch<AppDispatch>();

    // Faculty data
    const {
        data: facultiesData,
        error: facultiesError,
        isLoading: facultiesLoading,
    } = useGetFacultiesQuery({page: 0, pageSize: 10});
    const faculties = useSelector((state: RootState) => selectFaculty(state));
    const facLoading = useSelector(selectLoading);
    const fecError = useSelector(selectError);

    useEffect(() => {
        if (facultiesData) {
            dispatch(setFaculties(facultiesData.content));
        }
    }, [facultiesData, fecError, dispatch]);


    // Degree data
    const {
        data: degreesData,
        error: degreesError,
        isLoading: degreesLoading,
    } = useGetDegreesQuery({page: 0, pageSize: 10});
    const degrees = useSelector((state: RootState) => selectDegree(state));
    const deLoading = useSelector(selectLoading);
    const deError = useSelector(selectError);

    useEffect(() => {
        if (degreesData) {
            dispatch(setDegrees(degreesData.content));
        }
    }, [degreesData, deError, dispatch]);

    // Study Program data
    const {
        data: studyProgramsData,
        error: studyProgramsError,
        isLoading: studyProgramsLoading,
    } = useGetStudyProgramsQuery({page: 0, pageSize: 10});
    const studyPrograms = useSelector((state: RootState) => selectStudyProgram(state));
    const stuProLoading = useSelector(selectLoading);
    const stuProError = useSelector(selectError);

    useEffect(() => {
        if (studyProgramsData) {
            dispatch(setStudyPrograms(studyProgramsData.content));
        }

    }, [studyProgramsData, stuProError, dispatch]);

    // Subject data
    const {
        data: subjectsData,
        error: subjectsError,
        isLoading: subjectsLoading,
    } = useGetSubjectsQuery({page: 0, pageSize: 10});
    const subjects = useSelector((state: RootState) => selectSubject(state));
    const subLoading = useSelector(selectLoading);
    const subError = useSelector(selectError);

    useEffect(() => {
        if (subjectsData) {
            dispatch(setSubjects(subjectsData.content));
        }

    }, [subjectsData, subError, dispatch]);


    return (
        <section className="flex flex-col h-full w-full p-9 dark:bg-gray-900 dark:text-black">
            <section>
                <Error404Component/>
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
                        <FacultyTable columns={facultyColumns} data={faculties}/>
                    </TabsContent>

                    <TabsContent value="degree">
                        <DegreeTable columns={degreeColumns} data={degrees}/>
                    </TabsContent>

                    <TabsContent value="study-program">
                        <StudyProgramTable columns={studyProgramColumns} data={studyPrograms}/>
                    </TabsContent>

                    <TabsContent value="subject">
                        <SubjectTable columns={subjectColumns} data={subjects}/>
                    </TabsContent>
                </Tabs>

            </section>
        </section>
    );
}