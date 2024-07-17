"use client";

import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
import {TbAdjustmentsHorizontal, TbFilter} from "react-icons/tb";
//import from shad cn
import {
    ColumnDef,
    flexRender,
    SortingState,
    VisibilityState,
    ColumnFiltersState,
    getCoreRowModel,
    getSortedRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {Label} from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import {CreatePayForm} from "./CreatePayForm";
import {PiWarningCircleFill} from "react-icons/pi";

//custom component import

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function PaymentTable<TData, TValue>({
                                                columns,
                                                data,
                                            }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [allData, setData] = useState(() => [...data]);
    const [originalData, setOriginalData] = useState(() => [...data]);
    const [editedRows, setEditedRows] = useState({});
    const [selectedFilter, setSelectedFilter] = useState("All");
    // filters
    const [openGeneration, setOpenGeneration] = useState(false);
    const [openYear, setOpenYear] = useState(false);
    const [openAcademicYear, setOpenAcademicYear] = useState(false);
    const [openFaculty, setOpenFaculty] = useState(false);
    const [openDegree, setOpenDegree] = useState(false);
    const [openStuPro, setOpenStuPro] = useState(false);
    const [openClass, setOpenClass] = useState(false);
    const [openShift, setOpenShift] = useState(false);
    const [selectedGen, setSelectedGen] = useState<any>(null);
    const [selectedYear, setSelectedYear] = useState<any>(null);
    const [selectedFaculty, setSelectedFaculty] = useState<any>(null);
    const [selectedDegree, setSelectedDegree] = useState<any>(null);
    const [selectedStuPro, setSelectedStuPro] = useState<any>(null);
    const [selectedClass, setSelectedClass] = useState<any>(null);
    const [selectedShift, setSelectedShift] = useState<any>(null);
    const [selectedAcademicYear, setSelectedAcademicYear] = useState<any>(null);

    const table = useReactTable({
        data,
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
        meta: {
            editedRows,
            setEditedRows,
            revertData: (rowIndex: number, revert: boolean) => {
                if (revert) {
                    setData((old) =>
                        old.map((row, index) =>
                            index === rowIndex ? originalData[rowIndex] : row
                        )
                    );
                } else {
                    setOriginalData((old) =>
                        old.map((row, index) => (index === rowIndex ? data[rowIndex] : row))
                    );
                }
            },
            updateData: (rowIndex: number, columnId: string, value: string) => {
                setData((old) =>
                    old.map((row, index) => {
                        if (index === rowIndex) {
                            return {
                                ...old[rowIndex],
                                [columnId]: value,
                            };
                        }
                        return row;
                    })
                );
            },
        },
    });


    const handleGenReset = (columnId: string) => {
        if (columnId === "generation") {
            setSelectedGen(null);
        }
        table.getColumn(columnId)?.setFilterValue("");
        setData([...originalData]);
    };

    const FilteredGen = data.reduce((generation: string[], item: any) => {
        if (!generation?.includes(item?.generation)) {
            generation?.push(item?.generation);
        }
        return generation;
    }, []);

    const handleAcaYearReset = (columnId: string) => {
        if (columnId === "academicYear") {
            setSelectedAcademicYear(null);
        }
        table.getColumn(columnId)?.setFilterValue("");
        setData([...originalData]);
    };

    const FilteredAcaYear = data?.reduce((academicYear: string[], item: any) => {
        if (!academicYear?.includes(item?.academicYear)) {
            academicYear?.push(item?.academicYear);
        }
        return academicYear;
    }, []);

    const handleFacultyReset = (columnId: string) => {
        if (columnId === "faculty") {
            setSelectedFaculty(null);
        }
        table.getColumn(columnId)?.setFilterValue("");
        setData([...originalData]);
    };

    const FilteredFaculty = data?.reduce((faculty: string[], item: any) => {
        if (!faculty?.includes(item?.faculty)) {
            faculty?.push(item?.faculty);
        }
        return faculty;
    }, []);

    const handleDegreeReset = (columnId: string) => {
        if (columnId === "degree") {
            setSelectedDegree(null);
        }
        table.getColumn(columnId)?.setFilterValue("");
        setData([...originalData]);
    };

    const FilteredDegree = data?.reduce((degree: string[], item: any) => {
        if (!degree?.includes(item?.degree)) {
            degree?.push(item?.degree);
        }
        return degree;
    }, []);

    const handleStuProReset = (columnId: string) => {
        if (columnId === "studyProgram") {
            setSelectedStuPro(null);
        }
        table.getColumn(columnId)?.setFilterValue("");
        setData([...originalData]);
    };

    const FilteredStuPro = data?.reduce((studyProgram: string[], item: any) => {
        if (!studyProgram?.includes(item?.studyProgram)) {
            studyProgram?.push(item?.studyProgram);
        }
        return studyProgram;
    }, []);

    const handleClassReset = (columnId: string) => {
        if (columnId === "classCode") {
            setSelectedClass(null);
        }
        table.getColumn(columnId)?.setFilterValue("");
        setData([...originalData]);
    };

    const FilteredClass = data?.reduce((classCode: string[], item: any) => {
        if (!classCode?.includes(item?.classCode)) {
            classCode?.push(item?.classCode);
        }
        return classCode;
    }, []);

    const handleShiftReset = (columnId: string) => {
        if (columnId === "shift") {
            setSelectedShift(null);
        }
        table.getColumn(columnId)?.setFilterValue("");
        setData([...originalData]);
    };

    const FilteredShift = data?.reduce((shift: string[], item: any) => {
        if (!shift?.includes(item?.shift)) {
            shift?.push(item?.shift);
        }
        return shift;
    }, []);

    const handleYearReset = (columnId: string) => {
        if (columnId === "year") {
            setSelectedYear(null);
        }
        table.getColumn(columnId)?.setFilterValue("");
        setData([...originalData]);
    };

    const FilteredYear = data?.reduce((year: number[], item: any) => {
        if (!year?.includes(item?.year)) {
            year?.push(item?.year);
        }
        return year;
    }, []);

    const filterOptions = ["All", "Paid", "Unpaid"];
    const handleFilterChange = (value: string) => {
        setSelectedFilter(value);
        const filterValue =
            value === "All" ? "" : value === "Paid" ? "paid" : "unpaid";
        table.getColumn("status")?.setFilterValue(filterValue);
    };

    return (
        <>
            <section className="w-full  bg-white rounded flex flex-wrap items-center justify-center gap-9 p-6">
                <div
                    className="w-[310px] h-[136px] bg-[#ABC3FF] bg-opacity-20 rounded-[10px] flex flex-col gap-4 justify-center items-start px-4">
                    <p className="text-xl font-medium text-lms-black-90">
                        Total Earning
                    </p>
                    <p className="text-4xl font-bold text-lms-primary">$ 1000.00</p>
                </div>

                <div
                    className="w-[310px] h-[136px] bg-[#FFD338] bg-opacity-20 rounded-[10px] flex flex-col gap-4 justify-center items-start px-4">
                    <div className={`flex gap-2 items-center justify-center`}>
                        <p className="text-xl font-medium text-lms-black-90">To be paid</p>
                        <PiWarningCircleFill className={`w-5 h-5`}/></div>
                    <p className="text-4xl font-bold text-[#F5A524]">$ 800.00</p>
                </div>

                <div
                    className="w-[310px] h-[136px] bg-[#18C964] bg-opacity-20 rounded-[10px] flex flex-col gap-4 justify-center items-start px-4">
                    <p className="text-xl font-medium text-lms-black-90">
                        Earnings this semester
                    </p>
                    <p className="text-4xl font-bold text-[#008000]">$ 8000.00</p>
                </div>

                <div
                    className="w-[310px] h-[136px] bg-[#9C51B6] bg-opacity-10 rounded-[10px] flex flex-col gap-4 justify-center items-start px-4">
                    <p className="text-xl font-medium text-lms-black-90">
                        Total students
                    </p>
                    <p className="text-4xl font-bold text-[#A74AC7]">150 people</p>
                </div>

                {/*<div*/}
                {/*    className="w-[310px] h-[136px] bg-[#FFD338] bg-opacity-20 rounded-[10px] flex flex-col gap-4 justify-center items-start px-4">*/}
                {/*    <p className="text-xl font-medium text-lms-black-90">*/}
                {/*        Students to be paid:*/}
                {/*    </p>*/}
                {/*    <p className="text-4xl font-bold text-[#F5A524]">20 people</p>*/}
                {/*</div>*/}
            </section>

            {/* Search */}
            <div className="flex items-center justify-between gap-4 ">
                <div className="flex items-center w-full relative">
                    <Input
                        placeholder="Search Curriculum"
                        value={
                            (table.getColumn("student")?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table.getColumn("student")?.setFilterValue(event.target.value)
                        }

                        className="border-[#E6E6E6] bg-white rounded-[10px] pl-10  text-lms-gray-30  "
                    />

                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400"/>
                    </div>

                </div>

                {/* Filter */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className=" justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60"
                        >
                            <TbFilter className='mr-2 h-4 w-4'/>
                            {selectedFilter}
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                        align="end"
                        className="border-[#E6E6E6] bg-white"
                    >
                        {filterOptions.map((option) => (
                            <DropdownMenuItem
                                key={option}
                                onSelect={() => handleFilterChange(option)}
                                className={`cursor-pointer  ${
                                    (table.getColumn("status")?.getFilterValue() || "All") ===
                                    option
                                }`}
                            >
                                {option}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* Column visibility */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant='outline' className='border-[#E6E6E6] bg-white ml-auto text-lms-gray-30'
                        >
                            <TbAdjustmentsHorizontal className='mr-2 h-4 w-4'/>
                            View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                        {table
                            .getAllColumns()
                            .filter((column) => column.getCanHide())
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize focus:bg-background"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                );
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>

                <CreatePayForm/>
            </div>

            <div className="flex items-center gap-4 w-full flex-wrap">
                {/* filters generation */}
                <Popover open={openGeneration} onOpenChange={setOpenGeneration}>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline' className='border-[#E6E6E6] bg-white text-lms-gray-30'
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedGen ? <>{selectedGen}</> : <>Filter by generation</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Generation..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredGen.map((generation, index) => (
                                        <CommandItem
                                            key={index}
                                            value={generation}
                                            onSelect={(value) => {
                                                setSelectedGen(value);
                                                table.getColumn("generation")?.setFilterValue(value);
                                                setOpenGeneration(false);
                                            }}
                                        >
                                            {generation}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedGen && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                                onClick={() => handleGenReset("generation")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* filters Year */}
                <Popover open={openYear} onOpenChange={setOpenYear}>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline' className='border-[#E6E6E6] bg-white text-lms-gray-30'
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedYear ? <>{`Year ${selectedYear}`}</> : <>Filter by year</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Year..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredYear.map((year, index) => (
                                        <CommandItem
                                            key={index}
                                            value={year.toString()}
                                            onSelect={(value) => {
                                                setSelectedYear(value);
                                                table.getColumn("year")?.setFilterValue(value);
                                                setOpenYear(false);
                                            }}
                                        >
                                            {`Year ${year}`}
                                            {/*{year}*/}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedYear && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                                onClick={() => handleYearReset("year")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* filters Academic Year */}
                <Popover open={openAcademicYear} onOpenChange={setOpenAcademicYear}>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline' className='border-[#E6E6E6] bg-white text-lms-gray-30'
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedAcademicYear ? <>{selectedAcademicYear}</> : <>Filter by academic year</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Academic Year..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredAcaYear.map((acaYear, index) => (
                                        <CommandItem
                                            key={index}
                                            value={acaYear}
                                            onSelect={(value) => {
                                                setSelectedAcademicYear(value);
                                                table.getColumn("academicYear")?.setFilterValue(value);
                                                setOpenAcademicYear(false);
                                            }}
                                        >
                                            {acaYear}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedAcademicYear && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                                onClick={() => handleAcaYearReset("academicYear")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* filters faculty */}
                <Popover open={openFaculty} onOpenChange={setOpenFaculty}>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline' className='border-[#E6E6E6] bg-white text-lms-gray-30'
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedFaculty ? <>{selectedFaculty}</> : <>Filter by faculty</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Faculty..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredFaculty.map((faculty, index) => (
                                        <CommandItem
                                            key={index}
                                            value={faculty}
                                            onSelect={(value) => {
                                                setSelectedFaculty(value);
                                                table.getColumn("faculty")?.setFilterValue(value);
                                                setOpenFaculty(false);
                                            }}
                                        >
                                            {faculty}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedFaculty && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                                onClick={() => handleFacultyReset("faculty")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* filters Degree */}
                <Popover open={openDegree} onOpenChange={setOpenDegree}>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline' className='border-[#E6E6E6] bg-white text-lms-gray-30'
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedDegree ? <>{selectedDegree}</> : <>Filter by degree</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Degree..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredDegree.map((degree, index) => (
                                        <CommandItem
                                            key={index}
                                            value={degree}
                                            onSelect={(value) => {
                                                setSelectedDegree(value);
                                                table.getColumn("degree")?.setFilterValue(value);
                                                setOpenDegree(false);
                                            }}
                                        >
                                            {degree}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedDegree && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                                onClick={() => handleDegreeReset("degree")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* filters Study Program */}
                <Popover open={openStuPro} onOpenChange={setOpenStuPro}>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline' className='border-[#E6E6E6] bg-white text-lms-gray-30'
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedStuPro ? <>{selectedStuPro}</> : <>Filter by study program</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Study Program..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredStuPro.map((studyProgram, index) => (
                                        <CommandItem
                                            key={index}
                                            value={studyProgram}
                                            onSelect={(value) => {
                                                setSelectedStuPro(value);
                                                table.getColumn("studyProgram")?.setFilterValue(value);
                                                setOpenStuPro(false);
                                            }}
                                        >
                                            {studyProgram}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedStuPro && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                                onClick={() => handleStuProReset("studyProgram")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* filters class*/}
                <Popover open={openClass} onOpenChange={setOpenClass}>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline' className='border-[#E6E6E6] bg-white text-lms-gray-30'
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedClass ? <>{selectedClass}</> : <>Filter by class</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Class..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredClass.map((classCode, index) => (
                                        <CommandItem
                                            key={index}
                                            value={classCode}
                                            onSelect={(value) => {
                                                setSelectedClass(value);
                                                table.getColumn("classCode")?.setFilterValue(value);
                                                setOpenClass(false);
                                            }}
                                        >
                                            {classCode}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedClass && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                                onClick={() => handleClassReset("classCode")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* filters Shift*/}
                <Popover open={openShift} onOpenChange={setOpenShift}>
                    <PopoverTrigger asChild>
                        <Button
                            variant='outline' className='border-[#E6E6E6] bg-white text-lms-gray-30'
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedShift ? <>{selectedShift}</> : <>Filter shift</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Shift..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredShift.map((shift, index) => (
                                        <CommandItem
                                            key={index}
                                            value={shift}
                                            onSelect={(value) => {
                                                setSelectedShift(value);
                                                table.getColumn("shift")?.setFilterValue(value);
                                                setOpenShift(false);
                                            }}
                                        >
                                            {shift}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedShift && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                                onClick={() => handleShiftReset("shift")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>
            </div>

            {/* Table */}
            <div className="w-full rounded-md p-4 bg-white">
                {/* class detail information */}
                <div className="flex flex-wrap gap-4 p-4 w-full">
                    <div className="flex-grow min-w-[150px]">
                        <Label className="text-gray-30">Generation</Label>
                        <p className="flex font-medium text-black">{selectedGen || "All Generations"}</p>
                    </div>

                    <div className="flex-grow min-w-[150px]">
                        <Label className="text-gray-30">Year</Label>
                        <p className="flex font-medium text-black">{selectedYear ? `Year ${selectedYear}` : "All Years"}</p>
                    </div>

                    <div className="flex-grow min-w-[150px]">
                        <Label className="text-gray-30">Academic Year</Label>
                        <p className="flex font-medium text-black">{selectedAcademicYear || "All Academic Year"}</p>
                    </div>

                    <div className="flex-grow min-w-[150px]">
                        <Label className="text-gray-30">Faculty</Label>
                        <p className="flex font-medium text-black">{selectedFaculty || "All Faculties"}</p>
                    </div>

                    <div className="flex-grow min-w-[150px]">
                        <Label className="text-gray-30">Degree</Label>
                        <p className="flex font-medium text-black">{selectedDegree || "All Degrees"}</p>
                    </div>

                    <div className="flex-grow min-w-[150px]">
                        <Label className="text-gray-30">Study Program</Label>
                        <p className="flex font-medium text-black">{selectedStuPro || "All Study Program"}</p>
                    </div>

                    <div className="flex-grow min-w-[150px]">
                        <Label className="text-gray-30">Class</Label>
                        <p className="flex font-medium text-black">{selectedClass || "All Classes"}</p>
                    </div>

                    <div className="flex-grow min-w-[150px]">
                        <Label className="text-gray-30">Shift</Label>
                        <p className="flex font-medium text-black">{selectedShift || "All Shifts"}</p>
                    </div>
                </div>

                <Table>
                    <TableHeader className="text-lms-gray-30">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.filter(header => !header.column.columnDef.enableHiding).map((header) => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    );
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().filter(cell => !cell.column.columnDef.enableHiding).map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell
                                    colSpan={columns.length}
                                    className="h-24 text-center "
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    className="border-gray-30"
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    className="border-gray-30 "
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </>
    );
}
