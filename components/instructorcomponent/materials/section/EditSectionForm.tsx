"use client";
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from "formik";
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


import {toast} from "react-hot-toast"
import {
    useGetSectionByUuidQuery,
    useUpdateSectionMutation
} from "@/lib/features/admin/materials/subjectMaterialSection/section";
import {SectionType} from "@/lib/types/admin/materials";

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    subjectAlias: Yup.string().required('Subject Alias is required'),
    isDraft: Yup.boolean().required('Draft status is required'),
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

export function EditSectionForm({uuid, onClose}: { uuid: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [editSection] = useUpdateSectionMutation();
    const [initialAlias, setInitialAlias] = useState("");
    const {data: sectionData, isSuccess} = useGetSectionByUuidQuery(uuid);
    const [initialValues, setInitialValues] = useState({
        uuid: '',
        title: '',
        subjectAlias: '',
        materials: '',
        isDeleted: false,
        isDraft: false,
    });

    useEffect(() => {
        if (isSuccess && sectionData) {
            setInitialValues({
                uuid: sectionData.uuid,
                title: sectionData.title,
                subjectAlias: sectionData.subjectAlias,
                materials: sectionData.materials,
                isDeleted: sectionData.isDeleted,
                isDraft: sectionData.isDraft
            });
            setInitialAlias(sectionData.uuid);
        }
    }, [isSuccess, sectionData]);


    const handleSubmit = async (values: SectionType, {setSubmitting, resetForm}: FormikHelpers<SectionType>) => {
        try {
            const editSectionByUuid = {
                uuid: values.uuid,
                title: values.title,
                subjectAlias: values.subjectAlias,
                materials: values.materials,
                isDeleted: values.isDeleted,
                isDraft: values.isDraft,
            };

            await editSection({uuid: initialAlias, updatedData: editSectionByUuid}).unwrap();

            // Now update the alias if it has changed
            if (values.uuid !== initialAlias) {
                await editSection({
                    uuid: values.uuid,
                    updatedData: {...editSectionByUuid, uuid: values.uuid},
                }).unwrap();
            }
            resetForm();
            onClose();
            toast.success('Successfully updated!');
        } catch (error) {
            toast.error('Failed to edit section!');
        } finally {
            setSubmitting(false);
        }
    };

    return (

        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Edit Section</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({isSubmitting}) => (
                        <Form className="py-4 rounded-lg w-full">
                            <div className="flex flex-col gap-3">

                                {/* Section Title*/}
                                <div className={``}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="title">
                                            Section Title
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        placeholder="Enter section title"
                                        type="text"
                                        name="title"
                                        id="title"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`flex w-full justify-between`}>

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
