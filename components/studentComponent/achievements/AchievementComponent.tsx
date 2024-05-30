"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
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

// Assign values to object
const data: Transcript[] = [
  {
    courseId: "001",
    courseTitle: "Web Design",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "001",
    courseTitle: "Web Design",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "001",
    courseTitle: "Web Design",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "001",
    courseTitle: "Web Design",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "001",
    courseTitle: "Web Design",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "001",
    courseTitle: "Web Design",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "001",
    courseTitle: "Web Design",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "001",
    courseTitle: "Web Design",
    score: 100,
    credit: 4,
    grade: "A",
  },
];

// Type of object
export type Transcript = {
  courseId: string;
  courseTitle: string;
  score: number;
  credit: number;
  grade: string;
};

// Column definition
export const columns: ColumnDef<Transcript>[] = [
  {
    accessorKey: "courseId",
    header: "Course ID",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("courseId")}</div>
    ),
  },

  {
    accessorKey: "courseTitle",
    header: "Course",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("courseTitle")}</div>
    ),
  },

  {
    accessorKey: "score",
    header: "Score",
    cell: ({ row }) => (
      <div className="capitalize">
        {parseFloat(row.getValue("score")).toFixed(2)}
      </div>
    ),
  },

  {
    accessorKey: "credit",
    header: "Credit",
    cell: ({ row }) => (
      <div className="capitalize">{parseFloat(row.getValue("credit"))}</div>
    ),
    },
  
  {
    accessorKey: "grade",
    header: "Grade",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("grade")}</div>
    ),
  },
];

export default function AchievementTable() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div>
      <div className="rounded-md">
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
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
