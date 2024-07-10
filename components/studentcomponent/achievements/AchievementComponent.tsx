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

import { columns } from "@/components/studentcomponent/achievements/columns";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import {YearSemesterTableProps ,AchievementTableProps } from "@/lib/types/student/achievement";


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
        <section className="flex flex-col gap-6">
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
                <h1 className="text-sm text-lms-primary font-medium">Credit: {courses.reduce((sum, course) => sum + (course.credit || 0), 0)}</h1>
            </div>
        </section>
    );
}

export default function AchievementTable({ data }: AchievementTableProps) {
    // const tableData = data.yearOfStudiesStudents.map(yearOfStudy => {
    //     let rowNumber = 1;
    //     return {
    //         year: yearOfStudy.year,
    //         semester: yearOfStudy.semester,
    //         courses: yearOfStudy.courses.map(course => ({
    //             NO: rowNumber++,
    //             courseTitle: course.title,
    //             score: course.score,
    //             credit: course.credit,
    //             grade: course.grade,
    //         }))
    //     };
    // });

    return (
        <section className="grid mt-4 lg:grid-cols-2 lg:gap-x-6 lg:gap-y-9 grid-cols-1 gap-x-6 gap-y-9">
            {/*{tableData.map((yearOfStudy, index) => (*/}
            {/*    <YearSemesterTable*/}
            {/*        key={index}*/}
            {/*        year={yearOfStudy.year}*/}
            {/*        semester={yearOfStudy.semester}*/}
            {/*        courses={yearOfStudy.courses}*/}
            {/*    />*/}
            {/*))}*/}
        </section>
    );
}
