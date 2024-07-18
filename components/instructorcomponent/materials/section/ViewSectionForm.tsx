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

import {DegreeType} from "@/lib/types/admin/faculty";
import React, {useEffect, useState} from "react";
import Image from "next/image";
import {create} from "domain";
import {useGetDegreeByAliasQuery, useGetDegreesQuery} from "@/lib/features/admin/faculties/degree/degree";
import {TbAsterisk} from "react-icons/tb";
import {useGetSectionByUuidQuery} from "@/lib/features/admin/materials/subjectMaterialSection/section";
import Select from "react-select";
import {useGetSubjectsQuery} from "@/lib/features/admin/faculties/subject/subject";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {selectSubject, setSubjects} from "@/lib/features/admin/faculties/subject/subjectSlice";

export function ViewSectionForm({uuid, onClose}: { uuid: string; onClose: () => void }) {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(true);
    const [initialAlias, setInitialAlias] = useState("");
    const {data: sectionData, isSuccess} = useGetSectionByUuidQuery(uuid);
    const [initialValues, setInitialValues] = useState({
        uuid: '',
        title: '',
        subjectAlias: '',
        materials: '',
        isDeleted: false,
        isDraft: false,
        subjectTitle: ''
    });

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

    useEffect(() => {
        if (isSuccess && sectionData) {
            const subjectTitle = subjects.find(subject => subject.alias === sectionData.subjectAlias)?.title || 'Subject not found';
            setInitialValues({
                uuid: sectionData.uuid,
                title: sectionData.title,
                subjectAlias: sectionData.subjectAlias,
                subjectTitle: subjectTitle, // Add this line
                materials: sectionData.materials,
                isDeleted: sectionData.isDeleted,
                isDraft: sectionData.isDraft
            });
            setInitialAlias(sectionData.uuid);
        }
    }, [isSuccess, sectionData, subjects]);

    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Degree Information</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={() => {
                    }}
                >
                    {() => (
                        <Form className="py-4 rounded-lg w-full ">
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
                                        disabled
                                        type="text"
                                        name="title"
                                        id="title"
                                        className={` ${style.input}`}
                                    />
                                </div>

                                {/* Subject*/}
                                {/*<div className={``}>*/}
                                {/*    <div className="flex">*/}
                                {/*        <label className={`${style.label}`} htmlFor="subjectTitle">*/}
                                {/*            Subject*/}
                                {/*        </label>*/}
                                {/*        <TbAsterisk className='w-2 h-2 text-lms-error'/>*/}
                                {/*    </div>*/}
                                {/*    <Field*/}
                                {/*        disabled*/}
                                {/*        type="text"*/}
                                {/*        name="subjectTitle"*/}
                                {/*        id="subjectTitle"*/}
                                {/*        className={` ${style.input}`}*/}
                                {/*    />*/}
                                {/*</div>*/}

                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
