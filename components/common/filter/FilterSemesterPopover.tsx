import React, { useState } from 'react';
import { TbFilter } from 'react-icons/tb';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

const semesters = [
    { alias: '1', label: 'Semester 1' },
    { alias: '2', label: 'Semester 2' },
];

const FilterSemesterPopover = ({ open, setOpen, selectedSemester, handleSemesterChange, handleReset } : any) => {
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
                    <TbFilter className='mr-2 h-4 w-4' />
                    {selectedSemester.label ? <>{selectedSemester.label}</> : <>Filter by Semester</>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                <Command>
                    <CommandInput placeholder="Filter Semester..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {semesters.map((semester, index) => (
                                <CommandItem
                                    key={index}
                                    value={semester.alias}
                                    onSelect={() => {
                                        handleSemesterChange(semester);
                                        setOpen(false);
                                    }}
                                >
                                    {semester.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                {selectedSemester.label && (
                    <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none' onClick={handleReset}>Reset</Button>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default FilterSemesterPopover;
