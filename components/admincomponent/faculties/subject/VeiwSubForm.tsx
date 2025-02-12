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
import logo_holder from "@/public/common/logo_holder.png";


const CustomInput = ({previewUrl}: any) => {
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
                    <Image
                        src={previewUrl || logo_holder}
                        alt="preview"
                        fill
                        className="w-full h-full rounded-full object-fill"
                    />
                )}
            </div>
        </div>
    );
};

export function ViewSubjectForm({alias, onClose}: { alias: string; onClose: () => void }) {
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
                description: subjectData.description || "No description",
                isDraft: subjectData.isDraft,
            });
            setInitialAlias(subjectData.alias);
            setLogo(subjectData.logo)
        }
    }, [isSuccess, subjectData]);


    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Subject Information</DialogTitle>
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

                                <div className="flex ">
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

                                {/* Subject Alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
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

                                <div
                                    className={`flex gap-4 h-[40px] items-center justify-between ${style.inputContainer}`}>
                                    <div className="w-[80px] ">
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="duration">
                                                Hour
                                            </label>
                                        </div>

                                        <Field disabled name="duration" className={` ${style.input}`}/>
                                    </div>

                                    <div className="w-[80px] ">
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="theory">
                                                Theory
                                            </label>
                                        </div>

                                        <Field disabled name="theory" className={` ${style.input}`}/>
                                    </div>

                                    <div className="w-[80px] ">
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="practice">
                                                Practice
                                            </label>
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
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        id="description"
                                        className={`${style.input}`}
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
