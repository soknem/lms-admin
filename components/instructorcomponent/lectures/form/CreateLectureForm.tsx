'use client'

import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FiPlus} from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from 'yup'
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Label} from "@/components/ui/label";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import React, {useEffect, useState} from "react";
type Checked = DropdownMenuCheckboxItemProps["checked"]
import { Calendar as CalendarIcon } from "lucide-react"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
// combobox
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


import { cn } from "@/lib/utils"
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {
    selectClasses,
    setClasses,
} from "@/lib/features/admin/academic-management/classes/classSlice";
import {useGetClassByUuidQuery, useGetClassesQuery} from "@/lib/features/admin/academic-management/classes/classApi";
import {CreateGenerationType, FormLectureType, ShortCourseType} from "@/lib/types/admin/academics";
import {useAddLectureMutation, useGetLectureQuery} from "@/lib/features/admin/academic-management/lecture/lecture";
import {Class} from "@/lib/types/admin/academics";
import Select, {ActionMeta, SingleValue} from 'react-select';
import toast, { Toaster } from 'react-hot-toast';
import Modal from "@/components/common/ModalComponent";


type OptionType  = {
    value: string;
    label: string;
}

type DescriptionItem =  {
    reason: string;
    field: string;
}

type PropsType = {
    isVisible: boolean;
    onClose: () => void;
};

