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

import {TbAsterisk} from "react-icons/tb";
import {useCreateAdmissionMutation, useGetAdmissionsQuery} from "@/lib/features/admin/admission-management/admission";
import React, {useState} from "react";
import {AdmissionType} from "@/lib/types/admin/admission";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {useGetAcademicYearsQuery} from "@/lib/features/admin/faculties/acdemicYear-management/academicYear";
import {selectAcademicYear} from "@/lib/features/admin/faculties/acdemicYear-management/academicYearSlice";
import {IoIosArrowDown} from "react-icons/io";
import Select from "react-select";

const initialValues = {
    uuid: "",
    academicYearAlias: "",
    openDate: "",
    endDate: "",
    telegramLink: "",
    remark: "",
    status: 0,
    isDeleted: false,
};

const validationSchema = Yup.object().shape({
    academicYearAlias: Yup.string().required("Academic year is required"),
    openDate: Yup.date().required("Start date is required"),
    endDate: Yup.date().required("End date is required"),
    remark: Yup.string(),
    status: Yup.string(),
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


export function CreateAmsForm() {
    const [createAdmission] = useCreateAdmissionMutation();
    const {refetch: refetchAdms} = useGetAdmissionsQuery({page: 0, pageSize: 10});
    const [isOpen, setIsOpen] = useState(false);

    const academicYears = useSelector((state: RootState) => selectAcademicYear(state));
    const academicYearOption = academicYears.map(academicYear => ({
        value: academicYear.alias,
        label: academicYear.academicYear
    }));

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const newAdmission: AdmissionType = {
                uuid: values.uuid,
                academicYearAlias: values.academicYearAlias,
                openDate: values.openDate,
                endDate: values.endDate,
                telegramLink: values.telegramLink,
                remark: values.remark,
                status: values.status,
                isDeleted: values.isDeleted,
            };

            await createAdmission(newAdmission).unwrap();
            resetForm();
            // Handle success (e.g., show a success message or close the dialog)
            refetchAdms();
            setIsOpen(false);
            // console.log("Update successfully")


        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error creating admission: ", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Admission
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px] bg-white ">

                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Add Admission</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1 items-center">

                                {/*academicYear*/}
                                <div className={style.inputContainer}>

                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="academicYearAlias">Academic
                                            Year
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>


                                    <Select options={academicYearOption}
                                            onChange={(selectedOption) => setFieldValue('academicYearAlias', selectedOption ? selectedOption.value : '')}/>
                                    <ErrorMessage
                                        name="academicYearAlias"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

                                {/*openDate*/}
                                <div className={style.inputContainer}>
                                    <div className="flex">
                                        <label className={style.label} htmlFor="openDate">
                                            Open Date
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="date"
                                        name="openDate"
                                        id="openDate"
                                        className={style.input}
                                    />
                                    <ErrorMessage
                                        name="openDate"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

                                {/*endDate*/}
                                <div className={style.inputContainer}>
                                    <div className="flex">
                                        <label className={style.label} htmlFor="endDate">
                                            End Date
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        className={style.input}
                                    />
                                    <ErrorMessage
                                        name="endDate"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

                                {/*telegramLink*/}
                                <div className={style.inputContainer}>
                                    <label className={style.label} htmlFor="telegramLink">
                                        Telegram Group URL
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="https://t.me/admission_group"
                                        name="telegramLink"
                                        id="telegramLink"
                                        className={style.input}
                                    />
                                    <ErrorMessage
                                        name="telegramLink"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

                                {/*remark*/}
                                <div className={style.inputContainer}>
                                    <label className={style.label} htmlFor="remark">
                                        Remark
                                    </label>
                                    <Field
                                        type="text"
                                        name="remark"
                                        placeholder="This admission is for the first generation"
                                        id="remark"
                                        className={style.input}
                                    />
                                    <ErrorMessage
                                        name="remark"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

                                <div className={`${style.inputContainer} flex w-full justify-between`}>
                                    {/* status */}
                                    <div className={``}>
                                        <div className="flex">
                                            <label className={style.label} htmlFor="status">
                                                Visibility
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="1"
                                                label="Opening"
                                            />
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="2"
                                                label="Closed"
                                            />
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="3"
                                                label="Finish"
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="status"
                                            component="div"
                                            className={style.error}
                                        />
                                    </div>

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