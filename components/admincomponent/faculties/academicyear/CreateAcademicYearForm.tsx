"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../../style.module.css";
import {FiPlus} from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {AcademicYearType, DegreeType} from "@/lib/types/admin/faculty";
import {TbAsterisk} from "react-icons/tb";
import {
    useCreateAcademicYearMutation,
    useGetAcademicYearsQuery
} from "@/lib/features/admin/faculties/acdemicYear-management/academicYear";
import React, {useState} from "react";

const initialValues = {
    alias: "",
    academicYear: "",
    status: 0,
    isDeleted: false,
    isDraft: false
};

const validationSchema = Yup.object().shape({
    alias: Yup.string()
        .required("Alias is required")
        .matches(/^\d{4}-\d{4}$/, "Slug must be in the format year-year (e.g., 2020-2021)"),
    academicYear: Yup.string().required('Academic Year is required'),
    status: Yup.string().required('Status is required'),
    isDeleted: Yup.boolean().required('Please specify if the degree is deleted'),
    isDraft: Yup.boolean().required('Please specify if the degree is a draft'),
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

export function CreateAcademicYearForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [createAcademicYear] = useCreateAcademicYearMutation();
    const {refetch: refetchAcademicYear} = useGetAcademicYearsQuery({page: 0, pageSize: 10});

    const handleSubmit = async (values: AcademicYearType, createAcademicYear: any) => {
        try {
            const response = await createAcademicYear(values).unwrap();
            console.log('Academic Year created successfully:', response);
            // Optionally, reset the form or close the dialog here
            // Handle success (e.g., show a success message or close the dialog)
            refetchAcademicYear();
            setIsOpen(false);
        } catch (error) {
            console.error('Failed to create Academic Year :', error);
        }
    };


    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
                <Button className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Academic Year
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>

                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Add Academic Year</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values, createAcademicYear)}
                >
                    {() => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1">

                                {/* academicYear*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="academicYear">
                                            Academic Year
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="text"
                                        placeholder="academicYear"
                                        name="academicYear"
                                        id="academicYear"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="academicYear"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Academic Year Alias*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="text"
                                        placeholder="Associated Degree"
                                        name="alias"
                                        id="alias"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="alias"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`flex w-full justify-between flex-wrap space-y-2`}>

                                    {/* isDraft */}
                                    <div className={``}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="isDraft">
                                                Visibility
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value="true"
                                                label="Public"
                                            />
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value="false"
                                                label="Draft"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDraft"
                                            component={RadioButton}
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    <div className={``}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="status">
                                                Starting
                                            </label>
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="1"
                                                label="Starting"
                                            />
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="2"
                                                label="Ended"
                                            />
                                            <Field
                                                name="status"
                                                component={RadioButton}
                                                value="3"
                                                label="Achieved"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDeleted"
                                            component={RadioButton}
                                            className={`${style.error}`}
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
