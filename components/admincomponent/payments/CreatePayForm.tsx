"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../style.module.css";
import {FiPlus, FiUploadCloud} from "react-icons/fi";
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
import {PaymentType} from "@/lib/types/admin/payments";
import {TbAsterisk} from "react-icons/tb";

const initialValues = {
    id: "0001",
    receipt_id: 0,
    name: "",
    profile_image: "",
    gender: "",
    date: 0,
    discount: 0,
    total_payment: 0,
    balance_due: 0,
    academic_fee: 0,
    payment_method: "",
    status: "",
    remark: "",
    generation: "",
    year: "",
    academic: "",
    degree: "",
    faculty: "",
    major: "",
    class: "",
    shift: "",
};

const validationSchema = Yup.object().shape({
    id: Yup.number(),
    level: Yup.string().required("Required"),
    description: Yup.string().required("Required"),
    create_by: Yup.string().required("Required"),
    status: Yup.string().required("A selection is required"),
});

const handleSubmit = async (value: PaymentType) => {
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
        setImagePreview(localUrl);

        setFieldValue(field.name, file);
    };

    return (
        <div className="w-[420px]">
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
                    <div className="flex  items-center justify-center gap-8">
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

export function CreatePayForm() {
    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Payment
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[910px] bg-white ">

                <DialogHeader>
                    <DialogTitle>Add Payment</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        // create degree post
                        const paymentPost: PaymentType = {
                            receipt_id: values.receipt_id,
                            name: values.name,
                            profile_image: values.profile_image,
                            gender: values.gender,
                            date: values.date,
                            discount: values.discount,
                            total_payment: values.total_payment,
                            balance_due: values.balance_due,
                            academic_fee: values.academic_fee,
                            payment_method: values.payment_method,
                            status: values.status,
                            remark: values.remark,
                            generation: values.gender,
                            year: values.year,
                            academic: values.academic,
                            degree: values.degree,
                            faculty: values.faculty,
                            major: values.major,
                            class: values.class,
                            shift: values.shift,
                            id: values.id,
                        };

                        // post product
                        handleSubmit(paymentPost);
                    }}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-wrap gap-4">
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="name">
                                            Student Name
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="Chan Tola"
                                        name="name"
                                        id="name"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="gender">
                                            Gender
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        name="gender"
                                        placeholder="Female"
                                        id="gender"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="gender"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="academic_fee">
                                            Academic Fee
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="$ 700"
                                        name="academic_fee"
                                        id="academic_fee"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="academic_fee"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="discount">
                                        Discount
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="30 %"
                                        name="discount"
                                        id="discount"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="discount"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="total_payment">
                                            Paid Amount
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="$ 500"
                                        name="total_payment"
                                        id="total_payment"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="total_payment"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="date">
                                            Paid Date
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="date"
                                        placeholder="Feb 25, 2023"
                                        name="date"
                                        id="date"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="date"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="payment_method">
                                            Payment Method
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="Cash Payment"
                                        name="payment_method"
                                        id="payment_method"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="payment_method"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="remark">
                                        Remark
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="About to be fully paid"
                                        name="remark"
                                        id="remark"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="remark"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className="mb-4">
                                    <label
                                        htmlFor="logo"
                                        className="block text-sm font-medium text-gray-700 my-2"
                                    >
                                        Profile Image
                                    </label>
                                    <Field
                                        type="file"
                                        name="logo"
                                        id="logo"
                                        component={CustomInput}
                                        setFieldValue={setFieldValue}
                                        className="mt-1"
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
