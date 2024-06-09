'use client'

import React, { useState } from 'react'
import "@/app/globals.css";

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
import { CreateClassForm } from '@/components/adminComponent/academics/classes/CreateClassForm'



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function DataTable<TData, TValue>({
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
  const [openGeneration, setOpenGeneration] = useState(false);
  const [selectedGen, setSelectedGen] = React.useState<any>(null);

  const [openClass, setOpenClass] = useState(false);
  const [selectedClass, setSelectedClass] = React.useState<any>(null);

  // const [selectedStatus, setSelectedStatus] = React.useState<any | null>(
  //   null
  // )


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

  //reset popup
  const handleReset = (columnId: string) => {
    if (columnId === 'generationAlias') {
      setSelectedGen(null);
    }
    if (columnId === 'studyProgramAlias') {
      setSelectedClass(null);
    }
    table.getColumn(columnId)?.setFilterValue('');
    setData([...originalData]);
  };


  // filter data of generation
  const FilteredGen = data.reduce((generationAlias: string[], item: any) => {
    if (!generationAlias.includes(item.generationAlias)) {
      generationAlias.push(item.generationAlias);
    }
    return generationAlias;
  }, []);


  // filter data of study program
  const FilteredProgram = data.reduce((studyProgramAlias: string[], item: any) => {
    if (!studyProgramAlias.includes(item.studyProgramAlias)) {
      studyProgramAlias.push(item.studyProgramAlias);
    }
    return studyProgramAlias;
  }, []);


  return (
    <>

      <div className='flex items-center justify-between gap-4 my-2 '>

        {/* Search */}
        <div className="flex items-center w-full relative">
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

        </div>


        {/* filter generation */}
        <Popover open={openGeneration} onOpenChange={setOpenGeneration}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
              <TbFilter className='mr-2 h-4 w-4' />
              {selectedGen ? <>{selectedGen}</> : <> Filter by generation</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-white" align="start">
            <Command>
              <CommandInput
                placeholder="Filter Generation..." />

              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {FilteredGen.map((generation, index) => (
                    <CommandItem
                      key={index}
                      value={generation}
                      onSelect={(value) => {
                        setSelectedGen(value);
                        table.getColumn('generationAlias')?.setFilterValue(value);
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
              <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none ' onClick={() => handleReset('generationAlias')}>Reset</Button>
            )}
          </PopoverContent>
        </Popover>

        {/* filter study program */}
        <Popover open={openClass} onOpenChange={setOpenClass}>
          <PopoverTrigger asChild>
            <Button variant="outline" className=" justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
              <TbFilter className='mr-2 h-4 w-4' />
              {selectedClass ? <>{selectedClass}</> : <> Filter by study program</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-white" align="start">
            <Command>
              <CommandInput
                placeholder="Filter Study Program..." />

              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {FilteredProgram.map((program, index) => (
                    <CommandItem
                      key={index}
                      value={program}
                      onSelect={(value) => {
                        setSelectedClass(value);
                        table.getColumn('studyProgramAlias')?.setFilterValue(value);
                        setOpenClass(false);
                      }}
                    >
                      {program}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            {selectedClass && (
              <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none ' onClick={() => handleReset('studyProgramAlias')}>Reset</Button>
            )}
          </PopoverContent>
        </Popover>

        {/* Column visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='outline' className='border-[#E6E6E6] bg-white ml-auto text-lms-gray-30 hover:bg-white/60 '>
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

        {/* Create class form */}
        <CreateClassForm />

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
                  key={row.id}
                  data-state={row.getIsSelected() && 'selected'}

                  //on click go to class detail
                  onClick={() => router.push(`classes/${row.id}`)}
                  className='cursor-pointer'
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


      {/* Class Remark */}
      <div className='rounded-lg p-4 bg-white flex flex-row justify-between mt-2'>
          <p className='text-lms-success font-semibold'>Class Code:</p>
          <div className='flex gap-2 text-gray-500 '>
            <p className='font-semibold'>FY2025</p>
            <p className='khmer-font'>ថ្នាក់សិក្សាឆ្នាំមូលដ្ឋានឆ្នាំ​២០២៥</p>
          </div>
          <div className='flex gap-2 text-gray-500'>
            <p className='font-semibold'>M1</p>
            <p className='khmer-font'>ក្រុមទី ១ វេនព្រឹក</p>
          </div>
          <div className='flex gap-2 text-gray-500'>
            <p className='font-semibold'>A1</p>
            <p className='khmer-font'>ក្រុមទី ១ វេនរសៀល</p>
          </div>
          <div className='flex gap-2 text-gray-500'>
            <p className='font-semibold'>E1</p>
            <p className='khmer-font'>ក្រុមទី ១ វេនយប់</p>
          </div>
      </div>

      {/* table footer */}
      <div className='px-4 w-full flex justify-between items-center'>

        <div className="text-base text-muted-foreground">
          Showing <strong>1-5</strong> of <strong>10</strong>{" "}
          classes
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
      </div>
        
      </>
      )
}