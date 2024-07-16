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
import {FacultyType} from "@/lib/types/admin/faculty";
import logo_holder from "@/public/common/logo_holder.png";

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
                    <Image
                        src={previewUrl || logo_holder}
                        alt="preview"
                        fill
                        className="w-full h-full rounded-full object-fill"
                    />
                )}
            </div>
        </div>
    );
};

export function ViewFacForm({alias, onClose}: { alias: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [initialAlias, setInitialAlias] = useState("");
    const [logo, setLogo] = useState(null);
    const {data: facultyData, isSuccess} = useGetFacultyByAliasQuery(alias);
    const [initialValues, setInitialValues] = useState({
        alias: "",
        name: "",
        description: "No Description",
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

    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Faculty Information</DialogTitle>
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

                                {/* Faculty Title */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="name">
                                            Title
                                        </label>
                                    </div>

                                    <Field
                                        type="text"
                                        name="name"
                                        id="name"
                                        disabled
                                        className={`${style.input}`}
                                    />

                                </div>

                                {/* Faculty Alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                    </div>

                                    <Field
                                        type="text"
                                        name="alias"
                                        id="alias"
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
                                        rows={4}
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
                                    </div>

                                    <Field
                                        type="text"
                                        disabled
                                        name="address"
                                        id="address"
                                        className={`${style.input}`}
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
