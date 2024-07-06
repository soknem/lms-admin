"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../../style.module.css";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import React, {useEffect, useState} from "react";
import {TbAsterisk} from "react-icons/tb";
import {
    useEditAcademicYearByAliasMutation,
    useGetAcademicYearByAliasQuery, useGetAcademicYearsQuery
} from "@/lib/features/admin/faculties/acdemicYear-management/academicYear";
import {AcademicYearType} from "@/lib/types/admin/faculty";

const validationSchema = Yup.object().shape({
    alias: Yup.string().required('Alias is required'),
    academicYear: Yup.string().required('Academic Year is required'),
    status: Yup.string().required('Status is required'),
    isDeleted: Yup.boolean().required('Please specify if the degree is deleted'),
    isDraft: Yup.boolean().required('Please specify if the degree is a draft'),
});

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

export function EditAcademicYearForm({alias, onClose}: { alias: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [editAcademicYear] = useEditAcademicYearByAliasMutation();
    const [initialAlias, setInitialAlias] = useState("");
    const {data: academicYearData, isSuccess} = useGetAcademicYearByAliasQuery(alias);
    const {refetch: refetchAcademicYear} = useGetAcademicYearsQuery({page: 0, pageSize: 10});
    const [initialValues, setInitialValues] = useState({
        alias: "",
        academicYear: "",
        status: 0,
        isDeleted: false,
        isDraft: false
    });

    useEffect(() => {
        if (isSuccess && academicYearData) {
            setInitialValues({
                alias: academicYearData.alias,
                academicYear: academicYearData.academicYear,
                status: academicYearData.status,
                isDeleted: academicYearData.isDeleted,
                isDraft: academicYearData.isDraft
            });
            setInitialAlias(academicYearData.alias);
        }
    }, [isSuccess, academicYearData]);

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const editAcademicYearDataByAlias: AcademicYearType = {
                alias: values.alias,
                academicYear: values.academicYear,
                status: values.status,
                isDeleted: values.isDeleted,
                isDraft: values.isDraft,
            };

            await editAcademicYear({alias: initialAlias, updatedData: editAcademicYearDataByAlias}).unwrap();

            // Now update the alias if it has changed
            if (values.alias !== initialAlias) {
                await editAcademicYear({
                    alias: values.alias,
                    updatedData: {...editAcademicYearDataByAlias, alias: values.alias}
                }).unwrap();
            }

            resetForm();
            refetchAcademicYear();
            onClose();
        } catch (error) {
            console.error("Error updating degree: ", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Edit Academic Year</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full">
                            <div className="flex flex-col gap-1">

                                {/* academicYear*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="academicYear">
                                            Academic Year
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="text"
                                        placeholder="academicYear"
                                        name="academicYear"
                                        id="academicYear"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="academicYear"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Academic Year Alias*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="text"
                                        name="alias"
                                        id="alias"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="alias"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`flex w-full justify-between flex-wrap space-y-2`}>

                                    {/* isDraft */}
                                    <div className={``}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="isDraft">
                                                Visibility
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value="true"
                                                label="Public"
                                            />
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value="false"
                                                label="Draft"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDraft"
                                            component={RadioButton}
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    <div className={``}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="status">
                                                Starting
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="1"
                                                label="Starting"
                                            />
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="2"
                                                label="Ended"
                                            />
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="3"
                                                label="Achieved"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDeleted"
                                            component={RadioButton}
                                            className={`${style.error}`}
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
