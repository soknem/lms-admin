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
import {toast} from "react-hot-toast";
import slugify from "slugify";

const validationSchema = Yup.object().shape({
    alias: Yup.string().required("Alias is required"),
    level: Yup.string().required('Level is required'),
    numberOfYear: Yup.number().required('Number of years is required').positive("Number of years must be positive.").integer(),
    description: Yup.string(),
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

export function EditDeForm({alias, onClose}: { alias: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [editDegree] = useEditDegreeByAliasMutation();
    const [initialAlias, setInitialAlias] = useState("");
    const {data: degreeData, isSuccess} = useGetDegreeByAliasQuery(alias);
    const [initialValues, setInitialValues] = useState({
        alias: "",
        level: "",
        description: "",
        numberOfYear: 0,
        isDeleted: false,
        isDraft: false
    });

    useEffect(() => {
        if (isSuccess && degreeData) {
            setInitialValues({
                alias: degreeData.alias,
                level: degreeData.level,
                numberOfYear: degreeData.numberOfYear,
                description: degreeData.description,
                isDeleted: degreeData.isDeleted,
                isDraft: degreeData.isDraft
            });
            setInitialAlias(degreeData.alias);
        }
    }, [isSuccess, degreeData]);


    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const editDegreeByAlias: DegreeType = {
                alias: values.alias,
                level: values.level,
                numberOfYear: values.numberOfYear,
                description: values.description || "No description",
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
            onClose();
            toast.success('Successfully updated!');

        } catch (error) {
            toast.error('Failed to edit degree!');

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Edit Degree</DialogTitle>
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

                                {/* Degree Level*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="level">
                                            Level
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="text"
                                        placeholder="Associated Degree"
                                        name="level"
                                        id="level"
                                        onChange={(e: any) => {
                                            setFieldValue(
                                                "level",
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
                                        name="level"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Degree Alias*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        disabled
                                        placeholder="associated-degree"
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

                                {/* Degree Description */}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        as="textarea"
                                        rows={4}
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

                                <div className={`${style.inputContainer} flex w-full justify-between`}>

                                    {/* Visibility */}
                                    <div className={``}>
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
                                            component="div"
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
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Editing...' : ' Save Changes'}
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
