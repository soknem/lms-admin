"use client";
import {RxCross2} from "react-icons/rx";
import {IoCheckmarkSharp} from "react-icons/io5";
import {MdEdit} from "react-icons/md";

import {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal, ArrowUpDown, Link} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useState, useEffect, ChangeEvent, MouseEvent} from "react";

import {
    StatusOption,
    StudyProgramType,
} from "@/lib/types/admin/faculty";
import {useRouter} from "next/navigation";
// @ts-ignore
import ActionsCell from "@/components/admincomponent/faculties/studygrogram/StudyProgramActtionCell";

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
        const newValue = e.target.value === "true";
        setValue(newValue);
        tableMeta?.updateData(row.index, column.id, newValue);
    };

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
            //custom on only normal dropdown
            <select
                className="border-1 border-gray-30 rounded-md focus:to-primary"
                onChange={onSelectChange}
                value={value ? "true" : "false"}
            >
                {columnMeta?.options?.map((option: StatusOption) => (
                    <option key={option.label} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ) : (
            //custom on normal input text
            <input
                className="w-full p-2 border-1 border-gray-30 rounded-md"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
                type={columnMeta?.type || "text"}
            />
        );
    }

    // Check if the column is the status column
    if (column.id === "status") {
        return (
            <span
                className={value ? "text-lms-success bg-green-300 px-5 py-1 rounded-[10px]" : "text-lms-error bg-red-200 px-5 py-1 rounded-[10px]"}>
        {value ? "Public" : "Draft"}
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
                    <MdEdit size={18} className="text-gray-30"/>
                </button>
            )}
        </div>
    );
};

export const studyProgramColumns: ColumnDef<StudyProgramType>[] = [
    {
        accessorKey: "id",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ID
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },
    {
        accessorKey: "name",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    NAME
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },
    {
        accessorKey: "description",
        header: () => {
            return <div>DESCRIPTION</div>;
        },
        cell: TableCell,
    },
    {
        accessorKey: "logo",
        header: () => {
            return <div>LOGO</div>;
        },
        cell: TableCell,
    },
    {
        accessorKey: "degree",
        header: () => {
            return <div>DEGREE</div>;
        },
        cell: TableCell,
    },
    {
        accessorKey: "faculty",
        header: () => {
            return <div>FACULTY</div>;
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
                {value: "true", label: "Public"},
                {value: "false", label: "Draft"},
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
