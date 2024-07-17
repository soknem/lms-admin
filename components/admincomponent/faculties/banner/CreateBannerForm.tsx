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

import {useState} from "react";
import slugify from "slugify";
import {toast} from "react-hot-toast";
import {useCreateBannerMutation} from "@/lib/features/admin/faculties/banner/banner";
import {BannerType} from "@/lib/types/admin/banner";
import {TbAsterisk} from "react-icons/tb";

const initialValues = {
    alias: "",
    title: "",
    description: "",
    link: "",
    isDraft: false,
    isDeleted: false
};

const validationSchema = Yup.object().shape({
    alias: Yup.string().required('Alias is required'),
    title: Yup.string().required('Title is required'),
    link: Yup.string().url('Must be a valid URL').required('Link is required'),
    isDraft: Yup.boolean().required('isDraft is required'),
});

const RadioButton = ({field, value, label}: any) => {
    return (
        <div>
            <input
                type="radio"
                {...field}
                id={value}
                value={value}
                checked={field.value === value}
            />
            <label className="pl-2" htmlFor={value}>
                {label}
            </label>
        </div>
    );
};

export function CreateBannerForm() {
    const [createBanner] = useCreateBannerMutation();
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const newBanner: BannerType = {
                alias: values.alias,
                title: values.title,
                description: values.description,
                link: values.link,
                isDraft: values.isDraft,
                isDeleted: values.isDeleted
            };

            await createBanner(newBanner).unwrap();
            resetForm();

            setIsOpen(false);
            toast.success('Successfully created!');

        } catch (error) {
            console.error("Error creating banner: ", error);
            toast.error('Failed to create banner!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/>Add Banner
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>

                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Add Banner</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (
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

                            {/* button submit */}
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                >
                                    Add
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
