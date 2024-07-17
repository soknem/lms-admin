import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from 'yup';
import Select from 'react-select';
import { format } from "date-fns";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@/components/ui/button";
import { Calendar as CalendarIcon } from "lucide-react";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import toast from 'react-hot-toast';
import { useUpdateLectureMutation, useGetLectureQuery } from "@/lib/features/admin/academic-management/lecture/lecture";
import {
    useGetClassesQuery,
    useGetClassByUuidQuery
} from "@/lib/features/admin/academic-management/classes/classApi";
import {
    setClasses,
    selectClasses
} from "@/lib/features/admin/academic-management/classes/classSlice";
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import {AppDispatch, RootState} from "@/lib/store";
import {Class, ShortCourseType, FormLectureType, LectureRespondType} from "@/lib/types/admin/academics";
import {cn} from "@/lib/utils";
import { IoCloseOutline } from "react-icons/io5";

type OptionType = {
    value: string;
    label: string;
}

type PropsType = {
    uuid: string;
    onClose: () => void;
    lectureData : LectureRespondType[];
}

type DescriptionItem =  {
    reason: string;
    field: string;
}

export default function UpdateLectureForm({ uuid  ,lectureData,  onClose }: PropsType) {
    const [selectedOption, setSelectedOption] = useState<OptionType | null>(null);
    const [selectedClassUUID, setSelectedClassUUID] = useState('');
    const [selectedCourseUUID, setSelectedCourseUUID] = useState('');
    const [selectedTeachingType, setSelectedTeachingType] = useState('');
    const [selectedStatus, setSelectedStatus] = useState(1);

    const [date, setDate] = useState<Date>();
    const [isLoading, setIsLoading] = useState(false);

    const dispatch = useDispatch<AppDispatch>();
    const [updateLecture] = useUpdateLectureMutation();
    const { refetch: refetchLecture } = useGetLectureQuery({ page: 0, pageSize: 10 });

    const { data: classesData, error: classesError } = useGetClassesQuery({ page: 0, pageSize: 10 });
    const { data: classData, error: classError } = useGetClassByUuidQuery(selectedClassUUID);

    const classes = useSelector((state: RootState) => selectClasses(state));
    const [courses, setCourses] = useState([]);

    const lectureToUpdate = lectureData?.find(lecture => lecture.uuid === uuid);


    useEffect(() => {
        if (classesData) {
            const formattedClasses = classesData.content.map((cls: Class) => ({
                value: cls.uuid,
                label: `${cls.classCode}`,
            }));
            dispatch(setClasses(formattedClasses));
        }
        if (classesError) {
            console.error('Failed to load classes', classesError);
        }
    }, [classesData, classesError, dispatch]);


    useEffect(() => {
        if (classData) {
            const formattedCourses = classData.courses.map((crs: ShortCourseType) => ({
                value: crs.uuid,
                label: crs.title,
            }));
            setCourses(formattedCourses);
        }
        if (classError) {
            console.error('Failed to load courses', classError);
        }
    }, [classData, classError]);

    useEffect(() => {
        if (lectureToUpdate) {
            setSelectedCourseUUID(lectureToUpdate.courseUuid);
            setSelectedTeachingType(lectureToUpdate.teachingType);
            setSelectedStatus(lectureToUpdate.status);
            setDate(new Date(lectureToUpdate.lectureDate));
            formik.setFieldValue("isDraft", lectureToUpdate.isDraft);
        }
    }, [lectureToUpdate]);

    const handleUpdateLecture = async (values: FormLectureType) => {
        try {
            setIsLoading(true);

            const updatedData = {
                startTime: values.startTime,
                endTime: values.endTime,
                lectureDate: values.lectureDate,
                isDraft: values.isDraft,
                status: selectedStatus,
                teachingType: selectedTeachingType,
                courseUuid: selectedCourseUUID
            };


            await updateLecture({ uuid, updatedData }).unwrap();
            refetchLecture();
            toast.success('Successfully updated!');
        } catch (err: any) {
            let errorMessage = 'Failed to update lecture';
            if (Array.isArray(err.data.error.description)) {
                errorMessage += err.data.error.description.map((d: DescriptionItem) => `${d.reason} (${d.field})`).join('');
            } else {
                errorMessage += err.data.error.description;
            }
            console.error('Error updating lecture:', err);
            toast.error(errorMessage, {
                style: {
                    marginBottom: '20px',
                },
            });
        } finally {
            setIsLoading(false);
        }
    };

    const handleTeachingChange = (selectedOption: any) => {
        const value = selectedOption?.value;
        setSelectedTeachingType(value);
    };

    const handleStatusChange = (selectedOption: any) => {
        const value = selectedOption?.value;
        setSelectedStatus(value);
    };



    const formik = useFormik({
        initialValues: {
            startTime: lectureToUpdate?.startTime || "",
            endTime: lectureToUpdate?.endTime || "",
            teachingType: lectureToUpdate?.teachingType || "",
            lectureDate: lectureToUpdate?.lectureDate || "",
            status: lectureToUpdate?.status || 1,
            courseUuid: lectureToUpdate?.courseUuid || "",
            isDraft: lectureToUpdate?.isDraft || true,
        },
        // validationSchema: Yup.object({
        //     startTime: Yup.string().required("Required"),
        //     endTime: Yup.string().required("Required"),
        //     teachingType: Yup.string().required("Required"),
        // }),
        onSubmit: values => {
            const formattedValues = {
                ...values,
                lectureDate: date ? format(date, "yyyy-MM-dd") : "",
            };
            handleUpdateLecture(formattedValues);
        }
    });

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-lms-black90 bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-md p-6  w-[500px] text-left">
                <h2 className="text-xl font-bold mb-4">Update Lecture</h2>
                <button className="absolute top-6 right-6" onClick={onClose}><IoCloseOutline className="w-6 h-6" /></button>
                <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={formik.handleSubmit}
                >
                    {/* Lecture Date */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Date"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className={cn("text-gray-600 border  border-lms-gray-30 w-full justify-start text-left font-normal", !date && "text-gray-600")}>
                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus/>
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/* Start Time */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Start Time"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="time"
                            name="startTime"
                            onChange={formik.handleChange}
                            value={formik.values.startTime}
                            className="border outline-lms-gray-30 bg-gray-50 border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        />
                        {formik.errors.startTime && <p className="text-red-700">{formik.errors.startTime}</p>}
                    </div>

                    {/* End Time */}
                    <div>
                        <RequiredFieldLabelComponent labelText="End Time"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="time"
                            name="endTime"
                            onChange={formik.handleChange}
                            value={formik.values.endTime}
                            className="border outline-lms-gray-30 bg-gray-50 border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5"
                        />
                        {formik.errors.endTime && <p className="text-red-700">{formik.errors.endTime}</p>}
                    </div>


                    {/* Teaching Type */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Teaching Type"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <Select
                            className="basic-single"
                            classNamePrefix="select"

                            isClearable={true}
                            isSearchable={true}
                            name="teachingType"
                            options={[
                                {value: "Theory", label: "Theory"},
                                {value: "Lab", label: "Lab"}
                            ]}
                            onChange={handleTeachingChange}
                            defaultValue={{ value: lectureToUpdate?.teachingType, label: lectureToUpdate?.teachingType }}
                            value={{ value: selectedTeachingType, label: selectedTeachingType }}


                        />
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
                            defaultValue={{ value: lectureToUpdate?.status, label: lectureToUpdate?.status === 1 ? "Started" : lectureToUpdate?.status === 2 ? "Pending" : "Ended" }}
                            value={{ value: selectedStatus, label: selectedStatus === 1 ? "Started" : selectedStatus === 2 ? "Pending" : "Ended" }}
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

                        {formik.errors.isDraft && <p className="text-red-700">{formik.errors.isDraft}</p>}
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
