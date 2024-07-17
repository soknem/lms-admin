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
import {toast} from "react-hot-toast";
import slugify from "slugify";

const validationSchema = Yup.object().shape({
    alias: Yup.string()
        .required("Alias is required")
        .matches(/^\d{4}-\d{4}$/, "Slug must be in the format year-year (e.g., 2020-2021)"),
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

            if (values.alias !== initialAlias) {
                await editAcademicYear({
                    alias: values.alias,
                    updatedData: {...editAcademicYearDataByAlias, alias: values.alias}
                }).unwrap();
            }

            resetForm();
            toast.success('Successfully created!');
            onClose();
        } catch (error) {
            toast.error('Failed to create academic year!');
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
                    {({setFieldValue, isSubmitting}) => (
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
                                        placeholder="2023-2023"
                                        name="academicYear"
                                        id="academicYear"
                                        onChange={(e: any) => {
                                            setFieldValue(
                                                "academicYear",
                                                e.target.value
                                            );
                                            setFieldValue(
                                                "alias",
                                                slugify(e.target.value, {
                                                    lower: true,
                                                })
                                            );
                                        }}
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
                                        disabled
                                        type="text"
                                        placeholder="Associated Degree"
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

                                <div className={` ${style.inputContainer} flex w-full justify-between items-center`}>

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
                                                value={false}
                                                label="Public"
                                            />
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value={true}
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
                                                label="Pending"
                                            />
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="2"
                                                label="Started"
                                            />
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="3"
                                                label="Ended"
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

                            {/* button submit */}
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Editing...' : 'Save Change'}
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
