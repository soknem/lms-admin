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
import Select from "react-select";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {selectAcademicYear} from "@/lib/features/admin/faculties/acdemicYear-management/academicYearSlice";

const validationSchema = Yup.object().shape({});

const RadioButton = ({field, value, label}: any) => {
    return (
        <div>
            <input
                type="radio"
                {...field}
                id={value.toString()}
                value={value.toString()}
                checked={field.value.toString() === value.toString()}
            />
            <label className="pl-2" htmlFor={value.toString()}>
                {label}
            </label>
        </div>
    );
};

export function EditAdmissionForm({uuid, onClose}: { uuid: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [editAdmission] = useEditAdmissionByAliasMutation();
    const [status, setStatus] = useState(1);
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

    const academicYears = useSelector((state: RootState) => selectAcademicYear(state));
    const academicYearOption = academicYears.map(academicYear => ({
        value: academicYear.alias,
        label: academicYear.academicYear
    }));

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
            console.log("Successfully updated status: ", values.status);

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
                    updatedData: {...editAdmissionByAlias, uuid: values.uuid}
                }).unwrap();
            }

            console.log("Successfully updated degree: ", editAdmissionByAlias);
            resetForm();
            onClose();
            toast.success('Successfully updated!');

        } catch (error) {
            console.error("Error updating degree: ", error);
            toast.error('Failed to edit admission!');

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Edit Admission</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full">
                            <div className="flex flex-col gap-1 items-center">

                                {/*openDate*/}
                                <div className={style.inputContainer}>
                                    <div className="flex">
                                        <label className={style.label} htmlFor="openDate">
                                            Open Date
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="date"
                                        name="openDate"
                                        id="openDate"
                                        className={style.input}
                                    />
                                    <ErrorMessage
                                        name="openDate"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

                                {/*endDate*/}
                                <div className={style.inputContainer}>
                                    <div className="flex">
                                        <label className={style.label} htmlFor="endDate">
                                            End Date
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        className={style.input}
                                    />
                                    <ErrorMessage
                                        name="endDate"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

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
                                >
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
