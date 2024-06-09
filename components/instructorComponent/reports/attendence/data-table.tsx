"use client";

import { useState } from "react";
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

//custom component import

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function AttendenceTable<TData, TValue>({
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
      

      {/* Table */}
      <div className="w-full rounded-lg p-4 bg-white mt-9">
        
        {/* class detail information */}
        <div className="flex gap-16 p-4 ">
          <div>
            <Label className="text-lms-gray30">Generation</Label>
            <p className="flex font-medium text-black "> Generation 1{selectedGen}</p>
          </div>

          <div>
            <Label className="text-lms-gray30">Year</Label>
            <p className="flex font-medium text-black"> Year 1</p>
          </div>

          <div>
            <Label className="text-lms-gray30">Academic Year</Label>
            <p className="flex font-medium text-black">2024-2025</p>
          </div>

          <div>
            <Label className="text-lms-gray30">Degree</Label>
            <p className="flex font-medium text-black">Bachelor</p>
          </div>
          <div>
            <Label className="text-lms-gray30">Study Program</Label>
            <p className="flex font-medium text-black">Information Techology</p>
          </div>

          <div>
            <Label className="text-lms-gray30">Course</Label>
            <p className="flex font-medium text-black">Web Design</p>
          </div>

          <div>
            <Label className="text-lms-gray30">Class</Label>
            <p className="flex font-medium text-black">FY2025 - A1</p>
          </div>
          <div>
            <Label className="text-lms-gray30">Duration</Label>
            <p className="flex font-medium text-black">01/02/2022-03/05/2023</p>
          </div>
        </div>
        {/* score point */}
        <div className=" mx-auto my-4 p-4 bg-gray-100 rounded-lg">
        <div className="font-bold mx-6 text-lms-gray-30">Score's Point</div>
        <div className="flex gap-6 mx-6">
        <div>
          Present <span className="font-bold">P</span>
        </div>
        <div>
          Excused Absent <span className="font-bold">EA = -0.5pt</span>
        </div>
        <div>
          Unexcused Absent <span className="font-bold">UA = -1pt</span>
        </div>
        </div>
    </div>

        <Table>
          <TableHeader className="text-lms-gray30">
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

    
    </>
  );
}
