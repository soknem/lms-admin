"use client";

import React, { useState } from "react";

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

import { Button } from "@/components/ui/button";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { TbFilter } from "react-icons/tb";

import { useRouter } from "next/navigation";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function Filter<TData, TValue>({
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
  const [openIns, setopenIns] = useState(false);
  const [selectedIns, setselectedIns] = React.useState<any>(null);

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
    if (columnId === "instructor") {
      setselectedIns(null);
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

  // filter data of instructor
  // const FilteredIns = data.reduce((instructor: string[], item: any) => {
  //   if (!instructor.includes(item.instructor)) {
  //     instructor.push(item.instructor);
  //   }
  //   return instructor;
  // }, []);

  //filter data of class
  // const FilteredClass = data.reduce((cs: string[], item: any) => {
  //   if (!cs.includes(item.class)) {
  //     cs.push(item.class);
  //   }
  //   return cs;
  // }, []);

  //filter data of course
  // const FilteredCourse = data.reduce((course: string[], item: any) => {
  //   if (!course.includes(item.course)) {
  //     course.push(item.course);
  //   }
  //   return course;
  // }, []);

  return (
    <>
      <div className="flex items-center gap-4">
        {/* filter semester */}
        <Popover open={openIns} onOpenChange={setopenIns}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-center bg-white text-gray-30 border-lms-grayBorder hover:bg-white/60"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              <> Filter Semester</>
            </Button>
          </PopoverTrigger>
          {/* <PopoverContent className="w-[200px] p-0 bg-white" align="start">
            <Command>
              <CommandInput
                placeholder="Filter Instructor..." />

              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {FilteredIns.map((ins, index) => (
                    <CommandItem
                      key={index}
                      value={ins}
                      onSelect={(value) => {
                        setselectedIns(value);
                        table.getColumn('instructor')?.setFilterValue(value);
                        setopenIns(false);
                      }}
                    >
                      {ins}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
            {selectedIns && (
              <Button className='bg-slate-50 hover:bg-slate-100 w-full rounded-none ' onClick={() => handleReset('instructor')}>Reset</Button>
            )}
          </PopoverContent> */}
        </Popover>

        {/* filter class */}
        <Popover open={openClass} onOpenChange={setOpenClass}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-center bg-white text-gray-30 border-lms-grayBorder hover:bg-white/60"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              <> Filter Class</>
            </Button>
          </PopoverTrigger>
          {/* <PopoverContent className="w-[200px] p-0 bg-white" align="start">
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
          </PopoverContent> */}
        </Popover>

        {/* filter course */}
        <Popover open={openCourse} onOpenChange={setOpenCourse}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="justify-center bg-white text-gray-30 border-lms-grayBorder hover:bg-white/60"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              <> Filter Course</>
            </Button>
          </PopoverTrigger>
          {/* <PopoverContent className="w-[200px] p-0 bg-white" align="start">
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
          </PopoverContent> */}
        </Popover>
      </div>
    </>
  );
}
