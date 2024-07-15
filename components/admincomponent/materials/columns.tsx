"use client";

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
import {MaterialType, StatusOption} from "@/lib/types/admin/materials";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import StatusBadge from "@/components/common/StatusBadge";
import ActionsCell from "@/components/admincomponent/materials/MaterialActionCell";

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

    if (column.id === "description") {
        const words = value.split(" ");
        const firstFiveWords = words.slice(0, 5).join(" ");
        const displayText = words.length > 5 ? `${firstFiveWords}...` : firstFiveWords;
        return <span>{displayText || "No Description"}</span>;
    }

    if (column.id === "logo") {
        return (
            <div>
                <img
                    src={value || "https://via.placeholder.com/150"}
                    // alt="Logo"
                    className="w-12 h-12 rounded-full object-contain"
                />
            </div>

        );
    }

    if (column.id === "section") {
        return <span>{value?.title || "No Section"}</span>;
    }

    if (tableMeta?.editedRows[row.id]) {
        return columnMeta?.type === "select" ? (
            <select
                className="border-1 border-gray-300 dark:bg-white hover:scale-[105%] hover: cursor-pointer focus:outline-none "
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
                className="w-full p-2 border-1 border-gray-300 "
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
                    value === false
                        ? "Public text-[#548164] bg-green-200 px-3 py-1 rounded-[10px]"
                        : value === true
                            ? "Draft text-white bg-red-500 px-3 py-1 rounded-[10px]"
                            : ""
                }
            >
            {value === true
                ? "Draft"
                : value === false
                    ? "Public"
                    : ""}
        </span>
        );
    }

    // Custom rendering for specific columns
    if (column.id === 'isDeleted') {
        const DisplayValue = value.toString();

        if (tableMeta?.editedRows[row.id]) {
            return (
                //custom year selector only
                <RadioGroup defaultValue="comfortable" className="flex">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="active"/>
                        <Label htmlFor="active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="disable"/>
                        <Label htmlFor="disable">Disable</Label>
                    </div>
                </RadioGroup>
            );
        } else {

            if (DisplayValue === 'false') {
                return <StatusBadge type="success" status="Active"/>
            } else {
                return <StatusBadge type="error" status="Disabled"/>
            }
        }
    }

    return <span>{value}</span>;
};

export const materialColumns: ColumnDef<MaterialType>[] = [

    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    TITLE
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "section",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    SECTION
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
        accessorKey: "fileType",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    TYPE
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
    },

    {
        accessorKey: "isDeleted",
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
        id: "actions",
        cell: ActionsCell,
    },
];
