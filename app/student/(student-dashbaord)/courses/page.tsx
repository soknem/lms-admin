"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { FaSearch } from "react-icons/fa";
import { FaBook } from "react-icons/fa6";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { TbFilter } from "react-icons/tb";
import { useGetStudentCourseQuery } from "@/lib/features/student/course/studentCourse";
import { StudentCourseType, CourseType } from "@/lib/types/student/course";
import LoadingComponent from "@/app/student/(student-dashbaord)/loading";
import { CardCourseComponent } from "@/components/studentcomponent/courses/card/CardCourseComponent";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { useRouter } from "next/navigation";
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

export default function Course() {
    const { data = {}, error, isLoading} = useGetStudentCourseQuery();
    const [allData, setData] = useState<StudentCourseType | null>(null);
    const [openCourse, setOpenCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = useState<number | null>(null);
    const [filteredCourses, setFilteredCourses] = useState<CourseType[]>([]);
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [page, setPage] = useState(1);
    const itemsPerPage = 25; // Number of items per page
    const router = useRouter();

    useEffect(() => {
        if (data && data.courses) {
            setData(data);
        }
    }, [data]);

    useEffect(() => {
        let filtered = allData?.courses || [];
        if (selectedCourse) {
            const selectedCourseNumber = Number(selectedCourse);
            filtered = filtered.filter((course: CourseType) => course.semester === selectedCourseNumber);
        }
        if (searchTerm) {
            filtered = filtered.filter((course: CourseType) =>
                course.title.toLowerCase().includes(searchTerm.toLowerCase())
            );
        }
        setFilteredCourses(filtered);
    }, [selectedCourse, searchTerm, allData]);



    if (isLoading || !allData) {
        return <LoadingComponent />;
    }

    const filterBySemester = allData.courses.reduce((semester: number[], item: CourseType) => {
        if (!semester.includes(item.semester as number)) {
            semester.push(item.semester as number);
        }
        return semester;
    }, []);

    const handleReset = () => {
        setSelectedCourse(null);
    };

    const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleChangePage = (event: React.ChangeEvent<unknown>, value: number) => {
        setPage(value);
    };

    // Calculate paginated courses
    const paginatedCourses = filteredCourses.slice((page - 1) * itemsPerPage, page * itemsPerPage);

    return (
        <main className="flex flex-col h-full w-full p-9 gap-4">
            <section className="bg-lms-primary w-full rounded-xl relative flex items-center justify-center p-8">
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
                            src={allData.profileImage || "https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg"}
                            alt="student"
                            className="h-full w-full object-cover rounded-full"
                        />
                    </div>
                    <div className="flex flex-col justify-end">
                        <h3 className="text-3xl font-bold">{allData.nameEn}</h3>
                        <div className="flex items-center gap-3">
                            <FaBook className="w-4 h-4 text-lms-primary" />
                            <p className="text-lg text-gray-800 font-semibold">{allData.courses.length} Courses</p>
                        </div>
                    </div>
                </section>
            </section>

            <section className="mt-24 flex items-center flex-col gap-4 justify-between w-full max-w-6xl mx-auto">
                <div className="flex items-start py-4 w-full gap-4">
                    <div className="flex items-center w-full relative">
                        <Input
                            placeholder="Search Course"
                            className="border-[#E6E6E6] placeholder:font-semibold placeholder-lms-black-90 placeholder-t bg-white rounded-[10px] pl-10 text-lms-gray-30 w-full"
                            onChange={handleSearch}
                            value={searchTerm}
                        />
                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400" />
                        </div>
                    </div>

                    <Popover open={openCourse} onOpenChange={setOpenCourse}>
                        <PopoverTrigger asChild>
                            <Button
                                variant="outline"
                                className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60 w-[250px]"
                            >
                                <TbFilter className="mr-2 h-4 w-4" />
                                {selectedCourse ? <>{selectedCourse}</> : <> Filter by semester </>}
                            </Button>
                        </PopoverTrigger>

                        <PopoverContent className="w-[207px] p-0 bg-white" align="start">
                            <Command>
                                <CommandInput className="text-gray-500" placeholder="Filter Semester..." />
                                <CommandList>
                                    <CommandEmpty>No results found.</CommandEmpty>
                                    <CommandGroup>
                                        {filterBySemester.map((semester: number, index: number) => (
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

                <div className="grid grid-cols-1 xl:grid-cols-2 justify-center gap-4">
                    {paginatedCourses.map((course: CourseType, index: number) => (
                        <CardCourseComponent
                            key={index}
                            onClick={() => router.push(`/student/courses/${course.uuid}`)}
                            title={course.title || 'No title'}
                            credit={course.credit || 0}
                            semester={course.semester || 0}
                            year={course.year || 0}
                            description={course.description || 'No description available'}
                            uuid={course.uuid}
                            logo={course.logo || 'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/991px-Placeholder_view_vector.svg.png'}
                            progress={course.progress || 0}
                            instructorProfileImage={course.instructorProfileImage || 'https://i.pinimg.com/564x/25/ee/de/25eedef494e9b4ce02b14990c9b5db2d.jpg'}
                            instructorName={course.instructorName || 'Unknown Instructor'}
                        />
                    ))}
                </div>

                <Stack spacing={2} className="mb-10 w-full">
                    <Pagination
                        className="flex w-full justify-end"
                        count={Math.ceil(filteredCourses.length / itemsPerPage)}
                        variant="outlined"
                        shape="rounded"
                        page={page}
                        onChange={handleChangePage}
                    />
                </Stack>
            </section>
        </main>
    );
}
