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

import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {TbAsterisk} from "react-icons/tb";
import {IoCameraOutline} from "react-icons/io5";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {
    useEditSubjectByAliasMutation,
    useGetSubjectByAliasQuery,
    useGetSubjectsQuery
} from "@/lib/features/admin/faculties/subject/subject";
import {SubjectType} from "@/lib/types/admin/faculty";
import {toast} from "react-hot-toast";
import logo_holder from "@/public/common/logo_holder.png";
import slugify from "slugify";


const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
    title: Yup.string()
        .required("Title is required")
        .max(100, "Title must be at most 100 characters"),
    logo: Yup.mixed()
        .test("fileFormat", "Unsupported Format", (value: any) => {
            if (!value) return true;
            return SUPPORTED_FORMATS.includes(value.type);
        })
        .test("fileSize", "File Size is too large", (value: any) => {
            if (!value) return true;
            return value.size <= FILE_SIZE;
        })
        .nullable(),
    duration: Yup.number()
        .required("Duration is required"),
    theory: Yup.number()
        .required("Theory hours are required"),
    practice: Yup.number()
        .required("Practice hours are required"),
    internship: Yup.number()
        .required("Internship hours are required"),
    isDraft: Yup.boolean()
        .required("Draft status is required"),
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
const CustomInput = ({field, form: {setFieldValue}, previewUrl}: any) => {
    const [imagePreview, setImagePreview] = useState(previewUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleContainerClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const localUrl = URL.createObjectURL(file);
            setImagePreview(localUrl);
            setFieldValue(field.name, file);
        }
    };

    return (
        <div className="w-full">
            <div
                className={`flex items-center justify-center relative ${style.imageContainer}`}
                onClick={handleContainerClick}
            >
                {imagePreview ? (
                    <Image
                        src={imagePreview || logo_holder}
                        alt="preview"
                        fill
                        style={{objectFit: "contain"}}
                    />
                ) : (
                    <Image
                        src={previewUrl || logo_holder}
                        alt="preview"
                        fill
                        className="w-full h-full rounded-full object-fill"
                    />
                )}
                <div
                    className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2"
                >
                    <IoCameraOutline className="w-5 h-5"/>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleUploadFile}
                />
            </div>
        </div>
    );
};

export function EditSubjectForm({alias, onClose}: { alias: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [createSingleFile] = useCreateSingleFileMutation();
    const [initialAlias, setInitialAlias] = useState("");
    const [logo, setLogo] = useState(null);
    const [editSubject] = useEditSubjectByAliasMutation();
    const {data: subjectData, isSuccess} = useGetSubjectByAliasQuery(alias);
    const [initialValues, setInitialValues] = useState({
        alias: "",
        title: "",
        logo: "",
        duration: 0,
        theory: 0,
        practice: 0,
        internship: 0,
        description: "",
        isDraft: false,
    });

    useEffect(() => {
        if (isSuccess && subjectData) {
            setInitialValues({
                alias: subjectData.alias,
                title: subjectData.title,
                logo: subjectData.logo,
                duration: subjectData.duration,
                theory: subjectData.theory,
                practice: subjectData.practice,
                internship: subjectData.internship,
                description: subjectData.description || "No description",
                isDraft: subjectData.isDraft,
            });
            setInitialAlias(subjectData.alias);
            setLogo(subjectData.logo)
        }
    }, [isSuccess, subjectData]);

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            let logoUrl = values.logo;

            if (values.logo instanceof File) {
                const fileData = new FormData();
                fileData.append("file", values.logo);
                const fileResponse = await createSingleFile(fileData).unwrap();
                logoUrl = fileResponse.name; // Assuming the response contains the URL of the uploaded file
            } else if (values.logo === logo) {
                logoUrl = null;
            }

            const editSubjectByAlias: SubjectType = {
                title: values.title,
                logo: logoUrl,
                duration: values.duration,
                theory: values.theory,
                practice: values.practice,
                internship: values.internship,
                description: values.description,
                isDraft: values.isDraft,
                alias: values.alias,
            };

            await editSubject({alias: initialAlias, updatedData: editSubjectByAlias}).unwrap();

            // Now update the alias if it has changed
            if (values.alias !== initialAlias) {
                await editSubject({
                    alias: values.alias,
                    updatedData: {...editSubjectByAlias, alias: values.alias}
                }).unwrap();
            }

            resetForm();
            toast.success('Successfully updated!');

            onClose()
        } catch (error) {
            toast.error('Failed to edit subject!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="w-[480px]  bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Edit Subject</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    validationSchema={validationSchema}
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue, isSubmitting}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col items-center justify-center gap-1">

                                <div className="flex">
                                    <Field
                                        name="logo"
                                        component={CustomInput}
                                        setFieldValue={setFieldValue}
                                        previewUrl={initialValues.logo}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="title">
                                            Subject
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="Introduction to Information Technology"
                                        name="title"
                                        id="title"
                                        onChange={(e: any) => {
                                            setFieldValue(
                                                "title",
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
                                        name="title"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Subject Alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        disabled
                                        placeholder="introduction-to-information-technology"
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

                                <div
                                    className={`flex gap-4 h-[40px] items-center justify-between ${style.inputContainer}`}>
                                    <div className="w-[80px] ">
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="duration">
                                                Hour
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field name="duration" className={` ${style.input}`}/>
                                    </div>

                                    <div className="w-[80px] ">
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="theory">
                                                Theory
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field name="theory" className={` ${style.input}`}/>
                                    </div>

                                    <div className="w-[80px] ">
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="practice">
                                                Practice
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field name="practice" className={` ${style.input}`}/>
                                    </div>

                                    <div className="w-[80px] ">
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="internship">
                                                Internship
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field name="internship" className={` ${style.input}`}/>
                                    </div>
                                </div>

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

                                {/* status */}
                                <div className={`${style.inputContainer}  `}>
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
