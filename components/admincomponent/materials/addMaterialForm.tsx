"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "./style.module.css";
import {FiUploadCloud} from "react-icons/fi";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {IoIosArrowDown} from "react-icons/io";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Separator} from "@/components/ui/separator";
import {TbAsterisk} from "react-icons/tb";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {useCreateMaterialMutation, useGetMaterialsQuery} from "@/lib/features/admin/materials/material";
import {MaterialType} from "@/lib/types/admin/materials";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetSubjectsQuery} from "@/lib/features/admin/faculties/subject/subject";
import {selectSubject, setSubjects} from "@/lib/features/admin/faculties/subject/subjectSlice";
import {useDispatch, useSelector} from "react-redux";

const initialValues = {
    alias: "",
    title: "",
    description: "",
    contentType: "",
    extension: "",
    size: 0,
    // file: string;
    fileName: "",
    subjectAlias: "",
    // "isDeleted": false,
    isDraft: false
};

const validationSchema = Yup.object().shape({});

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
                className="hidden "
                id="file"
            />
            <label
                htmlFor="file"
                className="border border-gray-300 hover:bg-lms-background text-gray-900 text-sm rounded-lg bg-white w-full h-[215px] p-2 border-dashed flex justify-center items-center cursor-pointer relative overflow-hidden"
            >
                {!imagePreview ? (
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
                    <Image
                        src={imagePreview}
                        alt="preview"
                        layout="fill"
                        objectFit="cover"
                    />
                )}
            </label>
        </div>
    );
};

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

