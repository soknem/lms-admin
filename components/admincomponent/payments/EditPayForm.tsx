"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../style.module.css";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import React, {useEffect, useState} from "react";
import Image from "next/image";
import {PaymentType} from "@/lib/types/admin/payments";
import {TbAsterisk} from "react-icons/tb";
import {useEditPaymentByUuidMutation, useGetPaymentByUuidQuery} from "@/lib/features/admin/payment-management/payment";
import {toast} from "react-hot-toast";
import Select from "react-select";

const validationSchema = Yup.object().shape({});

export function EditPayForm({uuid, onClose}: { uuid: string; onClose: () => void }) {
    const [editPayment] = useEditPaymentByUuidMutation();
    const {data: paymentData, isSuccess} = useGetPaymentByUuidQuery(uuid);
    const [initialAlias, setInitialAlias] = useState("");
    const [initialValues, setInitialValues] = useState({
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
    });

    useEffect(() => {
        if (isSuccess && paymentData) {
            setInitialValues({
                receiptId: paymentData.receiptId,
                uuid: paymentData.uuid,
                usernameOrEmail: paymentData.usernameOrEmail,
                gender: paymentData.gender,
                discount: paymentData.discount,
                paidAmount: paymentData.paidAmount,
                balanceDue: paymentData.balanceDue,
                courseFee: paymentData.courseFee,
                paymentMethod: paymentData.paymentMethod,
                status: paymentData.status,
                remark: paymentData.remark,
                paidDate: paymentData.paidDate,
                originalPayment: paymentData.originalPayment,
                totalPayment: paymentData.totalPayment,
                studentName: paymentData.studentName,
                studentProfile: paymentData.studentProfile,
                paidReturn: paymentData.paidReturn,
                academicFee: paymentData.academicFee,
                generation: paymentData.generation,
                degree: paymentData.degree,
                faculty: paymentData.faculty,
                academicYear: paymentData.academicYear,
                studyProgram: paymentData.studyProgram,
                year: paymentData.year,
                semester: paymentData.semester,
                classCode: paymentData.classCode,
                shift: paymentData.shift,
            });
            setInitialAlias(paymentData.uuid);
        }
    }, [isSuccess, paymentData]);

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const editPaymentByUuid: PaymentType = {
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

            await editPayment({uuid: initialAlias, updatedData: editPaymentByUuid}).unwrap();

            // Now update the alias if it has changed
            if (values.uuid !== initialAlias) {
                await editPayment({
                    uuid: values.uuid,
                    updatedData: {...editPayment, uuid: values.uuid,}
                }).unwrap();
            }

            resetForm();
            onClose();
            toast.success('Successfully updated!');

        } catch (error) {
            console.error("Error updating degree: ", error);
            toast.error('Failed to edit degree!');

        } finally {
            setSubmitting(false);
        }
    };

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
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex items-center justify-center flex-wrap gap-y-0 gap-x-2">


                                {/*<div className={`${style.inputContainer}`}>*/}
                                {/*    <div className="flex">*/}
                                {/*        <label className={`${style.label}`} htmlFor="year">*/}
                                {/*            Year*/}
                                {/*        </label>*/}
                                {/*        <TbAsterisk className='w-2 h-2 text-lms-error'/>*/}
                                {/*    </div>*/}
                                {/*    <Select*/}
                                {/*        options={yearOptions}*/}
                                {/*        name="year"*/}
                                {/*        onChange={(option: any) => setFieldValue("year", option.value)}*/}
                                {/*    />*/}
                                {/*    <ErrorMessage name="year" component="div" className={`${style.error}`}/>*/}
                                {/*</div>*/}

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

                                {/*<div className={`${style.inputContainer}`}>*/}
                                {/*    <div className="flex">*/}
                                {/*        <label className={`${style.label}`} htmlFor="faculty">Faculty</label>*/}
                                {/*    </div>*/}
                                {/*    <Select*/}
                                {/*        options={facultyOptions}*/}
                                {/*        name="faculty"*/}
                                {/*        onChange={(option: any) => setFieldValue("faculty", option.value)}*/}
                                {/*    />*/}
                                {/*    <ErrorMessage name="faculty" component="div" className={`${style.error}`}/>*/}
                                {/*</div>*/}


                                {/*<div className={`${style.inputContainer}`}>*/}
                                {/*    <div className="flex">*/}
                                {/*        <label className={`${style.label}`} htmlFor="studyProgram">Study Program</label>*/}
                                {/*    </div>*/}
                                {/*    <Select*/}
                                {/*        options={studyProgramOption}*/}
                                {/*        name="studyProgram"*/}
                                {/*        onChange={(option: any) => setFieldValue("studyProgram", option.value)}*/}
                                {/*    />*/}
                                {/*    <ErrorMessage name="studyProgram" component="div" className={`${style.error}`}/>*/}
                                {/*</div>*/}

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

                                {/*<div className={`${style.inputContainer}`}>*/}
                                {/*    <div className="flex">*/}
                                {/*        <label className={`${style.label}`} htmlFor="paymentMethod">Payment*/}
                                {/*            Method</label>*/}
                                {/*    </div>*/}
                                {/*    <Select*/}
                                {/*        options={paymentMethodOption}*/}
                                {/*        name="paymentMethod"*/}
                                {/*        onChange={(option: any) => setFieldValue("paymentMethod", option.value)}*/}
                                {/*    />*/}
                                {/*    <ErrorMessage name="paymentMethod" component="div" className={`${style.error}`}/>*/}
                                {/*</div>*/}

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
