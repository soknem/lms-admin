'use client'

import React, {useState} from 'react'


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
    useReactTable
} from '@tanstack/react-table'

import {
    Table,
    TableBody,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow
} from '@/components/ui/table'

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'

import {Input} from '@/components/ui/input'

//custom component import
import {FaSearch} from "react-icons/fa";

import {Button} from "@/components/ui/button"

import {TbSearch} from "react-icons/tb";

import {useMediaQuery} from "usehooks-ts"
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"

import {TbFilter} from "react-icons/tb";

import {TbAdjustmentsHorizontal} from "react-icons/tb";
import {useRouter} from 'next/navigation'
import {Label} from '@radix-ui/react-dropdown-menu'


interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function CourseAssesmentDataTable<TData, TValue>({
                                                            columns,
                                                            data
                                                        }: DataTableProps<TData, TValue>) {
    const [sorting, setSorting] = useState<SortingState>([])
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [allData, setData] = useState(() => [...data]);
    const [originalData, setOriginalData] = useState(() => [...data]);
    const [editedRows, setEditedRows] = useState({});

    // filters
    const [openClass, setOpenClass] = useState(false);
    const [selectedClass, setselectedClass] = React.useState<any>(null);

    const [openCourse, setOpenCourse] = useState(false);
    const [selectedCourse, setselectedCourse] = React.useState<any>(null);


    const router = useRouter();


    const table = useReactTable({
        data,
        columns,
        state: {
            sorting,
            columnFilters,
            columnVisibility
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
    })

    //reset filters popup
    const handleReset = (columnId: string) => {
        if (columnId === 'class') {
            setselectedClass(null);
        }
        if (columnId === 'course') {
            setselectedCourse(null);
        }
        table.getColumn(columnId)?.setFilterValue('');
        setData([...originalData]);
    };

    // filters data of class
    const FilteredClass = data.reduce((cls: string[], item: any) => {
        if (!cls.includes(item.class)) {
            cls.push(item.class);
        }
        return cls;
    }, []);

    // filters data of course
    const FilteredCourse = data.reduce((course: string[], item: any) => {
        if (!course.includes(item.course)) {
            course.push(item.course);
        }
        return course;
    }, []);


    return (
        <>

            <div className='flex items-center justify-between gap-4 my-4'>

                {/* search */}
                <div className="flex items-center w-full relative">
                    <Input
                        placeholder="Search Student Fullname(EN)"
                        value={
                            (table.getColumn("nameEn")?.getFilterValue() as string) ?? ""
                        }
                        onChange={(event) =>
                            table.getColumn("nameEn")?.setFilterValue(event.target.value)
                        }

                        className="border-[#E6E6E6] bg-white pl-10 "
                    />

                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <FaSearch className="text-gray-400"/>
                    </div>

                </div>


                {/* Column visibility */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='outline' className='border-[#E6E6E6] bg-white ml-auto text-lms-gray-30'>
                            <TbAdjustmentsHorizontal className='mr-2 h-4 w-4'/>
                            View
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className='bg-white '>
                        {table
                            .getAllColumns()
                            .filter(column => column.getCanHide())
                            .map(column => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className='capitalize focus:bg-background'
                                        checked={column.getIsVisible()}
                                        onCheckedChange={value => column.toggleVisibility(!!value)}
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>

            {/* Table */}
            <div className='rounded-md p-4 bg-white'>

                {/* class detail information */}
                <div className='flex justify-between p-4'>
                    <div>
                        <Label className='text-lms-gray-30'>Generation</Label>
                        <p className='flex font-medium text-lms-black-90'>Generation 1</p>
                    </div>

                    <div>
                        <Label className='text-lms-gray-30'>Year</Label>
                        <p className='flex font-medium text-lms-black-90'>Foundation Year</p>
                    </div>

                    <div>
                        <Label className='text-lms-gray-30'>Academic Year</Label>
                        <p className='flex font-medium text-lms-black-90'>2024-2025</p>
                    </div>

                    <div>
                        <Label className='text-lms-gray-30'>Degree</Label>
                        <p className='flex font-medium text-lms-black-90'>Bachelor</p>
                    </div>

                    <div>
                        <Label className='text-lms-gray-30'>Study Program</Label>
                        <p className='flex font-medium text-lms-black-90'>Software Engineer</p>
                    </div>

                    <div>
                        <Label className='text-lms-gray-30'>Class</Label>
                        <p className='flex font-medium text-lms-black-90'>FY2025 - A3</p>
                    </div>

                    <div>
                        <Label className='text-lms-gray-30'>Course</Label>
                        <p className='flex font-medium text-lms-black-90'>Introduction To IT</p>
                    </div>


                </div>

                <Table>

                    <TableHeader className='text-lms-gray-30'>
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map(header => {
                                    return (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                    header.column.columnDef.header,
                                                    header.getContext()
                                                )}
                                        </TableHead>
                                    )
                                })}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => (
                                <TableRow
                                    key={row.id}
                                    data-state={row.getIsSelected() && 'selected'}
                                    className='hover:bg-gray-50'
                                >
                                    {row.getVisibleCells().map(cell => (
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
                                    className='h-24 text-center '
                                >
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>


                </Table>


            </div>

            {/* status Remark */}
            <div className='rounded-lg p-4 bg-white flex flex-row justify-between my-4'>
                <p className='text-lms-success font-bold '>Status :</p>
                <div className='flex gap-2 text-gray-500 '>
                    <p className='font-semibold text-lms-success'>Active</p>
                    <p className='khmer-font'>សិស្សកំពុងសិក្សា</p>
                </div>

                <div className='flex gap-2 text-gray-500'>
                    <p className='font-semibold text-lms-accent '>Hiatus</p>
                    <p className='khmer-font'>សិស្សព្យួរការសិក្សា</p>
                </div>

                <div className='flex gap-2 text-gray-500'>
                    <p className='font-semibold text-lms-error'>Drop</p>
                    <p className='khmer-font'>សិស្សបោះបង់ការសិក្សា</p>
                </div>

                <div className='flex gap-2 text-gray-500'>
                    <p className='font-semibold text-lms-error'>Disable</p>
                    <p className='khmer-font'>សិស្សត្រូវបានបញ្ឈប់ ឬ លុបចេញ</p>
                </div>
            </div>

            {/* Pagination */}
            <div className='flex items-center justify-end space-x-2 py-4'>
                <Button
                    className='border-gray-30'
                    variant='outline'
                    size='sm'
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    className='border-gray-30 '
                    variant='outline'
                    size='sm'
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>

        </>
    )
}