'use client'
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";


import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'
import { TbArchive } from "react-icons/tb";
import { TbFileIsr } from "react-icons/tb";
import { format } from 'date-fns';

import { Button } from '@/components/ui/button'
import { TbTrash  } from "react-icons/tb";

import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'

import { OptionType , StudentType } from "@/lib/types/admin/academics";

import StatusBadge from "@/components/common/StatusBadge";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {selectDetailClasses} from "@/lib/features/admin/academic-management/detail-classes/detailClassesSlice";
import {selectSingleClass} from "@/lib/features/admin/academic-management/detail-classes/singleClassSlice";
import {
    useDeleteStudentFromClassMutation,
    useGetStudentFromClassQuery
} from "@/lib/features/admin/academic-management/classes/classApi";
import {toast} from "react-hot-toast";


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
    if (accessorKey === 'studentStatus') {
        
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
                return <StatusBadge type="warning" status="Hiatus" />
          }
    }

    //add font style to khmer name columns 
    if(accessorKey === 'nameKh'){
        return <div className="khmer-font" >{value}</div>;
    }

    if(column.id === "nameEn"){
        return (
            <span className=" uppercase">
        {value}
      </span>
        );
    }

    if (column.id === "gender") {
        return (
            <span className={value === "F" ? "font-semibold text-orange-400" : "font-semibold"}>
        {value === "F" ? "Female" : value === "M" ? "Male" : ""}
      </span>
        );
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

const HandleRemoveStudent = ({ row }: { row: any }) => {
    const selectedClass = useSelector((state: RootState) => selectSingleClass(state));

    if (row.original) {
        console.log("Student selected:", row.original.uuid);
    } else {
        console.error("Row does not have an 'original' property");
    }

    console.log("selected class: ", selectedClass?.uuid || "");

    const [deleteStudentFromClass, { isLoading, isError }] = useDeleteStudentFromClassMutation();

    const { refetch: refetchData } = useGetStudentFromClassQuery(selectedClass?.uuid);


    const handleRemoveClick = async () => {
        if (row.original && selectedClass) {
            try {
                await deleteStudentFromClass({ classUuid: selectedClass.uuid, studentUuid: row.original.uuid }).unwrap();
                toast.success("Student removed successfully");
                console.log("Student removed successfully");
                refetchData()
            } catch (error) {
                toast.error("Failed to remove student");
                console.error("Failed to remove student:", error);
            }
        } else {
            console.error("Row does not have an 'original' property or class is not selected");
        }
    };



    return (
        <div className="text-red-600 focus:text-red-600 font-medium focus:bg-background hover:cursor-pointer ">
            {
                isLoading ? (
                    <span>Loading...</span>
                ):(
                    <TbTrash onClick={handleRemoveClick}  size={24} className="text-red-600 mr-2" />
                )
            }

            {/*{isLoading && <span>Loading...</span>}*/}

        </div>
    );
};

export const StuColumns: ColumnDef<StudentType>[] = [
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
        accessorKey: 'phoneNumber',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                >
                    PERSONAL NUMBER
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'email',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                    //to  customize the size of each column
                    className="w-[200px] flex justify-start items-start"
                >
                    EMAIL
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },

    {
        accessorKey: 'studentStatus',
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
        cell: ({ row }) => (
            <HandleRemoveStudent row={row} />
        ),
    },

]


