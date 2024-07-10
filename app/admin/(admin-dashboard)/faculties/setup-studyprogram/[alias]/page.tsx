"use client";
import React, {useEffect, useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import Link from "next/link";
import {SetupStudyProgramTable} from "@/components/admincomponent/faculties/studygrogram/setup-studyprogram/data-table";
import {setupStudyProgramColumns} from "@/components/admincomponent/faculties/studygrogram/setup-studyprogram/columns";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {
    selectSetupStuPro,
    setSetupStudyPrograms,
} from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuProSlice";
import {useGetYearStuProsQuery} from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuPro";
import {useGetStuProByAliasQuery} from "@/lib/features/admin/faculties/studyProgram/studyprogram";

type PropsParams = {
    params: {
        alias: string;
    };
};

export default function SetupStuPro(props: PropsParams) {

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

    const filterDataByYear = (year: number) => {
        return setupStuPros.filter((item: any) => item.yearOfStudy.year === year);
    };

    return (
        <section className="flex flex-col h-full w-full p-9">
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink>
                            <Link href="/admin/faculties" legacyBehavior>
                                <a>Study Program</a>
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator/>
                    <h3 className="font-semibold text-lms-primary">{stuProData?.studyProgramName}</h3>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <h1 className="mb-6 text-3xl font-bold text-lms-primary">
                    Faculty Management
                </h1>
                <Tabs defaultValue="foundation-year" className="w-full">
                    <TabsList>
                        <TabsTrigger value="foundation-year" onClick={() => setCurrentYear(1)}>Foundation
                            Year</TabsTrigger>
                        <TabsTrigger value="second-year" onClick={() => setCurrentYear(2)}>Second Year</TabsTrigger>
                        <TabsTrigger value="third-year" onClick={() => setCurrentYear(3)}>Third Year</TabsTrigger>
                        <TabsTrigger value="fourth-year" onClick={() => setCurrentYear(4)}>Fourth Year</TabsTrigger>
                    </TabsList>


                    <TabsContent value="foundation-year">
                        <SetupStudyProgramTable
                            alias={alias}
                            currentYear={currentYear}
                            columns={setupStudyProgramColumns}
                            data={filterDataByYear(1)}
                        />
                    </TabsContent>

                    <TabsContent value="second-year">
                        <SetupStudyProgramTable
                            alias={alias}
                            currentYear={currentYear}
                            columns={setupStudyProgramColumns}
                            data={filterDataByYear(2)}
                        />
                    </TabsContent>

                    <TabsContent value="third-year">
                        <SetupStudyProgramTable
                            alias={alias}
                            currentYear={currentYear}
                            columns={setupStudyProgramColumns}
                            data={filterDataByYear(3)}
                        />
                    </TabsContent>
                    <TabsContent value="fourth-year">
                        <SetupStudyProgramTable
                            alias={alias}
                            currentYear={currentYear}
                            columns={setupStudyProgramColumns}
                            data={filterDataByYear(4)}
                        />
                    </TabsContent>
                </Tabs>
                {/*<AddSubjectStudyProForm alias={alias} year={currentYear}/>*/}
            </div>
        </section>
    );
}