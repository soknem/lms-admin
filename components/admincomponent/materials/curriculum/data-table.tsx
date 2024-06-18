"use client";

import React, { useState } from "react";
import { FaSearch } from "react-icons/fa";
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
import { CreateMaterialForm } from "../addMaterialForm";
import {TbAdjustmentsHorizontal, TbFilter} from "react-icons/tb";

//custom component import

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function CurriculumTable<TData, TValue>({
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

  const filterOptions = ["All", "Public", "Disable", "Draft"];
  const handleFilterChange = (value:any) => {
    setSelectedFilter(value);

    // Mapping filter options to corresponding numerical values
    const filterValue =
        value === "All" ? undefined :
            value === "Public" ? 1 :
                value === "Disable" ? 2 :
                    3;

    // Assuming `table` is defined somewhere in your component
    table.getColumn("status")?.setFilterValue(filterValue);
  };



  return (
      <>
        <div className="flex items-center justify-between gap-4 ">
          <div className="flex items-center py-4 w-full">
            <div className="flex items-center w-full relative">
              <Input
                  placeholder="Search Slide"
                  value={
                      (table.getColumn("title")?.getFilterValue() as string) ?? ""
                  }
                  onChange={(event) =>
                      table.getColumn("title")?.setFilterValue(event.target.value)
                  }

                  className="border-[#E6E6E6] bg-white rounded-[10px] pl-10  text-lms-gray-30 "
              />

              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-gray-400"/>
              </div>

            </div>
          </div>

          {/* Filter */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                  variant='outline'
                  className='border-[#E6E6E6] bg-white ml-auto text-lms-gray-30'
              >
                <TbAdjustmentsHorizontal className='mr-2 h-4 w-4'/>
                Columns
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              {filterOptions.map((option) => (
                  <DropdownMenuItem
                      key={option}
                      className="capitalize focus:bg-background"
                      onClick={() => handleFilterChange(option)}
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
                  variant='outline' className='border-[#E6E6E6] bg-white ml-auto text-lms-gray-30'
              >
                <TbAdjustmentsHorizontal className='mr-2 h-4 w-4'/>
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

          <CreateMaterialForm/>
        </div>

        {/* Table */}
        <div className="w-full rounded-md p-4 bg-white">
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
