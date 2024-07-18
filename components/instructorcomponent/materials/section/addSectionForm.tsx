"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../style.module.css";
import {FiPlus} from "react-icons/fi";

import React, {useEffect, useState} from "react";
import {TbAsterisk} from "react-icons/tb";
import {SectionType} from "@/lib/types/admin/materials";
import {AppDispatch} from "@/lib/store";
import {useDispatch} from "react-redux";
import {
    useCreateSectionMutation
} from "@/lib/features/admin/materials/subjectMaterialSection/section";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {toast} from "react-hot-toast";
import Select from "react-select";
import {useGetIntsSubjectsQuery} from "@/lib/features/instructor/meterials/meterials";

const initialValues = {
    uuid: '',
    title: '',
    subjectAlias: '',
    materials: '',
    isDeleted: false,
    isDraft: false,
};

const validationSchema = Yup.object().shape({
    title: Yup.string().required('Title is required'),
    subjectAlias: Yup.string().required('Subject Alias is required'),
    isDraft: Yup.boolean().required('Draft status is required'),
});

const customStyles = {
    menu: (provided: any) => ({
        ...provided,
        maxHeight: '200px', // You can adjust the height as needed
    }),
    menuList: (provided: any) => ({
        ...provided,
        maxHeight: '150px', // Ensure this matches the menu height
        overflowY: 'auto', // Adds vertical scroll
    }),
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

export function CreateSectionForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [createSection] = useCreateSectionMutation();
    const [isOpen, setIsOpen] = useState(false);
    const [subjects, setSubjects] = useState([]);

    const {
        data: subjectData,
    } = useGetIntsSubjectsQuery({page: 0, pageSize: 10});

    console.log(subjectData);

    useEffect(() => {
        if (subjectData) {
            const subjectsOption = subjectData?.content?.map((subject: any) => ({
                value: subject.alias,
                label: subject.title
            }));
            setSubjects(subjectsOption);
        }
    }, [subjectData, dispatch]);

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {

            const newSection: SectionType = {
                uuid: values.uuid,
                title: values.title,
                subjectAlias: values.subjectAlias,
                materials: values.materials,
                isDeleted: values.isDeleted,
                isDraft: values.isDraft,
            };

            await createSection(newSection).unwrap();
            toast.success('Successfully created!');
            resetForm();
            setIsOpen(false);


        } catch (error) {
            toast.error('Failed to create section!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Section
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>

                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Add Section</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue, isSubmitting}) => (
                        <Form className="py-4 rounded-lg w-full flex flex-col justify-start gap-4">
                            <div className="flex flex-col gap-3">

                                {/* Section Title*/}
                                <div className={``}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="title">
                                            Section Title
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        placeholder="Enter section title"
                                        type="text"
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

                                {/* Subject*/}
                                <div className={``}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="subjectAlias">
                                            Subject
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Select
                                        name="subjectAlias"
                                        onChange={(option: any) => setFieldValue("subjectAlias", option.value)}
                                        options={subjects}
                                        placeholder="Select subject"
                                        styles={customStyles}
                                    />
                                    <ErrorMessage
                                        name="subjectAlias"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* isDraft */}
                                <div className={`flex w-full justify-between`}>
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
