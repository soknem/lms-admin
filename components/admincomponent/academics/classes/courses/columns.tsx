'use client'
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";
import {TbEyeCancel, TbEye, TbPencil, TbFileImport, TbCopy,TbUserPlus ,TbUserX } from "react-icons/tb";

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
import React, { useState, useEffect, ChangeEvent, MouseEvent } from 'react'

import { OptionType , CourseType } from "@/lib/types/admin/academics";

import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Input } from "@/components/ui/input";
import StatusBadge from "@/components/common/StatusBadge";
import {DatePicker} from "@/components/ui/DatePicker";
import CardDisableComponent from "@/components/card/staff/CardDisableComponent";
import {
    useDisableLectureMutation,
    useEnableLectureMutation, useGetLectureQuery
} from "@/lib/features/admin/academic-management/lecture/lecture";
import {useSelector} from "react-redux";
import {selectLecture} from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import {useRouter} from "next/navigation";
import {
    useEnableClassMutation,
    useGetClassCourseByUuidQuery
} from "@/lib/features/admin/academic-management/classes/classApi";
import {
    useDisableCourseMutation, useEnableCourseMutation, useGetCourseByUuidQuery,
    useRemoveInstructorFromCourseMutation
} from "@/lib/features/admin/academic-management/courses/courseApi";
import {selectCoursesBySemester} from "@/lib/features/admin/academic-management/courses/courseSlice";
import CreateClassForm from "@/components/admincomponent/academics/classes/CreateClassForm";
import AddInstructorForm from "@/components/admincomponent/academics/classes/courses/form/addInstructor";
import {toast} from "react-hot-toast";
import EditCourseForm from "@/components/admincomponent/academics/classes/courses/form/editCourse";


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
    if (accessorKey === 'startDate' || accessorKey === 'endDate') {
        const dateValue = new Date(value);
        const formattedDate = format(dateValue, "yyyy-MM-dd");

        if (tableMeta?.editedRows[row.id]) {
            return (
                // Custom date picker for startDate and endDate
                <DatePicker
                    date={value}
                    setDate={(newValue) => {
                        setValue(newValue);
                        tableMeta?.updateData(row.index, column.id, newValue);
                    }}
                />
            );
        } else {
            return <div>{formattedDate}</div>;
        }
    }


    // Custom rendering for specific columns 
    if (accessorKey === 'visibility') {
        const DisplayValue = value.toString();

        if (tableMeta?.editedRows[row.id]) {
            return (
                //custom year selector only
                <RadioGroup defaultValue="comfortable" className="flex">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="public" />
                        <Label htmlFor="public">Public</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="draft" />
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

    if (accessorKey === 'status') {

        switch (value) {
            case 1:
                return <StatusBadge type="success" status="Started" />
            case 2:
                return <StatusBadge type="warning" status="Pending" />
            case 3:
                return <StatusBadge type="error" status="Ended" />
        }
    }

    if (accessorKey === 'isDeleted') {
        const DisplayValue = value.toString();

        if (DisplayValue === 'false') {
            return <StatusBadge type="success" status="Active" />
        } else {
            return <StatusBadge type="error" status="Disable" />
        }
    }




    if (tableMeta?.editedRows[row.id]) {

        return columnMeta?.type === "select" ? (

            //custom on only normal dropdown 
            <select
                className=" rounded-md focus:to-primary"
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
                className="w-full p-2 border-1 rounded-md bg-gray-100 "
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
                type={columnMeta?.type || "text"}
            />

        );
    }
    return <span>{value}</span>;
};




const ActionCell = ({ row } : any) => {

    const router = useRouter()

    // disable & Enable
    const [isCardVisible, setIsCardVisible] = useState(false);
    const [isDeleted, setIsDeleted] = useState(row.original.isDeleted);

    const [isInsEmpty, setIsInsEmpty] = useState(row.original.instructor);

    const [enableCourse] = useEnableCourseMutation()
    const [disableCourse] = useDisableCourseMutation()

    // remove instructor
    const [isRemoveInsCardVisible, setIsRemoveInsCardVisible] = useState(false);

    const [removeInsFromCourse] = useRemoveInstructorFromCourseMutation()

    const handleOpenCard = () => {
        setIsCardVisible(true);
    };

    const handleConfirm = async   (courseUuid : string) => {
        if(isDeleted){
            await enableCourse(courseUuid).unwrap();
            toast.success("Course enabled successfully")
            setIsDeleted((prev :any) => !prev);


        }else{
            await disableCourse(courseUuid).unwrap();
            toast.success("Course enabled successfully")
            setIsDeleted((prev :any) => !prev);


        }
        setIsCardVisible(false);
    };

    const handleCancel = () => {
        setIsCardVisible(false);
    };

    const handleOpenRemoveInsCard = () => {
        setIsRemoveInsCardVisible(true);
    };

    const handleRemoveInsConfirm = async   (courseUuid : string,instructorUuid : string) => {
        await removeInsFromCourse({
                courseUuid,
                instructorUuid
            }).unwrap();
            toast.success("Add instructor successfully.");
        setIsRemoveInsCardVisible(false);
    };

    const handleRemoveInsCancel = () => {
        setIsRemoveInsCardVisible(false);
    };


    const [isModalVisible, setIsModalVisible] = useState(false);

    const handleOpenModal = () => {
        setIsModalVisible(true);
    };

    const handleCloseModal = () => {
        setIsModalVisible(false);
    };

    // Edit Course
    const {data: courseData, error: courseError, isSuccess: isCourseSuccess} = useGetCourseByUuidQuery(row.original.uuid)


    const [isEditModalVisible, setIsEditModalVisible] = useState(false);

    const handleOpenEditModal = () => {
        setIsEditModalVisible(true);
    };

    const handleCloseEditModal = () => {
        setIsEditModalVisible(false);
    };

    // make the state synchronize with the refetch
    useEffect(() => {
        setIsInsEmpty(row.original.instructor);
    }, [row.original.instructor]);

    useEffect(() => {
        setIsDeleted(row.original.isDeleted);
    }, [row.original.isDeleted]);

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

                    <DropdownMenuItem onClick={() => router.push(`classes/${row.original.uuid}`)} className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium">
                        <TbFileImport  size={20} className="text-gray-30 mr-2"  /> View
                    </DropdownMenuItem>

                    <DropdownMenuItem onClick={handleOpenEditModal} className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium">
                        <TbPencil size={20} className="text-gray-30 mr-2"  /> Edit
                    </DropdownMenuItem>

                    <DropdownMenuItem
                        className={`text-${(isInsEmpty === "N/A") ? 'green-600' : 'red-600'} focus:text-${(isInsEmpty === "N/A") ? 'green-600' : 'red-600'} font-medium focus:bg-background`}
                        onClick={
                            (isInsEmpty === "N/A") ? (
                                handleOpenModal
                            ) : (
                                handleOpenRemoveInsCard
                            )
                        }
                    >
                        {(isInsEmpty === "N/A") ? (
                            <>
                                <TbUserPlus size={20} className="text-green-600 mr-2"   /> Add Instructor

                            </>
                        ) : (
                            <>
                                <TbUserX  size={20} className="text-red-600 mr-2" /> Remove Instructor
                            </>
                        )}
                    </DropdownMenuItem>



                    <DropdownMenuItem
                        className={`text-${isDeleted ? 'green-600' : 'red-600'} focus:text-${isDeleted ? 'green-600' : 'red-600'} font-medium focus:bg-background`}
                        onClick={handleOpenCard}
                    >
                        {isDeleted ? (
                            <>
                                <TbEye size={20} className="text-green-600 mr-2" /> Enable
                            </>
                        ) : (
                            <>
                                <TbEyeCancel size={20} className="text-red-600 mr-2" /> Disable
                            </>
                        )}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>

            {/* disable & enable card */}
            {isCardVisible && (
                <CardDisableComponent
                    message={isDeleted ? "Do you really want to enable this item?" : "Do you really want to disable this item?"}
                    onConfirm={() => handleConfirm(row.original.uuid)}
                    onCancel={handleCancel}
                    buttonTitle={isDeleted ? "Enable" : "Disable"}
                />
            )}

            {/* Remove instructor from course */}
            {isRemoveInsCardVisible && (
                <CardDisableComponent
                    message={"Do you really want to remove instructor from this course?"}
                    onConfirm={() => handleRemoveInsConfirm(row.original.uuid,row.original.instructorUuid)}
                    onCancel={handleRemoveInsCancel}
                    buttonTitle="Remove"
                />
            )}

            <AddInstructorForm isVisible={isModalVisible} onClose={handleCloseModal} courseUuid={row.original.uuid} />

            <EditCourseForm isVisible={isEditModalVisible} onClose={handleCloseEditModal} courseData={courseData} />



        </div>
    );
};



export const CourseColumns: ColumnDef<CourseType>[] = [
    {
        accessorKey: 'subject',
        header: ({ column }) => {
            return (
                <Button
                    //to  customize the size of each column
                    className="w-[200px] flex justify-start items-start"
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                   SUBJECT
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell,

    },
    {
        accessorKey: 'startDate',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    START DATE
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell
    },

    {
        accessorKey: 'endDate',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    END DATE
                    <ArrowUpDown className='ml-2 h-4 w-4' />
                </Button>
            )
        },
        cell: TableCell

    },

    {
        accessorKey: 'instructor',
        header: ({ column }) => {
            return (
                <Button
                    variant='ghost'
                    onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
                >
                    INSTRUCTOR
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


    {
        id: 'actions',
        cell: ActionCell,
    },

]


