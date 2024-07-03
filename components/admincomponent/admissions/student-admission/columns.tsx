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
import {
    StatusOption,
    StudentAdmissionType,
} from "@/lib/types/admin/admission";
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
    if (column.id === "id") {
        return <span>{value}</span>;
    }

    if (column.id === "profile") {
        const studentData = row.original;
        return (
            <div className="flex items-center">
                <img
                    src={studentData.avatar}
                    alt={studentData.name}
                    className="w-8 h-8 rounded-full mr-2"
                />
                <span>{studentData.nameEn}</span>
            </div>
        );
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
                    value === "paid"
                        ? "Paid text-[#548164]  bg-green-200 px-3 py-1 rounded-[10px]"
                        : value === "unpaid"
                            ? "Unpaid text-white bg-red-500 px-3 py-1 rounded-[10px]"
                            : ""

                }
            >
        {value === "paid" ? "Paid" : value === "unpaid" ? "Unpaid" : ""}
      </span>
        );
    }

    return <span>{value}</span>;
};

// Dynamic Edit on cell
const EditCell = ({row, table}: any) => {
    const meta = table.options.meta;

    const setEditedRows = async (e: MouseEvent<HTMLButtonElement>) => {
        const action = e.currentTarget.name;

        meta?.setEditedRows((old: any) => ({
            ...old,
            [row.id]: action === "edit",
        }));

        if (action === "cancel") {
            meta?.revertData(row.index, true);
        }
    };

    return (
        <div>
            {meta?.editedRows[row.id] ? (
                <div>
                    <button
                        className="mr-3 bg-red-100 rounded-full p-1"
                        onClick={setEditedRows}
                        name="cancel"
                    >
                        <RxCross2 size={20} className="text-red-500"/>
                    </button>

                    <button
                        onClick={setEditedRows}
                        name="done"
                        className="bg-green-100 rounded-full p-1"
                    >
                        <IoCheckmarkSharp size={20} className="text-green-500"/>
                    </button>
                </div>
            ) : (
                <button onClick={setEditedRows} name="edit">
                    <BiSolidMessageSquareEdit size={24} className="text-lms-primary"/>
                </button>
            )}
        </div>
    );
};

export const StudentAdmissionColumns: ColumnDef<StudentAdmissionType>[] = [
    {
        accessorKey: "profile",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PROFILE
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "email",
        header: () => {
            return <div>EMAIL</div>;
        },
        cell: TableCell,
    },

    {
        accessorKey: "degree.level",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    DEGREE
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "shift.name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    SHIFT
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "studyProgram.studyProgramName",
        header: () => {
            return <div>STUDY PROGRAM</div>;
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
        meta: {
            type: "select",
            options: [
                {value: "paid", label: "Paid"},
                {value: "unpaid", label: "Unpaid"},
            ],
        },
    },

    // {
    //     accessorKey: "generation",
    //     header: () => {
    //         return <div>GENERATION</div>;
    //     },
    //     cell: TableCell,
    // },

    {
        id: "edit",
        cell: EditCell,
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
                                navigator.clipboard.writeText(admission.shift)
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