export default function CreateLectureForm({ isVisible, onClose }: PropsType) {
    const [selectedOption, setSelectedOption] = useState<SingleValue<{ value: string; label: string }> | null>(null);
    // dropdown
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    // combobox
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const [openIns, setOpenIns] = React.useState(false)
    const [valueIns, setValueIns] = React.useState("")

    const [openCls, setOpenCls] = React.useState(false)
    const [valueCls, setValueCls] = React.useState("")

    const [date, setDate] = React.useState<Date>()

    // ============= Create Lecture =============
    const dispatch = useDispatch<AppDispatch>();

    const [isLoading, setIsLoading] = useState(false);

    const [createLecture] = useAddLectureMutation();
    const { refetch: refetchLecture } = useGetLectureQuery({ page: 0, pageSize: 10 });

    const handleCreateLecture = async (values : FormLectureType) => {
        try {
            setIsLoading(true);

            const newLecture = {
                startTime: values.startTime,
                endTime: values.endTime,
                lectureDate: values.lectureDate,
                isDraft: values.isDraft,
                status: selectedStatus,
                teachingType: selectedTeachingType,
                courseUuid: selectedCourseUUID
            };

            const result = await createLecture(newLecture).unwrap();
            refetchLecture()
            toast.success('Successfully created!');
            console.log('Lecture created successfully');


        } catch (err : any) {

            let errorMessage = 'Failed to create lecture';
            if (Array.isArray(err.data.error.description)) {
                // If description is an array, map over it to construct a more detailed error message
                errorMessage += err.data.error.description.map((d: DescriptionItem) => `${d.reason} (${d.field})`).join('');
            } else {
                // If description is a single string, append it directly with a line break
                errorMessage += err.data.error.description ;
            }
            console.error('Error creating lecture:', err);
            toast.error(errorMessage, {
                style: {
                    marginBottom: '20px', // Add padding at the bottom of the toast
                },
            });

    }}

    // ========== class ===========
    const [selectedClassUUID, setSelectedClassUUID] = useState('');

    const {data: classesData, error: classesError} = useGetClassesQuery({page: 0, pageSize: 10});

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

    const classes = useSelector(selectClasses);

    const handleChange = (selectedOption : any) => {
        // Extracting the UUID from the selected option
        const uuid = selectedOption?.value;
        setSelectedClassUUID(uuid); // Update your state or handle the UUID as needed
    };

    const classDropdownData = classes;

    // ====== Course [fetch course by class uuid]========
    const {data : classData, error: classError } = useGetClassByUuidQuery(selectedClassUUID)

    const [Courses, setCourses] = useState([]);

    const [selectedCourseUUID, setSelectedCourseUUID] = useState('');

    useEffect(() => {
        if (classData) {
            const formattedCourses = classData.courses.map((crs : ShortCourseType) => ({
                value: crs.uuid,
                label: crs.title,
            }));
            setCourses(formattedCourses);
        }
        if (classError) {
            console.error('Failed to load classes', classError);
        }
    }, [classData, classError, dispatch]);

    console.log("single class data", Courses);

    const handleCourseChange = (selectedOption : any) => {
        // Extracting the UUID from the selected option
        const uuid = selectedOption?.value;
        setSelectedCourseUUID(uuid); // Update your state or handle the UUID as needed
    };

    // ====== teaching Type =======
    const teachingType = [
        {
            value: 'Theory',
            label: 'Theory',
        },
        {
            value: 'Lab',
            label: 'Lab',
        },
    ]

    const [selectedTeachingType, setSelectedTeachingType] = useState('');
    const handleTeachingChange = (selectedOption : any) => {
        const value = selectedOption?.value;
        setSelectedTeachingType(value); // Update your state or handle the UUID as needed
    };

    // ===== Status =====
    const statusList = [
        {
            value: 1,
            label: 'Started',
        },
        {
            value: 2,
            label: 'Pending',
        },
        {
            value: 3,
            label: 'Ended',
        },
    ]

    const [selectedStatus, setSelectedStatus] = useState('');
    const handleStatusChange = (selectedOption : any) => {
        const value = selectedOption?.value;
        setSelectedStatus(value); // Update your state or handle the UUID as needed
    };


    const formik = useFormik({
        initialValues: {
            startTime: "",
            endTime: "",
            teachingType: "Theory",
            lectureDate: "",
            status: 3,
            courseUuid: "50984aca-28d7-4986-9055-d2757b80166a",
            isDraft: true,

        },
        validationSchema: Yup.object({
            startTime: Yup.string().required("Required"),
            endTime: Yup.string().required("Required"),
            teachingType: Yup.string().required("Required"),
        }),
        onSubmit: values => {
            const formattedValues = {
                ...values,
                lectureDate: date ? format(date, "yyyy-MM-dd") : "",
            };
            // dispatch(addLecture(formattedValues))
            console.log("Form values: ", formattedValues);
            handleCreateLecture(formattedValues);

        }

    })


    return(
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2 className="text-xl text-lms-black-90 font-bold mb-4">Create Lecture</h2>
            <form className="w-[960px]  space-y-4 md:space-y-6 " onSubmit={formik.handleSubmit}>
                <div className="grid grid-cols-2 gap-4">
                    {/* Lecture Date */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Date"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    className={cn(
                                        "text-gray-600 border  border-lms-gray-30 w-full justify-start text-left font-normal",
                                        !date && "text-gray-600"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4"/>
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0 bg-white ">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    {/*Start Time*/}
                    <div>
                        <RequiredFieldLabelComponent labelText="Start Time"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="time"
                            name="startTime"
                            onChange={formik.handleChange}
                            value={formik.values.startTime}
                            className="border outline-lms-gray-30 bg-gray-50 border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="8:30AM"

                        />
                        {
                            formik.errors.startTime ? <p className="text-red-700">{formik.errors.startTime}</p> : null
                        }
                    </div>

                    {/*End Time*/}
                    <div>
                        <RequiredFieldLabelComponent labelText="End Time"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="time"
                            name="endTime"
                            onChange={formik.handleChange}
                            value={formik.values.endTime}
                            className="border outline-lms-gray-30 bg-gray-50 border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="8:30AM"

                        />
                        {
                            formik.errors.endTime ? <p className="text-red-700">{formik.errors.endTime}</p> : null
                        }
                    </div>

                    {/* Class */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Class"
                                                     labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>

                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable={true}
                            isSearchable={true}
                            name="class"
                            options={classDropdownData}
                            onChange={handleChange}
                        />
                    </div>

                    {/* Course */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Course"
                                                     labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>

                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            isClearable={true}
                            isSearchable={true}
                            name="course"
                            options={Courses}
                            onChange={handleCourseChange}
                        />
                    </div>

                    {/* teaching type */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Teaching Type"
                                                     labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>

                        <Select
                            className="basic-single"
                            classNamePrefix="select"
                            name="teachingType"
                            options={teachingType}
                            onChange={handleTeachingChange}
                        />
                    </div>

                    {/* Status */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Status"
                                                     labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>

                        <Select
                            className="basic-single "
                            classNamePrefix="select"
                            name="teachingType"
                            options={statusList}
                            onChange={handleStatusChange}
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
                </div>

                <div className="flex justify-end">
                    <Button type="submit"
                            className=" text-lms-white-80 bg-lms-primary hover:bg-lms-primary rounded-[8px]"
                            disabled={isLoading}
                    >{isLoading ? "Adding..." : "Add"}</Button>
                </div>
            </form>
        </Modal>
    )
}