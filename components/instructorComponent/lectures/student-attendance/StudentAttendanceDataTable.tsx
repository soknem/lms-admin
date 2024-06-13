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
// @ts-ignore
import { CreateLectureForm } from '@/components/adminComponent/academics/lectures/form/CreateLectureForm'
import { inspect } from 'util'
import { DatePickerWithRange } from '@/components/common/DatePickerWithRange'



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function StudentAttendanceDataTable<TData, TValue>({
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




  return (
    <>

      <div className='flex items-center justify-between gap-4 '>
        <DatePickerWithRange/>

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

                 className="border-[#E6E6E6] bg-white pl-10 text-lms-gray-30 "
             />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>

        </div>


        <Button className="bg-lms-primary text-lms-white-80 hover:bg-lms-primary/80">Done</Button>
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
                  className="hover:bg-gray-50 hover:cursor-pointer"
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

