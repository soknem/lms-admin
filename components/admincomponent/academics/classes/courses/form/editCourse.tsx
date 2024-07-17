'use client'
import { useFormik } from "formik";
import * as Yup from 'yup'
import React, {useEffect, useState} from "react";
import Modal from "@/components/common/ModalComponent";
import {useGetInstructorQuery} from "@/lib/features/admin/user-management/instructor/instructor";
import {toast} from "react-hot-toast";
import Select, {SingleValue} from "react-select";
import {
    useAddInstructorToCourseMutation,
    useUpdateCourseMutation
} from "@/lib/features/admin/academic-management/courses/courseApi";
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Calendar as CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";



type PropsType = {
    onClose: () => void;
    isVisible: boolean;
    courseData: any;
}


export default function EditCourseForm({ isVisible, onClose , courseData }: PropsType) {

    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const [selectedStatus, setSelectedStatus] = useState(1);

    const [updateCourse] = useUpdateCourseMutation();

    useEffect(() => {
        if (courseData) {
            setStartDate(new Date(courseData.courseStart));
            setEndDate(new Date(courseData.courseEnd));
            setSelectedStatus(courseData.status);
        }
    }, [courseData]);

    const handleStatusChange = (selectedOption: any) => {
        const value = selectedOption?.value;
        setSelectedStatus(value);
    };

    const handleEditCourse = async ( values : any,setSubmitting : any ,resetForm : any ) => {
        const uuid = courseData.uuid;
        try {

            const updatedData = {
                courseStart: values.courseStart,
                courseEnd: values.courseEnd,
                status: selectedStatus,
            };

            await updateCourse({ uuid, updatedData }).unwrap();
            toast.success('Course Updated successfully');
            resetForm();
            onClose();
        } catch (error) {
            toast.error('Failed to update course');
        } finally {
            setSubmitting(false);
        }
    }

    const formik = useFormik({
        initialValues: {
            courseStart: courseData?.courseStart || "",
            courseEnd: courseData?.courseEnd || "",
            status: courseData?.status || 2,
        },
        validationSchema: Yup.object({
            // courseStart: Yup.date().nullable().required('Course start date is required'),
            // courseEnd: Yup.date()
            //     .nullable()
            //     .required('Course end date is required')
            //     .when('courseStart', (courseStart, schema) => {
            //         return courseStart ? schema.min(courseStart, 'Course end date must be after course start date') : schema;
            //     }),
            status: Yup.number().required('Status is required'),
        }),


        onSubmit: async (values, { setSubmitting ,resetForm }) => {
            const formattedValues = {
                ...values,
                courseStart: startDate ? format(startDate, "yyyy-MM-dd") : null,
                courseEnd: endDate ? format(endDate, "yyyy-MM-dd") : null,
            };
            console.log("Form values: ", formattedValues);
            handleEditCourse(formattedValues,setSubmitting ,resetForm)
        }



    });

    return(
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2 className="text-xl text-lms-black-90 font-bold mb-4">Update Course</h2>
            <form className="w-[480px] space-y-2 " onSubmit={formik.handleSubmit}>

                {/* Class Start  */}
                <div>
                    <RequiredFieldLabelComponent labelText="Class Start"
                                                 labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className={cn(
                                    "text-gray-600 border border-lms-gray-30 w-full justify-start text-left font-normal",
                                    !startDate && "text-gray-600"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white ">
                            <Calendar
                                mode="single"
                                selected={startDate ?? undefined}
                                onSelect={(date: Date | undefined) => {
                                    setStartDate(date ?? null);
                                    formik.setFieldValue("courseStart", date ?? null);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {
                        typeof formik.errors.courseStart === "string" && formik.touched.courseStart && (
                            <p className="text-red-500 text-sm">{formik.errors.courseStart}</p>)
                    }
                </div>

                {/* Class End */}
                <div>
                    <RequiredFieldLabelComponent labelText="Class End"
                                                 labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                className={cn(
                                    "text-gray-600 border border-lms-gray-30 w-full justify-start text-left font-normal",
                                    !endDate && "text-gray-600"
                                )}
                            >
                                <CalendarIcon className="mr-2 h-4 w-4" />
                                {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0 bg-white ">
                            <Calendar
                                mode="single"
                                selected={endDate ?? undefined}
                                onSelect={(date: Date | undefined) => {
                                    setEndDate(date ?? null);
                                    formik.setFieldValue("courseEnd", date ?? null);
                                }}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                    {
                        typeof formik.errors.courseEnd === "string" && formik.touched.courseEnd && (
                            <p className="text-red-500 text-sm">{formik.errors.courseEnd}</p>)
                    }

                </div>

                {/* Status */}
                <div>
                    <RequiredFieldLabelComponent labelText="Status"
                                                 labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                    <Select
                        className="basic-single"
                        classNamePrefix="select"
                        isClearable={true}
                        isSearchable={true}
                        name="status"
                        options={[
                            {value: 1, label: "Started"},
                            {value: 2, label: "Pending"},
                            {value: 3, label: "Ended"}
                        ]}
                        onChange={handleStatusChange}
                        defaultValue={{
                            value: courseData?.status,
                            label: courseData?.status === 1 ? "Started" : courseData?.status === 2 ? "Pending" : "Ended"
                        }}
                        value={{
                            value: selectedStatus,
                            label: selectedStatus === 1 ? "Started" : selectedStatus === 2 ? "Pending" : "Ended"
                        }}
                    />
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="mt-2 bg-lms-primary hover:bg-lms-primary/80 text-white font-bold py-2 px-4 rounded"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}