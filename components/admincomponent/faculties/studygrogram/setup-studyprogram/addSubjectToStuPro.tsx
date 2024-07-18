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
import Select from "react-select";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {selectSubject} from "@/lib/features/admin/faculties/subject/subjectSlice";
import {
    useAddSubjectToYearOfStudyMutation,
    useGetYearOfStudyUUIDMutation,
} from "@/lib/features/admin/faculties/studyProgram/yearOfStudy-studyProgram/yearStuPro";
import {toast} from "react-hot-toast";

const initialValues = {
    aliasOfSubjects: [] as string[], // Change to an array
    uuid: "",
};

type UUIDType = {
    uuid: string;
    semester: number;
};

const validationSchema = Yup.object().shape({
    aliasOfSubjects: Yup.array()
        .of(Yup.string().required("Subject is required"))
        .min(1, "At least one subject is selected"), // Ensure at least one subject is selected
    uuid: Yup.string().required("UUID is required"),
});

export function AddSubjectStudyProForm({
                                           alias,
                                           year,
                                       }: {
    alias: string;
    year: number;
}) {
    const [isOpen, setIsOpen] = useState(false);
    const [uuids, setUuids] = useState<UUIDType[]>([]); // State to store UUIDs
    const subjects = useSelector((state: RootState) => selectSubject(state));
    const [getYearOfStudyUUID] = useGetYearOfStudyUUIDMutation();
    const [addSubjectToYearOfStudy] = useAddSubjectToYearOfStudyMutation();

    useEffect(() => {
        // Fetch UUIDs when the form is opened
        if (isOpen) {
            fetchUuids();
        }
    }, [isOpen, alias, year]);

    const subjectOptions = subjects.map((subject) => ({
        value: subject.alias,
        label: subject.title,
    }));

    const semesterOptions = uuids.map((semester) => ({
        value: semester.uuid,
        label: `Semester ${semester.semester}`,
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
                aliasOfSubjects: values.aliasOfSubjects, // No need to wrap in array
            };

            await addSubjectToYearOfStudy({
                uuid: values.uuid,
                addSubToStuProgram: setupSubjects,
            });

            resetForm();
            setIsOpen(false);
            toast.success("Successfully added subject!");
        } catch (error) {
            toast.error("Failed to add subject!");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button
                    onClick={() => setIsOpen(true)}
                    className="bg-lms-primary text-white hover:bg-lms-primary"
                >
                    <FiPlus className="mr-2 h-4 w-4"/> Select Subjects
                </Button>
            </DialogTrigger>

            <DialogContent
                className="w-[480px] items-center justify-center bg-white"
                onInteractOutside={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle className="text-2xl font-semibold">
                        Select Subjects
                    </DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue, isSubmitting}) => (
                        <Form className="py-4 rounded-lg w-full">
                            <div className="flex flex-col gap-1 items-center justify-center">
                                {/* aliasOfSubjects */}
                                <div className={style.inputContainer}>
                                    <div className="flex">
                                        <label className={style.label} htmlFor="aliasOfSubjects">
                                            Subject
                                        </label>
                                    </div>
                                    <Select
                                        isMulti
                                        options={subjectOptions}
                                        onChange={(selectedOptions: any) =>
                                            setFieldValue(
                                                "aliasOfSubjects",
                                                selectedOptions
                                                    ? selectedOptions.map((option: any) => option.value)
                                                    : []
                                            )
                                        }
                                    />
                                    <ErrorMessage
                                        name="aliasOfSubjects"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>

                                {/* semester */}
                                <div className={style.inputContainer}>
                                    <div className="flex">
                                        <label className={style.label} htmlFor="uuid">
                                            UUID
                                        </label>
                                    </div>

                                    <Select
                                        options={semesterOptions}
                                        onChange={(selectedOption: any) =>
                                            setFieldValue(
                                                "uuid",
                                                selectedOption ? selectedOption.value : ""
                                            )
                                        }
                                    />
                                    <ErrorMessage
                                        name="uuid"
                                        component="div"
                                        className={style.error}
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? "Adding..." : "Add"}
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}