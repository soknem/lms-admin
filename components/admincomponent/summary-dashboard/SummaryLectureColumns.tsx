'use client'


import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import {TbEyeCancel , TbEye } from "react-icons/tb";

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

import {OptionType, LectureType, LectureRespondType} from "@/lib/types/admin/academics";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import StatusBadge from "@/components/common/StatusBadge";
import CardDisableComponent from "@/components/card/staff/CardDisableComponent";
import {
    useDisableLectureMutation,
    useEnableLectureMutation, useGetLectureQuery
} from "@/lib/features/admin/academic-management/lecture/lecture";
import {useGetGenerationQuery} from "@/lib/features/admin/academic-management/generation/generation";
import UpdateLectureForm from "@/components/admincomponent/academics/lectures/form/UpdateLectureForm";
import {useSelector} from "react-redux";
import {selectLecture, setLecture} from "@/lib/features/admin/academic-management/lecture/lectureSlice";


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
                return <StatusBadge type="warning" status="Pending" />
            case 2:
                return <StatusBadge type="success" status="Started" />
            case 3:
                return <StatusBadge type="error" status="Ended" />
        }
    }

    if (accessorKey === 'isDraft') {
        const DisplayValue = value.toString();

        if (tableMeta?.editedRows[row.id]) {
            return (
                //custom year selector only
                <RadioGroup defaultValue="comfortable" className="flex">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem  value="false" id="started" />
                        <Label htmlFor="public">Public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="pending" />
                        <Label htmlFor="draft">Draft</Label>
                    </div>
                </RadioGroup>
            );
        } else {

            if (DisplayValue === 'false') {
                return <StatusBadge type="success" status="Public" />
            } else {
                return <StatusBadge type="default" status="Draft" />
            }


        }
    }

    if (accessorKey === 'isDeleted') {
        const DisplayValue = value.toString();

        if (tableMeta?.editedRows[row.id]) {
            return (
                //custom year selector only
                <RadioGroup defaultValue="comfortable" className="flex">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem  value="false" id="active" />
                        <Label htmlFor="public">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="disable" />
                        <Label htmlFor="draft">Disable</Label>
                    </div>
                </RadioGroup>
            );
        } else {

            if (DisplayValue === 'false') {
                return <StatusBadge type="success" status="Active" />
            } else {
                return <StatusBadge type="error" status="Disable" />
            }


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


export const SummaryLectureColumns: ColumnDef<any>[] = [
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
        accessorKey: 'startTime',
        header: ({ column }) => {
            return (
                <Button
                    //to  customize the size of each column
                    // className="w-[200px] flex justify-start items-start"
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    Start Time
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell
    },
    {
        accessorKey: 'endTime',
        header: ({ column }) => {
            return (
                <Button
                    //to  customize the size of each column
                    // className="w-[200px] flex justify-start items-start"
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    End Time
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell
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
        accessorKey: 'isDraft',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    VISIBILITY
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'isDeleted',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    STATE
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },


]


