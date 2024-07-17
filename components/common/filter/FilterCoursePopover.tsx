import React, { useState, useEffect } from 'react';
import { TbFilter } from 'react-icons/tb';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useGetCoursesQuery } from "@/lib/features/admin/academic-management/courses/courseApi";
import {useGetClassCourseByUuidQuery} from "@/lib/features/admin/academic-management/classes/classApi";

const FilterCoursePopover = ({ open, setOpen, selectedCourse, handleCourseChange, handleReset,classUuid } : any) => {
    const { data: courseData, error: courseError, isLoading: isCoursesLoading } = useGetClassCourseByUuidQuery(classUuid);
    const [courses, setCourses] = useState([]);

    useEffect(() => {
        if (courseData) {
            const formattedCourses = courseData.content.map((course : any) => ({
                alias: course.uuid, // Adjust as per your course data structure
                label: course.subject.title, // Adjust as per your course data structure
            }));
            setCourses(formattedCourses);
        }
        if (courseError) {
            console.error("Failed to load courses", courseError);
        }
    }, [courseData, courseError]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
                    <TbFilter className='mr-2 h-4 w-4' />
                    {selectedCourse.label ? <>{selectedCourse.label}</> : <>Filter by Course</>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                <Command>
                    <CommandInput placeholder="Filter Course..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {courses.map((course: any, index :any) => (
                                <CommandItem
                                    key={index}
                                    value={course.alias}
                                    onSelect={() => {
                                        handleCourseChange(course);
                                        setOpen(false);
                                    }}
                                >
                                    {course.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                {selectedCourse.label && (
                    <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none' onClick={handleReset}>Reset</Button>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default FilterCoursePopover;
