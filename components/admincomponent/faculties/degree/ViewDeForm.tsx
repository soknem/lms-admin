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


const RadioButton = ({field, value, label}: any) => {
    return (
        <div>
            <input
                type="radio"
                {...field}
                id={value.toString()}
                value={value.toString()}
                checked={field.value.toString() === value.toString()}
            />
            <label className="pl-2" htmlFor={value.toString()}>
                {label}
            </label>
        </div>
    );
};

export function ViewDeForm({alias}: { alias: string }) {
    const [open, setOpen] = useState(true);
    const [initialAlias, setInitialAlias] = useState("");
    const {data: degreeData, isSuccess} = useGetDegreeByAliasQuery(alias);
    const [initialValues, setInitialValues] = useState({
        alias: "",
        level: "",
        description: "",
        isDeleted: false,
        isDraft: false
    });

    useEffect(() => {
        if (isSuccess && degreeData) {
            setInitialValues({
                alias: degreeData.alias,
                level: degreeData.level,
                description: degreeData.description,
                isDeleted: degreeData.isDeleted,
                isDraft: degreeData.isDraft
            });
            setInitialAlias(degreeData.alias);
        }
    }, [isSuccess, degreeData]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[480px] bg-white ">
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

                                <div className={`flex w-full justify-between`}>

                                    {/* Visibility */}
                                    <div className={``}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="isDraft">
                                                Visibility
                                            </label>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                name="isDraft"
                                                disabled
                                                component={RadioButton}
                                                value={true}
                                                label="Public"
                                            />
                                            <Field
                                                disabled
                                                name="isDraft"
                                                component={RadioButton}
                                                value={false}
                                                label="Draft"
                                            />
                                        </div>
                                    </div>

                                    {/* Status */}
                                    <div className={``}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="isDeleted">
                                                Status
                                            </label>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                disabled
                                                name="isDeleted"
                                                component={RadioButton}
                                                value={true}
                                                label="Public"
                                            />
                                            <Field
                                                disabled
                                                name="isDeleted"
                                                component={RadioButton}
                                                value={false}
                                                label="Draft"
                                            />
                                        </div>
                                    </div>

                                </div>

                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
