"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import style from "../../style.module.css";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {useGetFacultyByAliasQuery} from "@/lib/features/admin/faculties/faculty/faculty";
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

const CustomInput = ({previewUrl}: any) => {
    const [imagePreview, setImagePreview] = useState(previewUrl);
    return (
        <div className="w-full">
            <div
                className={`flex items-center justify-center relative ${style.imageContainer}`}
            >
                {imagePreview ? (
                    <Image
                        src={imagePreview}
                        alt="preview"
                        fill
                        style={{objectFit: "contain"}}
                    />
                ) : (
                    <img
                        src={previewUrl}
                        alt="faculty"
                        className="w-full h-full rounded-full"
                    />
                )}
            </div>
        </div>
    );
};

export function ViewFacForm({alias}: { alias: string }) {
    const [open, setOpen] = useState(true);
    const [initialAlias, setInitialAlias] = useState("");
    const [logo, setLogo] = useState(null);
    const {data: facultyData, isSuccess} = useGetFacultyByAliasQuery(alias);
    const [initialValues, setInitialValues] = useState({
        alias: "",
        name: "",
        description: "",
        address: "",
        logo: "",
        isDeleted: false,
        isDraft: false
    });

    useEffect(() => {
        if (isSuccess && facultyData) {
            setInitialValues({
                alias: facultyData.alias,
                name: facultyData.name,
                description: facultyData.description,
                address: facultyData.address,
                logo: facultyData.logo,
                isDeleted: facultyData.isDeleted,
                isDraft: facultyData.isDraft,
            });
            setInitialAlias(facultyData.alias);
            setLogo(facultyData.logo)
        }
    }, [isSuccess, facultyData]);
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose} modal={true}>
            <DialogContent className="w-[480px] bg-white ">
                <DialogHeader>
                    <DialogTitle>Faculty Information</DialogTitle>
                </DialogHeader>
                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={() => {
                    }}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1 items-center justify-center">
                                {/* Faculty logo */}

                                <div className="flex">
                                    <Field
                                        name="logo"
                                        component={CustomInput}
                                        previewUrl={initialValues.logo}
                                    />
                                </div>


                                {/* Faculty Alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Alias
                                        </label>
                                        <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                    </div>

                                    <Field
                                        type="text"
                                        name="alias"
                                        id="alias"
                                        disabled
                                        className={`${style.input}`}
                                    />

                                </div>

                                {/* Faculty Title */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="name">
                                            Title
                                        </label>
                                        <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                    </div>

                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        disabled
                                        className={`${style.input}`}
                                    />

                                </div>

                                {/* Faculty Description */}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        as="textarea"
                                        rows={3}
                                        name="description"
                                        id="description"
                                        disabled
                                        className={`${style.input}`}
                                    />
                                </div>

                                {/* Faculty Address */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="address">
                                            Address
                                        </label>
                                        <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                    </div>

                                    <Field
                                        type="text"
                                        disabled
                                        name="address"
                                        id="address"
                                        className={`${style.input}`}
                                    />

                                </div>

                                {/* isDraft */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="isDraft">
                                            Visibility
                                        </label>
                                        <TbAsterisk className="w-2 h-2 text-lms-error"/>
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

                                {/* isDeleted */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="isDeleted">
                                            Status
                                        </label>
                                        <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                    </div>

                                    <div className="flex gap-4 h-[40px] items-center">
                                        <Field
                                            name="isDeleted"
                                            disabled
                                            component={RadioButton}
                                            value={true}
                                            label="Active"
                                        />
                                        <Field
                                            name="isDeleted"
                                            disabled
                                            component={RadioButton}
                                            value={false}
                                            label="Inactive"
                                        />
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
