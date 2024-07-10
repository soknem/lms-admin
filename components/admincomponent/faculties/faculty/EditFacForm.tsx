"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import {Button} from "@/components/ui/button";
import style from "../../style.module.css";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import {FacultyType} from "@/lib/types/admin/faculty";
import React, {useState, useRef, useEffect} from "react";
import Image from "next/image";
import {useRouter} from "next/navigation";
import {TbAsterisk} from "react-icons/tb";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {
    useEditFacultyByAliasMutation,
    useGetFacultiesQuery,
    useGetFacultyByAliasQuery
} from "@/lib/features/admin/faculties/faculty/faculty";
import {IoCameraOutline} from "react-icons/io5";
import {toast} from "react-hot-toast";

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

const CustomInput = ({field, form: {setFieldValue}, previewUrl}: any) => {
    const [imagePreview, setImagePreview] = useState(previewUrl);
    const fileInputRef = useRef<HTMLInputElement>(null);
    const handleContainerClick = () => {
        if (fileInputRef.current) {
            fileInputRef.current.click();
        }
    };

    const handleUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const localUrl = URL.createObjectURL(file);
            setImagePreview(localUrl);
            setFieldValue(field.name, file);
        }
    };

    return (
        <div className="w-full">
            <div
                className={`flex items-center justify-center relative ${style.imageContainer}`}
                onClick={handleContainerClick}
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
                <div
                    className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2"
                >
                    <IoCameraOutline className="w-5 h-5"/>
                </div>
                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={handleUploadFile}
                />
            </div>
        </div>
    );
};

export function EditFacForm({alias, onClose}: { alias: string; onClose: () => void }) {
    const router = useRouter();
    const [open, setOpen] = useState(true);
    const [createSingleFile] = useCreateSingleFileMutation();
    const [editFaculty] = useEditFacultyByAliasMutation();
    const [initialAlias, setInitialAlias] = useState("");
    const [logo, setLogo] = useState(null);
    const {data: facultyData, isSuccess} = useGetFacultyByAliasQuery(alias);
    const {refetch: refetchFaculties} = useGetFacultiesQuery({page: 0, pageSize: 10});
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

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            let logoUrl = values.logo;

            // Upload the logo file if it's a new file
            if (values.logo instanceof File) {
                const fileData = new FormData();
                fileData.append("file", values.logo);
                const fileResponse = await createSingleFile(fileData).unwrap();
                logoUrl = fileResponse.name; // Assuming the response contains the URL of the uploaded file
            } else if (values.logo === logo) {
                logoUrl = null;
            }


            const edtFacultyByAlias: FacultyType = {
                alias: values.alias, // Use the initial alias
                name: values.name,
                description: values.description,
                address: values.address,
                logo: logoUrl,
                isDeleted: values.isDeleted,
                isDraft: values.isDraft,

            };

            console.log("Updated Data", edtFacultyByAlias)

            await editFaculty({alias: initialAlias, updatedData: edtFacultyByAlias}).unwrap();

            // Now update the alias if it has changed
            if (values.alias !== initialAlias) {
                await editFaculty({
                    alias: values.alias,
                    updatedData: {...edtFacultyByAlias, alias: values.alias}
                }).unwrap();
            }


            resetForm();
            refetchFaculties();
            onClose();
            console.log("Update successfully")
            toast.success('Successfully updated!');


        } catch (error) {
            console.error("Error updating faculty: ", error);
            toast.error('Failed to edit faculty!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Edit Faculty</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full">
                            <div className="flex flex-col gap-1 items-center justify-center">

                                {/* Faculty logo */}
                                <div className="flex">
                                    <Field
                                        name="logo"
                                        component={CustomInput}
                                        setFieldValue={setFieldValue}
                                        previewUrl={initialValues.logo}
                                    />
                                </div>

                                {/* Faculty Alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                        <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                    </div>

                                    <Field
                                        type="text"
                                        name="alias"
                                        id="alias"
                                        // setFieldValue={setFieldValue}
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="alias"
                                        component="div"
                                        className={`${style.error}`}
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
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="name"
                                        component="div"
                                        className={`${style.error}`}
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
                                        name="address"
                                        id="address"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="address"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`flex w-full justify-between`}>

                                    {/* isDraft */}
                                    <div className={``}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="isDraft">
                                                Visibility
                                            </label>
                                            <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                        </div>

                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value={false}
                                                label="Public"
                                            />
                                            <Field
                                                name="isDraft"
                                                component={RadioButton}
                                                value={true}
                                                label="Draft"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDraft"
                                            component="div"
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
                                    Save Change
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}