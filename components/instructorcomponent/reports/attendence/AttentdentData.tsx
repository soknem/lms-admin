"use client";

import React, {useState} from "react";

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
} from "@/components/ui/dropdown-menu";

import {Input} from "@/components/ui/input";

import {Button} from "@/components/ui/button";

import {TbSearch} from "react-icons/tb";

import {useMediaQuery} from "usehooks-ts";

import {FaSearch} from "react-icons/fa";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";

import {TbFilter} from "react-icons/tb";

import {TbAdjustmentsHorizontal} from "react-icons/tb";
import {useRouter} from "next/navigation";

import {DatePickerWithRange} from "@/components/common/DatePickerWithRange";
import {Label} from "@radix-ui/react-dropdown-menu";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function AttendanceData<TData, TValue>({
                                                  columns,
                                                  data,
                                              }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [allData, setData] = useState(() => [...data]);
    const [originalData, setOriginalData] = useState(() => [...data]);
    const [editedRows, setEditedRows] = useState({});

    // filters
    const [openAtt, setopenAtt] = useState(false);
    const [selectedAtt, setselectedAtt] = React.useState<any>(null);

    const [openClass, setOpenClass] = useState(false);
    const [selectedClass, setSelectedClass] = React.useState<any>(null);

    const [openCourse, setOpenCourse] = useState(false);
    const [selectedCourse, setSelectedCourse] = React.useState<any>(null);

    const router = useRouter();

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

    //reset popup
    const handleReset = (columnId: string) => {
        if (columnId === "semester") {
            setselectedAtt(null);
        }
        if (columnId === "class") {
            setSelectedClass(null);
        }
        if (columnId === "course") {
            setSelectedCourse(null);
        }
        table.getColumn(columnId)?.setFilterValue("");
        setData([...originalData]);
    };

    // filters data of instructor
    const FilteredIns = data.reduce((semester: string[], item: any) => {
        if (!semester.includes(item.semester)) {
            semester.push(item.semester);
        }
        return semester;
    }, []);

    //filters data of class
    const FilteredClass = data.reduce((cs: string[], item: any) => {
        if (!cs.includes(item.class)) {
            cs.push(item.class);
        }
        return cs;
    }, []);

    //filters data of course
    const FilteredCourse = data.reduce((course: string[], item: any) => {
        if (!course.includes(item.course)) {
            course.push(item.course);
        }
        return course;
    }, []);

    return (
        <>
            <div className="flex items-center gap-4 ">
                <DatePickerWithRange/>

                {/* filters Isemester */}
                <Popover open={openAtt} onOpenChange={setopenAtt}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60"
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedAtt ? <>{selectedAtt}</> : <> Filter semester</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Instructor..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredIns.map((ins, index) => (
                                        <CommandItem
                                            key={index}
                                            value={ins}
                                            onSelect={(value) => {
                                                setselectedAtt(value);
                                                table.getColumn("instructor")?.setFilterValue(value);
                                                setopenAtt(false);
                                            }}
                                        >
                                            {ins}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedAtt && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                                onClick={() => handleReset("semester")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* filters class */}
                <Popover open={openClass} onOpenChange={setOpenClass}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60"
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedClass ? <>{selectedClass}</> : <> Filter Class</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter class..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredClass.map((cs, index) => (
                                        <CommandItem
                                            key={index}
                                            value={cs}
                                            onSelect={(value) => {
                                                setSelectedClass(value);
                                                table.getColumn("class")?.setFilterValue(value);
                                                setOpenClass(false);
                                            }}
                                        >
                                            {cs}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedClass && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                                onClick={() => handleReset("class")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* filters course */}
                <Popover open={openCourse} onOpenChange={setOpenCourse}>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60"
                        >
                            <TbFilter className="mr-2 h-4 w-4"/>
                            {selectedCourse ? <>{selectedCourse}</> : <> Filter Course</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput placeholder="Filter Course..."/>

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilteredCourse.map((course, index) => (
                                        <CommandItem
                                            key={index}
                                            value={course}
                                            onSelect={(value) => {
                                                setSelectedCourse(value);
                                                table.getColumn("class")?.setFilterValue(value);
                                                setOpenCourse(false);
                                            }}
                                        >
                                            {course}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedCourse && (
                            <Button
                                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none"
                                onClick={() => handleReset("course")}
                            >
                                Reset
                            </Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/* Column visibility */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild></DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white ">
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
            </div>

            {/* Table */}
            <div className="rounded-md p-4 bg-lms-white-80  ">
                <div className="flex justify-between p-4 ">
                    <div>
                        <Label className="text-lms-gray-80 ">Generation</Label>

                        <p className="flex font-medium text-lms-black90">Generation 1</p>
                    </div>
                    <div>
                        <Label className="text-lms-gray-80">Year</Label>
                        <p className="flex font-medium text-lms-black90">Foundation Year</p>
                    </div>
                    <div>
                        <Label className="text-lms-gray-80">Academic Year</Label>
                        <p className="flex font-medium text-lms-black90">2024-2025</p>
                    </div>
                    <div>
                        <Label className="text-lms-gray-80">Study Program</Label>
                        <p className="flex font-medium text-lms-black90">Information Technology</p>
                    </div>
                    <div>
                        <Label className="text-lms-gray-80">Course</Label>
                        <p className="flex font-medium text-lms-black90">Web Design</p>
                    </div>
                    <div>
                        <Label className="text-lms-gray-80">Class</Label>
                        <p className="flextext-lms-black90 font-medium">
                            Istad 01</p>
                    </div>
                    <div>
                        <Label className="text-lms-gray-80">Duration</Label>
                        <p className="flextext-lms-black90 font-medium">
                            11/02/2021-12/02/2024</p>
                    </div>


                </div>
                <div className="bg-lms-transcript-header p-4 rounded-md">
                    <p className="text-lms-gray-80 font-semibold">Scores Point</p>
                    <div className="flex gap-6 text-lms-black90">
                        <p>
                            Present <span className="font-bold">P</span>
                        </p>
                        <p>
                            Excused Absent <span className="font-bold">EA = -0.5pt</span>
                        </p>
                        <p>
                            Unexcused Absent <span className="font-bold">UA = -1pt</span>
                        </p>
                    </div>
                </div>
                <Table>
                    <TableHeader className="text-lms-gray-30">
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => {
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
                                    {row.getVisibleCells().map((cell) => (
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
        </>
    );
}
