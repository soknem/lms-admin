import React, { useState, useEffect } from 'react';
import { TbFilter } from 'react-icons/tb';
import {useGetStudyProgramsQuery} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";



const FilterStudyProgramPopover = ({ open, setOpen, selectedProgram, handleProgramChange, handleReset } : any) => {
    const { data: programData, error: programError, isLoading: isProgramLoading } = useGetStudyProgramsQuery({ page: 0, pageSize: 10 });
    const [studyPrograms, setStudyPrograms] = useState([]);

    useEffect(() => {
        if (programData) {
            const formattedPrograms = programData.content.map((st : any) => ({
                alias: st.alias,
                label: st.studyProgramName,
            }));
            setStudyPrograms(formattedPrograms);
        }
        if (programError) {
            console.error("Failed to load study programs", programError);
        }
    }, [programData, programError]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
                    <TbFilter className='mr-2 h-4 w-4' />
                    {selectedProgram.label ? <>{selectedProgram.label}</> : <>Filter by Study Program</>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                <Command>
                    <CommandInput placeholder="Filter Study Program..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {studyPrograms.map((program: any, index: any) => (
                                <CommandItem
                                    key={index}
                                    value={program.alias}
                                    onSelect={() => {
                                        handleProgramChange(program);
                                        setOpen(false);
                                    }}
                                >
                                    {program.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                {selectedProgram.label && (
                    <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none' onClick={handleReset}>Reset</Button>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default FilterStudyProgramPopover;