export function CreateMaterialForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [createSingleFile] = useCreateSingleFileMutation();
    const [createMaterial] = useCreateMaterialMutation();
    const {refetch: refetchMaterials} = useGetMaterialsQuery({page: 0, pageSize: 10});
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState("curriculum");

    const {
        data: subjectData,
    } = useGetSubjectsQuery({page: 0, pageSize: 10});
    const subjects = useSelector((state: RootState) => selectSubject(state));

    useEffect(() => {
        if (subjectData) {
            dispatch(setSubjects(subjectData.content));
        }
    }, [subjectData, dispatch]);
    const handleNext = (currentTab: any) => {
        if (currentTab === "curriculum") {
            setActiveTab("slide");
        } else if (currentTab === "slide") {
            setActiveTab("video");
        }
    };

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            // Upload the logo file
            const fileData = new FormData();
            fileData.append("file", values.fileName);

            const fileResponse = await createSingleFile(fileData).unwrap();
            console.log(fileResponse)

            if (fileResponse) {
                // File uploaded successfully, now create the faculty
                const newMaterial: MaterialType = {
                    alias: values.alias,
                    title: values.title,
                    description: values.description,
                    contentType: values.contentType,
                    extension: values.extension,
                    size: values.size,
                    fileName: fileResponse.fileName,
                    subjectAlias: values.subjectAlias,
                    isDraft: values.isDraft,
                };

                const res = await createMaterial(newMaterial).unwrap();
                resetForm();
                // Handle success (e.g., show a success message or close the dialog)
                refetchMaterials();
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

        <div
            className="w-full h-full flex flex-grow flex-col items-center-center mb-10 rounded-[10px] border bg-white gap-6">
            <section className="h-[90px] flex items-center mx-10 ">
                <h1 className="text-3xl font-bold text-lms-black-90">
                    Add Materials
                </h1>
            </section>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                defaultValue="faculty"
                className="w-full "
            >
                <TabsList
                    className="dark:bg-gray-800 bg-lms-background w-full h-[150px] flex items-center justify-center rounded-none gap-[20px]">
                    <div className={`flex flex-col justify-center items-center gap-4`}>
                        <TabsTrigger
                            value="curriculum"
                            className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                        >
                            1
                        </TabsTrigger>
                        <span className="text-lms-primary text-lg ">Curriculum</span>
                    </div>

                    {/*<div className="h-[1px] w-[200px] bg-gray-300 dark:bg-gray-700"></div>*/}
                    <Separator orientation="horizontal" className="w-[200px] bg-gray-300 dark:bg-gray-700"/>

                    <div className={`flex flex-col justify-center items-center gap-4`}>
                        <TabsTrigger
                            value="slide"
                            className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                        >
                            2
                        </TabsTrigger>
                        <span className="text-lms-primary text-lg ">Slide</span>
                    </div>

                    {/*<div className="h-[1px] w-[200px] bg-gray-300 dark:bg-gray-700"></div>*/}
                    <Separator orientation="horizontal" className="w-[200px] bg-gray-300 dark:bg-gray-700"/>

                    <div className={`flex flex-col justify-center items-center gap-4`}>
                        <TabsTrigger
                            value="video"
                            className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                        >
                            3
                        </TabsTrigger>
                        <span className="text-lms-primary text-lg ">Video</span>
                    </div>
                </TabsList>

                {/* Curriculum */}
                <TabsContent value="curriculum">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({setFieldValue}) => (
                            <Form className="py-4 rounded-lg w-full h-[605px]">
                                <div className="flex flex-col gap-4 items-center justify-center">

                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="alias">
                                                Alias
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            placeholder="Faculty of Engineering"
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

                                    <div className={` ${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="subjectAlias">
                                                Subject
                                            </label>
                                            {/*<TbAsterisk className='w-2 h-2 text-lms-error'/>*/}
                                        </div>

                                        <Field as="select" name="subjectAlias" id="subjectAlias"
                                               className={` ${style.input}`}>
                                            <option value="" label="Select Subject"/>
                                            {Array.isArray(subjects) && subjects.map(subject => (
                                                <option key={subject.alias} value={subject.title}
                                                        label={subject.title}/>
                                            ))}

                                        </Field>

                                        {/*<ErrorMessage*/}
                                        {/*    name="degree.level"*/}
                                        {/*    component="div"*/}
                                        {/*    className={`${style.error}`}*/}
                                        {/*/>*/}
                                    </div>

                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="description">
                                            Description
                                        </label>
                                        <Field
                                            // as="textarea"
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

                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="fileName">
                                            File Upload
                                        </label>
                                        <Field
                                            type="file"
                                            name="fileName"
                                            id="fileName"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                        />
                                        <ErrorMessage
                                            name="fileName"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* isDraft */}
                                    <div className={`${style.inputContainer}`}>
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
                                </div>

                            </Form>
                        )}
                    </Formik>
                    <div className="flex justify-end w-[900px]">
                        <Button
                            type="submit"
                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                        >
                            Upload
                        </Button>
                        {/*<Button*/}
                        {/*    type="submit"*/}
                        {/*    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"*/}
                        {/*    onClick={() => handleNext(activeTab)}*/}
                        {/*>*/}
                        {/*    Next*/}
                        {/*</Button>*/}
                    </div>
                </TabsContent>

                {/* Slide */}
                <TabsContent value="slide">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({setFieldValue}) => (
                            <Form className="py-4 rounded-lg w-full h-[605px]">
                                <div className="flex flex-col gap-4 items-center justify-center">

                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="alias">
                                                Alias
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            placeholder="Faculty of Engineering"
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

                                    <div className={` ${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="subjectAlias">
                                                Subject
                                            </label>
                                            {/*<TbAsterisk className='w-2 h-2 text-lms-error'/>*/}
                                        </div>

                                        <Field as="select" name="subjectAlias" id="subjectAlias"
                                               className={` ${style.input}`}>
                                            <option value="" label="Select Subject"/>
                                            {Array.isArray(subjects) && subjects.map(subject => (
                                                <option key={subject.alias} value={subject.title}
                                                        label={subject.title}/>
                                            ))}

                                        </Field>

                                        {/*<ErrorMessage*/}
                                        {/*    name="degree.level"*/}
                                        {/*    component="div"*/}
                                        {/*    className={`${style.error}`}*/}
                                        {/*/>*/}
                                    </div>

                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="description">
                                            Description
                                        </label>
                                        <Field
                                            // as="textarea"
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

                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="fileName">
                                            File Upload
                                        </label>
                                        <Field
                                            type="file"
                                            name="fileName"
                                            id="fileName"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                        />
                                        <ErrorMessage
                                            name="fileName"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* isDraft */}
                                    <div className={`${style.inputContainer}`}>
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
                                </div>

                            </Form>
                        )}
                    </Formik>
                    <div className="flex justify-end w-[900px]">
                        <Button
                            type="submit"
                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                            onClick={() => handleNext(activeTab)}
                        >
                            Next
                        </Button>
                    </div>
                </TabsContent>

                {/* Video */}
                <TabsContent value="video">
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmit}
                    >
                        {({setFieldValue}) => (
                            <Form className="py-4 rounded-lg w-full h-[605px]">
                                <div className="flex flex-col gap-4 items-center justify-center">

                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="alias">
                                                Alias
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            placeholder="Faculty of Engineering"
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

                                    <div className={` ${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="subjectAlias">
                                                Subject
                                            </label>
                                            {/*<TbAsterisk className='w-2 h-2 text-lms-error'/>*/}
                                        </div>

                                        <Field as="select" name="subjectAlias" id="subjectAlias"
                                               className={` ${style.input}`}>
                                            <option value="" label="Select Subject"/>
                                            {Array.isArray(subjects) && subjects.map(subject => (
                                                <option key={subject.alias} value={subject.title}
                                                        label={subject.title}/>
                                            ))}

                                        </Field>

                                        {/*<ErrorMessage*/}
                                        {/*    name="degree.level"*/}
                                        {/*    component="div"*/}
                                        {/*    className={`${style.error}`}*/}
                                        {/*/>*/}
                                    </div>

                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="description">
                                            Description
                                        </label>
                                        <Field
                                            // as="textarea"
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

                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="fileName">
                                            File Upload
                                        </label>
                                        <Field
                                            type="file"
                                            name="fileName"
                                            id="fileName"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                        />
                                        <ErrorMessage
                                            name="fileName"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* isDraft */}
                                    <div className={`${style.inputContainer}`}>
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
                                </div>
                            </Form>
                        )}
                    </Formik>

                    <div className="flex justify-end w-[900px]">
                        <Button
                            type="submit"
                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                        >
                            Upload
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
