"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import style from "../../style.module.css";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React, {useEffect, useState} from "react";
import {TbAsterisk} from "react-icons/tb";
import {useGetAcademicYearByAliasQuery} from "@/lib/features/admin/faculties/acdemicYear-management/academicYear";

export function ViewAcademicYeaForm({alias, onClose}: { alias: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [initialAlias, setInitialAlias] = useState("");
    const {data: academicYearData, isSuccess} = useGetAcademicYearByAliasQuery(alias);
    const [initialValues, setInitialValues] = useState({
        alias: "",
        academicYear: "",
        status: 0,
        isDeleted: false,
        isDraft: false
    });

    useEffect(() => {
        if (isSuccess && academicYearData) {
            setInitialValues({
                alias: academicYearData.alias,
                academicYear: academicYearData.academicYear,
                status: academicYearData.status,
                isDeleted: academicYearData.isDeleted,
                isDraft: academicYearData.isDraft
            });
            setInitialAlias(academicYearData.alias);
        }
    }, [isSuccess, academicYearData]);

    return (
        <Dialog open={open} onOpenChange={onClose}>
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
                            <div className="flex flex-col gap-1">

                                {/* academicYear*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="academicYear">
                                            Academic Year
                                        </label>
                                    </div>
                                    <Field
                                        disabled
                                        type="text"
                                        name="academicYear"
                                        id="academicYear"
                                        className={` ${style.input}`}
                                    />
                                </div>

                                {/* Academic Year Alias*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                    </div>
                                    <Field
                                        disabled
                                        type="text"
                                        name="alias"
                                        id="alias"
                                        className={` ${style.input}`}
                                    />
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
