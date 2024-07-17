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

import {DegreeType, FacultyType} from "@/lib/types/admin/faculty";
import {TbAsterisk} from "react-icons/tb";
import {useCreateDegreeMutation, useGetDegreesQuery} from "@/lib/features/admin/faculties/degree/degree";
import React, {useState} from "react";
import slugify from "slugify";
import {toast} from "react-hot-toast";

const initialValues = {
    alias: "",
    level: "",
    description: "",
    numberOfYear: null,
    isDeleted: false,
    isDraft: false
};

const validationSchema = Yup.object().shape({
    alias: Yup.string().required("Alias is required"),
    level: Yup.string().required('Level is required'),
    numberOfYear: Yup.number().required('Number of years is required').positive("Number of years must be positive.").integer(),
    description: Yup.string(),
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
                checked={String(field.value) === value}
            />
            <label className="pl-2" htmlFor={value}>
                {label}
            </label>
        </div>
    );
};

export function CreateDeForm() {
    const [createDegree] = useCreateDegreeMutation();
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const newDegree: DegreeType = {
                alias: values.alias,
                level: values.level,
                description: values.description,
                numberOfYear: values.numberOfYear,
                isDeleted: values.isDeleted,
                isDraft: values.isDraft,
            };

            await createDegree(newDegree).unwrap();
            resetForm();
            setIsOpen(false);
            toast.success('Successfully created!');

        } catch (error) {
            toast.error('Failed to create degree!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add degree
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>

                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Add Degree</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue, isSubmitting}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1 items-center">

                                {/* Degree Level*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="level">
                                            Level
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="text"
                                        placeholder="Associated Degree"
                                        name="level"
                                        id="level"
                                        onChange={(e: any) => {
                                            setFieldValue(
                                                "level",
                                                e.target.value
                                            );
                                            setFieldValue(
                                                "alias",
                                                slugify(e.target.value, {
                                                    lower: true,
                                                })
                                            );
                                        }}
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="level"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Degree Alias*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        disabled
                                        placeholder="associated-degree"
                                        type="text"
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

                                {/* Degree numberOfYear*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="numberOfYear">
                                            Number of Year
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="text"
                                        placeholder="4"
                                        name="numberOfYear"
                                        id="numberOfYear"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="numberOfYear"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Degree Description*/}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        placeholder="This is main degree of Engineering faculty"
                                        id="description"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer} flex w-full justify-between`}>
                                    {/* Visibility */}
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
                                                value="false"
                                                label="Public"
                                            />
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value="true"
                                                label="Draft"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDraft"
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
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Adding...' : 'Add'}
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
