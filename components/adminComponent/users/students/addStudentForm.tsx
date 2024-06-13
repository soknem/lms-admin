"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "./style.module.css";
import { FiUploadCloud} from "react-icons/fi";

import {useState} from "react";
import Image from "next/image";

import {IoIosArrowDown} from "react-icons/io";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {UserStudentType} from "@/lib/types/admin/user";

const initialValues = {
    card_id: 0,
    email: "",
    name_en: "",
    name_kh: "",
    gender: "",
    dob: "",
    ph_number: "",
    fam_ph_number: "",
    pob: "",
    address: "",
    bio: "",
    status: "",
    high_school: "",
    guaedian_rel: "",
    know_istad: "",
    class_stu: "",
    diploma: "",
    grade: "",
    shift: "",
    degree: "",
    study_pro: "",
};

const validationSchema = Yup.object().shape({
    academic_year: Yup.string().required("Required"),
    start_dater: Yup.string().required("Required"),
    end_dater: Yup.string().required("Required"),
    status: Yup.string().required("A selection is required"),
});

const handleSubmit = async (value: UserStudentType) => {
    // const res = await fetch(`https://6656cd809f970b3b36c69232.mockapi.io/api/v1/degrees`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(value),
    // });
    // const data = await res.json()
    // console.log("degree upload: ", data)
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

// const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

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

// const dateValue = new Date(value);
// const formattedDate = format(dateValue, 'yyyy');
const currentYear = new Date().getFullYear();
const years = Array.from(new Array(40), (val, index) => currentYear - index);

// const CustomSelect = ({ field, form, options } : any ) => (
//   <select {...field}>
//     <option value="" label="Select an option" />
//     {options.map((option) => (
//       <option key={option.value} value={option.value} label={option.label} />
//     ))}
//   </select>
// );
export function AddUserStudentForm() {
    const [activeTab, setActiveTab] = useState("personal_info");
    const handleNext = (currentTab: any) => {
        if (currentTab === "personal_info") {
            setActiveTab("edu_info");
        } else if (currentTab === "edu_info") {
            setActiveTab("school_info");
        }
    };

    return (
        <section
            className="flex flex-grow flex-col gap-6 bg-white border w-[1240px] h-[1350px] 2xl:h-[1020px] items-center-center rounded-[10px]">
            <section className="h-[90px] flex items-center mx-10 ">
                <h1 className="text-3xl font-bold text-lms-black-90">
                    Add Student
                </h1>
            </section>

            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                defaultValue="personal_info"
                className="w-full py-0 my-0 "
            >
                <TabsList className="dark:bg-gray-800 bg-lms-background w-full h-[150px]  rounded-none -px-10 ">
                    <div className="flex justify-between container">
                        <TabsTrigger
                            value="personal_info"
                            className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                        >
                            1
                        </TabsTrigger>
                        {/* <div className="border-l border-lms-primary h-full mx-2"></div> Vertical line */}

                        <TabsTrigger
                            value="edu_info"
                            className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                        >
                            2
                        </TabsTrigger>

                        <TabsTrigger
                            value="school_info"
                            className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
                        >
                            3
                        </TabsTrigger>
                    </div>
                </TabsList>

                {/* Personal Information */}
                <TabsContent value="personal_info">
                    <div className="border-b-2 mx-10  py-6">
                        <h1 className="text-2xl font-bold text-lms-black-90 ">Personal Information</h1>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            // create degree post
                            const studentPost: UserStudentType = {
                                card_id: values.card_id,
                                email: values.email,
                                name_en: values.name_en,
                                name_kh: values.name_en,
                                gender: values.gender,
                                dob: values.dob,
                                ph_number: values.ph_number,
                                fam_ph_number: values.fam_ph_number,
                                pob: values.pob,
                                address: values.address,
                                bio: values.bio,
                                status: values.status,
                                high_school: values.high_school,
                                guaedian_rel: values.guaedian_rel,
                                know_istad: values.know_istad,
                                class_stu: values.class_stu,
                                diploma: values.diploma,
                                grade: values.degree,
                                shift: values.shift,
                                degree: values.degree,
                                study_pro: values.study_pro,
                            };

                            // post product
                            handleSubmit(studentPost);
                        }}
                    >
                        {({setFieldValue}) => (
                            <Form className="py-4 rounded-lg w-full h-[920px] 2xl:h-[605px] flex  justify-center ">
                                <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4 justify-center items-center">
                                    {/*name_en */}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="name_en">
                                            Name ( EN )
                                        </label>
                                        <Field
                                            type="text"
                                            name="name_en"
                                            placeholder="Chan Tola"
                                            id="name_en"
                                            className={`${style.input}`}
                                        />
                                        <ErrorMessage
                                            name="name_en"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/*name_en */}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="name_kh">
                                            Name ( EN )
                                        </label>
                                        <Field
                                            type="text"
                                            name="name_kh"
                                            placeholder="Chan Tola"
                                            id="name_kh"
                                            className={`${style.input}`}
                                        />
                                        <ErrorMessage
                                            name="name_kh"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* formal image */}
                                    <div className={`${style.inputContainer} grid row-span-3`}>
                                        <label className={`${style.label}`} htmlFor="file">
                                            Upload Formal Picture
                                        </label>
                                        <Field
                                            type="file"
                                            name="file"
                                            id="file"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                        />
                                        <ErrorMessage
                                            name="file"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* Gender */}
                                    <div className={style.inputContainer}>
                                        <label className={style.label} htmlFor="gender">
                                            Gender
                                        </label>
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
                                        <label className={`${style.label}`} htmlFor="dob">
                                            Date of Birth
                                        </label>
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
                                        <label className={`${style.label}`} htmlFor="ph_number">
                                            Contact Number
                                        </label>
                                        <Field
                                            type="text"
                                            name="ph_number"
                                            placeholder="+855 12 345 678"
                                            id="ph_number"
                                            className={`${style.input}`}
                                        />
                                        <ErrorMessage
                                            name="ph_number"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* Email */}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="email">
                                            Email
                                        </label>
                                        <Field
                                            type="email"
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
                                        <label className={`${style.label}`} htmlFor="high_school">
                                            High School
                                        </label>
                                        <Field
                                            type="high_school"
                                            name="high_school"
                                            placeholder="  Chea Sim Takeo High School"
                                            id="high_school"
                                            className={`${style.input}`}
                                        />
                                        <ErrorMessage
                                            name="high_school"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* Place of Birth */}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="pob">
                                            Place of Birth
                                        </label>
                                        <Field
                                            type="address"
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
                                        <label className={`${style.label}`} htmlFor="file">
                                            Upload Identity{" "}
                                        </label>
                                        <Field
                                            type="file"
                                            name="file"
                                            id="file"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                        />
                                        <ErrorMessage
                                            name="file"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* Current Address */}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="address">
                                            Current Address
                                        </label>
                                        <Field
                                            type="address"
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
                                        <label className={`${style.label}`} htmlFor="fam_ph_number">
                                            Guardian Contact
                                        </label>
                                        <Field
                                            type="fam_ph_number"
                                            name="fam_ph_number"
                                            placeholder="+855 12 345 678"
                                            id="fam_ph_number"
                                            className={`${style.input}`}
                                        />
                                        <ErrorMessage
                                            name="fam_ph_number"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* Guardian Relationship */}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="guaedian_rel">
                                            Guardian Relationship
                                        </label>
                                        <Field
                                            type="text"
                                            name="guaedian_rel"
                                            placeholder="Mother, Father, Brother..."
                                            id="guaedian_rel"
                                            className={`${style.input}`}
                                        />
                                        <ErrorMessage
                                            name="guaedian_rel"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* Get to know ISTAD through: */}
                                    <div className={`${style.inputContainer}`}>
                                        <label className={`${style.label}`} htmlFor="know_istad">
                                            Get to know ISTAD through:
                                        </label>
                                        <Field
                                            type="text"
                                            name="know_istad"
                                            placeholder="Social Media Announcement "
                                            id="know_istad"
                                            className={`${style.input}`}
                                        />
                                        <ErrorMessage
                                            name="know_istad"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="flex justify-end w-full container">
                        <Button
                            type="submit"
                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                            onClick={() => handleNext(activeTab)}
                        >
                            Next
                        </Button>
                    </div>
                </TabsContent>

                {/* Education Information */}
                <TabsContent value="edu_info" >
                    <div className="border-b-2 mx-10  py-6">
                        <h1 className="text-2xl font-bold text-lms-black-90 ">Education Information</h1>
                    </div>
                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            // create degree post
                            const studentPost: UserStudentType = {
                                card_id: values.card_id,
                                email: values.email,
                                name_en: values.name_en,
                                name_kh: values.name_en,
                                gender: values.gender,
                                dob: values.dob,
                                ph_number: values.ph_number,
                                fam_ph_number: values.fam_ph_number,
                                pob: values.pob,
                                address: values.address,
                                bio: values.bio,
                                status: values.status,
                                high_school: values.high_school,
                                guaedian_rel: values.guaedian_rel,
                                know_istad: values.know_istad,
                                class_stu: values.class_stu,
                                diploma: values.diploma,
                                grade: values.grade,
                                shift: values.shift,
                                degree: values.degree,
                                study_pro: values.study_pro,
                            };

                            // post product
                            handleSubmit(studentPost);
                        }}
                    >
                        {({setFieldValue}) => (
                            <Form className="py-4 rounded-lg w-full  flex  justify-center ">
                                <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4 justify-center items-center">
                                    {/* Class Student */}
                                    <div className={style.inputContainer}>
                                        <label className={style.label} htmlFor="class_stu">
                                            Class Student
                                        </label>
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
                                        <label className={`${style.label}`} htmlFor="diploma">
                                            Diploma Session
                                        </label>
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
                                        <label className={`${style.label}`} htmlFor="grade">
                                            Diploma Grade
                                        </label>
                                        <div className="flex flex-wrap justify-between items-center">
                                            <Field
                                                name="grade"
                                                component={RadioButton}
                                                value="1"
                                                label="A"
                                            />
                                            <Field
                                                name="grade"
                                                component={RadioButton}
                                                value="2"
                                                label="B"
                                            />
                                            <Field
                                                name="grade"
                                                component={RadioButton}
                                                value="3"
                                                label="C"
                                            />
                                            <Field
                                                name="grade"
                                                component={RadioButton}
                                                value="4"
                                                label="D"
                                            />
                                            <Field
                                                name="grade"
                                                component={RadioButton}
                                                value="5"
                                                label="E"
                                            />
                                            <Field
                                                name="grade"
                                                component={RadioButton}
                                                value="6"
                                                label="Other/Wait for result"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="grade"
                                            component={RadioButton}
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    {/* High Certificate */}
                                    <div className={`${style.inputContainer} grid row-span-3`}>
                                        <label className={`${style.label}`} htmlFor="file">
                                            High Certificate
                                        </label>
                                        <Field
                                            type="file"
                                            name="file"
                                            id="file"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
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
                                        />
                                        <ErrorMessage
                                            name="file"
                                            component="div"
                                            className={`${style.error}`}
                                        />
                                    </div>
                                </div>
                            </Form>
                        )}
                    </Formik>
                    <div className="flex justify-end w-full container mx-auto">
                        <Button
                            type="submit"
                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                            onClick={() => handleNext(activeTab)}
                        >
                            Next
                        </Button>
                    </div>
                </TabsContent>

                {/* School Information */}
                <TabsContent value="school_info" >
                    <div className="border-b-2 mx-10  py-6">
                        <h1 className="text-2xl font-bold text-lms-black-90 ">Education Information</h1>
                    </div>

                    <Formik
                        initialValues={initialValues}
                        validationSchema={validationSchema}
                        onSubmit={async (values) => {
                            // create degree post
                            const studentPost: UserStudentType = {
                                card_id: values.card_id,
                                email: values.email,
                                name_en: values.name_en,
                                name_kh: values.name_en,
                                gender: values.gender,
                                dob: values.dob,
                                ph_number: values.ph_number,
                                fam_ph_number: values.fam_ph_number,
                                pob: values.pob,
                                address: values.address,
                                bio: values.bio,
                                status: values.status,
                                high_school: values.high_school,
                                guaedian_rel: values.guaedian_rel,
                                know_istad: values.know_istad,
                                class_stu: values.class_stu,
                                diploma: values.diploma,
                                grade: values.grade,
                                shift: values.shift,
                                degree: values.degree,
                                study_pro: values.study_pro,
                            };

                            // post product
                            handleSubmit(studentPost);
                        }}
                    >
                        {({setFieldValue}) => (
                            <Form className="py-4 rounded-lg w-full flex justify-center ">
                                <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4 justify-center ">
                                    {/* Shift */}
                                    <div className={style.inputContainer}>
                                        <label className={style.label} htmlFor="shift">
                                            Shift
                                        </label>
                                        <div className="relative w-full">
                                            <Field
                                                as="select"
                                                name="shift"
                                                id="shift"
                                                className={`${style.input} appearance-none`}
                                            >
                                                <option value="" disabled hidden>
                                                    Shift
                                                </option>
                                                <option value="Morning">Morning</option>
                                                <option value="Afternoon">Afternoon</option>
                                                <option value="Evening">Evening</option>
                                                <option value="Weekend">Weekend</option>
                                            </Field>
                                            <ErrorMessage
                                                name="shift"
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
                                        <label className={style.label} htmlFor="degree">
                                            Degree
                                        </label>
                                        <div className="relative w-full">
                                            <Field
                                                as="select"
                                                name="degree"
                                                id="degree"
                                                className={`${style.input} appearance-none`}
                                            >
                                                <option value="" disabled hidden>
                                                    Degree
                                                </option>

                                                <option value="Associated Degree">
                                                    Associated Degree
                                                </option>
                                                <option value="Bachelor Degree">Bachelor Degree</option>
                                                <option value="Master Degree">Master Degree</option>
                                                <option value="Ph.D Degree">Ph.D Degree</option>
                                            </Field>
                                            <ErrorMessage
                                                name="degree"
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
                                        <label className={style.label} htmlFor="study_pro">
                                            Study Program
                                        </label>
                                        <div className="relative w-full">
                                            <Field
                                                as="select"
                                                name="study_pro"
                                                id="study_pro"
                                                className={`${style.input} appearance-none`}
                                            >
                                                <option value="" disabled hidden>
                                                    Study Program
                                                </option>
                                                <option value="Spring Framework">Spring Framework</option>
                                                <option value="Web Design">Web Design</option>
                                                <option value="C++ Programming">C++ Programming</option>
                                            </Field>
                                            <ErrorMessage
                                                name="study_pro"
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
                            </Form>
                        )}
                    </Formik>

                    <div className="flex justify-end w-full container">
                        <Button
                            type="submit"
                            className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                            onClick={() => handleNext(activeTab)}
                        >
                            Register
                        </Button>
                    </div>
                </TabsContent>
            </Tabs>
        </section>
    );
}
