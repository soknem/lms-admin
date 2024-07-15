"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "./style.module.css";
import {FiUploadCloud} from "react-icons/fi";

import React, {useEffect, useState} from "react";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {TbAsterisk} from "react-icons/tb";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {useCreateMaterialMutation, useGetMaterialsQuery} from "@/lib/features/admin/materials/material";
import {MaterialType, SectionType} from "@/lib/types/admin/materials";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetSubjectsQuery} from "@/lib/features/admin/faculties/subject/subject";
import {useDispatch} from "react-redux";
import Select from "react-select";
import {useGetAllBySubjectAliasQuery} from "@/lib/features/admin/materials/subjectMaterialSection/section";

const initialValues = {
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

export function CreateMaterialForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [createSingleFile] = useCreateSingleFileMutation();
    const [createMaterial] = useCreateMaterialMutation();
    const {refetch: refetchMaterials} = useGetMaterialsQuery({page: 0, pageSize: 10});
    const [isOpen, setIsOpen] = useState(false);
    const [sections, setSections] = useState([]);
    const [subjects, setSubjects] = useState([]);

    const [curriculumData, setCurriculumData] = useState(initialValues);
    const [slideData, setSlideData] = useState(initialValues);
    const [videoData, setVideoData] = useState(initialValues);
    const [activeTab, setActiveTab] = useState("curriculum");

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

    const {
        data: subjectData,
    } = useGetSubjectsQuery({page: 0, pageSize: 10});
    useEffect(() => {
        if (subjectData) {
            const subjectsOption = subjectData?.content?.map((subject: any) => ({
                value: subject.alias,
                label: subject.title
            }));
            setSubjects(subjectsOption);
        }
    }, [subjectData, dispatch]);

    const [selectedSubjectAlias, setSelectedSubjectAlias] = useState(null);

    const handleSubjectChange = (selectedOption: any) => {
        setSelectedSubjectAlias(selectedOption?.value); // Update the selected subject alias
        // You might need to reset the sections state if necessary
    };

    const {data: sectionData} = useGetAllBySubjectAliasQuery(selectedSubjectAlias);

    useEffect(() => {
        if (sectionData) {
            const sectionOption = sectionData?.map((section: SectionType) => ({
                value: section.uuid,
                label: section.title,
            }));
            setSections(sectionOption);
        }
    }, [sectionData, dispatch]);

    console.log("Section", sections)

    const fileTypeOption = [
        {value: "curriculum", label: 'Curriculum'},
        {value: "slide", label: 'Slide'},
        {value: "youtubeVideo", label: 'Video'},
    ]
    const handleNext = (currentTab: any) => {
        if (currentTab === "curriculum") {
            setActiveTab("slide");
        } else if (currentTab === "slide") {
            setActiveTab("video");
        }
    };

    const handleSubmitCurriculum = async (values: any, {setSubmitting, resetForm}: any) => {
        // const dataToSubmit = curriculumData;

        try {
            // Upload the logo file
            const fileData = new FormData();
            fileData.append("file", values.fileName);

            const fileResponse = await createSingleFile(fileData).unwrap();
            console.log(fileResponse)

            if (fileResponse) {
                // File uploaded successfully, now create the faculty
                const newMaterial: MaterialType = {
                    uuid: values.uuid,
                    title: values.title,
                    sectionUuid: values.section,
                    subject: values.subject,
                    fileType: values.fileType,
                    download: values.download,
                    fileUrl: fileResponse.uri,
                    isDeleted: values.isDeleted,
                    description: values.description,
                    contentType: fileResponse.contentType,
                    extension: fileResponse.extension,
                    size: fileResponse.size,
                    fileName: fileResponse.name,
                    isDraft: values.isDraft,
                };

                console.log("newMaterial:", newMaterial)
                await createMaterial(newMaterial).unwrap();
                resetForm();
                // Handle success (e.g., show a success message or close the dialog)
                refetchMaterials();
                setIsOpen(false);
                console.log("Create successfully")

            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error creating material: ", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitSlide = async (values: any, {setSubmitting, resetForm}: any) => {
        // const dataToSubmit = curriculumData;

        try {
            // Upload the logo file
            const fileData = new FormData();
            fileData.append("file", values.fileName);

            const fileResponse = await createSingleFile(fileData).unwrap();
            console.log(fileResponse)

            if (fileResponse) {
                // File uploaded successfully, now create the faculty
                const newMaterial: MaterialType = {
                    uuid: values.uuid,
                    title: values.title,
                    sectionUuid: values.section,
                    subject: values.subject,
                    fileType: values.fileType,
                    download: values.download,
                    fileUrl: fileResponse.uri,
                    isDeleted: values.isDeleted,
                    description: values.description,
                    contentType: fileResponse.contentType,
                    extension: fileResponse.extension,
                    size: fileResponse.size,
                    fileName: fileResponse.name,
                    isDraft: values.isDraft,
                };

                console.log("newMaterial:", newMaterial)
                await createMaterial(newMaterial).unwrap();
                resetForm();
                // Handle success (e.g., show a success message or close the dialog)
                refetchMaterials();
                setIsOpen(false);
                console.log("Create successfully")

            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error creating material: ", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleSubmitVideo = async (values: any, {setSubmitting, resetForm}: any) => {
        // const dataToSubmit = curriculumData;

        try {
            // File uploaded successfully, now create the faculty
            const newMaterial: MaterialType = {
                uuid: values.uuid,
                title: values.title,
                sectionUuid: values.section,
                subject: values.subject,
                fileType: values.fileType,
                download: values.download,
                fileUrl: values.fileUrl,
                isDeleted: values.isDeleted,
                description: values.description,
                contentType: values.contentType,
                extension: values.extension,
                size: values.size,
                fileName: values.fileName,
                isDraft: values.isDraft,
            }

            console.log("newMaterial:", newMaterial)
            await createMaterial(newMaterial).unwrap();
            resetForm();
            // Handle success (e.g., show a success message or close the dialog)
            refetchMaterials();
            setIsOpen(false);
            console.log("Create successfully")

        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error creating material: ", error);
        } finally {
            setSubmitting(false);
        }
    };

    const handleTabChange = (newTab: any) => {
        setActiveTab(newTab);
    };

    const handleFormikChange = (tab: any, values: any) => {
        switch (tab) {
            case "curriculum":
                setCurriculumData(values);
                break;
            case "slide":
                setSlideData(values);
                break;
            case "video":
                setVideoData(values);
                break;
            default:
                break;
        }
    };

    return (

        <div
            className="flex flex-grow flex-col gap-6 bg-white border w-[1240px] items-center-center rounded-[10px] mb-9">

            <section className="h-[90px] flex items-center mx-10 ">
                <h1 className="text-3xl font-bold text-lms-black-90">Add Materials</h1>
            </section>

            <Tabs
                value={activeTab} onValueChange={(value) => handleTabChange(value)}
                className="w-full py-0 my-0"
            >

                <TabsList
                    className="bg-lms-background w-full h-[150px]  rounded-none px-10 ">

                    <div className="flex items-center justify-center container gap-[20px]">

                        <div className={`flex flex-col justify-center items-center gap-4`}>
                            <TabsTrigger
                                value="curriculum"
                                className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                            >
                                1
                            </TabsTrigger>
                            <span className="text-lms-primary text-lg ">Curriculum</span>
                        </div>

                        <div className="h-[1px] w-[200px] bg-gray-300 dark:bg-gray-700"></div>

                        <div className={`flex flex-col justify-center items-center gap-4`}>
                            <TabsTrigger
                                value="slide"
                                className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                            >
                                2
                            </TabsTrigger>
                            <span className="text-lms-primary text-lg ">Slide</span>
                        </div>

                        <div className="h-[1px] w-[200px] bg-gray-300 dark:bg-gray-700"></div>

                        <div className={`flex flex-col justify-center items-center gap-4`}>
                            <TabsTrigger
                                value="video"
                                className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                            >
                                3
                            </TabsTrigger> <span
                            className="text-lms-primary text-lg ">Video</span>
                        </div>

                    </div>
                </TabsList>


                {/*  Curriculum Information */}
                <TabsContent value="curriculum"
                             className={`flex justify-center h-full items-center flex-col gap-9 mx-10  py-0 my-0`}>
                    <div className="border-b-2 w-full py-6">
                        <h1 className="text-2xl font-bold text-lms-black-90 ">Curriculum</h1>
                    </div>
                    <Formik
                        initialValues={curriculumData}
                        // validationSchema={validationSchema}
                        onSubmit={handleSubmitCurriculum}
                        enableReinitialize
                        onValuesChange={(values: any) => handleFormikChange("curriculum", values)}
                    >
                        {({setFieldValue, values}) => (
                            <Form
                                className="py-4 rounded-lg w-full flex flex-grow justify-center flex-col items-center">
                                {/* Add your form fields for personal information here */}
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
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Select
                                            options={fileTypeOption}
                                            name="fileType"
                                            onChange={(option: any) => setFieldValue("fileType", option.value)}
                                        />

                                    </div>

                                    {/*Subject*/}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="subject">
                                            Subject
                                        </label>
                                        <Select
                                            options={subjects}
                                            onChange={handleSubjectChange}
                                            className="w-full"
                                        />
                                    </div>

                                    {/*Section*/}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="section">
                                            Section
                                        </label>
                                        <Select
                                            options={sections}
                                            name="section"
                                            onChange={(option: any) => setFieldValue("section", option.value)}
                                        />
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

                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="fileName">
                                            File Upload
                                        </label>
                                        <Field
                                            type="file"
                                            name="fileName"
                                            id="fileName"
                                            component={CustomInputFile}
                                            previewField="curriculumPreview"
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


                                <div className="flex justify-end w-full container gap-4 mx-auto">
                                    {/*<Button*/}
                                    {/*    type="button"*/}
                                    {/*    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"*/}
                                    {/*    onClick={() => handleNext(activeTab)}*/}
                                    {/*>*/}
                                    {/*    Next*/}
                                    {/*</Button>*/}
                                    <Button type="submit"
                                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary">
                                        Upload
                                    </Button>
                                </div>

                            </Form>
                        )}
                    </Formik>


                </TabsContent>

                <TabsContent value="slide"
                             className={`flex justify-center h-full items-center flex-col gap-9 mx-10  py-0 my-0`}>
                    <div className="border-b-2 w-full py-6">
                        <h1 className="text-2xl font-bold text-lms-black-90 ">Slide</h1>
                    </div>

                    <Formik
                        initialValues={slideData}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitSlide}
                        enableReinitialize
                        onValuesChange={(values: any) => handleFormikChange("slide", values)}
                    >
                        {({setFieldValue}) => (
                            <Form
                                className="py-4 rounded-lg w-full flex flex-grow justify-center flex-col items-center">
                                {/* Add your form fields for personal information here */}
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
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Select
                                            options={fileTypeOption}
                                            name="fileType"
                                            onChange={(option: any) => setFieldValue("fileType", option.value)}
                                        />

                                    </div>

                                    {/*Subject*/}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="subject">
                                            Subject
                                        </label>
                                        <Select
                                            options={subjects}
                                            onChange={handleSubjectChange}
                                            className="w-full"
                                        />
                                    </div>

                                    {/*Section*/}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="section">
                                            Section
                                        </label>
                                        <Select
                                            options={sections}
                                            name="section"
                                            onChange={(option: any) => setFieldValue("section", option.value)}
                                        />
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

                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="fileName">
                                            File Upload
                                        </label>
                                        <Field
                                            type="file"
                                            name="fileName"
                                            id="fileName"
                                            component={CustomInputFile}
                                            previewField="curriculumPreview"
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

                                <div className="flex justify-end w-full container gap-4 mx-auto">
                                    {/*<Button*/}
                                    {/*    type="button"*/}
                                    {/*    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"*/}
                                    {/*    onClick={() => handleNext(activeTab)}*/}
                                    {/*>*/}
                                    {/*    Next*/}
                                    {/*</Button>*/}
                                    <Button type="submit"
                                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary">
                                        Upload
                                    </Button>
                                </div>

                            </Form>
                        )}
                    </Formik>


                </TabsContent>

                {/* Video Information */}
                <TabsContent value="video"
                             className={`flex justify-center h-full items-center flex-col gap-9 mx-10  py-0 my-0`}>

                    <div className="border-b-2 w-full py-6">
                        <h1 className="text-2xl font-bold text-lms-black-90 ">Video</h1>
                    </div>

                    <Formik
                        initialValues={videoData}
                        validationSchema={validationSchema}
                        onSubmit={handleSubmitVideo}
                        enableReinitialize
                        onValuesChange={(values: any) => handleFormikChange("video", values)}
                    >
                        {({setFieldValue}) => (
                            <Form
                                className="py-4 rounded-lg w-full flex flex-grow flex-col justify-center items-center">

                                {/* Add your form fields for personal information here */}
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
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Select
                                            options={fileTypeOption}
                                            name="fileType"
                                            onChange={(option: any) => setFieldValue("fileType", option.value)}
                                        />

                                    </div>

                                    {/*Subject*/}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="subject">
                                            Subject
                                        </label>
                                        <Select
                                            options={subjects}
                                            onChange={handleSubjectChange}
                                            className="w-full"
                                        />
                                    </div>

                                    {/*Section*/}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="section">
                                            Section
                                        </label>
                                        <Select
                                            options={sections}
                                            name="section"
                                            onChange={(option: any) => setFieldValue("section", option.value)}
                                        />
                                    </div>


                                    {/*Description*/}
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

                                    {/*<div className={`${style.inputContainer}`}>*/}
                                    {/*    <label className={`${style.label}`} htmlFor="fileName">*/}
                                    {/*        File Upload*/}
                                    {/*    </label>*/}
                                    {/*    <Field*/}
                                    {/*        type="file"*/}
                                    {/*        name="fileName"*/}
                                    {/*        id="fileName"*/}
                                    {/*        component={CustomInputFile}*/}
                                    {/*        previewField="curriculumPreview"*/}
                                    {/*    />*/}
                                    {/*    <ErrorMessage*/}
                                    {/*        name="fileName"*/}
                                    {/*        component="div"*/}
                                    {/*        className={`${style.error}`}*/}
                                    {/*    />*/}
                                    {/*</div>*/}

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
                                            placeholder="https://youtu.be/_GrtqSs6i-w?si=xd3KIYisyyWR1rfb"
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

                                <div className="flex justify-end w-full container gap-4 mx-auto">
                                    {/*<Button*/}
                                    {/*    type="button"*/}
                                    {/*    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"*/}
                                    {/*    onClick={() => handleNext(activeTab)}*/}
                                    {/*>*/}
                                    {/*    Next*/}
                                    {/*</Button>*/}
                                    <Button type="submit"
                                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary">
                                        Upload
                                    </Button>
                                </div>
                            </Form>
                        )}
                    </Formik>


                </TabsContent>
            </Tabs>

        </div>
    );
}
