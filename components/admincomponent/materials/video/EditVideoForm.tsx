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
import {useGetMaterialByAliasQuery, useUpdateMaterialByAliasMutation} from "@/lib/features/admin/materials/material";
import {MaterialType} from "@/lib/types/admin/materials";
import Select from "react-select";
import {FiUploadCloud} from "react-icons/fi";

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

const CustomInputFile = ({field, form: {setFieldValue, values}, previewField}: any) => {
    const handleUploadFile = (e: any) => {
        const file = e.target.files[0];
        const localUrl = URL.createObjectURL(file);
        setFieldValue(field.name, file); // Set the field value in Formik
        setFieldValue(previewField, localUrl); // Set the preview URL in Formik
    };

    return (
        <div className="w-full">
            <input
                type="file"
                onChange={handleUploadFile}
                className="hidden"
                id={field.name}
            />
            <label
                htmlFor={field.name}
                className="border border-gray-300 hover:bg-lms-background text-gray-900 text-sm rounded-lg bg-white w-full h-[215px] p-2 border-dashed flex justify-center items-center cursor-pointer relative overflow-hidden"
            >
                {!values[previewField] ? (
                    <div className="flex flex-col items-center justify-center gap-4">
                        <FiUploadCloud className="text-lms-primary text-[34px]"/>
                        <p className="text-center text-md text-black">
                            Select a file or drag and drop here
                        </p>
                        <p className="text-center text-md text-lms-gray-30">
                            JPG, PNG or PDF, file size no more than 10MB
                        </p>
                    </div>
                ) : (
                    <img
                        src={values[previewField]}
                        alt="preview"
                        className="object-contain h-full w-full"
                    />
                )}
            </label>
        </div>
    );
};

export function EditVideoForm({uuid, onClose}: { uuid: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [editMaterial] = useUpdateMaterialByAliasMutation();
    const [initialAlias, setInitialAlias] = useState("");
    const {data: materialData, isSuccess} = useGetMaterialByAliasQuery(uuid);
    const [initialValues, setInitialValues] = useState({
        uuid: '',
        title: '',
        contentType: '',
        fileType: '',
        extension: '',
        description: '',
        size: 0,
        fileName: '',
        fileUrl: '',
        subject: '',
        isDraft: false,
        isDeleted: false,
        download: '',
        section: '',
    });

    useEffect(() => {
        if (isSuccess && materialData) {
            setInitialValues({
                uuid: materialData.uuid,
                title: materialData.title,
                contentType: materialData.contentType || 'video',
                fileType: materialData.fileType,
                extension: materialData.extension,
                description: materialData.description,
                size: materialData.size,
                fileName: materialData.fileName,
                fileUrl: materialData.fileUrl,
                subject: materialData.subject,
                isDraft: materialData.isDraft,
                isDeleted: materialData.isDeleted,
                download: materialData.download,
                section: materialData.section,
            });
            setInitialAlias(materialData.uuid);
        }
    }, [isSuccess, materialData]);

    const fileTypeOption = [
        {value: "curriculum", label: 'Curriculum'},
        {value: "slide", label: 'Slide'},
        {value: "youtubeVideo", label: 'Video'},
    ]

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const editMaterialByUuid: MaterialType = {
                uuid: values.uuid,
                title: values.title,
                contentType: values.contentType || 'video',
                fileType: values.fileType,
                extension: values.extension,
                description: values.description,
                size: values.size,
                fileName: values.fileName,
                fileUrl: values.fileUrl,
                subject: values.subject,
                isDraft: values.isDraft,
                isDeleted: values.isDeleted,
                download: values.download,
                sectionUuid: values.section,
            };

            await editMaterial({uuid: initialAlias, updatedData: editMaterialByUuid}).unwrap();

            // Now update the alias if it has changed
            if (values.uuid !== initialAlias) {
                await editMaterial({
                    uuid: values.uuid,
                    updatedData: {...editMaterialByUuid, uuid: values.uuid}
                }).unwrap();
            }

            resetForm();
            onClose();
            toast.success('Successfully updated!');

        } catch (error) {
            console.error("Error updating curriculum: ", error);
            toast.error('Failed to edit curriculum!');

        } finally {
            setSubmitting(false);
        }
    };

    const getFileTypeLabel = (value: string) => {
        const option = fileTypeOption.find(option => option.value === value);
        return option ? option.label : '';
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Edit Curriculum</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue, isSubmitting}) => (
                        <Form className="py-4 rounded-lg w-full">

                            <div className="flex flex-col gap-1 items-center justify-center">

                                {/*Title*/}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="title">
                                            Title
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        name="title"
                                        placeholder="Web Design Curriculum"
                                        id="title"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/*fileType*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="fileType">
                                            File Type
                                        </label>
                                        {/*<TbAsterisk className='w-2 h-2 text-lms-error'/>*/}
                                    </div>

                                    <Field
                                        disabled
                                        type="text"
                                        name="fileType"
                                        id="fileType"
                                        value={getFileTypeLabel(initialValues.fileType)} // Set value to pre-populate
                                        onChange={(option: any) => setFieldValue("fileType", option?.value)}
                                        className={`${style.input}`}
                                    />

                                    {/*<Select*/}
                                    {/*    isDisabled*/}
                                    {/*    options={fileTypeOption}*/}
                                    {/*    name="fileType"*/}
                                    {/*    value={fileTypeOption.find(option => option.value === initialValues.fileType)} // Set value to pre-populate*/}
                                    {/*    onChange={(option) => setFieldValue("fileType", option?.value)}*/}
                                    {/*/>*/}

                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        as="textarea"
                                        rows={4}
                                        placeholder="This is main description of our academic"
                                        name="description"
                                        id="description"
                                        className={`${style.input}`}
                                    />
                                </div>

                                {/*fileName*/}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="fileName">
                                            Youtube Video
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        name="fileName"
                                        id="fileName"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="fileName"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`flex w-full justify-between`}>
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
                                                value="false"
                                                label="Public"
                                            />
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value="true"
                                                label="Draft"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDraft"
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
