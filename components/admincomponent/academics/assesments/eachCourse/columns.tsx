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

import { OptionType , courseAssessmentTableType } from "@/lib/types/admin/academics";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import StatusBadge from "@/components/common/StatusBadge";
import {useUpdateCourseAssessmentMutation} from "@/lib/features/admin/academic-management/assesment/assessment";
import useUpdateFieldData from "@/components/admincomponent/academics/assesments/eachCourse/useUpdateFieldData";


const TableCell = ({ getValue, row, column, table }: any) => {

    const initialValue = getValue();
    const columnMeta = column.columnDef.meta;
    const tableMeta = table.options.meta;
    const [value, setValue] = useState(initialValue);

    const [edited, setEdited] = useState(false);
    const updateFieldData = useUpdateFieldData();

    useEffect(() => {
        setValue(initialValue);
    }, [initialValue]);

    const onBlur = async () => {
        if (edited) {
            console.log('OnBlur - Value:', value); // Added log
            tableMeta?.updateData(row.index, column.id, value);
            await updateFieldData(row.original.uuid, column.id, value); // Call API to update field data
            setEdited(false);
        }
    };

    const onSelectChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        setValue(e.target.value);
        tableMeta?.updateData(row.index, column.id, e.target.value);
        await updateFieldData(row.original.uuid, column.id, e.target.value); // Call API to update field data
        setEdited(false);
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        console.log(`handleChange - Column: ${column.id}, Value: ${e.target.value}`); // Added log
        setValue(e.target.value);
        setEdited(true);

        tableMeta?.setEditedRows((old: any) => ({
            ...old,
            [row.id]: {
                ...old[row.id],
                [column.id]: e.target.value,
            },
        }));
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

    if (column.id === "gender") {
        return (
            <span className={value === "F" ? "font-semibold text-orange-400" : "font-semibold"}>
        {value === "F" ? "Female" : value === "M" ? "Male" : ""}
      </span>
        );
    }

    if (tableMeta?.editedRows[row.id]) {
        return columnMeta?.type === 'select' ? (
            //custom on only normal dropdown
            <select
                className="border-1 border-gray-30 rounded-md focus:to-primary"
                onChange={onSelectChange}
                value={initialValue}
            >
                {columnMeta?.options?.map((option: OptionType) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        ) : accessorKey !== 'cardId' &&
        accessorKey !== 'grade' &&
        accessorKey !== 'total' &&
        accessorKey !== 'course' &&
        accessorKey !== 'class' &&
        accessorKey !== 'dob' &&
        accessorKey !== 'gender' &&
        accessorKey !== 'nameEn' ? (
            <input
                className="w-full p-2 border-1 border-gray-30 rounded-md bg-gray-100"
                value={value}
                onChange={handleChange} // Use handleChange here
                onBlur={onBlur}
                type={columnMeta?.type || 'text'}
            />
        ) : (
            <span>{value}</span>
        );
    }
return <span>{value}</span>;
}


const EditCell = ({ row, table }: any) => {
    const meta = table.options.meta;
    const updateFieldData = useUpdateFieldData();

    const setEditedRows = async (e: MouseEvent<HTMLButtonElement>) => {
        const action = e.currentTarget.name;
        console.log(`Button clicked: ${action}`); // Added log

        if (action === "done") {
            const editedRow = meta?.editedRows[row.id];
            console.log('Edited row:', editedRow); // Added log

            if (editedRow) {
                const columnIds = Object.keys(editedRow);
                for (const columnId of columnIds) {
                    console.log(`Updating field: ${columnId} with value: ${editedRow[columnId]}`); // Added log
                    await updateFieldData(row.original.uuid, columnId, editedRow[columnId]);
                }
            }
        }

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
                        <RxCross2 size={20} className="text-red-500" />
                    </button>
                    <button onClick={setEditedRows} name="done" className="bg-green-100 rounded-full p-1">
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



export const CourseAssessmentColumns: ColumnDef<courseAssessmentTableType>[] = [
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
        accessorKey: 'midtermExamScore',
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
        accessorKey: 'finalExamScore',
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
        accessorKey: 'attendanceScore',
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
        accessorKey: 'assignmentScore',
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
        accessorKey: 'miniProjectScore',
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
        accessorKey: 'activityScore',
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


