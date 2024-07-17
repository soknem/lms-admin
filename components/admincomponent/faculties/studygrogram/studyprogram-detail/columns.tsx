import {ColumnDef} from "@tanstack/react-table";
import {Button} from "@/components/ui/button";
import {useState, useEffect, ChangeEvent} from "react";

import {SetupStudyProgramType, StatusOption} from "@/lib/types/admin/faculty";

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


    return <span>{value}</span>;
};


export const studyProgramDetailColumns: ColumnDef<SetupStudyProgramType>[] = [

    {
        accessorKey: "title",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                >
                    SUBJECT
                </Button>
            );
        },
        cell: TableCell,
    },
    {
        accessorKey: "practice",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                >
                    PRACTICE
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "internship",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                >
                    INTERNSHIP
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "theory",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                >
                    THEAORY
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "duration",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                >
                    DURATION
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "credit",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                >
                    CREDIT
                </Button>
            );
        },
        cell: TableCell,
    },

];