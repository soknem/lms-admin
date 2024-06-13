'use client'
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

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

import { OptionType } from "@/lib/types/admin/academics";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import StatusBadge from "@/components/common/StatusBadge";
import {studentAttendanceType} from "@/lib/types/admin/studentAttendance";
import {Input} from "@/components/ui/input";


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

    const onRadioChange = (e: ChangeEvent<HTMLInputElement>) => {
        const newValue = parseInt(e.target.value, 10);
        setValue(newValue);
        tableMeta?.updateData(row.index, 'status', newValue);
    };


    // custom render on cell
    const accessorKey = column.columnDef.accessorKey;

    const statusValue = accessorKey === 'P' ? 1 : accessorKey === 'EA' ? 2 : 3;

    if (accessorKey === 'P' || accessorKey === 'EA' || accessorKey === 'UA') {
        return (
            <label>
                <input
                    type="radio"
                    className="w-5 h-5"
                    name={`status-${row.id}`}
                    value={statusValue}
                    checked={value === statusValue}
                    onChange={onRadioChange}
                />
            </label>
        );
    }




    //add font style to khmer name columns
    if(accessorKey === 'nameKh'){
        return <div className="khmer-font" >{value}</div>;
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
            <Input
                className="w-full p-2 border-1 border-gray-30 rounded-md bg-gray-100"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
                type={columnMeta?.type || "text"}
            />

        );
    }
    return <span>{value}</span>;
};


// Dynamic Edit on cell
const EditCell = ({ row, table }: any) => {
    const meta = table.options.meta;

    const setEditedRows = async (e: MouseEvent<HTMLButtonElement>) => {
        const action = e.currentTarget.name;

        meta?.setEditedRows((old: any) => ({
            ...old,
            [row.id]: action === "edit" ? true : false,
        }));

        if (action === "cancel") {
            meta?.revertData(row.index, true);
        }
    };

    return (
        <div>
            {meta?.editedRows[row.id] ? (
                <div className="flex flex-row">

                    <button className="mr-3 bg-red-100 rounded-full p-1" onClick={setEditedRows} name="cancel" >
                        <RxCross2 size={20}  className="text-red-500"/>
                    </button>

                    <button onClick={setEditedRows} name="done"className="bg-green-100 rounded-full p-1" >
                        <IoCheckmarkSharp size={20} className="text-green-500" />
                    </button>

                </div>
            ) : (

                <button onClick={setEditedRows} name="edit">
                    <MdEdit size={18} className="text-gray-30" />
                </button>
            )}
        </div>
    );
};

export const StudentAttendanceColumns: ColumnDef<studentAttendanceType>[] = [
    {
        accessorKey: 'cardId',
        header: ({ column }) => {
            return (
                <Button

                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    CARD ID
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell,

    },
    {
        accessorKey: 'nameEn',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    FULLNAME(EN)
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell
    },

    {
        accessorKey: 'nameKh',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    FULLNAME(KH)
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },

    {
        accessorKey: 'gender',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    GENDER
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'P',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className="pl-4"
                >
                    P
                </Button>
            )
        },
        cell: TableCell,
    },
    {
        accessorKey: 'EA',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className="pl-4"
                >
                    EA
                </Button>
            )
        },
        cell: TableCell,
    },
    {
        accessorKey: 'UA',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    className="pl-4"
                >
                    UA
                </Button>
            )
        },
        cell: TableCell,
    },




]


