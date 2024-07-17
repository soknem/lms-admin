'use client'
import { ColumnDef } from '@tanstack/react-table';
import { MoreHorizontal, ArrowUpDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useState, useEffect, ChangeEvent } from 'react';
import {OptionType, semesterAssessementType, CourseShortType} from "@/lib/types/admin/academics";
import StatusBadge from "@/components/common/StatusBadge";

const getUniqueSubjects = (data: semesterAssessementType[]) => {
    const subjectsSet = new Set<string>();
    data.forEach((item) => {
        item.courses.forEach((course) => {
            subjectsSet.add(course.title);
        });
    });
    console.log("subject set: ",subjectsSet)
    return Array.from(subjectsSet);
};

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


const initialData: semesterAssessementType[] = [

    {
        cardId: "istad-1000",
        nameEn: "Alice Johnson",
        gender: "Female",
        dob: "2001-03-15",
        classCode: "FY2025 - M1",
        academicYear: null,
        courses: [
            { title: "Entrepreneurship 101: From Idea to Business", score: 85 },
            { title: "Data Science Fundamentals: Unlocking Insights", score: 92 },
            { title: "Financial Literacy for Entrepreneurs: Managing Money Wisely", score: 88 },
            // { title: "Academic Skill Development", score: 90 },
            // { title: "Mathematics I", score: 95 }
        ],
        grade: "A",
        gpa: 0.0,
        total: 450,
        status: 1
    }


];

const uniqueSubjects = getUniqueSubjects(initialData);

const subjectColumns = uniqueSubjects.map((subject) => ({
    accessorKey: subject.replace(/\s+/g, ''),
    header: ({ column } : any) => (
        <Button
            variant='ghost'
            onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
            {subject.toUpperCase()}
            <ArrowUpDown className='ml-2 h-4 w-4' />
        </Button>
    ),
    cell: ({ row }: any) => {
        const subjectScore = row.original.courses.find(
            (course: CourseShortType) => course.title === subject
        )?.score;
        return subjectScore ?? '-';
    }
}));

export const eachSemesterColumn: ColumnDef<semesterAssessementType>[] = [
    {
        accessorKey: 'cardId',
        header: ({column}) => (
            <Button
                variant='ghost'
                onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
            >
                CARD ID
                <ArrowUpDown className='ml-2 h-4 w-4'/>
            </Button>
        ),
        cell: TableCell,
    },
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
    ...subjectColumns,
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