"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import style from "../style.module.css";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import React, {useEffect, useState} from "react";
import {
    useGetAdmissionByAliasQuery
} from "@/lib/features/admin/admission-management/admission";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {CalendarIcon} from "@radix-ui/react-icons";
import {format, parseISO} from "date-fns";
import {Calendar} from "@/components/ui/calendar";

const DatePickerField = ({field, form, label, ...props}: any) => {
    const {setFieldValue} = form;
    const {name, value} = field;

    return (
        <div className={style.inputContainer}>
            <div className="flex">
                <label className={`${style.label}`} htmlFor={name}>
                    {label}
                </label>
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
        </div>
    );
};

export function ViewAdmissionForm({uuid, onClose}: { uuid: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
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
            setInitialAlias(admissionData.alias);
        }
    }, [isSuccess, admissionData]);

    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Admission Information</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={() => {
                    }}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1 items-center">

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

                                {/*telegramLink*/}
                                <div className={style.inputContainer}>
                                    <label className={style.label} htmlFor="telegramLink">
                                        Telegram Group URL
                                    </label>
                                    <Field
                                        disabled
                                        type="text"
                                        name="telegramLink"
                                        id="telegramLink"
                                        className={style.input}
                                    />
                                </div>

                                {/*remark*/}
                                <div className={style.inputContainer}>
                                    <label className={style.label} htmlFor="remark">
                                        Remark
                                    </label>
                                    <Field
                                        disabled
                                        type="text"
                                        name="remark"
                                        placeholder="This admission is for the first generation"
                                        id="remark"
                                        className={style.input}
                                    />
                                </div>

                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
