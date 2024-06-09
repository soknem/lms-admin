
'use client'
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";

import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { TbArchive } from "react-icons/tb";
import { TbFileIsr } from "react-icons/tb";
import { format } from 'date-fns';

import { Button } from '@/components/ui/button'
import { TbTrash } from "react-icons/tb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'

import { OptionType, SubjectType, semesterAssessementType } from "@/lib/types/admin/academics";

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

    const accessorKey = column.columnDef.accessorKey;

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

const generateSubjectColumns = (subjects: SubjectType[]): ColumnDef<semesterAssessementType>[] => {
    return subjects.map((subject, index) => ({
        accessorKey: `subjects[${index}].score`,
        header: ({ column }) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="w-[130px] flex justify-start items-start"
            >
                {subject.subjectName.toUpperCase()}
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: TableCell,
    }));
};

const commonColumns: ColumnDef<semesterAssessementType>[] = [
    {
        accessorKey: 'cardId',
        header: ({ column }) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                CARD ID
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: TableCell,
    },
    {
        accessorKey: 'nameEn',
        header: ({ column }) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                FULLNAME(EN)
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: TableCell,
    },
    {
        accessorKey: 'gender',
        header: ({ column }) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                GENDER
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: TableCell,
    },
    {
        accessorKey: 'dob',
        header: ({ column }) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="w-[130px] flex justify-start items-start"
            >
                DOB
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: TableCell,
    },
    {
        accessorKey: 'class',
        header: ({ column }) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="w-[130px] flex justify-start items-start"
            >
                CLASS
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: TableCell,
    },
    {
        accessorKey: 'grade',
        header: ({ column }) => (
            <Button
                variant='ghost'
            >
                GPA
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: TableCell,
    },
    {
        accessorKey: 'total',
        header: ({ column }) => (
            <Button
                variant='ghost'
            >
                TOTAL
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: TableCell,
    },
    {
        accessorKey: 'status',
        header: ({ column }) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                STATUS
                <ArrowUpDown className='ml-2 h-4 w-4' />
            </Button>
        ),
        cell: TableCell,
    },
];

const SemesterColumns = (data: semesterAssessementType[]): ColumnDef<semesterAssessementType>[] => {
    const subjects = data.length > 0 ? data[0].subjects : [];
    const subjectColumns = generateSubjectColumns(subjects);
    return [...commonColumns, ...subjectColumns];
};

export default SemesterColumns;