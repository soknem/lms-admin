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

import React, {useState} from "react";
import Image from "next/image";
import {PaymentType} from "@/lib/types/admin/payments";
import {TbAsterisk} from "react-icons/tb";
import {useCreatePaymentMutation, useGetPaymentsQuery} from "@/lib/features/admin/payment-management/payment";
import {toast} from "react-hot-toast";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {selectFaculty} from "@/lib/features/admin/faculties/faculty/facultySlice";
import {selectDegree} from "@/lib/features/admin/faculties/degree/degreeSlice";
import {useGetStudentQuery} from "@/lib/features/admin/user-management/student/student";
import Select from "react-select";
import {selectStudyProgram} from "@/lib/features/admin/faculties/studyProgram/studyProgramSlice";

const initialValues = {
    receiptId: '',
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
    classCode: '',
    shift: '',
};

const validationSchema = Yup.object().shape({
    usernameOrEmail: Yup.string().required("Required"),
    academicFee: Yup.number().required("Required"),
    year: Yup.string().required("Required"),
    semester: Yup.string().required("Required"),
    degree: Yup.string().required("Required"),
    faculty: Yup.string().required("Required"),
    studyProgram: Yup.string().required("Required"),
    discount: Yup.number().required("Required"),
    paidAmount: Yup.number().required("Required"),
    paidDate: Yup.date().required("Required"),
    paymentMethod: Yup.string().required("Required"),
    remark: Yup.string(),
});

export function CreatePayForm() {

    const [createPayment] = useCreatePaymentMutation();
    const {refetch: refetchPayment} = useGetPaymentsQuery({page: 0, pageSize: 10});
    const [isOpen, setIsOpen] = useState(false);

    const {
        data: studentData,
        error: studentError,
        isLoading: studentLoading,
        isSuccess: isStudentSuccess
    } = useGetStudentQuery({page: 0, pageSize: 10});

    let stuData = [];

    if (isStudentSuccess) {
        stuData = studentData.content;
        console.log("student data: ", stuData)
    }

    const faculties = useSelector((state: RootState) => selectFaculty(state));
    const degrees = useSelector((state: RootState) => selectDegree(state));
    const studyPrograms = useSelector((state: RootState) => selectStudyProgram(state));

    const degreeOptions = degrees.map(degree => ({
        value: degree.alias,
        label: degree.level
    }));

    const facultyOptions = faculties.map(faculty => ({
        value: faculty.alias,
        label: faculty.name
    }));

    const studentOptions = stuData.map((student: any) => ({
        value: student.email,
        label: student.email
    }));

    const yearOptions = [
        {value: 1, label: 'Foundation Year'},
        {value: 2, label: 'Second Year'},
        {value: 3, label: 'Third Year'},
        {value: 4, label: 'Fourth Year'}
    ]

    const semesterOptions = [
        {value: 1, label: 'Semester 1'},
        {value: 2, label: 'Semester 2'},
    ]

    const studyProgramOption = studyPrograms.map((stuPro: any) => ({
        value: stuPro.alias,
        label: stuPro.studyProgramName
    }));

    const paymentMethodOption = [
        {value: "bank", label: 'Bank Transfer'},
        {value: "cash", label: 'Cash Payment'},
    ]


    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            // File uploaded successfully, now create the faculty
            const newPayment: PaymentType = {
                receiptId: values.receiptId,
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

            console.log("New payment", newPayment)

            await createPayment(newPayment).unwrap();
            toast.success('Successfully created!');
            resetForm();
            refetchPayment();
            setIsOpen(false);

        } catch (error) {
            console.error("Error creating faculty: ", error);
            toast.error('Failed to create Payment!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Payment
                </Button>
            </DialogTrigger>
            <DialogContent className="w-[910px] bg-white">
                <DialogHeader>
                    <DialogTitle>Add Payment</DialogTitle>
                </DialogHeader>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue, values}) => (
                        <Form className="py-4 rounded-lg w-full">

                            <div className="flex items-center justify-center flex-wrap gap-y-0 gap-x-2">
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="usernameOrEmail">Student</label>
                                    </div>
                                    <Select
                                        options={studentOptions}
                                        name="usernameOrEmail"
                                        onChange={(option: any) => setFieldValue("usernameOrEmail", option.value)}
                                    />
                                    <ErrorMessage name="usernameOrEmail" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="academicFee">
                                            Academic Fee
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="number"
                                        placeholder="$ 600"
                                        name="academicFee"
                                        id="academicFee"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage name="academicFee" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="year">
                                            Year
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Select
                                        options={yearOptions}
                                        name="year"
                                        onChange={(option: any) => setFieldValue("year", option.value)}
                                    />
                                    <ErrorMessage name="year" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="semester">
                                            Semester
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Select
                                        options={semesterOptions}
                                        name="semester"
                                        onChange={(option: any) => setFieldValue("semester", option.value)}
                                    />
                                    <ErrorMessage name="semester" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="faculty">Faculty</label>
                                    </div>
                                    <Select
                                        options={facultyOptions}
                                        name="faculty"
                                        onChange={(option: any) => setFieldValue("faculty", option.value)}
                                    />
                                    <ErrorMessage name="faculty" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="degree">Degree</label>
                                    </div>
                                    <Select
                                        options={degreeOptions}
                                        name="degree"
                                        onChange={(option: any) => setFieldValue("degree", option.value)}
                                    />
                                    <ErrorMessage name="degree" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="studyProgram">Study Program</label>
                                    </div>
                                    <Select
                                        options={studyProgramOption}
                                        name="studyProgram"
                                        onChange={(option: any) => setFieldValue("studyProgram", option.value)}
                                    />
                                    <ErrorMessage name="studyProgram" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="discount">
                                            Discount
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="number"
                                        placeholder="$ 100"
                                        name="discount"
                                        id="discount"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage name="discount" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="paidAmount">
                                            Paid Amount
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="number"
                                        placeholder="$ 500"
                                        name="paidAmount"
                                        id="paidAmount"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage name="paidAmount" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="paidDate">
                                            Paid Date
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="date"
                                        name="paidDate"
                                        id="paidDate"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage name="paidDate" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="paymentMethod">Payment
                                            Method</label>
                                    </div>
                                    <Select
                                        options={paymentMethodOption}
                                        name="paymentMethod"
                                        onChange={(option: any) => setFieldValue("paymentMethod", option.value)}
                                    />
                                    <ErrorMessage name="paymentMethod" component="div" className={`${style.error}`}/>
                                </div>

                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="remark">
                                            Remark
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="text"
                                        placeholder="Remark"
                                        name="remark"
                                        id="remark"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage name="remark" component="div" className={`${style.error}`}/>
                                </div>
                            </div>

                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="bg-lms-primary text-white hover:bg-lms-primary"
                                >
                                    <FiUploadCloud className="mr-2 h-4 w-4"/>
                                    Submit
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
