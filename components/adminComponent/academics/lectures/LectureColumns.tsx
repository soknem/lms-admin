'use client'
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";


import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { TbArchive } from "react-icons/tb";
import { TbFileIsr } from "react-icons/tb";
import { format } from 'date-fns';

import { Button } from '@/components/ui/button'
import { TbPencil } from "react-icons/tb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'

import { OptionType, LectureType } from "@/lib/types/admin/academics";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import StatusBadge from "@/components/common/StatusBadge";


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
    if (accessorKey === 'status') {

        switch (value) {
            case 1:
              return <StatusBadge type="success" status="Started" />
            case 2:
              return <StatusBadge type="warning" status="Pending" />
            case 3:
              return <StatusBadge type="error" status="Ended" />
          }
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



export const LectureColumns: ColumnDef<LectureType>[] = [
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
        accessorKey: 'session',
        header: ({ column }) => {
            return (
                <Button
                    //to  customize the size of each column
                    // className="w-[200px] flex justify-start items-start"
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    SESSION
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell
    },

    {
        accessorKey: 'class',
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
        accessorKey: 'instructor',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    INSTRUCTOR
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'course',
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

    {
        id: 'actions',
        cell: ({ row }) => {
            const classes = row.original;

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant='ghost' className='h-8 w-8 p-0'>
                            <span className='sr-only'>Open menu</span>
                            <MoreHorizontal className='h-4 w-4' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align='end' className="bg-white">
                        <DropdownMenuItem className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium"><TbPencil size={20} className="text-gray-30 mr-2" /> Edit</DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600 focus:text-red-600 font-medium focus:bg-background"><TbArchive size={20} className="text-red-600 mr-2 "/>Disable</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            )
        }
    },
    

]


