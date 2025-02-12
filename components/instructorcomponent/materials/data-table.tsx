"use client";

import React, {useState} from "react";
import {FaSearch} from "react-icons/fa";
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

import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {TbAdjustmentsHorizontal, TbFilter} from "react-icons/tb";
import {FiPlus} from "react-icons/fi";
import {useRouter} from "next/navigation";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
}

export function MaterialTable<TData, TValue>({
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

    const filterOptions = ["All", "Public", "Draft"];

    const handleFilterChange = (value: string) => {
        setSelectedFilter(value);
        const filterValue =
            value === "All"
                ? ""
                : value === "Public"
                    ? false
                    : value === "Draft"
                        ? true
                        : "";
        table.getColumn("isDraft")?.setFilterValue(filterValue);
    };


    return (
        <>
            <div className="flex items-center justify-between gap-4 ">
                <div className="flex items-center py-4 w-full">
                    <div className="flex items-center w-full relative">
                        <Input
                            placeholder="Search Materials"
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
                            variant="outline"
                            className=" justify-center bg-white text-lms-gray-30 border-lms-grayBorder hover:bg-white/60"
                        >
                            <TbFilter className='mr-2 h-4 w-4'/>
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
                                    (table.getColumn("isDraft")?.getFilterValue() || "All") ===
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
                            variant='outline' className='border-[#E6E6E6] bg-white ml-auto text-lms-gray-30'
                        >
                            <TbAdjustmentsHorizontal className='mr-2 h-4 w-4'/>
                            Table View
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

                <Button className="bg-lms-primary text-white hover:bg-lms-primary" onClick={() => {
                    router.push("/instructor/materials/add-materials")
                }}>
                    <FiPlus className="mr-2 h-4 w-4"/> Add Material
                </Button>
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