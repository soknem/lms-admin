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

export function ViewPayForm() {
    const [open, setOpen] = useState(true);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[1350px] bg-white ">
                <DialogHeader>
                    <DialogTitle>Payment Information</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    onSubmit={() => {
                    }}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full flex flex-col justify-center items-center">
                            <div className="flex items-center justify-center relative w-[150px] h-[150px] rounded-full">
                                <img
                                    src="https://w7.pngwing.com/pngs/615/209/png-transparent-graphy-student-students-class-photography-people-thumbnail.png"
                                    alt="faculty"
                                    className="w-full h-full rounded-full"
                                />
                            </div>
                            <div className="flex flex-wrap gap-4">
                                <div className={` ${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="receipt_id">
                                        Receipt ID
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="Chan Tola"
                                        name="receipt_id"
                                        id="receipt_id"
                                        className={` ${style.input}`}
                                    />
                                </div>

                                <div className={` ${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="name">
                                        Student Name
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="Chan Tola"
                                        name="name"
                                        id="name"
                                        className={` ${style.input}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="gender">
                                        Gender
                                    </label>
                                    <Field
                                        type="text"
                                        name="gender"
                                        placeholder="Female"
                                        id="gender"
                                        className={`${style.input}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="academic_fee">
                                        Academic Fee
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="$ 700"
                                        name="academic_fee"
                                        id="academic_fee"
                                        className={`${style.input}`}
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
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="total_payment">
                                        Paid Amount
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="$ 500"
                                        name="total_payment"
                                        id="total_payment"
                                        className={`${style.input}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="balance_due">
                                        Balance Due
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="Feb 25, 2023"
                                        name="balance_due"
                                        id="balance_due"
                                        className={`${style.input}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="date">
                                        Paid Date
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="Feb 25, 2023"
                                        name="date"
                                        id="date"
                                        className={`${style.input}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="payment_method">
                                        Payment Method
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="Cash Payment"
                                        name="payment_method"
                                        id="payment_method"
                                        className={`${style.input}`}
                                    />
                                </div>

                                {/* status */}
                                <div className={`${style.inputContainer}  `}>
                                    <label className={`${style.label}`} htmlFor="status">
                                        Visibility
                                    </label>
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
                                            label="paid"
                                        />
                                        <Field
                                            name="status"
                                            component={RadioButton}
                                            value="2"
                                            label="Unpaid"
                                        />
                                    </div>
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
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
