'use client'



import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'


import { Button } from '@/components/ui/button'

import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'

import { OptionType, LectureType } from "@/lib/types/admin/academics";


import StatusBadge from "@/components/common/StatusBadge";
import {EndedLectureType} from "@/lib/types/instructor/lecture/lecture";


const TableCell = ({ getValue, row, column, table }: any) => {

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
        setValue(e.target.value);
        tableMeta?.updateData(row.index, column.id, e.target.value);
    };


    // custom render on cell
    const accessorKey = column.columnDef.accessorKey;


    // Custom status
    if (column.id === "status") {
        return (
            <span
                className={
                    value === 2
                        ? "Started text-[#548164] bg-green-200 px-3 py-1 rounded-[10px]"
                        : value === 3
                            ? "Ended text-white bg-red-500 px-3 py-1 rounded-[10px]"
                            : value === 1
                                ? "Pending text-white bg-lms-accent px-3 py-1 rounded-[10px]"
                                : ""
                }
            >
            {value === 2
                ? "Started"
                : value === 3
                    ? "Ended"
                    : value === 1
                        ? "Pending"
                        : ""}
        </span>
        );
    }

    //data in session is a combination of starttime and end time
    if (accessorKey === 'session') {
        const startTime = row.original.startTime;
        const endTime = row.original.endTime;
        return <span>{`${startTime} - ${endTime}`}</span>;
    }


    if (tableMeta?.editedRows[row.id]) {

        return columnMeta?.type === "select" ? (

            //custom on only normal dropdown 
            <select
                className="border-1 border-gray-30 rounded-md focus:to-primary"
                onChange={onSelectChange}
                value={initialValue}
            >
                {columnMeta?.options?.map((option: OptionType) => (
                    <option
                        key={option.value}
                        value={option.value}
                    >
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
    return <span>{value}</span>;
};



export const InstructorEndedLectureColumns: ColumnDef<EndedLectureType>[] = [
    {
        accessorKey: 'lectureDate',
        header: ({ column }) => {
            return (
                <Button
                    className="text-start"
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    DATE
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell,

    },
    {
        accessorKey: "timeRange",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    SESSION
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: ({ row }) => {
            const { startTime, endTime } = row.original;
            return (
                <span>{`${startTime} - ${endTime}`}</span>
            );
        },


    },

    {
        accessorKey: 'classCode',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    CLASS
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },


    {
        accessorKey: 'teachingType',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    TEACHING TYPE
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },

    {
        accessorKey: 'courseTitle',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    COURSE
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },

    {
        accessorKey: 'status',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    STATUS
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },


    

]


