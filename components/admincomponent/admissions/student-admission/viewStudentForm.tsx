"use client";
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "./style.module.css";
import {FiUploadCloud} from "react-icons/fi";
import React, {useEffect, useRef, useState} from "react";
import {IoIosArrowDown} from "react-icons/io";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {TbAsterisk} from "react-icons/tb";
import {StudentAdmissionType} from "@/lib/types/admin/admission";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {
    useGetStuAdmsByUuidQuery,
    useUpdateStuAdmsByUuidMutation
} from "@/lib/features/admin/admission-management/students-admission-management/stuAdmission";
import {useDispatch} from "react-redux";
import {AppDispatch} from "@/lib/store";
import {useGetDegreesQuery} from "@/lib/features/admin/faculties/degree/degree";
import {
    useGetStudyProgramsQuery
} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {useGetShiftQuery} from "@/lib/features/admin/faculties/shift/shift";
import Select from "react-select";
import {DegreeType, StudyProgramType} from "@/lib/types/admin/faculty";
import {ShiftType} from "@/lib/types/admin/academics";
import {toast} from "react-hot-toast";
import Image from "next/image";
import logo_holder from "@/public/common/logo_holder.png";
import {DialogFooter} from "@/components/ui/dialog";

export function ViewStudentAmsForm({uuid}: { uuid: string }) {
    const dispatch = useDispatch<AppDispatch>();
    const {data: studentAdmissionData, isSuccess} = useGetStuAdmsByUuidQuery(uuid);
    const [editStudentAdmissions] = useUpdateStuAdmsByUuidMutation();
    const [initialAlias, setInitialAlias] = useState("");
    const [avatar, setAvatar] = useState(null);
    const [identity, setIdentity] = useState(null);
    const [highSchoolCertificate, setHighSchoolCertificate] = useState(null);
    const [vocationTrainingIiiCertificate, setVocationTrainingIiiCertificate] = useState(null);
    const [anyValuableCertificate, setAnyValuableCertificate] = useState(null);
    const [activeTab, setActiveTab] = useState("personal_info");
    const [studyPrograms, setStudyPrograms] = useState<{ value: string; label: string }[]>([]);
    const [degrees, setDegrees] = useState<{ value: string; label: string }[]>([]);
    const [shifts, setShifts] = useState<{ value: string; label: string }[]>([]);
    const [initialValues, setInitialValues] = useState({
        isDeleted: false,
        uuid: "",
        nameEn: "",
        nameKh: "",
        email: "",
        highSchool: "",
        phoneNumber: "",
        dob: "",
        pob: "",
        bacIiGrade: "",
        gender: "",
        avatar: "",
        address: "",
        guardianContact: "",
        guardianRelationShip: "",
        knownIstad: "",
        identity: "",
        biography: "",
        shiftAlias: "",
        studyProgramAlias: "",
        degreeAlias: "",
        admission: "",
        diplomaSession: "",
        classStudent: "",
        highSchoolCertificate: "",
        vocationTrainingIiiCertificate: "",
        anyValuableCertificate: "",
    });

    const {
        data: shiftsData
    } = useGetShiftQuery({page: 0, pageSize: 0});
    useEffect(() => {
        if (shiftsData) {
            const shiftsOption = shiftsData?.content?.map((shift: ShiftType) => ({
                value: shift.alias,
                label: shift.name
            }));
            setShifts(shiftsOption);
        }
    }, [shiftsData, dispatch]);

    const {
        data: StudyProgramData,
    } = useGetStudyProgramsQuery({page: 0, pageSize: 0});
    useEffect(() => {
        if (StudyProgramData) {
            const studyProgramsOption = StudyProgramData?.content?.map((stuPro: StudyProgramType) => ({
                value: stuPro.alias,
                label: stuPro.studyProgramName
            }));
            setStudyPrograms(studyProgramsOption);
        }
    }, [StudyProgramData, dispatch]);

    const {
        data: degreesData,
    } = useGetDegreesQuery({page: 0, pageSize: 0});
    useEffect(() => {
        if (degreesData) {
            const degreesOption = degreesData?.content?.map((degree: DegreeType) => ({
                value: degree.alias,
                label: degree.level
            }));
            setDegrees(degreesOption);
        }
    }, [degreesData, dispatch]);

    useEffect(() => {
        if (isSuccess && studentAdmissionData) {
            setInitialValues({
                uuid: studentAdmissionData.uuid,
                isDeleted: studentAdmissionData.isDeleted,
                nameEn: studentAdmissionData.nameEn,
                nameKh: studentAdmissionData.nameKh,
                email: studentAdmissionData.email,
                highSchool: studentAdmissionData.highSchool,
                phoneNumber: studentAdmissionData.phoneNumber,
                dob: studentAdmissionData.dob,
                pob: studentAdmissionData.pob,
                bacIiGrade: studentAdmissionData.bacIiGrade,
                gender: studentAdmissionData.gender,
                avatar: studentAdmissionData.avatar,
                address: studentAdmissionData.address,
                guardianContact: studentAdmissionData.guardianContact,
                guardianRelationShip: studentAdmissionData.guardianRelationShip,
                knownIstad: studentAdmissionData.knownIstad,
                identity: studentAdmissionData.identity,
                biography: studentAdmissionData.biography,
                shiftAlias: studentAdmissionData.shiftAlias,
                studyProgramAlias: studentAdmissionData.studyProgramAlias,
                degreeAlias: studentAdmissionData.degreeAlias,
                admission: studentAdmissionData.admission,
                diplomaSession: studentAdmissionData.diplomaSession,
                classStudent: studentAdmissionData.classStudent,
                highSchoolCertificate: studentAdmissionData.highSchoolCertificate,
                vocationTrainingIiiCertificate: studentAdmissionData.vocationTrainingIiiCertificate,
                anyValuableCertificate: studentAdmissionData.anyValuableCertificate,
            });
            setInitialAlias(studentAdmissionData.uuid);
            setAvatar(studentAdmissionData.avatar);
            setIdentity(studentAdmissionData.identity);
            setHighSchoolCertificate(studentAdmissionData.highSchoolCertificate);
            setVocationTrainingIiiCertificate(studentAdmissionData.vocationTrainingIiiCertificate);
            setAnyValuableCertificate(studentAdmissionData.anyValuableCertificate);
        }
    }, [isSuccess, studentAdmissionData]);

    const getShiftLabel = (value: string) => {
        const option = shifts.find(option => option.value === value);
        return option ? option.label : '';
    };

    const getDegreesLabel = (value: string) => {
        const option = degrees.find(option => option.value === value);
        return option ? option.label : '';
    };

    const getStuProLabel = (value: string) => {
        const option = studyPrograms.find(option => option.value === value);
        return option ? option.label : '';
    };

    const handleNext = (currentTab: any) => {
        if (currentTab === "personal_info") {
            setActiveTab("edu_info");
        } else if (currentTab === "edu_info") {
            setActiveTab("school_info");
        }
    };

    const CustomInputFile = ({field, form: {setFieldValue}, previewUrl}: any) => {

        const [imagePreview, setImagePreview] = useState(previewUrl);
        const fileInputRef = useRef<HTMLInputElement>(null);
        const handleContainerClick = () => {
            if (fileInputRef.current) {
                fileInputRef.current.click();
            }
        };

        const handleUploadFile = (e: any) => {
            const file = e.target.files?.[0];
            if (file) {
                const localUrl = URL.createObjectURL(file);
                setImagePreview(localUrl);
                setFieldValue(field.name, file);
                setFieldValue(previewUrl, localUrl);
            }
        };

        return (
            <div className="w-full ">
                <div
                    className="border border-gray-300 hover:bg-lms-background text-gray-900 text-sm rounded-lg bg-white w-full h-[215px] p-2 border-dashed flex justify-center items-center cursor-pointer relative overflow-hidden"
                    onClick={handleContainerClick}
                >
                    {imagePreview ? (

                        <Image
                            className="object-cover h-full w-full"
                            src={imagePreview || logo_holder}
                            alt="preview"
                            fill

                            // className="object-cover h-full w-full"
                        />
                    ) : (
                        <div className="flex flex-col items-center justify-center gap-4">
                            <FiUploadCloud className="text-lms-primary text-[34px]"/>
                            <p className="text-center text-md text-black">
                                Select a file or drag and drop here
                            </p>
                            <p className="text-center text-md text-lms-gray-30">
                                JPG, PNG or PDF, file size no more than 10MB
                            </p>
                        </div>
                    )}
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

    return (
        <section
            className="flex flex-grow flex-col gap-6 bg-white border w-[1240px] items-center-center rounded-[10px] none-scroll-bar overflow-x-auto">

            <section className="h-[90px] flex items-center mx-10 ">
                <h1 className="text-3xl font-bold text-lms-black-90">Student Admission</h1>
            </section>

            <Formik
                enableReinitialize
                initialValues={initialValues}
                onSubmit={() => {
                }}
            >
                {({setFieldValue, isSubmitting}) => (
                    <Form
                        className="py-4 rounded-lg w-full flex justify-center items-center none-scroll-bar overflow-x-auto">

                        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="personal_info"
                              className="w-full py-0 my-0 none-scroll-bar overflow-x-auto">

                            <TabsList
                                className=" bg-lms-background w-full h-[150px]  rounded-none px-10 ">

                                <div className="flex items-center justify-center container gap-[20px]">

                                    <div className={`flex flex-col justify-center items-center gap-4`}>
                                        <TabsTrigger
                                            value="personal_info"
                                            className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                                        >
                                            1
                                        </TabsTrigger>
                                        <span className="text-lms-primary text-lg ">Personal Information</span>
                                    </div>

                                    {/* <div className="border-l border-lms-primary h-full mx-2"></div> Vertical line */}
                                    <div className="h-[1px] w-[200px] bg-gray-300 dark:bg-gray-700"></div>

                                    <div className={`flex flex-col justify-center items-center gap-4`}>
                                        <TabsTrigger
                                            value="edu_info"
                                            className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                                        >
                                            2
                                        </TabsTrigger>
                                        <span className="text-lms-primary text-lg ">Education Information</span>
                                    </div>

                                    <div className="h-[1px] w-[200px] bg-gray-300 dark:bg-gray-700"></div>

                                    <div className={`flex flex-col justify-center items-center gap-4`}>
                                        <TabsTrigger
                                            value="school_info"
                                            className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                                        >
                                            3
                                        </TabsTrigger> <span
                                        className="text-lms-primary text-lg ">Institude Information</span>
                                    </div>

                                </div>
                            </TabsList>

                            {/* Personal Information */}
                            <TabsContent value="personal_info"
                                         className={`flex justify-center h-full items-center flex-col gap-9 mx-10  py-0 my-0 none-scroll-bar overflow-x-auto`}>

                                {/* Personal Information Form Fields */}
                                <div className="w-full border-b-2 py-6">
                                    <h1 className="text-2xl font-bold text-lms-black-90 ">Personal Information</h1>
                                </div>

                                {/* Add your form fields for personal information here */}
                                <div
                                    className="grid grid-cols-2 2xl:grid-cols-3 gap-x-9 justify-center items-center none-scroll-bar overflow-x-auto">

                                    {/*name_en */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="nameEn">
                                                Name ( EN )
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="nameEn"
                                            placeholder="Chan Tola"
                                            id="nameEn"
                                            className={`${style.input}`}
                                        />

                                    </div>

                                    {/*name KH */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="nameKh">
                                                Name ( KH )
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="nameKh"
                                            placeholder="Chan Tola"
                                            id="nameKh"
                                            className={`${style.input} khmer-font`}
                                        />
                                    </div>

                                    {/* formal image */}
                                    <div className={`${style.inputContainer} grid row-span-3`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="avatar">
                                                Upload Formal Picture
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>
                                        <Field
                                            name="avatar"
                                            component={CustomInputFile}
                                            setFieldValue={setFieldValue}
                                            previewUrl={initialValues.avatar}
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className={style.inputContainer}>
                                        <div className="flex">
                                            <label className={style.label} htmlFor="gender">
                                                Gender
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <div className="relative w-full">
                                            <Field
                                                as="select"
                                                name="gender"
                                                id="gender"
                                                className={`${style.input} appearance-none`}
                                            >
                                                <option value="" disabled hidden>
                                                    Gender
                                                </option>
                                                <option value="Male">Male</option>
                                                <option value="Female">Female</option>
                                                <option value="Other">Other</option>
                                            </Field>
                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <IoIosArrowDown
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Dob */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="dob">
                                                Date of Birth
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="date"
                                            name="dob"
                                            placeholder="Web Design Curriculum"
                                            id="dob"
                                            className={`${style.input}`}
                                        />
                                    </div>

                                    {/* Contact */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="phoneNumber">
                                                Contact Number
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="phoneNumber"
                                            placeholder="+855 12 345 678"
                                            id="phoneNumber"
                                            className={`${style.input}`}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="email">
                                                Email
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="email"
                                            placeholder="student.istad@gmail.com"
                                            id="email"
                                            className={`${style.input}`}
                                        />
                                    </div>

                                    {/* High school */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="highSchool">
                                                High School
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="highSchool"
                                            placeholder="Chea Sim Takeo High School"
                                            id="highSchool"
                                            className={`${style.input}`}
                                        />

                                    </div>

                                    {/* Place of Birth */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="pob">
                                                Place of Birth
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="pob"
                                            placeholder="Takeo Province"
                                            id="pob"
                                            className={`${style.input}`}
                                        />

                                    </div>

                                    {/* Upload Identity */}
                                    <div className={`${style.inputContainer} grid row-span-3`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="identity">
                                                Upload Identity
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>
                                        <Field
                                            name="identity"
                                            component={CustomInputFile}
                                            setFieldValue={setFieldValue}
                                            previewUrl={initialValues.identity}
                                        />

                                    </div>

                                    {/* Current Address */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="address">
                                                Current Address
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="address"
                                            placeholder="Chamkar Mon, Phnom Penh, Cambodia"
                                            id="address"
                                            className={`${style.input}`}
                                        />

                                    </div>

                                    {/* Guardian Contact */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="guardianContact">
                                                Guardian Contact
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="guardianContact"
                                            placeholder="+855 12 345 678"
                                            id="guardianContact"
                                            className={`${style.input}`}
                                        />

                                    </div>

                                    {/* Guardian Relationship */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="guardianRelationShip">
                                                Guardian Relationship
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="guardianRelationShip"
                                            placeholder="Mother, Father, Brother..."
                                            id="guardianRelationShip"
                                            className={`${style.input}`}
                                        />

                                    </div>

                                    {/* Get to know ISTAD through: */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="knownIstad">
                                                Get to know ISTAD through:
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="knownIstad"
                                            placeholder="Social Media Announcement "
                                            id="knownIstad"
                                            className={`${style.input}`}
                                        />

                                    </div>
                                </div>

                                <div className="flex justify-end w-full container mx-auto">
                                    <Button
                                        type="button"
                                        className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                        onClick={() => handleNext(activeTab)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* Education Information */}
                            <TabsContent value="edu_info"
                                         className={`flex h-full justify-center items-center flex-col gap-9  mx-10 py-0 my-0`}>
                                <div className="border-b-2 w-full py-6">
                                    <h1 className="text-2xl font-bold text-lms-black-90 ">Education Information</h1>
                                </div>

                                {/* Add your form fields for education information here */}
                                <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-9 justify-center items-center">

                                    {/* Class Student */}
                                    <div className={style.inputContainer}>
                                        <div className="flex">
                                            <label className={style.label} htmlFor="classStudent">
                                                Class Student
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <div className="relative w-full">
                                            <Field
                                                as="select"
                                                name="classStudent"
                                                id="classStudent"
                                                className={`${style.input} appearance-none`}
                                            >
                                                <option value="" disabled hidden>
                                                    Class Student
                                                </option>
                                                <option value="Male">Science Class</option>
                                                <option value="Female">Social Science Class</option>
                                            </Field>

                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <IoIosArrowDown
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/*Diploma Session */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="diplomaSession">
                                                Diploma Session
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="diplomaSession"
                                            placeholder="2023-2024"
                                            id="diplomaSession"
                                            className={`${style.input}`}
                                        />

                                    </div>

                                    <div className={style.inputContainer}>
                                        <div className="flex">
                                            <label className={style.label} htmlFor="bacIiGrade">
                                                Grade
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <div className="relative w-full">
                                            <Field
                                                as="select"
                                                name="bacIiGrade"
                                                id="bacIiGrade"
                                                className={`${style.input} appearance-none`}
                                            >
                                                <option value="" disabled hidden>
                                                    Grade
                                                </option>
                                                <option value="A">A</option>
                                                <option value="B">B</option>
                                                <option value="C">C</option>
                                                <option value="D">D</option>
                                                <option value="E">E</option>
                                                <option value="O">Other</option>
                                            </Field>
                                            <ErrorMessage
                                                name="bacIiGrade"
                                                component="div"
                                                className={`${style.error}`}
                                            />
                                            <div
                                                className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                                <IoIosArrowDown
                                                    className="h-5 w-5 text-gray-400"
                                                    aria-hidden="true"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* High Certificate */}
                                    <div className={`${style.inputContainer} grid row-span-3`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="highSchoolCertificate">
                                                High Certificate
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            name="highSchoolCertificate"
                                            component={CustomInputFile}
                                            setFieldValue={setFieldValue}
                                            previewUrl={initialValues.highSchoolCertificate}
                                        />

                                    </div>

                                    {/* Vocation Training III Certificate */}
                                    <div className={`${style.inputContainer} grid row-span-3`}>
                                        <label className={`${style.label}`} htmlFor="vocationTrainingIiiCertificate">
                                            Vocation Training III Certificate
                                        </label>
                                        <Field
                                            name="vocationTrainingIiiCertificate"
                                            component={CustomInputFile}
                                            setFieldValue={setFieldValue}
                                            previewUrl={initialValues.vocationTrainingIiiCertificate}
                                        />
                                        <ErrorMessage
                                            name="vocationTrainingIiiCertificate"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* Any Valuable Certificate */}
                                    <div className={`${style.inputContainer} grid row-span-3`}>
                                        <label className={`${style.label}`} htmlFor="anyValuableCertificate">
                                            Any Valuable Certificate
                                        </label>
                                        <Field
                                            name="anyValuableCertificate"
                                            component={CustomInputFile}
                                            setFieldValue={setFieldValue}
                                            previewUrl={initialValues.anyValuableCertificate}
                                        />

                                    </div>
                                </div>

                                <div className="flex justify-end w-full container mx-auto">
                                    <Button
                                        type="button"
                                        className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                        onClick={() => handleNext(activeTab)}
                                    >
                                        Next
                                    </Button>
                                </div>
                            </TabsContent>

                            {/* School Information */}
                            <TabsContent value="school_info"
                                         className={`flex justify-center items-center flex-col gap-9 mx-10 py-0 my-0`}>

                                <div className="border-b-2 w-full py-6">
                                    <h1 className="text-2xl font-bold text-lms-black-90 ">Institute Information</h1>
                                </div>

                                {/* Add your form fields for school information here */}
                                <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-9 justify-center ">

                                    {/* Shift */}
                                    <div className={style.inputContainer}>
                                        <div className="flex">
                                            <label className={style.label} htmlFor="shiftAlias">
                                                Shift
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <div className="relative w-full">
                                            <Field
                                                disabled
                                                type="text"
                                                name="shiftAlias"
                                                id="shiftAlias"
                                                value={getShiftLabel(initialValues.shiftAlias)} // Set value to pre-populate
                                                onChange={(option: any) => setFieldValue("shiftAlias", option?.value)}
                                                className={`${style.input}`}
                                            />

                                        </div>
                                    </div>

                                    {/* Degree */}
                                    <div className={style.inputContainer}>
                                        <div className="flex">
                                            <label className={style.label} htmlFor="degreeAlias">
                                                Degree
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <div className="relative w-full">
                                            <Field
                                                disabled
                                                type="text"
                                                name="degreeAlias"
                                                id="degreeAlias"
                                                value={getDegreesLabel(initialValues.degreeAlias)} // Set value to pre-populate
                                                onChange={(option: any) => setFieldValue("degreeAlias", option?.value)}
                                                className={`${style.input}`}
                                            />

                                        </div>
                                    </div>

                                    {/* Study Program */}
                                    <div className={style.inputContainer}>
                                        <div className="flex">
                                            <label className={style.label} htmlFor="studyProgramAlias">
                                                Study Program
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <div className="relative w-full">
                                            <Field
                                                disabled
                                                type="text"
                                                name="studyProgramAlias"
                                                id="studyProgramAlias"
                                                value={getStuProLabel(initialValues.studyProgramAlias)} // Set value to pre-populate
                                                onChange={(option: any) => setFieldValue("studyProgramAlias", option?.value)}
                                                className={`${style.input}`}
                                            />
                                        </div>

                                    </div>

                                    {/* biography */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="biography">
                                                Biography
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            as="textarea"
                                            name="biography"
                                            placeholder="ដោយសារខ្ញុំចង់ចឹង teacher , ពេល disabled ចឹងខ្ញុំអោយវា draft  ដែរ, ព្រោះយើងអត់អាច public  degree ដែល disabled"
                                            id="biography"
                                            className={`${style.input}`}
                                        />

                                    </div>

                                </div>

                                <div className="flex justify-end w-full container mx-auto">
                                    <DialogFooter>
                                        <Button
                                            type="submit"
                                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? "Editing..." : "Save Change"}
                                        </Button>
                                    </DialogFooter>
                                </div>

                            </TabsContent>
                        </Tabs>
                    </Form>
                )}
            </Formik>
        </section>
    );
}