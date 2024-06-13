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

import { Input } from '@/components/ui/input'

//custom component import
import { FaSearch } from "react-icons/fa";

import { Button } from "@/components/ui/button"

import { TbSearch } from "react-icons/tb";

import { useMediaQuery } from "usehooks-ts"
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




interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function CourseDataTable<TData, TValue>({
  columns,
  data
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [allData, setData] = useState(() => [...data]);
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [editedRows, setEditedRows] = useState({});

  // const [isFocused, setIsFocused] = useState(false);

  // filters
  const [openGeneration, setOpenGeneration] = useState(false);
  const [selectedIns, setSelectedIns] = React.useState<any>(null);
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


   //reset popup
   const handleReset = (columnId: string) => {
    if (columnId === 'instructor') {
          setSelectedIns(null);
    }
        table.getColumn(columnId)?.setFilterValue('');
        setData([...originalData]);
  };


  // filter data of instructor
  const FilteredInstructor = data.reduce((instructor: string[], item: any) => {
    if (!instructor.includes(item.instructor)) {
      instructor.push(item.instructor);
    }
    return instructor;
  }, []);




  return (
    <>

      <div className='flex items-center justify-between gap-4 my-4 p-1'>

        {/* search */}
        <div className="flex items-center w-full relative">
          <Input
            placeholder="Search Course Title"
            value={
              (table.getColumn("subject")?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn("subject")?.setFilterValue(event.target.value)
            }

            className="border-[#E6E6E6] bg-white pl-10 "
          />

          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FaSearch className="text-gray-400" />
          </div>

        </div>

       {/* filter generation */}
        <Popover open={openGeneration} onOpenChange={setOpenGeneration}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
              <TbFilter className='mr-2 h-4 w-4' />
              {selectedIns ? <>{selectedIns}</> : <> Filter by instructor</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-white" align="start">
            <Command>
              <CommandInput
                placeholder="Filter Instructor..." />

              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {FilteredInstructor.map((Ins, index) => (
                    <CommandItem
                      key={index}
                      value={Ins}
                      onSelect={(value) => {
                        setSelectedIns(value);
                        table.getColumn('instructor')?.setFilterValue(value);
                        setOpenGeneration(false);
                      }}
                    >
                      {Ins}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            {selectedIns && (
              <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none ' onClick={() => handleReset('instructor')}>Reset</Button>
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

      {/* Table */}
      <div className='rounded-md p-4 bg-white'>

        {/* class detail information */}




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
                  className='hover:bg-gray-50 cursor-pointer'
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

      <div className='px-4 w-full flex justify-between items-center'>

        {/* <div className="text-base text-muted-foreground">
          Showing <strong>1-5</strong> of <strong>10</strong>{" "}
          students
        </div> */}

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
      </div>


    </>
  )
}

