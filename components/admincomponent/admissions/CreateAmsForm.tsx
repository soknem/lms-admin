"use client";
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../style.module.css";
import {FiPlus} from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {TbAsterisk} from "react-icons/tb";
import {useCreateAdmissionMutation, useGetAdmissionsQuery} from "@/lib/features/admin/admission-management/admission";
import React, {useEffect, useState} from "react";
import {AdmissionType} from "@/lib/types/admin/admission";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";
import {useGetAcademicYearsQuery} from "@/lib/features/admin/faculties/acdemicYear-management/academicYear";
import Select from "react-select";
import {AcademicYearType, FacultyType} from "@/lib/types/admin/faculty";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "@radix-ui/react-icons";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {toast} from "react-hot-toast";

const initialValues = {
    uuid: "",
    academicYearAlias: "",
    openDate: "",
    endDate: "",
    telegramLink: "",
    remark: "",
    status: 1,
    isDeleted: false,
};

const validationSchema = Yup.object().shape({
    academicYearAlias: Yup.string().required("Academic year is required"),
    openDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref('openDate'), "End date must be greater than start date"),
    remark: Yup.string(),
    status: Yup.string(),
});

const DatePickerField = ({field, form, label, ...props}: any) => {
    const {setFieldValue} = form;
    const {name, value} = field;

    return (
        <div className={style.inputContainer}>
            <div className="flex">
                <label className={`${style.label}`} htmlFor={name}>
                    {label}
                </label>
                <TbAsterisk className="w-2 h-2 text-lms-error"/>
            </div>
            <Popover>
                <PopoverTrigger asChild>
                    <button
                        type="button"
                        className={cn(
                            `${style.input}`,
                            !value && "text-gray-600"
                        )}
                    >
                        <div className={`flex`}>
                            <CalendarIcon className="mr-2 h-4 w-4"/>
                            {value ? format(new Date(value), "PPP") : <span>Pick a date</span>}
                        </div>

                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar
                        mode="single"
                        selected={value ? new Date(value) : undefined}
                        onSelect={(date) => setFieldValue(name, date ? date.toISOString().split('T')[0] : '')}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <ErrorMessage
                name={name}
                component="div"
                className={style.error}
            />
        </div>
    );
};

const RadioButton = ({field, value, label}: any) => {
    return (
        <div>
            <input
                type="radio"
                {...field}
                id={value}
                value={value}
                checked={String(field.value) === value}
            />
            <label className="pl-2" htmlFor={value}>
                {label}
            </label>
        </div>
    );
};

export function CreateAmsForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [createAdmission] = useCreateAdmissionMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [academicYears, setAcademicYears] = useState([]);

    const {
        data: academicYearData,
    } = useGetAcademicYearsQuery({page: 0, pageSize: 0});

    useEffect(() => {
        if (academicYearData) {
            const academicYearOption = academicYearData?.content?.map((academicYear: AcademicYearType) => ({
                value: academicYear.alias,
                label: academicYear.academicYear,
            }));
            setAcademicYears(academicYearOption);
        }
    }, [academicYearData, dispatch]);

    const handleSubmit = async (values: AdmissionType, {setSubmitting, resetForm}: FormikHelpers<AdmissionType>) => {
        try {
            const newAdmission: AdmissionType = {
                uuid: values.uuid,
                academicYearAlias: values.academicYearAlias,
                openDate: values.openDate,
                endDate: values.endDate,
                telegramLink: values.telegramLink,
                remark: values.remark,
                status: values.status,
                isDeleted: values.isDeleted,
            };

            await createAdmission(newAdmission).unwrap();
            resetForm();
            toast.success('Successfully created!');
            setIsOpen(false);


        } catch (error) {
            toast.error('Failed to create admission!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Admission
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>

                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Add Admission</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue, isSubmitting}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1 items-center">

                                {/*academicYear*/}
                                <div className={style.inputContainer}>

                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="academicYearAlias">Academic
                                            Year
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Select
                                        options={academicYears}
                                        onChange={(selectedOption: any) => setFieldValue('academicYearAlias', selectedOption ? selectedOption.value : '')}/>
                                    <ErrorMessage
                                        name="academicYearAlias"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

                                {/*Start Date*/}
                                <Field
                                    name="openDate"
                                    component={DatePickerField}
                                    label="Open Date"
                                    setFieldValue={setFieldValue}
                                />

                                {/*End Date*/}
                                <Field
                                    name="endDate"
                                    component={DatePickerField}
                                    label="End Date"
                                    setFieldValue={setFieldValue}
                                />

                                {/*telegramLink*/}
                                <div className={style.inputContainer}>
                                    <label className={style.label} htmlFor="telegramLink">
                                        Telegram Group URL
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="https://t.me/admission_group"
                                        name="telegramLink"
                                        id="telegramLink"
                                        className={style.input}
                                    />
                                    <ErrorMessage
                                        name="telegramLink"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

                                {/*remark*/}
                                <div className={style.inputContainer}>
                                    <label className={style.label} htmlFor="remark">
                                        Remark
                                    </label>
                                    <Field
                                        type="text"
                                        name="remark"
                                        placeholder="This admission is for the first generation"
                                        id="remark"
                                        className={style.input}
                                    />
                                    <ErrorMessage
                                        name="remark"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

                                <div className={`${style.inputContainer} flex w-full justify-between`}>
                                    {/* status */}
                                    <div className={``}>
                                        <div className="flex">
                                            <label className={style.label} htmlFor="status">
                                                Visibility
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="1"
                                                label="Opening"
                                            />
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="2"
                                                label="Closed"
                                            />
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="3"
                                                label="Finish"
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="status"
                                            component="div"
                                            className={style.error}
                                        />
                                    </div>

                                </div>
                            </div>

                            {/* Submit Button */}
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Adding...' : 'Add'}
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}