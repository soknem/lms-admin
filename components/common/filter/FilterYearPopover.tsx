import React from 'react';
import { TbFilter } from 'react-icons/tb';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";

const years = [
    { alias: '1', label: 'Foundation Year' },
    { alias: '2', label: 'Second Year' },
    { alias: '3', label: 'Third Year' },
    { alias: '4', label: 'Fourth Year' },
];

const FilterYearPopover = ({ open, setOpen, selectedYear, handleYearChange, handleReset } : any) => {
    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
                    <TbFilter className='mr-2 h-4 w-4' />
                    {selectedYear.label ? <>{selectedYear.label}</> : <>Filter by Year</>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                <Command>
                    <CommandInput placeholder="Filter Year..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {years.map((year, index) => (
                                <CommandItem
                                    key={index}
                                    value={year.alias}
                                    onSelect={() => {
                                        handleYearChange(year);
                                        setOpen(false);
                                    }}
                                >
                                    {year.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                {selectedYear.label && (
                    <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none' onClick={handleReset}>Reset</Button>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default FilterYearPopover;
