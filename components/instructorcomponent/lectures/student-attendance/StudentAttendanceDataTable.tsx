'use client'

import React, { useState } from 'react'

// Import from shad cn
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

import { Input } from '@/components/ui/input'

import { Button } from "@/components/ui/button"

import { FaSearch } from "react-icons/fa";

import { useRouter } from 'next/navigation'
import { CalendarIcon } from "lucide-react";

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
  useRouter();

  const table = useReactTable({
    data: allData,
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
  });

  return (
      <>
        <div className='flex items-center justify-between gap-4 '>
          <div
              className="px-3 py-1.5 bg-white rounded-lg w-[280px] flex justify-start items-center text-left font-normal border-2"
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            12/02/2023
          </div>

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
                    {headerGroup.headers.map(header => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.header,
                                  header.getContext()
                              )}
                        </TableHead>
                    ))}
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
