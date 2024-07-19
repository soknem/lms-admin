'use client'
import {IoCloseOutline} from "react-icons/io5";
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Calendar as CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import Select, {SingleValue} from "react-select";
import React, {useEffect, useState} from "react";
import {useFormik} from "formik";
import {ClassUpdateType, FormLectureType, LectureRespondType} from "@/lib/types/admin/academics";
import {
    useGetClassByUuidQuery,
    useGetClassesQuery,
    useUpdateClassesMutation
} from "@/lib/features/admin/academic-management/classes/classApi";
import {useGetInstructorQuery} from "@/lib/features/admin/user-management/instructor/instructor";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {selectClasses} from "@/lib/features/admin/academic-management/classes/classSlice";
import {selectDetailClasses} from "@/lib/features/admin/academic-management/detail-classes/detailClassesSlice";
import toast from "react-hot-toast";
import {useUpdateLectureMutation} from "@/lib/features/admin/academic-management/lecture/lecture";
import * as Yup from 'yup';


type PropsType = {
    uuid: string;
    onClose: () => void;
    classData : any[];
}

type OptionType = {
    value: string;
    label: string;
};

type statusOptionType = {
    value: number;
    label: string;
};

type DescriptionItem =  {
    reason: string;
    field: string;
}

export default function EditClassForm({ uuid  ,  onClose ,classData }:PropsType ) {

    const [isLoading, setIsLoading] = useState(false);


    const [startDate, setStartDate] = useState<Date>()
    const [endDate, setEndDate] = useState<Date>()

    const classToUpdate = classData?.find(cls => cls.uuid === uuid);


    const [selectedStatus, setSelectedStatus] = useState(1);
    const [selectInstructorUuid, setSelectedInstructorUuid] = useState<string>(classToUpdate?.instructor?.uuid || '');
    const [instructors, setInstructors] = useState<OptionType[]>([]);

    useEffect(() => {
        if (classToUpdate) {
            setStartDate(new Date(classToUpdate.classStart));
            setEndDate(new Date(classToUpdate.classEnd));
            setSelectedInstructorUuid(classToUpdate.instructor.uuid);
            formik.setFieldValue("isDraft", classToUpdate.isDraft);
            // formik.setFieldValue("status",classToUpdate.status);
            setSelectedStatus(classToUpdate.status);
        }
    }, [classToUpdate]);


    // *** Instructor ***
    const {data: InsData, error: InsError, isLoading: isInsLoading, isSuccess: isInsSuccess} = useGetInstructorQuery({page: 0, pageSize: 10});

    useEffect(() => {
        if (InsData) {
            const formattedIns = InsData.content.map((ins: any) => ({
                value: ins.uuid,
                label: `${ins.username}`,
            }));
            setInstructors(formattedIns);
        }
        if (InsError) {
            console.error("failed to load instructor error", InsError);
        }
    }, [InsData, InsError]);


    const handleInstructorChange = (selectedOption: SingleValue<OptionType>) => {
        const uuid = selectedOption?.value || '';
        setSelectedInstructorUuid(uuid);
        formik.setFieldValue('instructorUuid', uuid);
    };

    const handleStatusChange = (selectedOption: any) => {
        const value = selectedOption?.value;
        setSelectedStatus(value);
    };

    const [updateClass] = useUpdateClassesMutation();

    const handleUpdateClass = async (values: ClassUpdateType) => {
        try {
            setIsLoading(true);

            const updatedData = {

                classCode: values.classCode,
                classStart: values.classStart ,
                classEnd: values.classEnd ,
                instructorUuid: values.instructorUuid,
                isDraft: values.isDraft,
                status: selectedStatus,

            };


            await updateClass({ uuid, updatedData }).unwrap();
            toast.success('Successfully updated!');
        } catch (err: any) {
            let errorMessage = 'Failed to update class';
            if (Array.isArray(err.data.error.description)) {
                errorMessage += err.data.error.description.map((d: DescriptionItem) => `${d.reason} (${d.field})`).join('');
            } else {
                errorMessage += err.data.error.description;
            }
            console.error('Error updating class:', err);
            toast.error(errorMessage, {
                style: {
                    marginBottom: '20px',
                },
            });
        } finally {
            setIsLoading(false);
        }
    };


    const formik = useFormik({
        initialValues: {
            classCode: classToUpdate?.classCode || "",
            classStart: classToUpdate?.classStart || "" ,
            classEnd: classToUpdate?.classEnd || "" ,
            instructorUuid: classToUpdate?.instructor?.uuid || "",
            isDraft: classToUpdate?.isDraft || true,
            status: classToUpdate?.status || 2,
        },
        validationSchema: Yup.object({
            classCode: Yup.string().required("Class Code is required"),
            classStart: Yup.string().required("Class Start date is required"),
            classEnd: Yup.string().required("Class End date is required"),
            instructorUuid: Yup.string().required("Instructor is required"),
            isDraft: Yup.boolean().required("isDraft is required"),
            status: Yup.number().required("Status is required"),
        }),
        onSubmit: values => {
            const formattedValues = {
                ...values,
                classStart: startDate ? format(startDate, "yyyy-MM-dd") : "",
                classEnd: endDate ? format(endDate, "yyyy-MM-dd") : "",
            };
            handleUpdateClass(formattedValues)
        }
    });

    return(
        <div className="fixed inset-0 flex items-center justify-center bg-lms-black90 bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-md p-6  w-[500px] text-left">
                <h2 className="text-xl font-bold mb-4">Update Class</h2>
                <button className="absolute top-6 right-6" onClick={onClose}><IoCloseOutline className="w-6 h-6"/>
                </button>
                <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={formik.handleSubmit}
                >
                    {/* Class Code */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Class Code"
                                                     labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="text"
                            name="classCode"
                            onChange={formik.handleChange}
                            value={formik.values.classCode}
                            className="border text-md outline-lms-gray-30  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="FY2025-SE-A1"

                        />
                        {
                            typeof formik.errors.classCode === 'string' &&
                            <p className="text-red-700">{formik.errors.classCode}</p>
                        }
                    </div>

                    {/* Class Start  */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Class Start"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className={cn(
                                        "text-gray-600 border  border-lms-gray-30 w-full justify-start text-left font-normal",
                                        !startDate && "text-gray-600"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                    {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white ">
                                <Calendar
                                    mode="single"
                                    selected={startDate}
                                    onSelect={setStartDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Class End */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Class End"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className={cn(
                                        "text-gray-600 border  border-lms-gray-30 w-full justify-start text-left font-normal",
                                        !endDate && "text-gray-600"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white ">
                                <Calendar
                                    mode="single"
                                    selected={endDate}
                                    onSelect={setEndDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>


                    {/* Instructor */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Instructor"
                                                     labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>

                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable={true}
                            isSearchable={true}
                            name="instructorUuid"
                            options={instructors}
                            value={instructors.find(ins => ins.value === selectInstructorUuid) || null}
                            onChange={handleInstructorChange}
                        />
                        {
                            typeof formik.errors.instructorUuid === 'string' &&
                            <p className="text-red-700">{formik.errors.instructorUuid}</p>
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
                                value: classToUpdate?.status,
                                label: classToUpdate?.status === 1 ? "Started" : classToUpdate?.status === 2 ? "Pending" : "Ended"
                            }}
                            value={{
                                value: selectedStatus,
                                label: selectedStatus === 1 ? "Started" : selectedStatus === 2 ? "Pending" : "Ended"
                            }}
                        />
                    </div>

                    {/* Visibility */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Visibility"
                                                     labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}/>

                        <input
                            type="radio"
                            id="isDraftFalse"
                            name="isDraft"
                            value="true"
                            checked={formik.values.isDraft}
                            onChange={() => formik.setFieldValue("isDraft", true)}
                        />
                        <label htmlFor="isDraftTrue" className="px-2 pr-4">Draft</label>

                        <input
                            type="radio"
                            id="isDraftFalse"
                            name="isDraft"
                            value="false"
                            checked={!formik.values.isDraft}
                            onChange={() => formik.setFieldValue("isDraft", false)}
                        />
                        <label htmlFor="isDraftFalse" className="px-2 pr-4">Public</label>

                        {typeof formik.errors.isDraft === 'boolean' &&
                            <p className="text-red-700">{formik.errors.isDraft}</p>}
                    </div>


                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={isLoading}
                        >
                            {isLoading ? "Updating..." : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}