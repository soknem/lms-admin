"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../../style.module.css";
import {FiPlus, FiUploadCloud} from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {AddSubjectType, SetupStudyProgramType, StudyProgramType} from "@/lib/types/admin/faculty";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {TbAsterisk} from "react-icons/tb";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {
    useCreateStuProgramMutation, useGetByStudyProgramAndYearMutation,
    useGetStudyProgramsQuery
} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculties/faculty/faculty";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {
    selectFaculty,
    setFaculties
} from "@/lib/features/admin/faculties/faculty/facultySlice";
import {useGetDegreesQuery} from "@/lib/features/admin/faculties/degree/degree";
import {selectDegree, setDegrees} from "@/lib/features/admin/faculties/degree/degreeSlice";
import {useGetSubjectsQuery} from "@/lib/features/admin/faculties/subject/subject";
import {selectSubject} from "@/lib/features/admin/faculties/subject/subjectSlice";
import {
    useGetYearOfStudyUUIDMutation
} from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuPro";

const initialValues = {
    studyProgramAlias: "",
    uuid: "",
    semester: 0,
    year: 0,
};

const validationSchema = Yup.object().shape({});

export function CreateStudyProForm() {
    const dispatch = useDispatch<AppDispatch>();
    const [isOpen, setIsOpen] = useState(false);
    const {
        data: subjectsData,
    } = useGetSubjectsQuery({page: 0, pageSize: 10});
    const subjects = useSelector((state: RootState) => selectSubject(state));
    const stuPrograms = useGetStudyProgramsQuery({page: 0, pageSize: 10});
    const uuid = useGetByStudyProgramAndYearMutation();


    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const setupSubjects: AddSubjectType = {
                studyProgramAlias: values.studyProgramAlias,
                uuid: values.uuid,
                semester: values.semester,
                year: values.year,
            };
            resetForm();

            console.log("Create successfully")
            setIsOpen(false)
        } catch (error) {
            console.error("Error creating study program: ", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Study Program
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[920px] items-center justify-center bg-white"
                           onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Add Study Program</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full">
                            <div className="grid gap-x-4 grid-cols-2 gap-1 items-center justify-center">

                                {/* studyProgramName */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="studyProgramName">Title</label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field placeholder={`Master of Computer Science`} type="text"
                                           name="studyProgramName"
                                           id="studyProgramName"
                                           className={`${style.input}`}/>
                                </div>

                                {/* alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">Slug</label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field placeholder={`computer-science-master`} type="text" name="alias" id="alias"
                                           className={`${style.input}`}/>
                                </div>

                                {/* facultyAlias */}
                                {/*<div className={`${style.inputContainer}`}>*/}
                                {/*    <div className="flex">*/}
                                {/*        <label className={`${style.label}`} htmlFor="facultyAlias">Faculty</label>*/}
                                {/*    </div>*/}
                                {/*    <Field as="select" name="facultyAlias" id="facultyAlias"*/}
                                {/*           className={`${style.input}`}>*/}
                                {/*        <option value="" label="Select faculty"/>*/}
                                {/*        {Array.isArray(faculties) && faculties.map(faculty => (*/}
                                {/*            <option key={faculty.alias} value={faculty.alias} label={faculty.alias}/>*/}
                                {/*        ))}*/}
                                {/*    </Field>*/}
                                {/*</div>*/}

                                {/*/!* degreeAlias *!/*/}
                                {/*<div className={`${style.inputContainer}`}>*/}
                                {/*    <div className="flex">*/}
                                {/*        <label className={`${style.label}`} htmlFor="degreeAlias">Degree</label>*/}
                                {/*    </div>*/}
                                {/*    <Field as="select" name="degreeAlias" id="degreeAlias" className={`${style.input}`}>*/}
                                {/*        <option value="" label="Select degree"/>*/}
                                {/*        {Array.isArray(degrees) && degrees.map(degree => (*/}
                                {/*            <option key={degree.alias} value={degree.alias} label={degree.alias}/>*/}
                                {/*        ))}*/}
                                {/*    </Field>*/}
                                {/*</div>*/}


                            </div>

                            {/* Submit Button */}
                            <DialogFooter>
                                <Button type="submit"
                                        className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary">Add</Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}