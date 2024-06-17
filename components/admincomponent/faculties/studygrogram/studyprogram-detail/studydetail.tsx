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
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Assign values to object
const data: stusyDetail[] = [
  {
    no: "001",
    subject: "Web Design",
    hour: 100,
    theory: 4,
    practice: 4,
    internship: 4,
  },
  {
    no: "001",
    subject: "Web Design",
    hour: 100,
    theory: 4,
    practice: 4,
    internship: 4,
  },
  {
    no: "001",
    subject: "Web Design",
    hour: 100,
    theory: 4,
    practice: 4,
    internship: 4,
  },
  {
    no: "001",
    subject: "Web Design",
    hour: 100,
    theory: 4,
    practice: 4,
    internship: 4,
  },
  {
    no: "001",
    subject: "Web Design",
    hour: 100,
    theory: 4,
    practice: 4,
    internship: 4,
  },
  {
    no: "001",
    subject: "Web Design",
    hour: 100,
    theory: 4,
    practice: 4,
    internship: 4,
  },
];

// Type of object
export type stusyDetail = {
  no: string;
  subject: string;
  hour: number;
  theory: number;
  practice: number;
  internship: number;
};

// Column definition
export const columns: ColumnDef<stusyDetail>[] = [
  {
    accessorKey: "no",
    header: "NO",
    cell: ({ row }) => <div className="capitalize ">{row.getValue("no")}</div>,
  },

  {
    accessorKey: "subject",
    header: "SUBJECT",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("subject")}</div>
    ),
  },

  {
    accessorKey: "hour",
    header: "HOUR",
    cell: ({ row }) => <div className="capitalize">{row.getValue("hour")}</div>,
  },

  {
    accessorKey: "theory",
    header: "THEORY",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("theory")}</div>
    ),
  },

  {
    accessorKey: "practice",
    header: "PRACTICE",
    cell: ({ row }) => (
      <div className="capitaliz">{row.getValue("practice")}</div>
    ),
  },
  {
    accessorKey: "internship",
    header: "INTERNSHIP",
    cell: ({ row }) => (
      <div className="capitaliz">{row.getValue("internship")}</div>
    ),
  },
];

export default function StudyDetailtTable() {
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
        <div className="flex flex-col justify-center items-center rounded-[10px] border-2 border-[#D4D4D8 bg-white p-8 gap-6">
          <h1 className="text-center text-[#64748B] uppercase text-2xl font-semibold">
            Semester I
          </h1>

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className=" text-[#64748B]">
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
                    className=" text-center"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-5 px-4">
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

            <TableFooter>
              <TableRow className="bg-lms-transcript-header font-bold text-lms-gray-80">
                <TableCell colSpan={2} className="text-center">
                  SUB TOATL
                </TableCell>
                <TableCell className="text-center">350</TableCell>
                <TableCell className="text-center">13</TableCell>
                <TableCell className="text-center">5</TableCell>
                <TableCell className="text-center">0</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <div className="flex flex-col justify-center items-center rounded-[10px] border-2 border-[#D4D4D8 bg-white p-8 gap-6">
          <h1 className="text-center text-[#64748B] uppercase text-2xl font-semibold">
            Semester II
          </h1>

          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id} className=" text-[#64748B]">
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
                    className=" text-center"
                    key={row.id}
                    data-state={row.getIsSelected() && "selected"}
                  >
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id} className="py-5 px-4">
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

            <TableFooter>
              <TableRow className="bg-lms-transcript-header font-bold text-lms-gray-80">
                <TableCell colSpan={2} className="text-center">
                  SUB TOATL
                </TableCell>
                <TableCell className="text-center">350</TableCell>
                <TableCell className="text-center">13</TableCell>
                <TableCell className="text-center">5</TableCell>
                <TableCell className="text-center">0</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>
      </section>
    </div>
  );
}
