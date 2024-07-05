"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TbFilter } from "react-icons/tb";
import { useGetInstructorCourseQuery } from "@/lib/features/instructor/course/instructorCourse";
import { selectLoading, setLoading, selectError, setError, setCourses } from "@/lib/features/instructor/course/instructorcourseSlice";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "@/lib/store";
import { InstructorCourseType, CourseType } from "@/lib/types/instructor/course";
import { setAchievements } from "@/lib/features/student/achievement/achievementSlice";
import LoadingComponent from "@/app/student/(student-dashbaord)/loading";
import { CardCourseComponent } from "@/components/studentcomponent/courses/card/CardCourseComponent";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";

export default function Course() {
    const dispatch = useDispatch<AppDispatch>();
    const [page, setPage] = useState(0);  // Initialize page
    const [pageSize, setPageSize] = useState(10);  // Initialize pageSize
    const [searchTerm, setSearchTerm] = useState(""); // State to manage search term

    const { data = {}, error, isLoading } = useGetInstructorCourseQuery({ page, pageSize });
    const loading = useSelector(selectLoading);
    const fetchError = useSelector(selectError);
    const [allData, setData] = useState<InstructorCourseType | null>(null);
    const [openCourse, setOpenCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [filteredCourses, setFilteredCourses] = useState<CourseType[]>([]);

    useEffect(() => {
        if (data && data.content) {
            dispatch(setLoading());
            dispatch(setAchievements(data));
            setData(data);
            setFilteredCourses(data.content.flatMap((instructor: any) => instructor.courses)); // Set initial courses
        }
        if (error) {
            dispatch(setError(error.toString()));
        }
    }, [data, error, dispatch]);

    useEffect(() => {
        let courses = data.content?.flatMap((instructor: any) => instructor.courses) || [];
        if (selectedCourse) {
            const selectedCourseNumber = Number(selectedCourse);
            courses = courses.filter((course: CourseType) => course.semester === selectedCourseNumber);
        }
        if (searchTerm) {
            courses = courses.filter((course: CourseType) =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredCourses(courses);
    }, [selectedCourse, searchTerm, data.content]);

    if (!allData) {
        return <LoadingComponent />;
    }

    const handleReset = () => {
        setSelectedCourse(null);
        setSearchTerm("");
    };

    return (
        <div className="flex flex-col h-full w-full p-9 gap-4">
            <section className="bg-lms-primary w-full sm:h-[172px] rounded-xl relative flex items-center justify-center p-8">
                <div className="flex flex-col gap-4">
                    <h2 className="text-2xl sm:text-3xl font-bold text-white">
                        Welcome back, {allData.nameEn}!
                    </h2>
                    <p className="text-lg text-slate-50">
                        Passionate about literature and creative writing.
                    </p>
                </div>
                <section className="hidden lg:flex gap-9 absolute lg:left-1/6 top-[60px]">
                    <div className="w-[150px] h-[150px] rounded-full shadow-lg">
                        <img
                            src="https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"
                            alt="student"
                            className="h-full w-full object-cover rounded-full"
                        />
                    </div>
                    <div className="flex flex-col justify-end">
                        <h3 className="text-3xl font-bold">{allData.nameEn}</h3>
                        <div className="flex items-center gap-3">
                            <FaBook className="w-4 h-4 text-lms-primary" />
                            <p className="text-lg text-gray-800 font-semibold">{filteredCourses.length} Courses</p>
                        </div>
                    </div>
                </section>
            </section>

            <section className="mt-24 flex items-center flex-col gap-4 justify-between w-full max-w-6xl mx-auto">
                <div className="flex items-start py-4 w-full gap-4">
                    <div className="flex items-center w-full relative">
                        <Input
                            placeholder="Search Course"
                            className="border-[#E6E6E6] bg-white rounded-[10px] pl-10 text-lms-gray-30 w-full"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)} // Update search term state
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                    </div>

                    <Popover open={openCourse} onOpenChange={setOpenCourse}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60 w-[250px]" // Set a fixed width for the button
                            >
                                <TbFilter className="mr-2 h-4 w-4" />
                                {selectedCourse ? <>{selectedCourse}</> : <> Filter by semester </>}
                            </Button>
                        </PopoverTrigger>

                        {/* Set fixed width for PopoverContent */}
                        <PopoverContent className="w-[207px] p-0 bg-white" align="start">
                            <Command>
                                <CommandInput className="text-gray-500" placeholder="Filter Semester..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup>
                                        {data.content && data.content.flatMap((instructor: any) =>
                                            instructor.courses.reduce((semester: number[], item: CourseType) => {
                                                if (!semester.includes(item.semester)) {
                                                    semester.push(item.semester);
                                                }
                                                return semester;
                                            }, [])
                                        ).map((semester: number, index: number) => (
                                            <CommandItem
                                                key={index}
                                                value={semester.toString()}
                                                onSelect={() => {
                                                    setSelectedCourse(semester);
                                                    setOpenCourse(false);
                                                }}
                                            >
                                                {semester}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                            {selectedCourse && (
                                <Button className="bg-slate-50 hover:bg-slate-100 w-full rounded-lg text-red-600 hover:text-red-500 " onClick={handleReset}>
                                    Reset
                                </Button>
                            )}
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-4 w-full">
                    {filteredCourses.map((course: CourseType, index: number) => (
                        <CardCourseComponent
                            onClick={
                                () => {}
                            }
                            key={index}
                            title={course.title}
                            credit={course.credit}
                            semester={course.semester}
                            year={course.year}
                            description={course.description}
                            uuid={course.uuid}
                            logo={course.logo || 'default_logo_path'}
                            instructorAvatar={course.instructorAvatar || 'default_avatar_path'}
                            instructorName={course.instructorName || 'default_name'}
                        />
                    ))}
                </div>
            </section>
        </div>
    );
}
