"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../style.module.css";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import React, {useEffect, useState} from "react";
import {TbAsterisk} from "react-icons/tb";
import {toast} from "react-hot-toast";
import {
    useEditAdmissionByAliasMutation, useGetAdmissionByAliasQuery, useUpdateStatusByUuidMutation
} from "@/lib/features/admin/admission-management/admission";
import {AdmissionType} from "@/lib/types/admin/admission";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "@radix-ui/react-icons";
import {format, parseISO} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {useGetAcademicYearsQuery} from "@/lib/features/admin/faculties/acdemicYear-management/academicYear";
import {AcademicYearType} from "@/lib/types/admin/faculty";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";

const validationSchema = Yup.object().shape({
    openDate: Yup.date().required("Start date is required"),
    endDate: Yup.date()
        .required("End date is required")
        .min(Yup.ref("openDate"), "End date must be greater than start date"),
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
                        className={cn(`${style.input}`, !value && "text-gray-600")}
                    >
                        <div className={`flex`}>
                            <CalendarIcon className="mr-2 h-4 w-4"/>
                            {value ? format(parseISO(value), "PPP") : <span>Pick a date</span>}
                        </div>
                    </button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white">
                    <Calendar
                        mode="single"
                        selected={value ? parseISO(value) : undefined}
                        onSelect={(date) =>
                            setFieldValue(name, date ? date.toISOString().split("T")[0] : "")
                        }
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
            <ErrorMessage name={name} component="div" className={style.error}/>
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

export function EditAdmissionForm({uuid, onClose}: { uuid: string; onClose: () => void }) {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(true);
    const [editAdmission] = useEditAdmissionByAliasMutation();
    const [editStatus] = useUpdateStatusByUuidMutation();
    const [initialAlias, setInitialAlias] = useState("");
    const {data: admissionData, isSuccess} = useGetAdmissionByAliasQuery(uuid);
    const [initialValues, setInitialValues] = useState({
        uuid: "",
        academicYearAlias: "",
        openDate: "",
        endDate: "",
        telegramLink: "",
        remark: "",
        status: 0,
        isDeleted: false,
    });

    const [academicYears, setAcademicYears] = useState<{ value: string; label: string }[]>([]);

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
    const getAcademicYearLabel = (value: string) => {
        const option = academicYears.find(option => option.value === value);
        return option ? option.label : '';
    };

    useEffect(() => {
        if (isSuccess && admissionData) {
            setInitialValues({
                uuid: admissionData.uuid,
                academicYearAlias: admissionData.academicYearAlias,
                openDate: admissionData.openDate,
                endDate: admissionData.endDate,
                telegramLink: admissionData.telegramLink,
                remark: admissionData.remark,
                status: admissionData.status,
                isDeleted: admissionData.isDeleted,
            });
            setInitialAlias(admissionData.uuid);
        }
    }, [isSuccess, admissionData]);

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            await editStatus({uuid: initialAlias, status: {status: values.status}}).unwrap();

            const editAdmissionByAlias: AdmissionType = {
                uuid: values.uuid,
                academicYearAlias: values.academicYearAlias,
                openDate: values.openDate,
                endDate: values.endDate,
                telegramLink: values.telegramLink,
                remark: values.remark,
                status: values.status,
                isDeleted: values.isDeleted,
            };

            await editAdmission({uuid: initialAlias, updatedData: editAdmissionByAlias}).unwrap();

            // Now update the alias if it has changed
            if (values.uuid !== initialAlias) {
                await editAdmission({
                    uuid: values.uuid,
                    updatedData: {...editAdmissionByAlias, uuid: values.uuid},
                }).unwrap();
            }

            resetForm();
            onClose();
            toast.success("Successfully updated!");
        } catch (error) {
            console.error("Error updating degree: ", error);
            toast.error("Failed to edit admission!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent
                className="w-[480px] bg-white"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>
                        Edit Admission
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue, isSubmitting}) => (
                        <Form className="py-4 rounded-lg w-full">
                            <div className="flex flex-col gap-1 items-center">

                                {/*academicYear*/}
                                {/*<div className={style.inputContainer}>*/}

                                {/*    <div className="flex">*/}
                                {/*        <label className={`${style.label}`} htmlFor="academicYearAlias">Academic*/}
                                {/*            Year*/}
                                {/*        </label>*/}
                                {/*        <TbAsterisk className='w-2 h-2 text-lms-error'/>*/}
                                {/*    </div>*/}
                                {/*    <Field*/}
                                {/*        disabled*/}
                                {/*        type="text"*/}
                                {/*        name="academicYearAlias"*/}
                                {/*        id="academicYearAlias"*/}
                                {/*        value={getAcademicYearLabel(initialValues.academicYearAlias)}*/}
                                {/*        onChange={(option: any) => setFieldValue("academicYearAlias", option?.value)}*/}
                                {/*        className={`${style.input}`}*/}
                                {/*    />*/}
                                {/*</div>*/}


                                {/* Start Date */}
                                <Field
                                    name="openDate"
                                    component={DatePickerField}
                                    label="Open Date"
                                    setFieldValue={setFieldValue}
                                />

                                {/* End Date */}
                                <Field
                                    name="endDate"
                                    component={DatePickerField}
                                    label="End Date"
                                    setFieldValue={setFieldValue}
                                />

                                {/* telegramLink */}
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

                                {/* remark */}
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
                                            <TbAsterisk className="w-2 h-2 text-lms-error"/>
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

                            {/* button submit */}
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Editing..." : "Save Change"}
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}