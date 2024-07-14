import React, { useState } from 'react';
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
} from '@tanstack/react-table';
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { FaSearch } from 'react-icons/fa';
import { Button } from '@/components/ui/button';
import { TbSearch, TbFilter, TbAdjustmentsHorizontal } from 'react-icons/tb';
import { useMediaQuery } from 'usehooks-ts';
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useRouter } from 'next/navigation';
import { Label } from '@radix-ui/react-dropdown-menu';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function InstructorCourseAssesmentDataTable<TData, TValue>({
                                                                    columns,
                                                                    data,
                                                                  }: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [allData, setData] = useState(() => [...data]);
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [editedRows, setEditedRows] = useState({});

  const [openClass, setOpenClass] = useState(false);
  const [selectedClass, setSelectedClass] = useState<any>(null);

  const [openCourse, setOpenCourse] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);

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
              old.map((row, index) =>
                  index === rowIndex ? data[rowIndex] : row
              )
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

  // Reset filters popup
  const handleReset = (columnId: string) => {
    if (columnId === 'classCode') {
      setSelectedClass(null);
      table.getColumn('classCode')?.setFilterValue('');
    }
    if (columnId === 'course.title') {
      setSelectedCourse(null);
      table.getColumn('course.title')?.setFilterValue('');
    }
    setData([...originalData]);
  };

  // Filters data of class
  const filteredClass = data.reduce((cls: string[], item: any) => {
    if (!cls.includes(item.classCode)) {
      cls.push(item.classCode);
    }
    return cls;
  }, []);

  // Filters data of course
  const filteredCourse = data.reduce((courses: string[], item: any) => {
    if (!courses.includes(item.course.title)) {
      courses.push(item.course.title);
    }
    return courses;
  }, []);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    table.getColumn('student')?.setFilterValue(value);
  };

  return (
      <>
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center py-4 w-full">
            <div className="flex items-center w-full relative">
              <Input
                  placeholder="Search student name"
                  value={
                      table.getColumn('student')?.getFilterValue() as string ?? ''
                  }
                  onChange={handleSearchChange}
                  className="border-[#E6E6E6] bg-white rounded-[10px] pl-10 text-lms-gray-30"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            </div>
          </div>

          <Popover open={openClass} onOpenChange={setOpenClass}>
            <PopoverTrigger asChild>
              <Button
                  variant="outline"
                  className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60"
              >
                <TbFilter className="mr-2 h-4 w-4" />
                {selectedClass ? <>{selectedClass}</> : <> Filter by Class</>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white" align="start">
              <Command>
                <CommandInput placeholder="Filter Class..." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {filteredClass.map((cls, index) => (
                        <CommandItem
                            key={index}
                            value={cls}
                            onSelect={(value) => {
                              setSelectedClass(value);
                              table.getColumn('classCode')?.setFilterValue(value);
                              setOpenClass(false);
                            }}
                        >
                          {cls}
                        </CommandItem>
                    ))}
                  </CommandGroup>
                </CommandList>
              </Command>
              {selectedClass && (
                  <Button
                      className="bg-slate-50 hover:bg-slate-100 w-full rounded-none"
                      onClick={() => handleReset('classCode')}
                  >
                    Reset
                  </Button>
              )}
            </PopoverContent>
          </Popover>

          <Popover open={openCourse} onOpenChange={setOpenCourse}>
            <PopoverTrigger asChild>
              <Button
                  variant="outline"
                  className="justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60"
              >
                <TbFilter className="mr-2 h-4 w-4" />
                {selectedCourse ? <>{selectedCourse}</> : <> Filter by Course</>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0 bg-white" align="start">
              <Command>
                <CommandInput placeholder="Filter Course...." />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup>
                    {filteredCourse.map((course, index) => (
                        <CommandItem
                            key={index}
                            value={course}
                            onSelect={(value) => {
                              setSelectedCourse(value);
                              table.getColumn('course.title')?.setFilterValue(value);
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
                      onClick={() => handleReset('course.title')}
                  >
                    Reset
                  </Button>
              )}
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                  variant="outline"
                  className="border-[#E6E6E6] bg-white ml-auto text-lms-gray-30"
              >
                <TbAdjustmentsHorizontal className="mr-2 h-4 w-4" />
                View
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
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
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
                          data-state={row.getIsSelected() && 'selected'}
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
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
            <TableFooter>
              {table.getFooterGroups().map((footerGroup) => (
                  <TableRow key={footerGroup.id}>
                    {footerGroup.headers.map((header) => (
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                              ? null
                              : flexRender(
                                  header.column.columnDef.footer,
                                  header.getContext()
                              )}
                        </TableHead>
                    ))}
                  </TableRow>
              ))}
            </TableFooter>
          </Table>
        </div>
        <div className="flex items-center justify-end space-x-2 py-4">
          <Button
              variant="outline"
              size="sm"
              onClick={() => table.previousPage()}
              disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
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
