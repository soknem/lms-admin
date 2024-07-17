"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../../../style.module.css";
import {FiPlus} from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import React, {useEffect, useState} from "react";
import Select from 'react-select'


import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {selectSubject} from "@/lib/features/admin/faculties/subject/subjectSlice";
import {
    useAddSubjectToYearOfStudyMutation,
    useGetYearOfStudyUUIDMutation
} from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuPro";
import {toast} from "react-hot-toast";

const initialValues = {
    aliasOfSubjects: "",
    uuid: "",
};

type UUIDType = {
    uuid: string;
    semester: number;
};

const validationSchema = Yup.object().shape({
    aliasOfSubjects: Yup.string().required("Subject is required"),
    uuid: Yup.string().required("UUID is required")
});

export function AddSubjectStudyProForm({alias, year}: { alias: string; year: number }) {
    const [isOpen, setIsOpen] = useState(false);
    const [uuids, setUuids] = useState<UUIDType[]>([]); /// State to store UUIDs
    // const {data: subjectsData} = useGetSubjectsQuery({page: 0, pageSize: 10});
    const subjects = useSelector((state: RootState) => selectSubject(state));
    // const {data: studyPrograms} = useGetStuProByAliasQuery(alias);
    const [getYearOfStudyUUID] = useGetYearOfStudyUUIDMutation();
    const [addSubjectToYearOfStudy] = useAddSubjectToYearOfStudyMutation();

    useEffect(() => {
        // Fetch UUIDs when the form is opened
        if (isOpen) {
            fetchUuids();
        }
    }, [isOpen, alias, year]);

    const subjectOptions = subjects.map(subject => ({
        value: subject.alias,
        label: subject.title
    }));

    const semesterOptions = uuids.map(semester => ({
        value: semester.uuid,
        label: `Semester ${semester.semester}`
    }));

    const fetchUuids = async () => {
        try {
            const response = await getYearOfStudyUUID({
                studyProgramAlias: alias,
                year: year,
            }).unwrap();
            setUuids(response);
        } catch (error) {
            console.error("Error fetching UUIDs: ", error);
        }
    };

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const setupSubjects = {
                aliasOfSubjects: [values.aliasOfSubjects],
            };

            await addSubjectToYearOfStudy({
                uuid: values.uuid,
                addSubToStuProgram: setupSubjects,
            });

            resetForm();
            setIsOpen(false);
            toast.success('Successfully added subject!');

        } catch (error) {
            console.error("Error creating study program: ", error);
            toast.error('Failed to add subject!');
        } finally {
            setSubmitting(false);
        }
    };


    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Select Subjects
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px] items-center justify-center bg-white"
                           onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">Select Subjects</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {() => (
                        <Form className="py-4 rounded-lg w-full">
                            <div className="flex flex-col gap-1 items-center justify-center">

                                {/* aliasOfSubjects */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="aliasOfSubjects">Subject</label>
                                    </div>
                                    <Select isMulti options={subjectOptions}/>
                                    {/*<Field as="select" name="aliasOfSubjects" id="aliasOfSubjects"*/}
                                    {/*       className={`${style.input}`}>*/}
                                    {/*    <option value="" label="Select subject"/>*/}
                                    {/*    {Array.isArray(subjects) && subjects.map(subject => (*/}
                                    {/*        <option key={subject.alias} value={subject.alias} label={subject.title}/>*/}
                                    {/*    ))}*/}
                                    {/*</Field>*/}
                                    <ErrorMessage
                                        name="aliasOfSubjects"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* semester */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="uuid">UUID</label>
                                    </div>

                                    <Select options={semesterOptions}/>

                                    {/*<Field as="select" name="uuid" id="uuid"*/}
                                    {/*       className={`${style.input}`}>*/}
                                    {/*    <option value="" label="Select semester"/>*/}
                                    {/*    {Array.isArray(uuids) && uuids.map(semester => (*/}
                                    {/*        <option key={semester.uuid} value={semester.uuid}*/}
                                    {/*                label={`Semester ${semester.semester}`}/>*/}


                                    {/*    ))}*/}
                                    {/*</Field>*/}
                                    <ErrorMessage
                                        name="uuid"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

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