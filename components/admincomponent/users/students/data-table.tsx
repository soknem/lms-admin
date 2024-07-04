"use client";

import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
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
    TableFooter,
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

import {FiPlus} from "react-icons/fi";
import {useRouter} from "next/navigation";
import {TbAdjustmentsHorizontal, TbFilter} from "react-icons/tb";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";

//custom component import

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

const statusList: { [key: number]: string } = {
    1: "Active",
    2: "Hiatus",
    3: "Drop",
    4: "Disable",
};

export function UserStudentTable<TData, TValue>({
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

    console.log("data from page: ", data);

    const [isFocused, setIsFocused] = useState(false);
    const router = useRouter();

    // const filterOptions = ["All", "Public", "Disable", "Draft"];
    // const handleFilterChange = (value: string) => {
    //     setSelectedFilter(value);
    //     const filterValue =
    //         value === "All"
    //             ? ""
    //             : value === "Public"
    //                 ? "true"
    //                 : value === "Disable"
    //                     ? "false"
    //                     : "draft";
    //     table.getColumn("status")?.setFilterValue(filterValue);
    // };

    // Filter Gender
    const [openGender, setopenGender] = useState(false);

    const [selectedGender, setselectedGender] = React.useState<any>(null);

    const handleReset = (columnId: string) => {
        if (columnId === 'gender') {
            setselectedGender(null);
            table.getColumn(columnId)?.setFilterValue(''); // Clear the gender filter value
            setData([...originalData]);
        }
        // if (columnId === 'studentStatus') {
        //     setselectedStatus(null);
        // }
        // table.getColumn(columnId)?.setFilterValue('');
        // setData([...originalData]);
    };



    // const filterGenderOptions = ["All", "Female", "Male"];
    // const handleGenderFilterChange = (value: string) => {
    //     setSelectedFilter(value);
    //     const filterValue = value === "All" ? "" : value;
    //     table.getColumn("gender")?.setFilterValue(filterValue);
    // };

    const FilterGender = data.reduce((gender: string[], item: any) => {
        if (!gender.includes(item.gender)) {
            gender.push(item.gender);
        }
        return gender;
    }, []);

    // const applyGenderFilter = (gender: string) => {
    //     setselectedGender(gender);
    //     table.getColumn('gender')?.setFilterValue((value: any) => value === gender); // Ensure exact match
    //     setopenGender(false);
    // };
    
    // Filter status
    // const [openStatus, setopenStatus] = useState(false);
    //
    // const [selectedStatus, setselectedStatus] = React.useState<any>(null);
    //
    // const FilterStatus = data.reduce((studentStatus: string[], item: any) => {
    //     if (!studentStatus.includes(item.studentStatus)) {
    //         studentStatus.push(item.studentStatus);
    //     }
    //     return studentStatus;
    // }, []);
    
    return (
        <>
            
            <div className="flex items-center justify-between gap-4 ">
                
                {/* Search */}
                <div className="flex items-center py-4 w-full">
                    <div className="flex items-center w-full relative">
                        <Input
                            placeholder="Search Student Name"
                            value={
                                (table.getColumn("nameEn")?.getFilterValue() as string) ?? ""
                            }
                            onChange={(event) =>
                                table.getColumn("nameEn")?.setFilterValue(event.target.value)
                            }

                            className="border-[#E6E6E6] bg-white rounded-[10px] pl-10  text-lms-gray-30  "
                        />

                        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                            <FaSearch className="text-gray-400"/>
                        </div>

                    </div>
                </div>

                {/* Filter Gender */}
                <Popover open={openGender} onOpenChange={setopenGender}>
                    <PopoverTrigger asChild>
                        <Button variant="outline" className=" justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
                            <TbFilter className='mr-2 h-4 w-4' />
                            {selectedGender ? <>{selectedGender}</> : <> Filter by  gender</>}
                        </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[200px] p-0 bg-white" align="start">
                        <Command>
                            <CommandInput
                                placeholder="Filter by gender..." />

                            <CommandList>
                                <CommandEmpty>No results found.</CommandEmpty>
                                <CommandGroup>
                                    {FilterGender.map((gender, index) => (
                                        <CommandItem
                                            key={index}
                                            value={gender}
                                            // onSelect={(value) => {
                                            //     setselectedGender(value);
                                            //     table.getColumn('gender')?.setFilterValue(value);
                                            //     setopenGender(false);
                                            // }}

                                            onSelect={(value) => {
                                                setselectedGender(value);
                                                table.getColumn('gender')?.setFilterValue(value);
                                                setopenGender(false);
                                            }}

                                            // onSelect={() => applyGenderFilter(gender)}
                                        >
                                            {gender}
                                        </CommandItem>
                                    ))}
                                </CommandGroup>
                            </CommandList>
                        </Command>
                        {selectedGender && (
                            <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none ' onClick={() => handleReset('gender')}>Reset</Button>
                        )}
                    </PopoverContent>
                </Popover>

                {/*<DropdownMenu>*/}
                {/*    <DropdownMenuTrigger asChild>*/}
                {/*        <Button*/}
                {/*            variant="outline"*/}
                {/*            className=" justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60"*/}
                {/*        >*/}
                {/*            <TbFilter className="mr-2 h-4 w-4" />*/}
                {/*            {selectedFilter}*/}
                {/*        </Button>*/}
                {/*    </DropdownMenuTrigger>*/}
                {/*    <DropdownMenuContent align="end" className="border-[#E6E6E6] bg-white ">*/}
                {/*        {filterGenderOptions.map((option) => (*/}
                {/*            <DropdownMenuItem*/}
                {/*                key={option}*/}
                {/*                onSelect={() => handleGenderFilterChange(option)}*/}
                {/*                className={`cursor-pointer  ${*/}
                {/*                    (table.getColumn("gender")?.getFilterValue() || "All") === option*/}
                {/*                }`}*/}
                {/*            >*/}
                {/*                {option}*/}
                {/*            </DropdownMenuItem>*/}
                {/*        ))}*/}
                {/*    </DropdownMenuContent>*/}
                {/*</DropdownMenu>*/}
                
                {/* Filter Student Status */}
                {/*<Popover open={openStatus} onOpenChange={setopenStatus}>*/}
                {/*    <PopoverTrigger asChild>*/}
                {/*        <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">*/}
                {/*            <TbFilter className='mr-2 h-4 w-4' />*/}
                {/*            {selectedStatus ? <>{selectedStatus}</> : <> Filter by status</>}*/}
                {/*        </Button>*/}
                {/*    </PopoverTrigger>*/}
                {/*    <PopoverContent className="w-[200px] p-0 bg-white" align="start">*/}
                {/*        <Command>*/}
                {/*            <CommandInput*/}
                {/*                placeholder="Filter status..." />*/}

                {/*            <CommandList>*/}
                {/*                <CommandEmpty>No results found.</CommandEmpty>*/}
                {/*                <CommandGroup>*/}
                {/*                    {FilterStatus.map((studentStatus, index) => (*/}
                {/*                        <CommandItem*/}
                {/*                            key={index}*/}
                {/*                            value={studentStatus}*/}
                {/*                            // onSelect={(value) => {*/}
                {/*                            //     setselectedStatus(value);*/}
                {/*                            //     table.getColumn('studentStatus')?.setFilterValue(value);*/}
                {/*                            //     setopenStatus(false);*/}
                {/*                            // }}*/}
                {/*                            onSelect={(value) => {*/}
                {/*                                setselectedStatus(value);*/}
                {/*                                const statusKey = Object.keys(statusList).find(*/}
                {/*                                    (key) => statusList[parseInt(key)] === value*/}
                {/*                                );*/}
                {/*                                table*/}
                {/*                                    .getColumn("studentStatus")*/}
                {/*                                    ?.setFilterValue(statusKey);*/}
                {/*                                setopenStatus(false);*/}
                {/*                            }}*/}

                {/*                        >*/}
                {/*                            {studentStatus}*/}
                {/*                        </CommandItem>*/}
                {/*                    ))}*/}
                {/*                </CommandGroup>*/}
                {/*            </CommandList>*/}
                {/*        </Command>*/}
                {/*        {selectedStatus && (*/}
                {/*            <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none ' onClick={() => handleReset('studentStatus')}>Reset</Button>*/}
                {/*        )}*/}
                {/*    </PopoverContent>*/}
                {/*</Popover>*/}

                {/* Column visibility */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button
                            variant="outline"
                            className='border-[#E6E6E6] bg-white ml-auto text-lms-gray-30'
                        >
                            <TbAdjustmentsHorizontal className='mr-2 h-4 w-4'/>
                            Table View
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

            </div>

            {/* Table */}
            <div className="w-full p-4 bg-white rounded-[10px] ">
                <Table>
                    <TableHeader className="text-gray-30">
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
                    <TableFooter>
                        <TableRow>
                            <TableCell colSpan={columns.length}>
                                <p className="text-lms-gray-30 text-sm font-normal text-center">
                                    A list of enrolled students
                                </p>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </div>

            <div className="w-full bg-white rounded-[10px] ">
                <div className="flex my-4 p-4 justify-between container mx-auto">
                    <p className="text-lms-success text-lg font-medium">
                        Active-<span className="khmer-font">សិស្សកំពុងសិក្សា</span>
                    </p>
                    <p className="text-lms-error text-lg font-medium">
                        Disable-
                        <span className="khmer-font">សិស្សត្រូវបានបញ្ឈប់ ឬ លុបចេញ</span>
                    </p>
                    <p className="text-lms-gray-30 text-lg font-medium">
                        Hiatus-<span className="khmer-font">សិស្សព្យួរការសិក្សា</span>
                    </p>
                    <p className="text-lms-error text-lg font-medium">
                        Drop-<span className="khmer-font">សិស្សបោះបង់ការសិក្សា</span>
                    </p>
                </div>
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
