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
import {PaymentType} from "@/lib/types/admin/payments";
import {TbAsterisk} from "react-icons/tb";

const initialValues = {
    uuid: '',
    usernameOrEmail: '',
    gender: '',
    discount: 0,
    paidAmount: 0,
    balanceDue: 0,
    courseFee: 0,
    paymentMethod: '',
    status: false,
    remark: '',
    paidDate: '',
    originalPayment: 0,
    totalPayment: 0,
    studentName: '',
    studentProfile: '',
    paidReturn: 0,
    academicFee: 0,
    generation: '',
    degree: '',
    faculty: '',
    academicYear: '',
    studyProgram: '',
    year: 0,
    semester: 0,
    shift: '',
    classCode: '',
};

const validationSchema = Yup.object().shape({
    id: Yup.number(),
    level: Yup.string(),
    description: Yup.string(),
    create_by: Yup.string(),
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

export function EditPayForm() {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>

            <DialogContent className="w-[480px] bg-white ">

                <DialogHeader>
                    <DialogTitle>Edit Payment</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={async (values) => {
                        // create degree post
                        const paymentPost: PaymentType = {
                            uuid: values.uuid,
                            usernameOrEmail: values.usernameOrEmail,
                            gender: values.gender,
                            discount: values.discount,
                            paidAmount: values.paidAmount,
                            balanceDue: values.balanceDue,
                            courseFee: values.courseFee,
                            paymentMethod: values.paymentMethod,
                            status: values.status,
                            remark: values.remark,
                            paidDate: values.paidDate,
                            originalPayment: values.originalPayment,
                            totalPayment: values.totalPayment,
                            studentName: values.studentName,
                            studentProfile: values.studentProfile,
                            paidReturn: values.paidReturn,
                            academicFee: values.academicFee,
                            generation: values.generation,
                            degree: values.degree,
                            faculty: values.faculty,
                            academicYear: values.academicYear,
                            studyProgram: values.studyProgram,
                            year: values.year,
                            semester: values.semester,
                            classCode: values.classCode,
                            shift: values.shift,
                        };

                        // post product
                        handleSubmit(paymentPost);
                    }}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-4">
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="academic_year">
                                            Academic Fee
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="$ 700"
                                        name="academic_year"
                                        id="academic_year"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="academic_year"
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
                            </div>

                            {/* button submit */}
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                >
                                    Save Change
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
