import React, { useState, useEffect } from 'react';
import { TbFilter } from 'react-icons/tb';
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {Button} from "@/components/ui/button";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {useGetGenerationQuery} from "@/lib/features/admin/academic-management/generation/generation";

const FilterGenerationPopover = ({ open, setOpen, selectedGeneration, handleGenChange, handleReset } : any) => {
    const { data: generationData, error: generationError, isLoading: isGenerationsLoading } = useGetGenerationQuery({ page: 0, pageSize: 10 });
    const [generations, setGenerations] = useState([]);

    useEffect(() => {
        if (generationData) {
            const formattedGenerations = generationData.content.map((gen : any) => ({
                alias: gen.alias,
                label: gen.name,
            }));
            setGenerations(formattedGenerations);
        }
        if (generationError) {
            console.error("Failed to load generation", generationError);
        }
    }, [generationData, generationError]);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
                    <TbFilter className='mr-2 h-4 w-4' />
                    {selectedGeneration.label ? <>{selectedGeneration.label}</> : <>Filter by Generation</>}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                <Command>
                    <CommandInput placeholder="Filter Generation..." />
                    <CommandList>
                        <CommandEmpty>No results found.</CommandEmpty>
                        <CommandGroup>
                            {generations.map((generation: any, index :any) => (
                                <CommandItem
                                    key={index}
                                    value={generation.alias}
                                    onSelect={() => {
                                        handleGenChange(generation);
                                        setOpen(false);
                                    }}
                                >
                                    {generation.label}
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                </Command>
                {selectedGeneration.label && (
                    <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none' onClick={handleReset}>Reset</Button>
                )}
            </PopoverContent>
        </Popover>
    );
};

export default FilterGenerationPopover;
