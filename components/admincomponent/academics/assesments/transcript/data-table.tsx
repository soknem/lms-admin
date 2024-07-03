'use client'

import React, {useEffect, useState} from 'react'


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

import { FaSearch } from "react-icons/fa";

import { Button } from "@/components/ui/button"

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
import { Label } from '@radix-ui/react-dropdown-menu'
import {useGetGenerationQuery} from "@/lib/features/admin/academic-management/generation/generation";



interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  onFilterChange: (filters: any) => void;
}

type optionType = {
  value: string;
  label: string;
}

export function TranscriptDataTable<TData, TValue>({
  columns,
  data,
  onFilterChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [allData, setData] = useState(() => [...data]);
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [editedRows, setEditedRows] = useState({});

  // filters
  const [openProgram, setOpenProgram] = useState(false);
  const [selectedProgram, setSelectedProgram] = React.useState<any>(null);

  const [openYear, setOpenYear] = useState(false);
  const [selectedYear, setSelectedYear] = React.useState<any>(null);

  const [openSemester, setOpenSemester] = useState(false);
  const [selectedSemester, setSelectedSemester] = React.useState<any>(null);


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

  //reset-password filter popup
  // const handleReset = (columnId: string) => {
  //   if (columnId === 'studyProgram') {
  //     setSelectedProgram(null);
  //   }
  //   if (columnId === 'year') {
  //     setSelectedYear(null);
  //   }
  //   if (columnId === 'semester') {
  //     setSelectedSemester(null);
  //   }
  //   table.getColumn(columnId)?.setFilterValue('');
  //   setData([...originalData]);
  // };

  // filter data of study program
  const FilteredProgram = data.reduce((studyProgram: string[], item: any) => {
    if (!studyProgram.includes(item.studyProgram)) {
      studyProgram.push(item.studyProgram);
    }
    return studyProgram;
  }, []);

  // filter data of year
  const FilteredYear = data.reduce((year: string[], item: any) => {
    if (!year.includes(item.year)) {
      year.push(item.year);
    }
    return year;
  }, []);


  //filter data of semester
  const FilteredSemester = data.reduce((semester: string[], item: any) => {
    if (!semester.includes(item.semester)) {
      semester.push(item.semester);
    }
    return semester;
  }, []);

  // ==== generation ====
  const { data: generationData, error: generationError, isLoading: isGenerationsLoading } = useGetGenerationQuery({ page: 0, pageSize: 10 });

  const [generations, setGenerations] = useState([]);
  const [selectedGeneration, setSelectedGeneration] = useState({ alias: '', label: '' });

  useEffect(() => {
    if (generationData) {
      const formattedGenerations = generationData.content.map((gen : any) => ({
        alias: gen.alias,
        label: `${gen.name}`,
      }));
      setGenerations(formattedGenerations);
    }
    if (generationError) {
      console.error("Failed to load generation", generationError);
    }
  }, [generationData, generationError]);

  const handleGenChange = (selectedOption : any) => {
    setSelectedGeneration(selectedOption);
    console.log("Selected generation alias:", selectedOption.alias);
  };

  const handleReset = () => {
    setSelectedGeneration({ alias: '', label: '' });
  };

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
            <FaSearch className="text-gray-400" />
          </div>

        </div>

        <Popover open={openProgram} onOpenChange={setOpenProgram}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">
              <TbFilter className='mr-2 h-4 w-4' />
              {selectedGeneration.label ? <>{selectedGeneration.label}</> : <> Filter by Generation</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-white" align="start">
            <Command>
              <CommandInput placeholder="Filter Generation..." />
              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {generations.map((generation : any, index) => (
                      <CommandItem
                          key={index}
                          value={generation.alias}
                          onSelect={() => {
                            handleGenChange(generation);
                            setOpenProgram(false);
                          }}
                      >
                        {generation.label}
                      </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            {selectedGeneration.label && (
                <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none' onClick={() => handleReset()}>Reset</Button>
            )}
          </PopoverContent>
        </Popover>



        {/* filter study program */}
        {/*<Popover open={openProgram} onOpenChange={setOpenProgram}>*/}
        {/*  <PopoverTrigger asChild>*/}
        {/*    <Button variant="outline" className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">*/}
        {/*      <TbFilter className='mr-2 h-4 w-4' />*/}
        {/*      {selectedProgram ? <>{selectedProgram}</> : <> Filter by Study Program</>}*/}
        {/*    </Button>*/}
        {/*  </PopoverTrigger>*/}
        {/*  <PopoverContent className="w-[200px] p-0 bg-white" align="start">*/}
        {/*    <Command>*/}
        {/*      <CommandInput*/}
        {/*        placeholder="Filter Study Program..." />*/}

        {/*      <CommandList>*/}
        {/*        <CommandEmpty>No results found.</CommandEmpty>*/}
        {/*        <CommandGroup>*/}
        {/*          {FilteredProgram.map((program, index) => (*/}
        {/*            <CommandItem*/}
        {/*              key={index}*/}
        {/*              value={program}*/}
        {/*              onSelect={(value) => {*/}
        {/*                setSelectedProgram(value);*/}
        {/*                table.getColumn('studyProgram')?.setFilterValue(value);*/}
        {/*                setOpenProgram(false);*/}
        {/*              }}*/}
        {/*            >*/}
        {/*              {program}*/}
        {/*            </CommandItem>*/}
        {/*          ))}*/}
        {/*        </CommandGroup>*/}
        {/*      </CommandList>*/}
        {/*    </Command>*/}
        {/*    {selectedProgram && (*/}
        {/*      <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none ' onClick={() => handleReset('studyProgram')}>Reset</Button>*/}
        {/*    )}*/}
        {/*  </PopoverContent>*/}
        {/*</Popover>*/}

        {/* filter study year */}
        {/*<Popover open={openYear} onOpenChange={setOpenYear}>*/}
        {/*  <PopoverTrigger asChild>*/}
        {/*    <Button variant="outline" className=" justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">*/}
        {/*      <TbFilter className='mr-2 h-4 w-4' />*/}
        {/*      {selectedYear ? <>{selectedYear}</> : <> Filter by Year</>}*/}
        {/*    </Button>*/}
        {/*  </PopoverTrigger>*/}
        {/*  <PopoverContent className="w-[200px] p-0 bg-white" align="start">*/}
        {/*    <Command>*/}
        {/*      <CommandInput*/}
        {/*        placeholder="Filter Year..." />*/}

        {/*      <CommandList>*/}
        {/*        <CommandEmpty>No results found.</CommandEmpty>*/}
        {/*        <CommandGroup>*/}
        {/*          {FilteredYear.map((year, index) => (*/}
        {/*            <CommandItem*/}
        {/*              key={index}*/}
        {/*              value={year}*/}
        {/*              onSelect={(value) => {*/}
        {/*                setSelectedYear(value);*/}
        {/*                table.getColumn('year')?.setFilterValue(value);*/}
        {/*                setOpenYear(false);*/}
        {/*              }}*/}
        {/*            >*/}
        {/*              {year}*/}
        {/*            </CommandItem>*/}
        {/*          ))}*/}
        {/*        </CommandGroup>*/}
        {/*      </CommandList>*/}
        {/*    </Command>*/}
        {/*    {selectedYear && (*/}
        {/*      <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none ' onClick={() => handleReset('year')}>Reset</Button>*/}
        {/*    )}*/}
        {/*  </PopoverContent>*/}
        {/*</Popover>*/}

        {/* filter semester */}
        {/*<Popover open={openSemester} onOpenChange={setOpenSemester}>*/}
        {/*  <PopoverTrigger asChild>*/}
        {/*    <Button variant="outline" className=" justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60">*/}
        {/*      <TbFilter className='mr-2 h-4 w-4' />*/}
        {/*      {selectedSemester ? <>{selectedSemester}</> : <> Filter by Semester</>}*/}
        {/*    </Button>*/}
        {/*  </PopoverTrigger>*/}
        {/*  <PopoverContent className="w-[200px] p-0 bg-white" align="start">*/}
        {/*    <Command>*/}
        {/*      <CommandInput*/}
        {/*        placeholder="Filter Semester..." />*/}

        {/*      <CommandList>*/}
        {/*        <CommandEmpty>No results found.</CommandEmpty>*/}
        {/*        <CommandGroup>*/}
        {/*          {FilteredSemester.map((semester, index) => (*/}
        {/*            <CommandItem*/}
        {/*              key={index}*/}
        {/*              value={semester}*/}
        {/*              onSelect={(value) => {*/}
        {/*                setSelectedSemester(value);*/}
        {/*                table.getColumn('semester')?.setFilterValue(value);*/}
        {/*                setOpenSemester(false);*/}
        {/*              }}*/}
        {/*            >*/}
        {/*              {semester}*/}
        {/*            </CommandItem>*/}
        {/*          ))}*/}
        {/*        </CommandGroup>*/}
        {/*      </CommandList>*/}
        {/*    </Command>*/}
        {/*    {selectedSemester && (*/}
        {/*      <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none ' onClick={() => handleReset('semester')}>Reset</Button>*/}
        {/*    )}*/}
        {/*  </PopoverContent>*/}
        {/*</Popover>*/}


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
        <div className='flex justify-between p-4'>
          <div>
            <Label className='text-lms-gray-30'>Generation</Label>
            <p className='flex font-medium text-black'>Generation 1</p>
          </div>

          <div>
            <Label className='text-lms-gray-30'>Year</Label>
            <p className='flex font-medium text-black'>Foundation Year</p>
          </div>

          <div>
            <Label className='text-lms-gray-30'>Academic Year</Label>
            <p className='flex font-medium text-black'>2024-2025</p>
          </div>

          <div>
            <Label className='text-lms-gray-30'>Degree</Label>
            <p className='flex font-medium text-black'>Bachelor</p>
          </div>

          <div>
            <Label className='text-lms-gray-30'>Study Program</Label>
            <p className='flex font-medium text-black'>Software Engineer</p>
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



