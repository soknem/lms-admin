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

import {DegreeType} from "@/lib/types/admin/faculty";
import React, {useEffect, useState} from "react";
import {TbAsterisk} from "react-icons/tb";

import {
    useEditDegreeByAliasMutation,
    useGetDegreeByAliasQuery,
    useGetDegreesQuery
} from "@/lib/features/admin/faculties/degree/degree";

const validationSchema = Yup.object().shape({
    alias: Yup.string().required('Alias is required'),
    level: Yup.string().required('Level is required'),
    description: Yup.string(),
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

export function EditDeForm({alias}: { alias: string }) {
    const [open, setOpen] = useState(true);
    const [editDegree] = useEditDegreeByAliasMutation();
    const [initialAlias, setInitialAlias] = useState("");
    const {data: degreeData, isSuccess} = useGetDegreeByAliasQuery(alias);
    const {refetch: refetchDegree} = useGetDegreesQuery({page: 0, pageSize: 10});
    const [initialValues, setInitialValues] = useState({
        alias: "",
        level: "",
        description: "",
        isDeleted: false,
        isDraft: false
    });

    useEffect(() => {
        if (isSuccess && degreeData) {
            setInitialValues({
                alias: degreeData.alias,
                level: degreeData.level,
                description: degreeData.description,
                isDeleted: degreeData.isDeleted,
                isDraft: degreeData.isDraft
            });
            setInitialAlias(degreeData.alias);
        }
    }, [isSuccess, degreeData]);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const editDegreeByAlias: DegreeType = {
                alias: values.alias,
                level: values.level,
                description: values.description,
                isDeleted: values.isDeleted,
                isDraft: values.isDraft,
            };

            await editDegree({alias: initialAlias, updatedData: editDegreeByAlias}).unwrap();

            // Now update the alias if it has changed
            if (values.alias !== initialAlias) {
                await editDegree({
                    alias: values.alias,
                    updatedData: {...editDegreeByAlias, alias: values.alias}
                }).unwrap();
            }

            resetForm();
            refetchDegree();
            handleClose();
        } catch (error) {
            console.error("Error updating degree: ", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[480px] bg-white">
                <DialogHeader>
                    <DialogTitle>Edit Degree</DialogTitle>
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
                                {/* Degree Alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Alias
                                        </label>
                                        <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                    </div>
                                    <Field
                                        type="text"
                                        name="alias"
                                        id="alias"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="alias"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Degree Level */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="level">
                                            Level
                                        </label>
                                        <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                    </div>
                                    <Field
                                        type="text"
                                        name="level"
                                        id="level"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="level"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Degree Description */}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        type="text"
                                        name="description"
                                        id="description"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Visibility */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="isDraft">
                                            Visibility
                                        </label>
                                        <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                    </div>
                                    <div className="flex gap-4 h-[40px] items-center">
                                        <Field
                                            name="isDraft"
                                            component={RadioButton}
                                            value={true}
                                            label="Public"
                                        />
                                        <Field
                                            name="isDraft"
                                            component={RadioButton}
                                            value={false}
                                            label="Draft"
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="isDraft"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Status */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="isDeleted">
                                            Status
                                        </label>
                                        <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                    </div>
                                    <div className="flex gap-4 h-[40px] items-center">
                                        <Field
                                            name="isDeleted"
                                            component={RadioButton}
                                            value={true}
                                            label="Public"
                                        />
                                        <Field
                                            name="isDeleted"
                                            component={RadioButton}
                                            value={false}
                                            label="Draft"
                                        />
                                    </div>
                                    <ErrorMessage
                                        name="isDeleted"
                                        component="div"
                                        className={`${style.error}`}
                                    />
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
