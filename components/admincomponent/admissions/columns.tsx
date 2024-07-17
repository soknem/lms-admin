"use client";

import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState, useEffect, ChangeEvent} from "react";
import {AdmissionType, StatusOption} from "@/lib/types/admin/admission";
import ActionsCell from "@/components/admincomponent/admissions/AdmissionActionCell";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import StatusBadge from "@/components/common/StatusBadge";

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
                                ? "Finish bg-gray-200 text-gray-500 px-3 py-1 rounded-[10px]"
                                : ""
                }
            >
        {value === 1
            ? "Opening"
            : value === 2
                ? "Ended"
                : value === 3
                    ? "Finish"
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
        accessorKey: "remark",
        header: () => {
            return <div>DESCRIPTION</div>;
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
                    REMARK
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
