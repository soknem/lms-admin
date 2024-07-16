'use client'
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import { BiSolidMessageSquareEdit } from "react-icons/bi";

import { ColumnDef } from '@tanstack/react-table'

import { MoreHorizontal, ArrowUpDown } from 'lucide-react'

import { format } from "date-fns";

import { Button } from '@/components/ui/button'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from '@/components/ui/dropdown-menu'
import { useState, useEffect, ChangeEvent, MouseEvent } from 'react'

import { OptionType , GenerationType } from "@/lib/types/admin/academics";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import StatusBadge from "@/components/common/StatusBadge";
import {
    useDisableLectureMutation,
    useEnableLectureMutation, useGetLectureQuery
} from "@/lib/features/admin/academic-management/lecture/lecture";
import {useSelector} from "react-redux";
import {selectLecture} from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import {TbEye, TbEyeCancel, TbPencil , TbCopy } from "react-icons/tb";
import CardDisableComponent from "@/components/card/staff/CardDisableComponent";
import UpdateLectureForm from "@/components/admincomponent/academics/lectures/form/UpdateLectureForm";
import {
    useDisableGenerationMutation,
    useEnableGenerationMutation, useGetGenerationQuery
} from "@/lib/features/admin/academic-management/generation/generation";
import {selectGeneration} from "@/lib/features/admin/academic-management/generation/generationSlice";




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


    // Custom rendering for specific columns : customize date which can take pick date time
    // if (accessorKey === 'startYear' || accessorKey === 'endYear') {
    //     const dateValue = new Date(value);
    //     const formattedDate = format(dateValue, 'yyyy');
    //     const currentYear = new Date().getFullYear();
    //     const years = Array.from(new Array(40), (val, index) => currentYear - index);
    //
    //     if (tableMeta?.editedRows[row.id]) {
    //         return (
    //             //custom year selector only
    //             <select
    //                 className="border-1 border-lms-gray-30 rounded-md focus:border-lms-gray-30"
    //                 value={new Date(value).getFullYear()}
    //                 onChange={(e) => {
    //                     const newValue = new Date(Number(e.target.value), 0, 1).toISOString();
    //                     setValue(newValue);
    //                     tableMeta?.updateData(row.index, column.id, newValue);
    //                 }}
    //             >
    //                 {years.map((year) => (
    //                     <option  key={year} value={year}>
    //                         {year}
    //                     </option>
    //                 ))}
    //             </select>
    //         );
    //     } else {
    //
    //         return <div >{formattedDate}</div>;
    //
    //     }
    // }

    // Custom rendering for specific columns 
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

    // Custom rendering for specific columns
    if (accessorKey === 'isDeleted') {
        const DisplayValue = value.toString();

        if (tableMeta?.editedRows[row.id]) {
            return (
                //custom year selector only
                <RadioGroup defaultValue="comfortable" className="flex">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem  value="false" id="active" />
                        <Label htmlFor="active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="disable" />
                        <Label htmlFor="disable">Disable</Label>
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

    // Custom rendering for specific columns
    if (accessorKey === 'isActive') {
        const DisplayValue = value.toString();

        if (tableMeta?.editedRows[row.id]) {
            return (
                //custom year selector only
                <RadioGroup defaultValue="comfortable" className="flex">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem  value="false" id="started" />
                        <Label htmlFor="started">Started</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="ended" />
                        <Label htmlFor="ended">Ended</Label>
                    </div>
                </RadioGroup>
            );
        } else {

            if (DisplayValue === 'false') {
                return <StatusBadge type="error" status="Ended" />
            } else {
                return <StatusBadge type="success" status="Started" />
            }


        }
    }

    if (tableMeta?.editedRows[row.id]) {

        return columnMeta?.type === "select" ? (

            //custom on only normal dropdown 
            <select
                className="border-1 border-lms-gray-30 rounded-md focus:to-primary"
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
                className="w-full p-2 border-1 border-lms-gray-30 rounded-md bg-white"
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
                <div>

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

const ActionCell = ({ row } : any) => {
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [isDeleted, setIsDeleted] = useState(row.original.isDeleted);

    // const [enableLecture, { isLoading, isError, isSuccess }] = useEnableLectureMutation();
    // const [disableLecture] = useDisableLectureMutation();

    const [enableGeneration, setEnableGeneration] = useEnableGenerationMutation() ;
    const [disableGeneration, setDisableGeneration] = useDisableGenerationMutation();

    const generations = useSelector(selectGeneration);


    const { refetch: refetchGeneration } = useGetGenerationQuery({ page: 0, pageSize: 10 });

    const handleOpenCard = () => {
        setIsCardVisible(true);
    };

    const handleConfirm = async   (genAlias : string) => {
        if(isDeleted){
            await enableGeneration(genAlias).unwrap();
            setIsDeleted((prev :any) => !prev);
        }else{
            await disableGeneration(genAlias).unwrap();
            setIsDeleted((prev : any) => !prev);
        }
        setIsCardVisible(false);
    };

    const handleCancel = () => {
        setIsCardVisible(false);
    };


    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant='ghost' className='h-8 w-8 p-0'>
                        <span className='sr-only'>Open menu</span>
                        <MoreHorizontal className='h-4 w-4' />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align='end' className="bg-white">
                    <DropdownMenuItem onClick={() => navigator.clipboard.writeText(row.original.alias)} className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium ">
                        <TbCopy  size={20} className="text-gray-30 mr-2  "  /> Copy Alias
                    </DropdownMenuItem>
                    <DropdownMenuItem
                        className={` text-${isDeleted ? 'green-600' : 'red-600'} focus:text-${isDeleted ? 'green-600' : 'red-600'} font-medium focus:bg-background`}
                        onClick={handleOpenCard}
                    >
                        {isDeleted ? (
                            <>
                                <TbEye size={20} className="text-green-600 mr-2 " /> Enable
                            </>
                        ) : (
                            <>
                                <TbEyeCancel size={20} className="text-red-600 mr-2 " /> Disable
                            </>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            {isCardVisible && (
                <CardDisableComponent
                    message={isDeleted ? "Do you really want to enable this item?" : "Do you really want to disable this item?"}
                    onConfirm={() => handleConfirm(row.original.alias)}
                    onCancel={handleCancel}
                    buttonTitle={isDeleted ? "Enable" : "Disable"}
                />
            )}
        </div>
    );
};

export const columns: ColumnDef<GenerationType>[] = [
    {
        accessorKey: 'name',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    GENERATION
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell
    },
    {
        accessorKey: 'startYear',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    START YEAR
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell
    },
    {
        accessorKey: 'endYear',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    END YEAR
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },
    {
        accessorKey: 'isActive',
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
        cell: TableCell,


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
        cell: TableCell,


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
        cell: TableCell,


    },
    {
        id: "edit",
        cell: ActionCell,
    },
    // {
    //     id: 'actions',
    //     cell: ({ row }) => {
    //         const gen = row.original
    //
    //         return (
    //             <DropdownMenu>
    //                 <DropdownMenuTrigger asChild>
    //                     <Button variant='ghost' className='h-8 w-8 p-0'>
    //                         <span className='sr-only'>Open menu</span>
    //                         <MoreHorizontal className='h-4 w-4' />
    //                     </Button>
    //                 </DropdownMenuTrigger>
    //                 <DropdownMenuContent align='end' className="bg-white">
    //                     <DropdownMenuLabel>Actions</DropdownMenuLabel>
    //                     <DropdownMenuItem
    //                         className="focus:bg-background"
    //                         onClick={() => navigator.clipboard.writeText(gen.alias)}
    //                     >
    //                         Copy ID
    //                     </DropdownMenuItem>
    //                    {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
    //                     {/* <DropdownMenuItem className="focus:bg-background" >Edit</DropdownMenuItem> */}
    //                     <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-background">Disable</DropdownMenuItem>
    //                 </DropdownMenuContent>
    //             </DropdownMenu>
    //         )
    //     }
    // },

]


