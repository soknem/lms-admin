'use client';

import React, { useState } from 'react';
import {
    ColumnDef,
    SortingState,
    ColumnFiltersState,
    VisibilityState,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from '@tanstack/react-table';
import { Button } from '@/components/ui/button';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from '@/components/ui/command';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from '@/components/ui/popover';
import { TbFilter } from 'react-icons/tb';
import { useRouter } from 'next/navigation';

interface DataTableProps<TData extends { generation: string; academic: string; studyProgram: string; }, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function FilterReport<TData extends { generation: string; academic: string; studyProgram: string; }, TValue>({
                                                                                                                 columns,
                                                                                                                 data,
                                                                                                             }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [allData, setAllData] = useState<TData[]>(data);
    const [originalData, setOriginalData] = useState<TData[]>(data);

    const [openGen, setOpenGen] = useState(false);
    const [selectedGen, setSelectedGen] = useState<string | null>(null);

    const [openAcademic, setOpenAcademic] = useState(false);
    const [selectedAcademic, setSelectedAcademic] = useState<string | null>(null);

    const [openStudyProgram, setOpenStudyProgram] = useState(false);
    const [selectedStudyProgram, setSelectedStudyProgram] = useState<string | null>(null);

    const router = useRouter();

    const table = useReactTable({
        data: allData,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        onColumnVisibilityChange: setColumnVisibility,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    // Handle reset functionality for filters
    const handleReset = (columnId: string) => {
        if (columnId === 'generation') {
            setSelectedGen(null);
        } else if (columnId === 'academic') {
            setSelectedAcademic(null);
        } else if (columnId === 'studyProgram') {
            setSelectedStudyProgram(null);
        }
        table.getColumn(columnId)?.setFilterValue('');
        setAllData(originalData);
    };

    // Filter unique values for each filter category
    const filteredGen = Array.from(new Set(data.map(item => item.generation)));
    const filteredAcademic = Array.from(new Set(data.map(item => item.academic)));
    const filteredStudyProgram = Array.from(new Set(data.map(item => item.studyProgram)));

    return (
        <>
            <div className="flex items-center gap-4">
                {/* Filter for Generation */}
                <Popover open={openGen} onOpenChange={setOpenGen}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-center bg-white text-gray-30 border-lms-grayBorder hover:bg-white/60"
                        >
                            <TbFilter className="mr-2 h-4 w-4" />
                            {selectedGen ? <>{selectedGen}</> : <>Filter Generation</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Generation..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {filteredGen.map((gen, index) => (
                                        <CommandItem
                                            key={index}
                                            value={gen}
                                            onSelect={() => {
                                                setSelectedGen(gen);
                                                table.getColumn('generation')?.setFilterValue(gen);
                                                setOpenGen(false);
                                            }}
                                        >
                                            {gen}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedGen && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none"
                                onClick={() => handleReset('generation')}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* Filter for Academic */}
                <Popover open={openAcademic} onOpenChange={setOpenAcademic}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-center bg-white text-gray-30 border-lms-grayBorder hover:bg-white/60"
                        >
                            <TbFilter className="mr-2 h-4 w-4" />
                            {selectedAcademic ? <>{selectedAcademic}</> : <>Filter Academic</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Academic..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {filteredAcademic.map((academic, index) => (
                                        <CommandItem
                                            key={index}
                                            value={academic}
                                            onSelect={() => {
                                                setSelectedAcademic(academic);
                                                table.getColumn('academic')?.setFilterValue(academic);
                                                setOpenAcademic(false);
                                            }}
                                        >
                                            {academic}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedAcademic && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none"
                                onClick={() => handleReset('academic')}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* Filter for Major */}
                <Popover open={openStudyProgram} onOpenChange={setOpenStudyProgram}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-center bg-white text-gray-30 border-lms-grayBorder hover:bg-white/60"
                        >
                            <TbFilter className="mr-2 h-4 w-4" />
                            {selectedStudyProgram ? <>{selectedStudyProgram}</> : <>Filter StudyProgram</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter studyProgram..." />
                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {filteredStudyProgram.map((studyProgram, index) => (
                                        <CommandItem
                                            key={index}
                                            value={studyProgram}
                                            onSelect={() => {
                                                setSelectedStudyProgram(studyProgram);
                                                table.getColumn('studyProgram')?.setFilterValue(studyProgram);
                                                setOpenStudyProgram(false);
                                            }}
                                        >
                                            {studyProgram}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedStudyProgram && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none"
                                onClick={() => handleReset('major')}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>
            </div>
        </>
    );
}
