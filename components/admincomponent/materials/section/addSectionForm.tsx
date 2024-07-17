"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../style.module.css";
import {FiPlus} from "react-icons/fi";

import React, {useEffect, useState} from "react";
import {TbAsterisk} from "react-icons/tb";
import {SectionType} from "@/lib/types/admin/materials";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetSubjectsQuery} from "@/lib/features/admin/faculties/subject/subject";
import {selectSubject, setSubjects} from "@/lib/features/admin/faculties/subject/subjectSlice";
import {useDispatch, useSelector} from "react-redux";
import {
    useCreateSectionMutation,
    useGetAllSectionQuery
} from "@/lib/features/admin/materials/subjectMaterialSection/section";
import {Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {toast} from "react-hot-toast";
import Select from "react-select";

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
    const {refetch: refetchSections} = useGetAllSectionQuery({page: 0, pageSize: 10});
    const [isOpen, setIsOpen] = useState(false);

    const {
        data: subjectData,
    } = useGetSubjectsQuery({page: 0, pageSize: 10});
    const subjects = useSelector((state: RootState) => selectSubject(state));

    useEffect(() => {
        if (subjectData) {
            dispatch(setSubjects(subjectData.content));
        }
    }, [subjectData, dispatch]);

    const subjectOptions = subjects.map(subject => ({
        value: subject.alias,
        label: subject.title
    }));

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

            console.log("Create successfully", newSection)
            toast.success('Successfully created!');

            resetForm();
            refetchSections();
            setIsOpen(false);


        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error creating degree: ", error);
            toast.error('Failed to create faculty!');
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
                    {({setFieldValue}) => (
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
                                        options={subjectOptions}
                                    />
                                    <ErrorMessage
                                        name="subjectAlias"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* isDraft */}
                                {/*<div className={``}>*/}
                                {/*    <div className="flex">*/}
                                {/*        <label className={`${style.label}`} htmlFor="isDraft">*/}
                                {/*            Visibility*/}
                                {/*        </label>*/}
                                {/*        <TbAsterisk className='w-2 h-2 text-lms-error'/>*/}
                                {/*    </div>*/}

                                {/*    <div className="flex gap-4 h-[40px] items-center">*/}
                                {/*        <Field*/}
                                {/*            name="isDraft"*/}
                                {/*            component={RadioButton}*/}
                                {/*            value="false"*/}
                                {/*            label="Public"*/}
                                {/*        />*/}
                                {/*        <Field*/}
                                {/*            name="isDraft"*/}
                                {/*            component={RadioButton}*/}
                                {/*            value="true"*/}
                                {/*            label="Draft"*/}
                                {/*        />*/}
                                {/*    </div>*/}

                                {/*    <ErrorMessage*/}
                                {/*        name="isDraft"*/}
                                {/*        component={RadioButton}*/}
                                {/*        className={`${style.error}`}*/}
                                {/*    />*/}
                                {/*</div>*/}

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
