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

export function ViewDeForm({alias, onClose}: { alias: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [initialAlias, setInitialAlias] = useState("");
    const {data: degreeData, isSuccess} = useGetDegreeByAliasQuery(alias);
    const [initialValues, setInitialValues] = useState({
        alias: "",
        level: "",
        numberOfYears: 0,
        description: "",
        isDeleted: false,
        isDraft: false
    });

    useEffect(() => {
        if (isSuccess && degreeData) {
            setInitialValues({
                alias: degreeData.alias,
                level: degreeData.level,
                numberOfYears: degreeData.numberOfYears,
                description: degreeData.description,
                isDeleted: degreeData.isDeleted,
                isDraft: degreeData.isDraft
            });
            setInitialAlias(degreeData.alias);
        }
    }, [isSuccess, degreeData]);

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
                            <div className="flex flex-col gap-1">

                                {/* Degree Level */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="level">
                                            Level
                                        </label>
                                    </div>
                                    <Field
                                        disabled
                                        type="text"
                                        name="level"
                                        id="level"
                                        className={`${style.input}`}
                                    />
                                </div>

                                {/* Degree Alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                    </div>
                                    <Field
                                        type="text"
                                        disabled
                                        name="alias"
                                        id="alias"
                                        className={`${style.input}`}
                                    />
                                </div>

                                {/* Degree Description */}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        as="textarea"
                                        rows={4}
                                        disabled
                                        name="description"
                                        id="description"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className={`${style.error}`}
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
