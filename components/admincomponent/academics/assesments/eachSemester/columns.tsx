'use client'
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, ChangeEvent } from 'react';
import {OptionType, semesterAssessementType, CourseShortType} from "@/lib/types/admin/academics";
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
                return <StatusBadge type="success" status="Active" />;
            case 2:
                return <StatusBadge type="warning" status="Hiatus" />;
            case 3:
                return <StatusBadge type="error" status="Drop" />;
            case 4:
                return <StatusBadge type="error" status="Disable" />;
            default:
                return <span className='bg-gray-200 text-gray-500'>Unknown</span>;
        }
    }

    if (tableMeta?.editedRows[row.id]) {
        return columnMeta?.type === "select" ? (
            <select
                className="border-1 border-gray-30 rounded-md focus:to-primary"
                onChange={onSelectChange}
                value={value}
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

// const CoursesCell = ({ row } : any) => {
//     const courses = row.original.courses; // Adjust this if your data structure is different
//
//     return (
//         <div className="flex flex-col">
//             {Object.entries(courses).map(([courseName, score], index) => (
//                 <div key={index} className="flex justify-between">
//                     <span>{courseName}</span>
//                     <span>{score}</span>
//                 </div>
//             ))}
//         </div>
//     );
// };


export const eachSemesterColumn: ColumnDef<semesterAssessementType>[] = [
    {
        accessorKey: 'nameEn',
        header: ({column}) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                FULLNAME(EN)
                <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
    },
    {
        accessorKey: 'gender',
        header: ({column}) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                GENDER
                <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
    },
    {
        accessorKey: 'dob',
        header: ({column}) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="w-[130px] flex justify-start items-start"
            >
                DOB
                <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
    },

    {
        accessorKey: 'classCode',
        header: ({column}) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                className="w-[130px] flex justify-start items-start"
            >
                CLASS
                <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
    },

    {
        accessorKey: 'grade',
        header: ({column}) => (
            <Button
                variant='ghost'
            >
                GPA
                <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
    },

    {
        accessorKey: 'total',
        header: ({column}) => (
            <Button
                variant='ghost'
            >
                TOTAL
                <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
    },
    {
        accessorKey: 'status',
        header: ({column}) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                STATUS
                <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
    },
];