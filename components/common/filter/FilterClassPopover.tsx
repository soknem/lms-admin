import React, { useState, useEffect } from 'react';
import { TbFilter } from 'react-icons/tb';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {useGetClassesQuery} from "@/lib/features/admin/academic-management/classes/classApi";


const FilterClassPopover = ({ open, setOpen, selectedClass, handleClassChange, handleReset } : any) => {
    const { data: classData, error: classError, isLoading: isClassesLoading } = useGetClassesQuery({ page: 0, pageSize: 10 });
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        if (classData) {
            const formattedClasses = classData.content.map((cls : any) => ({
                alias: cls.uuid,
                label: cls.classCode,
            }));
            setClasses(formattedClasses);
        }
        if (classError) {
            console.error("Failed to load class", classError);
        }
    }, [classData, classError]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
                    <TbFilter className='mr-2 h-4 w-4' />
                    {selectedClass.label ? <>{selectedClass.label}</> : <>Filter by Class</>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                <Command>
                    <CommandInput placeholder="Filter Class..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {classes.map((cls: any, index :any) => (
                                <CommandItem
                                    key={index}
                                    value={cls.alias}
                                    onSelect={() => {
                                        handleClassChange(cls);
                                        setOpen(false);
                                    }}
                                >
                                    {cls.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                {selectedClass.label && (
                    <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none' onClick={handleReset}>Reset</Button>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default FilterClassPopover;
