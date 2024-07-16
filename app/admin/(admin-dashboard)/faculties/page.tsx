'use client'
import React, {useEffect} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {FacultyTable} from "@/components/admincomponent/faculties/faculty/data-table";
import {facultyColumns} from "@/components/admincomponent/faculties/faculty/columns";
import {DegreeTable} from "@/components/admincomponent/faculties/degree/data-table";
import {degreeColumns} from "@/components/admincomponent/faculties/degree/columns";
import {StudyProgramTable} from "@/components/admincomponent/faculties/studygrogram/data-table";
import {studyProgramColumns} from "@/components/admincomponent/faculties/studygrogram/columns";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {
    selectFaculty,
    setFaculties,
    selectLoading,
    selectError
} from "@/lib/features/admin/faculties/faculty/facultySlice";
import {selectDegree, setDegrees} from "@/lib/features/admin/faculties/degree/degreeSlice";
import {selectStudyProgram, setStudyPrograms} from "@/lib/features/admin/faculties/studyProgram/studyProgramSlice";
import {selectSubject, setSubjects} from "@/lib/features/admin/faculties/subject/subjectSlice";
import {SubjectTable} from "@/components/admincomponent/faculties/subject/data-table";
import {subjectColumns} from "@/components/admincomponent/faculties/subject/columns";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculties/faculty/faculty";
import {useGetDegreesQuery} from "@/lib/features/admin/faculties/degree/degree";
import {useGetStudyProgramsQuery} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {useGetSubjectsQuery} from "@/lib/features/admin/faculties/subject/subject";
import {useGetAcademicYearsQuery} from "@/lib/features/admin/faculties/acdemicYear-management/academicYear";
import {
    selectAcademicYear,
    setAcademicYears
} from "@/lib/features/admin/faculties/acdemicYear-management/academicYearSlice";
import {academicYearColumns} from "@/components/admincomponent/faculties/academicyear/columns";
import {AcademicYearTable} from "@/components/admincomponent/faculties/academicyear/data-table";
import {useGetBannersQuery} from "@/lib/features/admin/faculties/banner/banner";
import {selectBanner, setBanners} from "@/lib/features/admin/faculties/banner/bannerSlice";
import {BannerTable} from "@/components/admincomponent/faculties/banner/data-table";
import {bannerColumns} from "@/components/admincomponent/faculties/banner/columns";

const useFetchData = (queryHook: any, selector: any, action: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const {data, error, isLoading} = queryHook({page: 0, pageSize: 10});
    const stateData = useSelector((state: RootState) => selector(state));
    const loading = useSelector(selectLoading);
    const err = useSelector(selectError);

    useEffect(() => {
        if (data) {
            dispatch(action(data.content));
        }
    }, [data, err, dispatch]);

    return {stateData, loading, error};
};

export default function Faculty() {
    const faculties = useFetchData(useGetFacultiesQuery, selectFaculty, setFaculties);
    const degrees = useFetchData(useGetDegreesQuery, selectDegree, setDegrees);
    const studyPrograms = useFetchData(useGetStudyProgramsQuery, selectStudyProgram, setStudyPrograms);
    const subjects = useFetchData(useGetSubjectsQuery, selectSubject, setSubjects);
    const academicYears = useFetchData(useGetAcademicYearsQuery, selectAcademicYear, setAcademicYears);
    const banner = useFetchData(useGetBannersQuery, selectBanner, setBanners);

    return (
        <section className="flex flex-col h-full w-full p-9 dark:bg-gray-900 dark:text-black">
            <section>
                <h1 className="mb-6 text-3xl font-bold text-lms-primary dark:text-blue-400">
                    Faculty Management
                </h1>

                <Tabs defaultValue="faculty" className="w-full">
                    <TabsList className="dark:bg-gray-800">
                        <TabsTrigger value="faculty"
                                     className="dark:text-gray-300 dark:hover:text-white">Faculty</TabsTrigger>
                        <TabsTrigger value="degree"
                                     className="dark:text-gray-300 dark:hover:text-white">Degree</TabsTrigger>
                        <TabsTrigger value="study-program" className="dark:text-gray-300 dark:hover:text-white">Study
                            Program</TabsTrigger>
                        <TabsTrigger value="subject"
                                     className="dark:text-gray-300 dark:hover:text-white">Subject</TabsTrigger>
                        <TabsTrigger value="academic-year"
                                     className="dark:text-gray-300 dark:hover:text-white">Academic Year</TabsTrigger>
                        <TabsTrigger value="banner"
                                     className="dark:text-gray-300 dark:hover:text-white">Banner</TabsTrigger>
                    </TabsList>

                    <TabsContent value="faculty">
                        <FacultyTable columns={facultyColumns} data={faculties.stateData}/>
                    </TabsContent>

                    <TabsContent value="degree">
                        <DegreeTable columns={degreeColumns} data={degrees.stateData}/>
                    </TabsContent>

                    <TabsContent value="study-program">
                        <StudyProgramTable columns={studyProgramColumns} data={studyPrograms.stateData}/>
                    </TabsContent>

                    <TabsContent value="subject">
                        <SubjectTable columns={subjectColumns} data={subjects.stateData}/>
                    </TabsContent>

                    <TabsContent value="academic-year">
                        <AcademicYearTable columns={academicYearColumns} data={academicYears.stateData}/>
                    </TabsContent>

                    <TabsContent value="banner">
                        <BannerTable columns={bannerColumns} data={banner.stateData}/>
                    </TabsContent>
                </Tabs>
            </section>
        </section>
    );
}