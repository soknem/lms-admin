"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../../style.module.css";

import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import React, {useEffect, useState} from "react";
import {TbAsterisk} from "react-icons/tb";
import {toast} from "react-hot-toast";
import {useEditBannerByAliasMutation, useGetBannerByAliasQuery} from "@/lib/features/admin/faculties/banner/banner";
import {BannerType} from "@/lib/types/admin/banner";
import slugify from "slugify";

const validationSchema = Yup.object().shape({
    alias: Yup.string().required('Alias is required'),
    level: Yup.string().required('Level is required'),
    description: Yup.string(),
    isDeleted: Yup.boolean().required('Please specify if the degree is deleted'),
    isDraft: Yup.boolean().required('Please specify if the degree is a draft'),
});

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

export function EditBannerForm({alias, onClose}: { alias: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [editBanner] = useEditBannerByAliasMutation();
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


    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const editBannerByAlias: BannerType = {
                alias: values.alias,
                title: values.title,
                description: values.description,
                link: values.link,
                isDraft: values.isDraft,
                isDeleted: values.isDeleted
            };

            await editBanner({alias: initialAlias, updatedData: editBannerByAlias}).unwrap();

            // Now update the alias if it has changed
            if (values.alias !== initialAlias) {
                await editBanner({
                    alias: values.alias,
                    updatedData: {...editBannerByAlias, alias: values.alias}
                }).unwrap();
            }


            console.log('New Banner', editBannerByAlias);
            resetForm();
            onClose();
            toast.success('Successfully updated!');

        } catch (error) {
            console.error("Error updating degree: ", error);
            toast.error('Failed to edit Banner!');

        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Edit Banner</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full">
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
                                        type="text"
                                        placeholder="វគ្គសិក្សាថ្មី ចុះឈ្មោះឥឡូវនេះ!!! ✅ DevOps Engineering"
                                        name="title"
                                        id="title"
                                        onChange={(e: any) => {
                                            setFieldValue(
                                                "title",
                                                e.target.value
                                            );
                                            setFieldValue(
                                                "alias",
                                                slugify(e.target.value, {
                                                    lower: true,
                                                })
                                            );
                                        }}
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="title"
                                        component="div"
                                        className={`${style.error}`}
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
                                    <ErrorMessage
                                        name="alias"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Banner link*/}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="link">
                                        Banner Link
                                    </label>
                                    <Field
                                        type="text"
                                        rows={4}
                                        name="link"
                                        placeholder="https://www.facebook.com/istad.co/posts/pfbid027bPuWhmv9oXNzAA6ZC3r1h7QYV3hWGkFRnawH457Qgkesh9egStNq6Dzcc9kshj5l?rdid=7ZPKnaYOcWY9hPRj"
                                        id="link"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="link"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Banner Description*/}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        placeholder="This is main degree of Engineering faculty"
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
                                            <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value="false"
                                                label="Public"
                                            />
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value="true"
                                                label="Draft"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDraft"
                                            component={RadioButton}
                                            className={`${style.error}`}
                                        />
                                    </div>

                                </div>

                            </div>

                            {/* Submit Button */}
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                >
                                    Save Changes
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
