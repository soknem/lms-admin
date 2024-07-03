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
import {TbAsterisk} from "react-icons/tb";
import {StudentAdmissionType} from "@/lib/types/admin/admission";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {
    useCreateStudentAdmissionMutation, useGetStuAdmissionsQuery
} from "@/lib/features/admin/admission-management/students-admission-management/stuAdmission";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetShiftsQuery} from "@/lib/features/admin/faculties/shift/shift";
import {selectShift, setShifts} from "@/lib/features/admin/faculties/shift/shiftSlice";
import {selectDegree} from "@/lib/features/admin/faculties/degree/degreeSlice";
import {useGetDegreesQuery} from "@/lib/features/admin/faculties/degree/degree";
import {useGetStudyProgramsQuery} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {selectStudyProgram} from "@/lib/features/admin/faculties/studyProgram/studyProgramSlice";
import {
    selectError,
    selectFaculty,
    selectLoading,
    setFaculties
} from "@/lib/features/admin/faculties/faculty/facultySlice";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculties/faculty/faculty";

const initialValues = {
    uuid: "",
    nameEn: "",
    nameKh: "",
    email: "",
    highSchool: "",
    phoneNumber: "",
    dob: "",
    birthPlace: "",
    bacIiGrade: "",
    gender: "",
    avatar: "",
    address: "",
    guardianContact: "",
    guardianRelationShip: "",
    knownIstad: "",
    identity: "",
    biography: "",
    isDeleted: false,
    shift: "",
    studyProgram: "",
    degree: "",
    admission: ""
};

