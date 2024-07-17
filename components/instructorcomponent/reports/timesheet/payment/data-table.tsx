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

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";



import { useRouter } from "next/navigation";
import { Label } from "@radix-ui/react-dropdown-menu";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function PaymentDataTable<TData, TValue>({
                                                  columns,
                                                  data,
                                                }: DataTableProps<TData, TValue>) {
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [allData, setData] = useState(() => [...data]);
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [editedRows, setEditedRows] = useState({});

  const router = useRouter();

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
      columnVisibility,
    },
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
        {/* Table */}

        <div className="rounded-[10px] bg-lms-white-80">
          <p className="text-black_80 font-bold ml-4 mb-4">
            FY2025 - A1 Introduction to IT
            <span className="text-lms-success">( Paid )</span>
          </p>
          <div className="flex justify-between p-4 ">
            <div>
              <Label className="text-lms-gray-80 ">Generation</Label>

              <p className="flex font-medium text-lms-black90">Generation 1</p>
            </div>
            <div>
              <Label className="text-lms-gray-80">Year</Label>
              <p className="flex font-medium text-lms-black90">Foundation Year</p>
            </div>
            <div>
              <Label className="text-lms-gray-80">Academic Year</Label>
              <p className="flex font-medium text-lms-black90">2024-2025</p>
            </div>
            <div>
              <Label className="text-lms-gray-80">Degree</Label>
              <p className="flex font-medium text-lms-black90">Bachelor</p>
            </div>
            <div>
              <Label className="text-lms-gray-80">Department</Label>
              <p className="flex font-medium text-lms-black90">IT</p>
            </div>
            <div>
              <Label className="text-lms-gray-80">Major</Label>
              <div className="flex gap-2">
                <p className="flextext-lms-black90 font-medium">
                  Information Techology
                </p>
              </div>
            </div>
          </div>

          <Table>
            <TableHeader className="text-lms-gray-30">
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
              <TableRow>
                <TableCell
                    colSpan={columns.length}
                    className="h-15  text-[18px] text-lms-black90 bg-lms-grayBorder "
                >
                  Total
                </TableCell>
                <TableCell
                    colSpan={columns.length}
                    className="font-normal text-[18px] text-lms-black90 bg-lms-grayBorder  "
                >
                  $1200.00
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </>
  );
}
