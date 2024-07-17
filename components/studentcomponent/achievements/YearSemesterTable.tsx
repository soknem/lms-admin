'use client'
import React, { useState } from "react";
import {
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
import { YearSemesterTableProps } from "@/lib/types/student/achievement";
import { columns } from "./columns";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

function YearSemesterTable({ year, semester, courses }: YearSemesterTableProps) {
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = useState({});

    const table = useReactTable({
        data: courses,
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
        <section className="flex flex-col gap-6 w-full">
            <div className="flex gap-8">
                <h1 className="text-xl font-semibold">Year {year}</h1>
                <h1 className="text-xl font-semibold">Semester {semester}</h1>
            </div>
            <div className="rounded-2xl border-2 border-[#D4D4D8] p-8">
                <Table>
                    <TableHeader className="bg-lms-transcript-header rounded-t-2xl">
                        {table.getHeaderGroups().map(headerGroup => (
                            <TableRow
                                key={headerGroup.id}
                                className="bg-lms-transcript-header border-none"
                            >
                                {headerGroup.headers.map(header => (
                                    <TableHead
                                        key={header.id}
                                        className="border-none text-center px-3 font-semibold"
                                    >
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(
                                                header.column.columnDef.header,
                                                header.getContext()
                                            )}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row, rowIndex) => (
                                <TableRow
                                    className={`border-none text-center ${rowIndex === table.getRowModel().rows.length - 1 ? 'rounded-b-2xl' : ''}`}
                                    key={row.id}
                                    data-state={row.getIsSelected() && "selected"}
                                >
                                    {row.getVisibleCells().map(cell => (
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
                            <TableRow className="rounded-b-2xl">
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
            <div className="flex gap-6">
                <h1 className="text-sm text-lms-primary font-medium">Total Course: {courses.length}</h1>
                <h1 className="text-sm text-lms-primary font-medium">GPA: 4.0</h1>
                <h1 className="text-sm text-lms-primary font-medium">Credit: {courses.reduce((sum, course) => sum + course.credit, 0)}</h1>
            </div>
        </section>
    );
}

export default YearSemesterTable;
