"use client";
import {RxCross2} from "react-icons/rx";
import {IoCheckmarkSharp} from "react-icons/io5";

import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";

import {useState, useEffect, ChangeEvent, MouseEvent} from "react";

import {AcademicYearType, DegreeType, StatusOption} from "@/lib/types/admin/faculty";
import {BiSolidMessageSquareEdit} from "react-icons/bi";
import ActionsCell from "@/components/admincomponent/faculties/academicyear/AcademicYearActionCell";

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

    if (column.id === "logo") {
        return (
            <img
                src={value}
                alt="Logo"
                className="w-12 h-12 rounded-full object-cover"
            />
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

    if (column.id === "isDraft") {
        return (
            <span
                className={
                    value === true
                        ? "Public text-[#548164] bg-green-200 px-3 py-1 rounded-[10px]"
                        : value === false
                            ? "Draft text-white bg-red-500 px-3 py-1 rounded-[10px]"
                            : ""
                }
            >
            {value === true
                ? "Public"
                : value === false
                    ? "Disable"
                    : ""}
        </span>
        );
    }

    if (column.id === "status") {
        return (
            <span
                className={
                    value === 1
                        ? "Starting text-[#548164] bg-green-200 px-3 py-1 rounded-[10px]"
                        : value === 2
                            ? "Ended text-white bg-red-500 px-3 py-1 rounded-[10px]"
                            : value === 3
                                ? "Achieved text-white bg-gray-500 px-3 py-1 rounded-[10px]"
                                : ""
                }
            >
            {value === 1
                ? "Starting"
                : value === 2
                    ? "Ended"
                    : value === 3
                        ? "Achieved"
                        : ""}
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

export const academicYearColumns: ColumnDef<AcademicYearType>[] = [
    {
        accessorKey: "alias",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ALIAS
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

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
        accessorKey: "isDraft",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    VISIBILITY
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },


        cell: TableCell,
        meta: {
            type: "select",
            options: [
                {value: true, label: "Public"},
                {value: false, label: "Draft"},
            ],
        },
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
                {value: 1, label: "Starting"},
                {value: 2, label: "Ended"},
                {value: 3, label: "Achieved"},
            ],
        },
    },

    {
        id: "edit",
        cell: EditCell,
    },

    {
        id: "actions",
        cell: ActionsCell,
    },
];
