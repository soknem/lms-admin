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
import {useGetBannerByAliasQuery} from "@/lib/features/admin/faculties/banner/banner";
import slugify from "slugify";

export function ViewBannerForm({alias, onClose}: { alias: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [initialAlias, setInitialAlias] = useState("");
    const {data: BannerData, isSuccess} = useGetBannerByAliasQuery(alias);
    const [initialValues, setInitialValues] = useState({
        alias: "",
        title: "",
        description: "",
        link: "",
        isDraft: false,
        isDeleted: false
    });

    useEffect(() => {
        if (isSuccess && BannerData) {
            setInitialValues({
                alias: BannerData.alias,
                title: BannerData.title,
                description: BannerData.description,
                link: BannerData.link,
                isDraft: BannerData.isDraft,
                isDeleted: BannerData.isDeleted
            });
            setInitialAlias(BannerData.alias);
        }
    }, [isSuccess, BannerData]);

    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Banner Information</DialogTitle>
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

                                {/* Banner Title*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="title">
                                            Title
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

                                {/* Banner Alias*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        disabled
                                        type="text"
                                        name="alias"
                                        id="alias"
                                        className={` ${style.input}`}
                                    />
                                </div>

                                {/* Banner link*/}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="link">
                                        Banner Link
                                    </label>
                                    <Field
                                        disabled
                                        type="text"
                                        rows={4}
                                        name="link"
                                        id="link"
                                        className={`${style.input}`}
                                    />
                                </div>

                                {/* Banner Description*/}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        disabled
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        id="description"
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
