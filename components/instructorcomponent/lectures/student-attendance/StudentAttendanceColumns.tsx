'use client'
// system
import { ColumnDef } from '@tanstack/react-table'
import { Button } from '@/components/ui/button'
import { useState, useEffect, ChangeEvent } from 'react'
import {Input} from "@/components/ui/input";

//type
import { OptionType } from "@/lib/types/admin/academics";
import {studentAttendanceType} from "@/lib/types/admin/studentAttendance";

// icon
import { ArrowUpDown } from 'lucide-react'

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
        header: () => {
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
        header: () => {
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
        header: () => {
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


