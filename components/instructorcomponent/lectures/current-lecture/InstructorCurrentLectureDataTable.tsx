'use client'

import React, { useState } from 'react'


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
  useReactTable
} from '@tanstack/react-table'

import {
  Table,
  TableBody,
  TableCell,
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

import { Input } from '@/components/ui/input'


import { Button } from "@/components/ui/button"

import { TbSearch } from "react-icons/tb";

import { useMediaQuery } from "usehooks-ts"

import { FaSearch } from "react-icons/fa";
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

import { TbFilter } from "react-icons/tb";

import { TbAdjustmentsHorizontal } from "react-icons/tb";
import { useRouter } from 'next/navigation'
import {DatePickerWithRange} from "@/components/common/DatePickerWithRange";
import CreateLectureForm from "@/components/instructorcomponent/lectures/form/CreateLectureForm";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function InstructorCurrentLectureDataTable<TData, TValue>({
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

  // const handleReset = (columnId: string) => {
  //   setSelectedStatus(null);
  //   setOpen(false);

  //   table.getColumn(columnId)?.setFilterValue('');
  //   setData([...originalData]);
  // };

  //reset-password popup
  const handleReset = (columnId: string) => {
    if (columnId === 'class') {
      setSelectedClass(null);
    }
    if (columnId === 'course') {
      setSelectedCourse(null);
    }
    table.getColumn(columnId)?.setFilterValue('');
    setData([...originalData]);
  };





  //filter data of class
  const FilteredClass = data.reduce((cs: string[], item: any) => {
    if (!cs.includes(item.classCode)) {
      cs.push(item.classCode);
    }
    return cs;
  }, []);

  //filter data of course
  const FilteredCourse = data.reduce((course: string[], item: any) => {
    if (!course.includes(item.courseTitle)) {
      course.push(item.courseTitle);
    }
    return course;
  }, []);



  return (
    <>

      <div className='flex items-center justify-between gap-4 my-4'>

        {/* Search */}
        {/* <div className="flex items-center w-full relative">
          <Input
            placeholder="Search by class...."
            value={
              (table.getColumn("className")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("className")?.setFilterValue(event.target.value)
            }

            className="border-[#E6E6E6] bg-white pl-10 "
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>

        </div> */}
        <div className="flex gap-4">
          <DatePickerWithRange/>

          {/* filter class */}
          <Popover open={openClass} onOpenChange={setOpenClass}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
                <TbFilter className='mr-2 h-4 w-4' />
                {selectedClass ? <>{selectedClass}</> : <> Filter Class</>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white" align="start">
              <Command>
                <CommandInput
                    placeholder="Filter class..." />

                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {FilteredClass.map((cs, index) => (
                        <CommandItem
                            key={index}
                            value={cs}
                            onSelect={(value) => {
                              setSelectedClass(value);
                              table.getColumn('class')?.setFilterValue(value);
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
                  <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none ' onClick={() => handleReset('class')}>Reset</Button>
              )}
            </PopoverContent>
          </Popover>

          {/* filter course */}
          <Popover open={openCourse} onOpenChange={setOpenCourse}>
            <PopoverTrigger asChild>
              <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
                <TbFilter className='mr-2 h-4 w-4' />
                {selectedCourse ? <>{selectedCourse}</> : <> Filter Course</>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white" align="start">
              <Command>
                <CommandInput
                    placeholder="Filter Course..." />

                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {FilteredCourse.map((course, index) => (
                        <CommandItem
                            key={index}
                            value={course}
                            onSelect={(value) => {
                              setSelectedCourse(value);
                              table.getColumn('class')?.setFilterValue(value);
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
                  <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none' onClick={() => handleReset('course')}>Reset</Button>
              )}
            </PopoverContent>
          </Popover>

          {/* Column visibility */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant='outline' className='border-[#E6E6E6] bg-white ml-auto text-lms-gray-30'>
                <TbAdjustmentsHorizontal className='mr-2 h-4 w-4' />
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


        {/* Create class form */}
        <CreateLectureForm />
      </div>



      {/* Table */}
      <div className='rounded-md p-4 bg-white'>
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
                    className='hover:cursor-pointer hover:bg-gray-100'
                    //on click go to class detail
                    onClick={() => router.push(`lectures/student-attendance/${row.id}`)}
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}
                >
                  {row.getVisibleCells().map(cell => (
                    <TableCell key={cell.id} >
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

