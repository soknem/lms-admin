"use client";
import {RxCross2} from "react-icons/rx";
import {IoCheckmarkSharp} from "react-icons/io5";

import {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal, ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useState, useEffect, ChangeEvent, MouseEvent} from "react";
import {AdmissionType, StatusOption} from "@/lib/types/admin/admission";
import {BiSolidMessageSquareEdit} from "react-icons/bi";

const TableCell = ({getValue, row, column, table}: any) => {
    const initialValue = getValue();
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue);

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onBlur = () => {
        tableMeta?.updateData(row.index, column.id, value);
    };

    const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        tableMeta?.updateData(row.index, column.id, newValue);
    };
    // Ensure the "id" column is not editable
    if (column.id === "academicYear") {
        return <span>{value.academicYear}</span>;
    }


    if (tableMeta?.editedRows[row.id]) {
        return columnMeta?.type === "select" ? (
            <select
                className="border-1 border-gray-300 rounded-md focus:to-primary"
                onChange={onSelectChange}
                value={value}
            >
                {columnMeta?.options?.map((option: StatusOption) => (
                    <option key={option.label} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ) : (
            <input
                className="w-full p-2 border-1 border-gray-300 rounded-md"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
                type={columnMeta?.type || "text"}
            />
        );
    }

    if (column.id === "status") {
        return (
            <span
                className={
                    value === 1
                        ? "Opening text-[#548164]  bg-green-200 px-3 py-1 rounded-[10px]"
                        : value === 2
                            ? "Ended text-white bg-red-500 px-3 py-1 rounded-[10px]"
                            : value === 3
                                ? "Achieved bg-gray-200 text-gray-500 px-3 py-1 rounded-[10px]"
                                : ""
                }
            >
        {value === 1
            ? "Opening"
            : value === 2
                ? "Ended"
                : value === 3
                    ? "Achieved"
                    : ""}
      </span>
        );
    }

    if (column.id === "endDate") {
        return <span>{value ? value : "No Data"}</span>;
    }

    if (column.id === "remark") {
        return <span className={`line-clamp-1`}>{value ? value : "No Remark"}</span>;
    }

    if (column.id === "telegramLink") {
        return <span>{value ? value : "No Link"}</span>;
    }

    return <span>{value}</span>;
};


export const admissionColumns: ColumnDef<AdmissionType>[] = [

    {
        accessorKey: "academicYear",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ACADEMIC YEAR
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "openDate",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    START DATE
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "endDate",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    END DATE
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "telegramLink",
        header: () => {
            return <div>TELEGRAM</div>;
        },
        cell: TableCell,
    },

    {
        accessorKey: "status",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    STATUS
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "remark",
        header: () => {
            return <div>REMARK</div>;
        },
        cell: TableCell,
    },

    {
        id: "actions",
        cell: ({row}) => {
            const admission = row.original;
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4"/>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-white">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            className="focus:bg-background"
                            onClick={() =>
                                navigator.clipboard.writeText(admission.academicYearAlias)
                            }
                        >
                            Copy ID
                        </DropdownMenuItem>
                        {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
                        {/* <DropdownMenuItem className="focus:bg-background" >Edit</DropdownMenuItem> */}
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-background">
                            Disable
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
