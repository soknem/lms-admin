"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../style.module.css";
import {FiPlus} from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {DegreeType} from "@/lib/types/admin/faculty";
import {useState} from "react";
import Image from "next/image";
import {create} from "domain";
import {AdmissionType} from "@/lib/types/admin/admission";
import {TbAsterisk} from "react-icons/tb";

const initialValues = {
    academic_year: "",
    start_date: "",
    end_date: "",
    telegram_group: "",
    remark: "",
    status: "",
};

const validationSchema = Yup.object().shape({
    academic_year: Yup.string().required("Required"),
    start_dater: Yup.string().required("Required"),
    end_dater: Yup.string().required("Required"),
    status: Yup.string().required("A selection is required"),
});

const handleSubmit = async (value: AdmissionType) => {
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

export function CreateAmsForm() {
    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Admission
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px] bg-white ">

                <DialogHeader>
                    <DialogTitle>Add Admission</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        // create degree post
                        const admissionPost: AdmissionType = {
                            academic_year: values.academic_year,
                            start_date: values.start_date,
                            end_date: values.end_date,
                            telegram_group: values.telegram_group,
                            remark: values.remark,
                            status: values.status,
                        };

                        // post product
                        handleSubmit(admissionPost);
                    }}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-4">
                                {/* Degree Level*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="level">
                                            Academic Year
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="2022-2023"
                                        name="level"
                                        id="level"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="level"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="startYear">
                                            Start Date
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="date"
                                        name="startYear"
                                        id="startYear"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="startYear"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="startYear">
                                            End Date
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="date"
                                        name="startYear"
                                        id="startYear"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="startYear"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="degree">
                                        Remark
                                    </label>
                                    <Field
                                        type="text"
                                        name="degree"
                                        placeholder="this admission for first generation"
                                        id="degree"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="degree"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="degree">
                                        Telegram Group URL
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="https://t.me/admission_group"
                                        name="degree"
                                        id="degree"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="degree"
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
