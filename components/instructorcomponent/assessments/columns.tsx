'use client'
import {RxCross2} from "react-icons/rx";
import {IoCheckmarkSharp} from "react-icons/io5";
import {BiSolidMessageSquareEdit} from "react-icons/bi";


import {ColumnDef} from '@tanstack/react-table'

import {MoreHorizontal, ArrowUpDown} from 'lucide-react'
import {TbArchive} from "react-icons/tb";
import {TbFileIsr} from "react-icons/tb";
import {format} from 'date-fns';

import {Button} from '@/components/ui/button'
import {TbTrash} from "react-icons/tb";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import {useState, useEffect, ChangeEvent, MouseEvent} from 'react'

import {OptionType, AssessmentType} from "@/lib/types/instructor/assessment";

import {Label} from "@/components/ui/label"
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group"
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
        setValue(e.target.value);
        tableMeta?.updateData(row.index, column.id, e.target.value);
    };

    // Custom rendering for specific columns
    const accessorKey = column.columnDef.accessorKey;

    if (column.id === "student.status") {
        return (
            <span
                className={
                    value === 1
                        ? "Active text-[#548164] bg-green-200 px-3 py-1 rounded-[10px]"
                        : value === 2
                            ? "Hiatus text-white bg-red-500 px-3 py-1 rounded-[10px]"
                            : value === 3
                                ? "Drop text-white bg-gray-500 px-3 py-1 rounded-[10px]"
                                : value === 4
                            ? "Disable text-lms-white-80 bg-lms-error px-3 py-1 rounded-[10px] "
                                : ""
                }
            >
            {value === 1
                ? "Active"
                : value === 2
                    ? "Hiatus"
                    : value === 3
                        ? "Drop"
                        :  value === 4
                            ? "Disable"
                            :""

            }
        </span>
        );
    }
    // Ensure the "id" column is not editable
    if (column.id === "id") {
        return <span>{value}</span>;
    }

    if (typeof value === 'object' && value !== null) {
        console.log('Rendering object value:', value);
        if (value.uuid && value.title) {
            return <span>{value.title}</span>;
        }
        return <span>Invalid Data</span>;
    }

    if (tableMeta?.editedRows[row.id]) {
        return columnMeta?.type === "select" ? (
            <select
                className="border-1 border-gray-30 rounded-md focus:to-primary"
                onChange={onSelectChange}
                value={value}
            >
                {columnMeta?.options?.map((option: OptionType) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ) : (
            <input
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
const EditCell = ({row, table}: any) => {
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

                    <button className="mr-3 bg-red-100 rounded-full p-1" onClick={setEditedRows} name="cancel">
                        <RxCross2 size={20} className="text-red-500"/>
                    </button>

                    <button onClick={setEditedRows} name="done" className="bg-green-100 rounded-full p-1">
                        <IoCheckmarkSharp size={20} className="text-green-500"/>
                    </button>

                </div>
            ) : (

                <button onClick={setEditedRows} name="edit">
                    <BiSolidMessageSquareEdit size={24} className="text-lms-primary"/>
                </button>
            )}
        </div>
    );
};


export const InstructorCourseAssessmentColumns: ColumnDef<AssessmentType>[] = [
    {
        accessorKey: 'student.cardId',
        header: ({column}) => (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                CARD ID <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
        meta: {type: 'text'},
    },
    {
        accessorKey: 'student.nameEn',
        header: ({column}) => (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                FULLNAME(EN) <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
        meta: {type: 'text'},
    },
    {
        accessorKey: 'student.gender',
        header: ({column}) => (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
                GENDER <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
        meta: {type: 'text'},
    },
    {
        accessorKey: 'student.dob',
        header: ({column}) => (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-[130px] flex justify-start items-start">
                DOB <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
        meta: {type: 'date'},
    },
    {
        accessorKey: 'classCode',
        header: ({column}) => (
            <Button variant='ghost' onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    className="w-[130px] flex justify-start items-start">
                CLASS <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
        meta: {type: 'text'},
    },
    {
        accessorKey: 'course',
        header: ({column}) => (
            <Button variant='ghost'> COURSE <ArrowUpDown className='ml-2 h-4 w-4'/> </Button>
        ),
        cell: TableCell,
        meta: {type: 'text'},
    },
    {
        accessorKey: 'midtermExamScore',
        header: ({column}) => (
            <Button variant='ghost'> MIDTERM <ArrowUpDown className='ml-2 h-4 w-4'/> </Button>
        ),
        cell: TableCell,
        meta: {type: 'number'},
    },
    {
        accessorKey: 'finalExamScore',
        header: ({column}) => (
            <Button variant='ghost'> FINAL <ArrowUpDown className='ml-2 h-4 w-4'/> </Button>
        ),
        cell: TableCell,
        meta: {type: 'number'},
    },
    {
        accessorKey: 'attendanceScore',
        header: ({column}) => (
            <Button variant='ghost'> ATT <ArrowUpDown className='ml-2 h-4 w-4'/> </Button>
        ),
        cell: TableCell,
        meta: {type: 'number'},
    },
    {
        accessorKey: 'assignmentScore',
        header: ({column}) => (
            <Button variant='ghost'> ASSGT <ArrowUpDown className='ml-2 h-4 w-4'/> </Button>
        ),
        cell: TableCell,
        meta: {type: 'number'},
    },
    {
        accessorKey: 'miniProjectScore',
        header: ({column}) => (
            <Button variant='ghost'> MP <ArrowUpDown className='ml-2 h-4 w-4'/> </Button>
        ),
        cell: TableCell,
        meta: {type: 'number'},
    },
    {
        accessorKey: 'activityScore',
        header: ({column}) => (
            <Button variant='ghost'> PRACT <ArrowUpDown className='ml-2 h-4 w-4'/> </Button>
        ),
        cell: TableCell,
        meta: {type: 'number'},
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
        header: ({column}) => (
            <Button variant='ghost'> TOTAL <ArrowUpDown className='ml-2 h-4 w-4'/> </Button>
        ),
        cell: TableCell,
        meta: {type: 'number'},
    },
    {
        accessorKey: "student.status",
        header: ({ column }) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    STATUS
                    <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
            );
        },
        cell: TableCell

    },
    {
        id: 'actions',
        cell: EditCell,
    },
];