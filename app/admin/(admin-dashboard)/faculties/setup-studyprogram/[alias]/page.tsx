"use client";
import React, {useEffect, useMemo} from "react";
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
    selectError,
    selectSetupStuPro,
    setSetupStudyPrograms,
} from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuProSlice";
import {selectLoading} from "@/lib/features/admin/faculties/studyProgram/studyProgramSlice";
import {useGetYearStuProsQuery} from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuPro";

type PropsParams = {
    params: {
        alias: string;
    };
};

export default function SetupStuPro(props: PropsParams) {
    const alias = props.params.alias;
    const dispatch = useDispatch<AppDispatch>();

    const {
        data: setupStuProsData,
        error: setupStuProsError,
        isLoading: setupStuProsLoading,
    } = useGetYearStuProsQuery(alias);
    const setupStuPros = useSelector((state: RootState) => selectSetupStuPro(state));
    const setupStuProLoading = useSelector(selectLoading);
    const setupStuProError = useSelector(selectError);

    useEffect(() => {
        if (setupStuProsData) {
            dispatch(setSetupStudyPrograms(setupStuProsData.content));
        }
    }, [setupStuProsData, setupStuProError, dispatch]);

    const filterDataByYear = (year: number) => {
        return setupStuPros.filter((item: any) => item.year === year);
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
                    <h3 className="font-semibold text-lms-primary">{alias}</h3>
                </BreadcrumbList>
            </Breadcrumb>
            <div>
                <h1 className="mb-6 text-3xl font-bold text-lms-primary">
                    Faculty Management
                </h1>
                <Tabs defaultValue="foundation-year" className="w-full">
                    <TabsList>
                        <TabsTrigger value="foundation-year">Foundation Year</TabsTrigger>
                        <TabsTrigger value="second-year">Second Year</TabsTrigger>
                        <TabsTrigger value="third-year">Third Year</TabsTrigger>
                        <TabsTrigger value="fourth-year">Fourth Year</TabsTrigger>
                    </TabsList>
                    <TabsContent value="foundation-year">
                        <SetupStudyProgramTable
                            columns={setupStudyProgramColumns}
                            data={filterDataByYear(1)}
                        />
                    </TabsContent>
                    <TabsContent value="second-year">
                        <SetupStudyProgramTable
                            columns={setupStudyProgramColumns}
                            data={filterDataByYear(2)}
                        />
                    </TabsContent>
                    <TabsContent value="third-year">
                        <SetupStudyProgramTable
                            columns={setupStudyProgramColumns}
                            data={filterDataByYear(3)}
                        />
                    </TabsContent>
                    <TabsContent value="fourth-year">
                        <SetupStudyProgramTable
                            columns={setupStudyProgramColumns}
                            data={filterDataByYear(4)}
                        />
                    </TabsContent>
                </Tabs>
            </div>
        </section>
    );
}