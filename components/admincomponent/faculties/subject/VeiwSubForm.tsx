"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../../style.module.css";
import {FiPlus} from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {FacultyType, SubjectType} from "@/lib/types/admin/faculty";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {FaCamera} from "react-icons/fa6";
import {IoCameraOutline} from "react-icons/io5";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {
    useEditSubjectByAliasMutation,
    useGetSubjectByAliasQuery,
    useGetSubjectsQuery
} from "@/lib/features/admin/faculties/subject/subject";
import {TbAsterisk} from "react-icons/tb";

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

    return (
        <div className="w-full">
            <div
                className={`flex items-center justify-center relative ${style.imageContainer}`}
            >
                {imagePreview ? (
                    <Image
                        src={imagePreview}
                        alt="preview"
                        fill
                        style={{objectFit: "contain"}}
                    />
                ) : (
                    <img
                        src={previewUrl}
                        alt="faculty"
                        className="w-full h-full rounded-full"
                    />
                )}

            </div>
        </div>
    );
};

export function ViewSubjectForm({alias}: { alias: string }) {
    const [open, setOpen] = useState(true);
    const [initialAlias, setInitialAlias] = useState("");
    const [logo, setLogo] = useState(null);
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
                description: subjectData.description,
                isDraft: subjectData.isDraft,
            });
            setInitialAlias(subjectData.alias);
            setLogo(subjectData.logo)
        }
    }, [isSuccess, subjectData]);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={handleClose} modal={true}>
            <DialogContent className="w-[540px] bg-white ">
                <DialogHeader>
                    <DialogTitle>Subject Information</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={() => {
                    }}
                >
                    {({setFieldValue}) => (
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


                                {/* Subject Alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Alias
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        disabled
                                        type="text"
                                        placeholder="Faculty of Engineering"
                                        name="alias"
                                        id="alias"
                                        className={`${style.input}`}
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
                                        disabled
                                        type="text"
                                        placeholder="Introduction to IT"
                                        name="title"
                                        id="title"
                                        className={` ${style.input}`}
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

                                        <Field disabled name="duration" className={` ${style.input}`}/>
                                    </div>

                                    <div className="w-[80px] ">
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="theory">
                                                Theory
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field disabled name="theory" className={` ${style.input}`}/>
                                    </div>

                                    <div className="w-[80px] ">
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="practice">
                                                Practice
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field disabled name="practice" className={` ${style.input}`}/>
                                    </div>

                                    <div className="w-[80px] ">
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="internship">
                                                Internship
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field disabled name="internship" className={` ${style.input}`}/>
                                    </div>
                                </div>


                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        disabled
                                        type="text"
                                        placeholder="a foundational program designed to equip you with essential knowledge and skills in the field of IT. This course is tailored for beginners and those looking to strengthen their understanding of information technology concepts and applications. "
                                        name="description"
                                        id="description"
                                        className={`${style.input}`}
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
                                            disabled
                                            name="isDraft"
                                            component={RadioButton}
                                            value="true"
                                            label="Public"
                                        />
                                        <Field
                                            disabled
                                            name="isDraft"
                                            component={RadioButton}
                                            value="false"
                                            label="Draft"
                                        />
                                    </div>
                                    
                                </div>

                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
