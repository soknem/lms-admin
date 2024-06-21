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
    DialogTrigger,
} from "@/components/ui/dialog";

import {FacultyType, StudyProgramType} from "@/lib/types/admin/faculty";
import React, {useState} from "react";
import Image from "next/image";
import {FaCamera} from "react-icons/fa6";
import {TbAsterisk} from "react-icons/tb";

const initialValues = {
    alias: "",
    studyProgramName: "",
    logo: "",
    description: "",
    link: "",
    isDeleted: false,
    isDraft: false,
    degree: {
        alias: "",
        level: "",
    },
    faculty: {
        alias: "",
        name: ""
    }
};

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
    id: Yup.number(),
    name: Yup.string(),
    faculty: Yup.string(),
    degree: Yup.string(),
    description: Yup.string(),
    logo: Yup.mixed()
        .test("fileFormat", "Unsupported Format", (value: any) => {
            if (!value) {
                return true;
            }
            return SUPPORTED_FORMATS.includes(value.type);
        })
        .test("fileSize", "File Size is too large", (value: any) => {
            if (!value) {
                true;
            }
            // return value.size <= FILE_SIZE;
        }),
    status: Yup.string(),
});

const handleSubmit = async (value: StudyProgramType) => {
    // const res = await fetch(`https://6656cd809f970b3b36c69232.mockapi.io/api/v1/facultys`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(value),
    // });
    // const data = await res.json()
    // console.log("faculty upload: ", data)
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

const CustomInput = ({field, setFieldValue}: any) => {
    const [imagePreview, setImagePreview] = useState("");

    const handleUploadFile = (e: any) => {
        const file = e.target.files[0];
        const localUrl = URL.createObjectURL(file);
        console.log(localUrl);
        setImagePreview(localUrl);

        setFieldValue(field.name, file);
    };
    return (
        <div>
            <input onChange={(e) => handleUploadFile(e)} type="file"/>
            {imagePreview && (
                <Image src={imagePreview} alt="preview" width={200} height={200}/>
            )}
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

export function EditStudyProForm() {
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[480px] h-[80%] scr overflow-y-auto overflow-x-hidden bg-white ">
                <DialogHeader>
                    <DialogTitle>Edit Study Program</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        // create faculty post
                        const StudyProPost: StudyProgramType = {
                            alias: values.alias,
                            studyProgramName: values.studyProgramName,
                            description: values.description,
                            logo: values.logo,
                            isDeleted: values.isDeleted,
                            isDraft: values.isDraft,
                            degree: {
                                alias: values.degree.alias,
                                level: values.degree.level,
                            },
                            faculty: {
                                alias: values.faculty.alias,
                                name: values.faculty.name
                            }
                        };

                        // post product
                        handleSubmit(StudyProPost);
                    }}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col items-center justify-center gap-2">
                                <div
                                    className={` flex items-center justify-center relative ${style.imageContainer}`}
                                >
                                    <img
                                        src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQV_WWDdA49GHHDYEEbBNohG2RLibKg905IAPMJ_ERnSLfWd5j4"
                                        alt="faculty"
                                        className="w-full h-full rounded-full"
                                    />
                                    <div
                                        className="w-8 h-8 bg-lms-background rounded-full flex items-center justify-center absolute right-0 bottom-1">
                                        <FaCamera/>
                                    </div>
                                </div>

                                {/* study program title*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="title">
                                            Title
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="Information Technology"
                                        name="title"
                                        id="title"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* study program fac */}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="faculty">
                                            Faculty
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="Technology"
                                        name="faculty"
                                        id="faculty"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="faculty"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* study program degree */}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="degree">
                                            Degree
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="Bachelor"
                                        name="degree"
                                        id="degree"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="degree"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* study program Description */}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="This software engineering major prepares students for careers in software engineering by teaching the complete process and methods, including gathering business requirements, designing software architecture, developing software, testing, and managing projects. The curriculum focuses on essential skills like algorithm problem solving and system design. Through project-based learning, students gain industry-level experience early on by working in teams and using the latest tools and technologies. This hands-on approach develops skills in communication, problem-solving, and teamwork. Additionally, a one-year industry placement provides real-world experience. Graduates are ready for roles such as software developer, full-stack developer, DevOps engineer, software architect, and more, with opportunities in various sectors like healthcare, finance, technology, and government."
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
                                    <label className={`${style.label}`} htmlFor="description">
                                        Learning Outcome
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="Upon completion of this program, the students will be able toWork effectively in small groups on medium-scale computing projectsUnderstand the social and ethical implications of working as a professional in the field of computer science"
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
                                    <label className={`${style.label}`} htmlFor="description">
                                        Career Expectation
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="Digital InnovatorIT
Project ManagerData AnalystSoftware Developer (Web, Mobile, Java, API…)"
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
                                    <label className={`${style.label}`} htmlFor="link">
                                        Video Link{" "}
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="https://www.youtube.com/watch?v=7_7g5IHu0rs&list=PL_V2z3lwuCDf3_po8kU0tJBydjOIOzk6U&index=1&t=1s"
                                        name="link"
                                        id="link"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="link"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* status */}
                                <div className={`${style.inputContainer}  `}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="status">
                                            Visibility
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    {/* <Field
                    type="number"
                    name="status"
                    id="status"
                    className={`${style.input}`}
                  />
                  */}

                                    <div className="flex gap-4 h-[40px] items-center">
                                        <Field
                                            name="status"
                                            component={RadioButton}
                                            value="1"
                                            label="Public"
                                        />
                                        <Field
                                            name="status"
                                            component={RadioButton}
                                            value="2"
                                            label="Draft"
                                        />
                                        <Field
                                            name="status"
                                            component={RadioButton}
                                            value="3"
                                            label="Disable"
                                        />
                                    </div>

                                    <ErrorMessage
                                        name="status"
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
