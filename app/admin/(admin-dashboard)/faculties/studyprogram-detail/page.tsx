import StudyDetailtTable from "@/components/admincomponent/faculties/studygrogram/studyprogram-detail/studydetail";
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator
} from "@/components/ui/breadcrumb";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import Link from "next/link";
import React from "react";

export default function Users() {
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
                    <h3 className="font-semibold text-lms-primary">Introduction to IT</h3>
                </BreadcrumbList>
            </Breadcrumb>

            <h2 className="text-4xl text-lms-primary font-bold">Users</h2>
            <section className="flex flex-grow flex-col gap-6 bg-white p-6">
                <div className="h-[320px] w-full">
                    <img
                        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZXjepWYAs3SG7SLeOGNs7umAqeKkYOkL00tdTg5Ci9DcuxdAh"
                        alt="banner"
                        className="h-full w-full object-cover"
                    />
                </div>
                <h2 className="text-2xl text-lms-primary font-semibold">
                    SOFTWARE ENGINEERING
                </h2>
                <p className="text-xl font-normal">
                    This software engineering major prepares students for careers in
                    software engineering by teaching the complete process and methods,
                    including gathering business requirements, designing software
                    architecture, developing software, testing, and managing projects. The
                    curriculum focuses on essential skills like algorithm problem solving
                    and system design. Through project-based learning, students gain
                    industry-level experience early on by working in teams and using the
                    latest tools and technologies. This hands-on approach develops skills
                    in communication, problem-solving, and teamwork. Additionally, a
                    one-year industry placement provides real-world experience. Graduates
                    are ready for roles such as software developer, full-stack developer,
                    DevOps engineer, software architect, and more, with opportunities in
                    various sectors like healthcare, finance, technology, and government.
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
                    <TabsTrigger value="foundation-year">Foundation Year</TabsTrigger>
                    <TabsTrigger value="second-year">Second Year</TabsTrigger>
                    <TabsTrigger value="third-year">Third Year</TabsTrigger>
                    <TabsTrigger value="fourth-year">Fourth Year</TabsTrigger>
                </TabsList>

                <TabsContent value="foundation-year" className="flex flex-col gap-6">
                    <div className="bg-lms-primary w-full h-[50px] flex items-center p-6">
                        <p className="text-2xl text-white">FOUNDATION YEAR</p>
                    </div>
                    <StudyDetailtTable/>
                </TabsContent>

                <TabsContent value="second-year" className="flex flex-col gap-6">
                    <div className="bg-lms-primary w-full h-[50px] flex items-center p-6">
                        <p className="text-2xl text-white">SECOND YEAR</p>
                    </div>
                    <StudyDetailtTable/>
                </TabsContent>

                <TabsContent value="third-year" className="flex flex-col gap-6">
                    <div className="bg-lms-primary w-full h-[50px] flex items-center p-6">
                        <p className="text-2xl text-white">THIRD YEAR</p>
                    </div>
                    <StudyDetailtTable/>
                </TabsContent>

                <TabsContent value="fourth-year" className="flex flex-col gap-6">
                    <div className="bg-lms-primary w-full h-[50px] flex items-center p-6">
                        <p className="text-2xl text-white">FOURTH YEAR</p>
                    </div>
                    <StudyDetailtTable/>
                </TabsContent>
            </Tabs>
        </main>
    );
}
