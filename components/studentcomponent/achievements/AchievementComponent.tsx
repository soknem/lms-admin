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
    courseId: "002",
    courseTitle: "C++ Programming",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "003",
    courseTitle: "Spring Framework",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "004",
    courseTitle: "Java Programming",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "005",
    courseTitle: "Java Programming",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "006",
    courseTitle: "Java Programming",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "007",
    courseTitle: "Java Programming",
    score: 100,
    credit: 4,
    grade: "A",
  },
  {
    courseId: "008",
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
      <div className="capitalize text-[#7828C8]">
        {row.getValue("courseId")}
      </div>
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
      <div className="capitalize text-red-500 font-bold">
        {row.getValue("grade")}
      </div>
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
    <div className="grid grid-cols-2 gap-x-6 gap-y-9">
      <section className="flex flex-col gap-6">
        <div className="flex gap-8 ">
          <h1 className="text-xl font-semibold">First Year</h1>
          <h1 className="text-xl font-semibold">Semester 1</h1>
        </div>
        <div className="rounded-[10px] border-2 border-[#D4D4D8] p-8">
          <Table>
            <TableHeader className="bg-lms-transcript-header rounded-[10px]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-lms-transcript-header border-none"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="border-none text-center"
                      >
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
                    className="border-none text-center"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-10">
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
        <div className="flex gap-6 ">
          <h1 className="text-sm text-lms-primary font-medium">Total Course : 8</h1>
          <h1 className="text-sm text-lms-primary font-medium">GPA : 4.0 </h1>
          <h1 className="text-sm text-lms-primary font-medium">Credit:32</h1>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex gap-8 ">
          <h1 className="text-xl font-semibold">First Year</h1>
          <h1 className="text-xl font-semibold">Semester 1</h1>
        </div>
        <div className="rounded-[10px] border-2 border-[#D4D4D8] p-8">
          <Table>
            <TableHeader className="bg-lms-transcript-header rounded-[10px]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-lms-transcript-header border-none"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="border-none text-center"
                      >
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
                    className="border-none text-center"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-10">
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
        <div className="flex gap-6 ">
          <h1 className="text-sm text-lms-primary font-medium">Total Course : 8</h1>
          <h1 className="text-sm text-lms-primary font-medium">GPA : 4.0 </h1>
          <h1 className="text-sm text-lms-primary font-medium">Credit:32</h1>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex gap-8 ">
          <h1 className="text-xl font-semibold">First Year</h1>
          <h1 className="text-xl font-semibold">Semester 1</h1>
        </div>
        <div className="rounded-[10px] border-2 border-[#D4D4D8] p-8">
          <Table>
            <TableHeader className="bg-lms-transcript-header rounded-[10px]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-lms-transcript-header border-none"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="border-none text-center"
                      >
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
                    className="border-none text-center"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-10">
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
        <div className="flex gap-6 ">
          <h1 className="text-sm text-lms-primary font-medium">Total Course : 8</h1>
          <h1 className="text-sm text-lms-primary font-medium">GPA : 4.0 </h1>
          <h1 className="text-sm text-lms-primary font-medium">Credit:32</h1>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex gap-8 ">
          <h1 className="text-xl font-semibold">First Year</h1>
          <h1 className="text-xl font-semibold">Semester 1</h1>
        </div>
        <div className="rounded-[10px] border-2 border-[#D4D4D8] p-8">
          <Table>
            <TableHeader className="bg-lms-transcript-header rounded-[10px]">
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow
                  key={headerGroup.id}
                  className="bg-lms-transcript-header border-none"
                >
                  {headerGroup.headers.map((header) => {
                    return (
                      <TableHead
                        key={header.id}
                        className="border-none text-center"
                      >
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
                    className="border-none text-center"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-3 px-10">
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
        <div className="flex gap-6 ">
          <h1 className="text-sm text-lms-primary font-medium">Total Course : 8</h1>
          <h1 className="text-sm text-lms-primary font-medium">GPA : 4.0 </h1>
          <h1 className="text-sm text-lms-primary font-medium">Credit:32</h1>
        </div>
      </section>
    </div>
  );
}
