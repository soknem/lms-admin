"use client";

import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import { TbFilter } from "react-icons/tb";
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

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { number } from "yup";
import { CreatePayForm } from "./CreatePayForm";

//custom component import

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PaymentTable<TData, TValue>({
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
  // filters
  const [openGeneration, setOpenGeneration] = useState(false);
  const [selectedGen, setSelectedGen] = useState<any>(null);

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

  const handleReset = (columnId: string) => {
    if (columnId === "generation") {
      setSelectedGen(null);
    }
    table.getColumn(columnId)?.setFilterValue("");
    setData([...originalData]);
  };

  const FilteredGen = data.reduce((generation: string[], item: any) => {
    if (!generation.includes(item.generation)) {
      generation.push(item.generation);
    }
    return generation;
  }, []);

  const [isFocused, setIsFocused] = useState(false);
  const filterOptions = ["All", "Public", "Disable", "Draft"];
  const handleFilterChange = (value: string) => {
    setSelectedFilter(value);
    const filterValue =
      value === "All"
        ? ""
        : value === "Public"
        ? "true"
        : value === "Disable"
        ? "false"
        : "draft";
    table.getColumn("status")?.setFilterValue(filterValue);
  };

  return (
    <>
      <section className="w-full h-[192px] bg-white rounded flex items-center gap-9 p-6">
        <div className="w-[330px] h-[136px] bg-[#ABC3FF] rounded-[10px] flex flex-col gap-4 justify-center items-center">
          <p className="text-2xl font-medium text-lms-black-90">
            Earnings this semester
          </p>
          <p className="text-4xl font-bold text-lms-primary">$ 1000.00</p>
        </div>

        <div className="w-[330px] h-[136px] bg-[#FFD338] rounded-[10px] flex flex-col gap-4 justify-center items-center">
          <p className="text-2xl font-medium text-lms-black-90">To be paid</p>
          <p className="text-4xl font-bold text-[#F5A524]">$ 800.00</p>
        </div>

        <div className="w-[330px] h-[136px] bg-[#18C964] rounded-[10px] flex flex-col gap-4 justify-center items-center">
          <p className="text-2xl font-medium text-lms-black-90">
            Earnings this semester
          </p>
          <p className="text-4xl font-bold text-[#008000]">$ 8000.00</p>
        </div>

        <div className="w-[330px] h-[136px] bg-[#ABC3FF] rounded-[10px] flex flex-col gap-4 justify-center items-center">
          <p className="text-2xl font-medium text-lms-black-90">
            Total students
          </p>
          <p className="text-4xl font-bold text-lms-primary">150 people</p>
        </div>

        <div className="w-[330px] h-[136px] bg-[#FFD338] rounded-[10px] flex flex-col gap-4 justify-center items-center">
          <p className="text-2xl font-medium text-lms-black-90">
            Students to be paid:
          </p>
          <p className="text-4xl font-bold text-[#F5A524]">20 people</p>
        </div>
      </section>

      {/* Search */}
      <div className="flex items-center justify-between gap-4 ">
        <div className="flex items-center py-4 w-full">
          <div className="flex items-center w-full relative">
            <Input
              placeholder="Search Payment"
              value={
                (table.getColumn("name")?.getFilterValue() as string) ?? ""
              }
              onChange={(event) =>
                table.getColumn("name")?.setFilterValue(event.target.value)
              }
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="border-[#E6E6E6] bg-white focus:pl-8 "
            />
            {isFocused && (
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400" />
              </div>
            )}
          </div>
        </div>

        {/* Filter */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-[#E6E6E6] bg-white ml-auto"
            >
              {selectedFilter}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="border-[#E6E6E6] bg-white"
          >
            {filterOptions.map((option) => (
              <DropdownMenuItem
                key={option}
                onSelect={() => handleFilterChange(option)}
                className={`cursor-pointer  ${
                  (table.getColumn("status")?.getFilterValue() || "All") ===
                  option
                }`}
              >
                {option}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Column visibility */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="border-[#E6E6E6] bg-white ml-auto"
            >
              Columns
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

        <CreatePayForm />
      </div>

      <div className="flex items-center justify-between gap-4">
        {/* filter generation */}
        <Popover open={openGeneration} onOpenChange={setOpenGeneration}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-center bg-white text-gray-30"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              {selectedGen ? <>{selectedGen}</> : <> Filter by generation</>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0 bg-white" align="start">
            <Command>
              <CommandInput placeholder="Filter Generation..." />

              <CommandList>
                <CommandEmpty>No results found.</CommandEmpty>
                <CommandGroup>
                  {FilteredGen.map((generation, index) => (
                    <CommandItem
                      key={index}
                      value={generation}
                      onSelect={(value) => {
                        setSelectedGen(value);
                        table.getColumn("generation")?.setFilterValue(value);
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
              <Button
                className="bg-slate-50 hover:bg-slate-100 w-full rounded-none "
                onClick={() => handleReset("generation")}
              >
                Reset
              </Button>
            )}
          </PopoverContent>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-center bg-white text-gray-30"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              Filter By Year
            </Button>
          </PopoverTrigger>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-center bg-white text-gray-30"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              Filter By Academic Year
            </Button>
          </PopoverTrigger>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-center bg-white text-gray-30"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              Filter By Degree
            </Button>
          </PopoverTrigger>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-center bg-white text-gray-30"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              Filter By Faculty
            </Button>
          </PopoverTrigger>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-center bg-white text-gray-30"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              Filter By Major
            </Button>
          </PopoverTrigger>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-center bg-white text-gray-30"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              Filter By Class
            </Button>
          </PopoverTrigger>
        </Popover>

        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              className="w-[200px] justify-center bg-white text-gray-30"
            >
              <TbFilter className="mr-2 h-4 w-4" />
              Filter By Shift
            </Button>
          </PopoverTrigger>
        </Popover>
      </div>

      {/* Table */}
      <div className="w-full rounded-md p-4 bg-white">
        {/* class detail information */}
        <div className="flex gap-16 p-4">
          <div>
            <Label className="text-gray-30">Generation</Label>
            <p className="flex font-medium text-black">{selectedGen}</p>
          </div>

          <div>
            <Label className="text-gray-30">Year</Label>
            <p className="flex font-medium text-black">Foundation Year</p>
          </div>

          <div>
            <Label className="text-gray-30">Academic Year</Label>
            <p className="flex font-medium text-black">2024-2025</p>
          </div>

          <div>
            <Label className="text-gray-30">Degree</Label>
            <p className="flex font-medium text-black">Bachelor</p>
          </div>
          <div>
            <Label className="text-gray-30">Faculty</Label>
            <p className="flex font-medium text-black">Bachelor</p>
          </div>

          <div>
            <Label className="text-gray-30">Major</Label>
            <p className="flex font-medium text-black">Software Engineer</p>
          </div>

          <div>
            <Label className="text-gray-30">Class</Label>
            <p className="flex font-medium text-black">FY2025 - A1</p>
          </div>

          <div>
            <Label className="text-gray-30">Shift</Label>
            <p className="flex font-medium text-black">Morning</p>
          </div>
        </div>

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
        </Table>
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