const validationSchema = Yup.object().shape({
    nameEn: Yup.string().required("Name is required"),
    nameKh: Yup.string().required("Name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    highSchool: Yup.string().required("High School is required"),
    phoneNumber: Yup.string().required("Phone Number is required"),
    dob: Yup.string().required("Date of Birth is required"),
    birthPlace: Yup.string().required("Place of Birth is required"),
    bacIiGrade: Yup.string().required("Bac II Grade"),
});

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

const useFetchData = (queryHook: any, selector: any, action: any) => {
    const dispatch = useDispatch<AppDispatch>();
    const {data, error, isLoading} = queryHook({page: 0, pageSize: 10});
    const stateData = useSelector((state: RootState) => selector(state));
    const loading = useSelector(selectLoading);
    const err = useSelector(selectError);

    useEffect(() => {
        if (data) {
            dispatch(action(data.content));
        }
    }, [data, err, dispatch]);

    return {stateData, loading, error};
};

export function AddStudentAmsForm() {
    const [createSingleFile] = useCreateSingleFileMutation();
    const [createStuAdmission] = useCreateStudentAdmissionMutation();
    const {refetch: refetchStuAdmissions} = useGetStuAdmissionsQuery({page: 0, pageSize: 10});
    const [activeTab, setActiveTab] = useState("personal_info");
    const [uploadedFile, setUploadedFile] = useState(null);
    const [uploadedFileIdentity, setUploadedFileIdentity] = useState(null);

    const shifts = useFetchData(useGetShiftsQuery, selectShift, setShifts);

    const {
        data: StudyProgramData,
    } = useGetStudyProgramsQuery({page: 0, pageSize: 10});
    const studyPrograms = useSelector((state: RootState) => selectStudyProgram(state));

    const {
        data: degreesData,
    } = useGetDegreesQuery({page: 0, pageSize: 10});
    const degrees = useSelector((state: RootState) => selectDegree(state));

    const handleNext = (currentTab: any) => {
        if (currentTab === "personal_info") {
            setActiveTab("edu_info");
        } else if (currentTab === "edu_info") {
            setActiveTab("school_info");
        }
    };

    const CustomInput = ({field, form: {setFieldValue}}: any) => {
        const [imagePreview, setImagePreview] = useState("");

        useEffect(() => {
            if (uploadedFile) {
                setImagePreview(URL.createObjectURL(uploadedFile));
            }
        }, [uploadedFile]);

        const handleUploadFile = (e: any) => {
            const file = e.target.files[0];
            const localUrl = URL.createObjectURL(file);
            setImagePreview(localUrl);
            setUploadedFile(file); // Update the file at the form level
            setFieldValue(field.name, file); // Set the field value in Formik
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
                        <img
                            src={imagePreview}
                            alt="preview"
                            className="object-cover h-full w-full"
                        />
                    )}
                </label>
            </div>
        );
    };

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            // Upload the logo file
            const avatarData = new FormData();
            avatarData.append("file", values.avatar);
            const avatarResponse = await createSingleFile(avatarData).unwrap();

            // Upload identity file
            const identityData = new FormData();
            identityData.append("file", values.identity);
            const identityResponse = await createSingleFile(identityData).unwrap();


            // File uploaded successfully, now create the faculty
            const newStuAdmission: StudentAdmissionType = {
                nameEn: values.nameEn,
                nameKh: values.nameKh,
                email: values.email,
                highSchool: values.highSchool,
                phoneNumber: values.phoneNumber,
                dob: values.dob,
                birthPlace: values.birthPlace,
                bacIiGrade: values.bacIiGrade,
                studyProgram: values.studyProgram,
                degree: values.degree,
                admission: values.admission,
                shift: values.shift,
                avatar: avatarResponse.name,
                address: values.address,
                biography: values.biography,
                gender: values.gender,
                guardianContact: values.guardianContact,
                guardianRelationShip: values.guardianRelationShip,
                knownIstad: values.knownIstad,
                identity: identityResponse.name,
                isDeleted: values.isDeleted,
                uuid: values.uuid,
            }
            const res = await createStuAdmission(newStuAdmission).unwrap();
            resetForm();
            refetchStuAdmissions();
            console.log("Update successfully")
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error creating faculty: ", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <section
            className="flex flex-grow flex-col gap-6 bg-white border w-[1240px] items-center-center rounded-[10px]">

            <section className="h-[90px] flex items-center mx-10 ">
                <h1 className="text-3xl font-bold text-lms-black-90">Student Admission</h1>
            </section>

            <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
                {({setFieldValue}) => (
                    <Form className="py-4 rounded-lg w-full flex justify-center items-center">

                        <Tabs value={activeTab} onValueChange={setActiveTab} defaultValue="personal_info"
                              className="w-full py-0 my-0">

                            <TabsList
                                className="dark:bg-gray-800 bg-lms-background w-full h-[150px]  rounded-none px-10 ">

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
                                         className={`flex justify-center h-full items-center flex-col gap-9 mx-10  py-0 my-0`}>

                                {/* Personal Information Form Fields */}
                                <div className="w-full border-b-2 py-6">
                                    <h1 className="text-2xl font-bold text-lms-black-90 ">Personal Information</h1>
                                </div>

                                {/* Add your form fields for personal information here */}
                                <div className="grid grid-cols-2 2xl:grid-cols-3 gap-x-9 justify-center items-center">

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
                                        <ErrorMessage
                                            name="nameEn"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/*name KH */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="nameKh">
                                                Name ( EN )
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="nameKh"
                                            placeholder="Chan Tola"
                                            id="nameKh"
                                            className={`${style.input}`}
                                        />
                                        <ErrorMessage
                                            name="nameKh"
                                            component="div"
                                            className={`${style.error}`}
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
                                            type="file"
                                            name="avatar"
                                            id="avatar"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                            uploadedFile={uploadedFile}
                                            setUploadedFile={setUploadedFile}
                                        />
                                        <ErrorMessage
                                            name="avatar"
                                            component="div"
                                            className={`${style.error}`}
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
                                            <ErrorMessage
                                                name="gender"
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
                                        <ErrorMessage
                                            name="dob"
                                            component="div"
                                            className={`${style.error}`}
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
                                        <ErrorMessage
                                            name="phoneNumber"
                                            component="div"
                                            className={`${style.error}`}
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
                                        <ErrorMessage
                                            name="email"
                                            component="div"
                                            className={`${style.error}`}
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
                                        <ErrorMessage
                                            name="highSchool"
                                            component="div"
                                            className={`${style.error}`}
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
                                        <ErrorMessage
                                            name="pob"
                                            component="div"
                                            className={`${style.error}`}
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
                                            type="file"
                                            name="identity"
                                            id="identity"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                            uploadedFile={uploadedFileIdentity}
                                            setUploadedFile={setUploadedFileIdentity}
                                        />
                                        <ErrorMessage
                                            name="identity"
                                            component="div"
                                            className={`${style.error}`}
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
                                        <ErrorMessage
                                            name="address"
                                            component="div"
                                            className={`${style.error}`}
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
                                        <ErrorMessage
                                            name="guardianContact"
                                            component="div"
                                            className={`${style.error}`}
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
                                        <ErrorMessage
                                            name="guardianRelationShip"
                                            component="div"
                                            className={`${style.error}`}
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
                                        <ErrorMessage
                                            name="knownIstad"
                                            component="div"
                                            className={`${style.error}`}
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
                                            <label className={style.label} htmlFor="class_stu">
                                                Class Student
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <div className="relative w-full">
                                            <Field
                                                as="select"
                                                name="class_stu"
                                                id="class_stu"
                                                className={`${style.input} appearance-none`}
                                            >
                                                <option value="" disabled hidden>
                                                    Class Student
                                                </option>
                                                <option value="Male">Science Class</option>
                                                <option value="Female">Social Science Class</option>
                                            </Field>
                                            <ErrorMessage
                                                name="class_stu"
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

                                    {/*Diploma Session */}
                                    <div className={`${style.inputContainer}`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="diploma">
                                                Diploma Session
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="text"
                                            name="diploma"
                                            placeholder="2023-2024"
                                            id="diploma"
                                            className={`${style.input}`}
                                        />
                                        <ErrorMessage
                                            name="diploma"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* Grade */}
                                    <div className={`${style.inputContainer}  grid col-span-2 2xl:col-span-1`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="bacIiGrade">
                                                Diploma Grade
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <div className="flex flex-wrap justify-between items-center">
                                            <Field
                                                name="bacIiGrade"
                                                component={RadioButton}
                                                value="1"
                                                label="A"
                                            />
                                            <Field
                                                name="bacIiGrade"
                                                component={RadioButton}
                                                value="2"
                                                label="B"
                                            />
                                            <Field
                                                name="bacIiGrade"
                                                component={RadioButton}
                                                value="3"
                                                label="C"
                                            />
                                            <Field
                                                name="bacIiGrade"
                                                component={RadioButton}
                                                value="4"
                                                label="D"
                                            />
                                            <Field
                                                name="bacIiGrade"
                                                component={RadioButton}
                                                value="5"
                                                label="E"
                                            />
                                            <Field
                                                name="bacIiGrade"
                                                component={RadioButton}
                                                value="6"
                                                label="Other/Wait for result"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="bacIiGrade"
                                            component={RadioButton}
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* High Certificate */}
                                    <div className={`${style.inputContainer} grid row-span-3`}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="file">
                                                High Certificate
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <Field
                                            type="file"
                                            name="file"
                                            id="file"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                            uploadedFile={uploadedFile}
                                            setUploadedFile={setUploadedFile}
                                        />
                                        <ErrorMessage
                                            name="file"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* Vocation Training III Certificate */}
                                    <div className={`${style.inputContainer} grid row-span-3`}>
                                        <label className={`${style.label}`} htmlFor="file">
                                            Vocation Training III Certificate
                                        </label>
                                        <Field
                                            type="file"
                                            name="file"
                                            id="file"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                            uploadedFile={uploadedFile}
                                            setUploadedFile={setUploadedFile}
                                        />
                                        <ErrorMessage
                                            name="file"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* Any Valuable Certificate */}
                                    <div className={`${style.inputContainer} grid row-span-3`}>
                                        <label className={`${style.label}`} htmlFor="file">
                                            Any Valuable Certificate
                                        </label>
                                        <Field
                                            type="file"
                                            name="file"
                                            id="file"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                            uploadedFile={uploadedFile}
                                            setUploadedFile={setUploadedFile}
                                        />
                                        <ErrorMessage
                                            name="file"
                                            component="div"
                                            className={`${style.error}`}
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
                                            <Field as="select" name="shiftAlias" id="shiftAlias"
                                                   className={`${style.input} appearance-none`}>
                                                <option value="" label="Select Shift"/>
                                                {Array.isArray(shifts) && shifts.map(shift => (
                                                    <option key={shift.alias} value={shift.alias} label={shift.alias}/>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                name="shiftAlias"
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

                                    {/* Degree */}
                                    <div className={style.inputContainer}>
                                        <div className="flex">
                                            <label className={style.label} htmlFor="degreeAlias">
                                                Degree
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <div className="relative w-full">
                                            <Field as="select" name="facultyAlias" id="degreeAlias"
                                                   className={`${style.input} appearance-none`}>
                                                <option value="" label="Select Degree"/>
                                                {Array.isArray(degrees) && degrees.map(degree => (
                                                    <option key={degree.alias} value={degree.alias}
                                                            label={degree.alias}/>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                name="degreeAlias"
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

                                    {/* Study Program */}
                                    <div className={style.inputContainer}>
                                        <div className="flex">
                                            <label className={style.label} htmlFor="studyProgramAlias">
                                                Study Program
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>

                                        <div className="relative w-full">
                                            <Field as="select" name="studyProgramAlias" id="studyProgramAlias"
                                                   className={`${style.input} appearance-none`}>
                                                <option value="" label="Select Study Program"/>
                                                {Array.isArray(studyPrograms) && studyPrograms.map(studyProgram => (
                                                    <option key={studyProgram.alias} value={studyProgram.alias}
                                                            label={studyProgram.alias}/>
                                                ))}
                                            </Field>
                                            <ErrorMessage
                                                name="studyProgramAlias"
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

                                </div>

                                <div className="flex justify-end w-full container mx-auto">
                                    <Button type="submit"
                                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary">
                                        Register
                                    </Button>
                                </div>

                            </TabsContent>
                        </Tabs>
                    </Form>
                )}
            </Formik>
        </section>
    );
}