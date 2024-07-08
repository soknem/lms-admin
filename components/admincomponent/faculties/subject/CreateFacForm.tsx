"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../../style.module.css";
import {FiPlus, FiUploadCloud} from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {SubjectType} from "@/lib/types/admin/faculty";
import React, {useState} from "react";
import Image from "next/image";
import {TbAsterisk} from "react-icons/tb";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {useCreateSubjectMutation, useGetSubjectsQuery} from "@/lib/features/admin/faculties/subject/subject";
import slugify from "slugify";

const initialValues = {
    title: "",
    logo: "",
    duration: 0,
    theory: 0,
    practice: 0,
    internship: 0,
    description: "",
    isDraft: false,
};


const validationSchema = Yup.object().shape({});

const RadioButton = ({field, value, label}: any) => {
    return (
        <div>
            <input
                type="radio"
                {...field}
                id={value}
                value={value}
                checked={field.value === value}
            />
            <label className="pl-2" htmlFor={value}>
                {label}
            </label>
        </div>
    );
};

const CustomInput = ({field, setFieldValue}: any) => {
    const [imagePreview, setImagePreview] = useState("");

    const handleUploadFile = (e: any) => {
        const file = e.target.files[0];
        const localUrl = URL.createObjectURL(file);
        setImagePreview(localUrl);

        setFieldValue(field.name, file);
    };

    return (
        <div className="w-full">
            <input
                type="file"
                onChange={handleUploadFile}
                className="hidden"
                id="file"
            />
            <label
                htmlFor="file"
                className="border border-gray-300 hover:bg-lms-background text-gray-900 text-sm rounded-lg bg-white w-full h-[68px] p-2 border-dashed flex justify-center items-center cursor-pointer relative overflow-hidden"
            >
                {!imagePreview ? (
                    <div className="flex items-center justify-center gap-8">
                        <FiUploadCloud className="text-lms-primary text-[34px]"/>
                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="text-center text-md text-black">
                                Select a file or drag and drop here
                            </p>
                            <p className="text-center text-md text-lms-gray-30">
                                JPG, PNG or PDF, file size no more than 10MB
                            </p>
                        </div>
                    </div>
                ) : (
                    <div style={{position: 'relative', width: '100%', height: '100%'}}>
                        <Image
                            src={imagePreview}
                            alt="preview"
                            fill
                            style={{objectFit: 'contain'}}
                        />
                    </div>
                )}
            </label>
        </div>
    );
};


export function CreateSubjectForm() {
    const [createSingleFile] = useCreateSingleFileMutation();
    const [createSubject] = useCreateSubjectMutation();
    const {refetch: refetchSubjects} = useGetSubjectsQuery({page: 0, pageSize: 10});
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            // Upload the logo file
            const fileData = new FormData();
            fileData.append("file", values.logo);

            const fileResponse = await createSingleFile(fileData).unwrap();
            console.log(fileResponse)

            if (fileResponse) {
                // File uploaded successfully, now create the faculty

                const theoryValue = values.theory;
                const practiceValue = values.practice;
                const internshipValue = values.practice;
                const durationValue = (theoryValue * 15) + (practiceValue * 30) + (internshipValue * 45);


                const newSubject: SubjectType = {
                    alias: values.alias,
                    title: values.title,
                    duration: durationValue,
                    theory: theoryValue,
                    practice: practiceValue,
                    internship: internshipValue,
                    description: values.description,
                    logo: fileResponse.name,
                    isDraft: values.isDraft,
                };


                const res = await createSubject(newSubject).unwrap();
                resetForm();
                // Handle success (e.g., show a success message or close the dialog)
                refetchSubjects();
                setIsOpen(false);
                // console.log("Update successfully")

            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error creating faculty: ", error);
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Subject
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px]  bg-white" onInteractOutside={(e) => e.preventDefault()}>

                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Add Subject</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (


                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col items-center gap-1">

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="title">
                                            Subject
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="Introduction to IT"
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

                                        <Field disabled name="duration" className={` ${style.input}`}/>
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
                                        placeholder="a foundational program designed to equip you with essential knowledge and skills in the field of IT. This course is tailored for beginners and those looking to strengthen their understanding of information technology concepts and applications. "
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

                                {/* Subject Image*/}
                                <div className={`${style.inputContainer}  `}>
                                    <label
                                        htmlFor="logo"
                                        className="block text-sm font-medium text-gray-700 my-2"
                                    >
                                        Subject Logo
                                    </label>
                                    <Field
                                        type="file"
                                        name="logo"
                                        id="logo"
                                        component={CustomInput}
                                        setFieldValue={setFieldValue}
                                    />
                                    <ErrorMessage
                                        name="logo"
                                        component="div"
                                        className="text-red-500 mt-1 text-sm"
                                    />
                                </div>
                            </div>

                            {/* button submit */}
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                >
                                    Add
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
