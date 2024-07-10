"use client"
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetStuProByAliasQuery} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {useGetYearStuProsQuery} from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuPro";
import {
    selectSetupStuPro,
    setSetupStudyPrograms
} from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuProSlice";
import Image from "next/image";
import {
    StudyProgramDetailTable
} from "@/components/admincomponent/faculties/studygrogram/studyprogram-detail/data-table";
import {
    studyProgramDetailColumns
} from "@/components/admincomponent/faculties/studygrogram/studyprogram-detail/columns";


type PropsParams = {
    params: {
        alias: string;
    };
};

export default function Users(props: PropsParams) {

    console.log("props", props)

    const alias = props.params.alias;
    const dispatch = useDispatch<AppDispatch>();

    const {data: stuProData, isSuccess} = useGetStuProByAliasQuery(alias);

    console.log("stuProData", stuProData?.studyProgramName)

    const {
        data: setupStuProsData,
    } = useGetYearStuProsQuery(alias);
    const setupStuPros = useSelector((state: RootState) => selectSetupStuPro(state));

    const [currentYear, setCurrentYear] = useState(1);

    useEffect(() => {
        if (setupStuProsData) {
            dispatch(setSetupStudyPrograms(setupStuProsData.content));
        }
    }, [setupStuProsData, dispatch]);

    const filterDataByYearAndSemester = (year: number, semester: number) => {
        return setupStuPros.filter((item: any) => item.yearOfStudy?.year === year && item.yearOfStudy?.semester === semester);
    };


    return (
        <main className="flex flex-col h-full p-9 gap-6">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href="/admin/faculties" legacyBehavior>
                                <a> Study Program</a>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <h3 className="font-semibold text-lms-primary">{stuProData?.studyProgramName}</h3>
                </BreadcrumbList>
            </Breadcrumb>

            <section className="flex flex-grow flex-col gap-6 bg-white p-6">
                <div className="h-[320px] w-full">
                    <div style={{position: 'relative', width: '100%', height: '100%'}}>
                        <Image
                            src={stuProData?.logo}
                            alt="preview"
                            fill
                            style={{objectFit: 'contain'}}
                        />
                    </div>
                </div>
                <h2 className="text-2xl text-lms-primary font-semibold">
                    {stuProData?.studyProgramName}
                </h2>
                <p className="text-xl font-normal">
                    {stuProData?.description || "No description"}
                </p>

                <h2 className="text-2xl text-lms-primary font-semibold">
                    LEARNING OUTCOME
                </h2>

                <div>
                    <p className="text-xl font-normal">
                        Upon completion of this program, the students will be able to:
                    </p>
                    <ul className="list-disc pl-5 text-xl font-normal">
                        <li>Develop a website or web application</li>
                        <li>Develop mobile application</li>
                        <li>Analysis and design database</li>
                        <li>
                            Understand the social and ethical implications of working as a
                            professional in the field of computer science
                        </li>
                        <li>
                            Critically analyze a problem and design, implement, and evaluate a
                            computer solution that meets the requirement
                        </li>
                        <li>
                            Work effectively in small groups on medium-scale computing
                            projects
                        </li>
                    </ul>
                </div>

                <h2 className="text-2xl text-lms-primary font-semibold">CAREER</h2>
                <div>
                    <p className="text-xl font-normal">
                        Video Link:
                        <span className="font-semibold">
              {" "}
                            https://www.youtube.com/watch?v=7_7g5IHu0rs&list=PL_V2z3lwuCDf3_po8kU0tJBydjOIOzk6U&index=1&t=1s
            </span>
                    </p>
                    <ul className="list-disc pl-5 text-xl font-normal">
                        <li>Software Developer (Web, Mobile, Java, API…)</li>
                        <li>Data Analyst</li>
                        <li>IT Project Manager</li>
                        <li>Digital Innovator</li>
                        <li>Quality Assurance Engineer</li>
                        <li>Database Designer and Administrator</li>
                    </ul>
                </div>
            </section>

            <Tabs defaultValue="foundation-year" className="w-full">
                <TabsList>
                    <TabsTrigger value="foundation-year" onClick={() => setCurrentYear(1)}>Foundation
                        Year</TabsTrigger>
                    <TabsTrigger value="second-year" onClick={() => setCurrentYear(2)}>Second Year</TabsTrigger>
                    <TabsTrigger value="third-year" onClick={() => setCurrentYear(3)}>Third Year</TabsTrigger>
                    <TabsTrigger value="fourth-year" onClick={() => setCurrentYear(4)}>Fourth Year</TabsTrigger>
                </TabsList>


                <TabsContent value="foundation-year" className={`flex gap-4`}>
                    {/* First Table for Year Filter */}
                    <StudyProgramDetailTable
                        alias={alias}
                        currentYear={currentYear}
                        columns={studyProgramDetailColumns}
                        data={filterDataByYearAndSemester(1, 1)}
                    />
                    {/* Second Table for Semester Filter */}
                    <StudyProgramDetailTable
                        alias={alias}
                        currentYear={currentYear}
                        columns={studyProgramDetailColumns}
                        data={filterDataByYearAndSemester(1, 2)}
                    />
                </TabsContent>

                <TabsContent value="second-year" className={`flex gap-4`}>
                    {/* First Table for Year Filter */}
                    <StudyProgramDetailTable
                        alias={alias}
                        currentYear={currentYear}
                        columns={studyProgramDetailColumns}
                        data={filterDataByYearAndSemester(2, 1)}
                    />
                    {/* Second Table for Semester Filter */}
                    <StudyProgramDetailTable
                        alias={alias}
                        currentYear={currentYear}
                        columns={studyProgramDetailColumns}
                        data={filterDataByYearAndSemester(2, 2)}
                    />
                </TabsContent>

                <TabsContent value="third-year" className={`flex gap-4`}>
                    {/* First Table for Year Filter */}
                    <StudyProgramDetailTable
                        alias={alias}
                        currentYear={currentYear}
                        columns={studyProgramDetailColumns}
                        data={filterDataByYearAndSemester(3, 1)}
                    />
                    {/* Second Table for Semester Filter */}
                    <StudyProgramDetailTable
                        alias={alias}
                        currentYear={currentYear}
                        columns={studyProgramDetailColumns}
                        data={filterDataByYearAndSemester(3, 2)}
                    />
                </TabsContent>
                <TabsContent value="fourth-year" className={`flex gap-4`}>
                    {/* First Table for Year Filter */}
                    <StudyProgramDetailTable
                        alias={alias}
                        currentYear={currentYear}
                        columns={studyProgramDetailColumns}
                        data={filterDataByYearAndSemester(4, 1)}
                    />
                    
                    {/* Second Table for Semester Filter */}
                    <StudyProgramDetailTable
                        alias={alias}
                        currentYear={currentYear}
                        columns={studyProgramDetailColumns}
                        data={filterDataByYearAndSemester(4, 2)}
                    />
                </TabsContent>
            </Tabs>
        </main>
    );
}
