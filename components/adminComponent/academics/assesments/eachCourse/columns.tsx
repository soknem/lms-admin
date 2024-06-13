'use client'
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import { BiSolidMessageSquareEdit } from "react-icons/bi";


import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { TbArchive } from "react-icons/tb";
import { TbFileIsr } from "react-icons/tb";
import { format } from 'date-fns';

import { Button } from '@/components/ui/button'
import { TbTrash  } from "react-icons/tb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'

import { OptionType , courseAssessmentType } from "@/lib/types/admin/academics";

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

    // Custom rendering for specific columns 
    if (accessorKey === 'status') {
        
        switch (value) {
            case 1:
                return <StatusBadge type="success" status="Active" />
            case 2:
                return <StatusBadge type="warning" status="Hiatus" />
            case 3:
                return <StatusBadge type="error" status="Drop" />
            case 4:
                return <StatusBadge type="error" status="Disable" />
            default:
              return 'bg-gray-200 text-gray-500';
          }
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
                className="w-full p-2 border-1 border-gray-30 rounded-md bg-gray-100 "
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
                    <BiSolidMessageSquareEdit size={24} className="text-lms-primary" />
                </button>
            )}
        </div>
    );
};


export const CourseAssessmentColumns: ColumnDef<courseAssessmentType>[] = [
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
        accessorKey: 'dob',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    //to  customize the size of each column
                    className="w-[130px] flex justify-start items-start"
                >
                    DOB
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
                    //to  customize the size of each column
                    className="w-[130px] flex justify-start items-start"
                >
                    CLASS
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
                >
                    COURSE
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'mitTerm',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                >
                    MITTERM
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'final',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                >
                    FINAL
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'att',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                >
                    ATT
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'assgmt',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                >
                    ASSGT
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'mp',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                >
                    MP
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'act',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                >
                    ACT
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'grade',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                >
                    GPA
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'total',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                >
                    TOTAL
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
        id: "edit",
        cell: EditCell,
    },

]


