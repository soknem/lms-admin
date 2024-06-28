"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../../style.module.css";
import {FiPlus, FiUploadCloud} from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {FacultyType} from "@/lib/types/admin/faculty";
import React, {useState} from "react";
import Image from "next/image";
import {TbAsterisk} from "react-icons/tb";
import {
    useCreateFacultyMutation,
    useGetFacultiesQuery,
    useGetFacultyByAliasQuery
} from "@/lib/features/admin/faculties/faculty/faculty";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
// import {useGetGenerationQuery} from "@/lib/features/admin/academic-management/generation/generation";

const initialValues = {
    alias: "",
    name: "",
    description: "",
    address: "",
    logo: "",
    isDeleted: true,
    isDraft: true
};

const validationSchema = Yup.object().shape({
    alias: Yup.string().required('Alias is required'),
    name: Yup.string().required('Title is required'),
    address: Yup.string().required('Address is required'),
    isDraft: Yup.boolean().required('Visibility is required'),
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

const CustomInput = ({field, setFieldValue}: any) => {
    const [imagePreview, setImagePreview] = useState("");

    const handleUploadFile = (e: any) => {
        const file = e.target.files[0];
        const localUrl = URL.createObjectURL(file);
        setImagePreview(localUrl);

        setFieldValue(field.name, file);
    };

    return (
        <div className="w-full">
            <input
                type="file"
                onChange={handleUploadFile}
                className="hidden"
                id="file"
            />
            <label
                htmlFor="file"
                className="border border-gray-300 hover:bg-lms-background text-gray-900 text-sm rounded-lg bg-white w-full h-[68px] p-2 border-dashed flex justify-center items-center cursor-pointer relative overflow-hidden"
            >
                {!imagePreview ? (
                    <div className="flex items-center justify-center gap-8">
                        <FiUploadCloud className="text-lms-primary text-[34px]"/>
                        <div className="flex flex-col items-start justify-start gap-1">
                            <p className="text-center text-md text-black">
                                Select a file or drag and drop here
                            </p>
                            <p className="text-center text-md text-lms-gray-30">
                                JPG, PNG or PDF, file size no more than 10MB
                            </p>
                        </div>
                    </div>
                ) : (
                    <div style={{position: 'relative', width: '100%', height: '100%'}}>
                        <Image
                            src={imagePreview}
                            alt="preview"
                            fill
                            style={{objectFit: 'contain'}}
                        />
                    </div>
                )}
            </label>
        </div>
    );
};

export function CreateFacForm() {
    const [createSingleFile] = useCreateSingleFileMutation();
    const [createFaculty] = useCreateFacultyMutation();
    const {refetch: refetchFaculties} = useGetFacultiesQuery({page: 0, pageSize: 10});
    const [isOpen, setIsOpen] = useState(false);

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            // Upload the logo file
            const fileData = new FormData();
            fileData.append("file", values.logo);

            const fileResponse = await createSingleFile(fileData).unwrap();
            console.log(fileResponse)

            if (fileResponse) {
                // File uploaded successfully, now create the faculty
                const newFaculty: FacultyType = {
                    alias: values.alias,
                    name: values.name,
                    description: values.description,
                    address: values.address,
                    logo: fileResponse.name, // Assuming the response contains the URL of the uploaded file
                    isDeleted: values.isDeleted,
                    isDraft: values.isDraft,
                };

                const res = await createFaculty(newFaculty).unwrap();
                resetForm();
                // Handle success (e.g., show a success message or close the dialog)
                refetchFaculties();
                setIsOpen(false);
                // console.log("Update successfully")

            }
        } catch (error) {
            // Handle error (e.g., show an error message)
            console.error("Error creating faculty: ", error);
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Faculty
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px] bg-white ">
                <DialogHeader>
                    <DialogTitle>Add Faculty</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1">
                                {/* Faculty Alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Alias
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="Faculty of Engineering"
                                        name="alias"
                                        id="alias"
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
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="Faculty of Engineering"
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
                                        type="text"
                                        placeholder="This is main description of our academic"
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
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <Field
                                        type="text"
                                        placeholder="123 University Ave"
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

                                {/* isDraft */}
                                <div className={`${style.inputContainer}`}>
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
                                            value="true"
                                            label="Public"
                                        />
                                        <Field
                                            name="isDraft"
                                            component={RadioButton}
                                            value="false"
                                            label="Draft"
                                        />
                                    </div>

                                    <ErrorMessage
                                        name="isDraft"
                                        component={RadioButton}
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* isDeleted */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="isDeleted">
                                            Status
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>

                                    <div className="flex gap-4 h-[40px] items-center">
                                        <Field
                                            name="isDeleted"
                                            component={RadioButton}
                                            value="true"
                                            label="Public"
                                        />
                                        <Field
                                            name="isDeleted"
                                            component={RadioButton}
                                            value="false"
                                            label="Draft"
                                        />
                                    </div>

                                    <ErrorMessage
                                        name="isDeleted"
                                        component={RadioButton}
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Faculty Image */}
                                <div className="mb-4">
                                    <label
                                        htmlFor="logo"
                                        className="block text-sm font-medium text-gray-700 my-2"
                                    >
                                        Faculty Logo
                                    </label>
                                    <Field
                                        type="file"
                                        name="logo"
                                        id="logo"
                                        component={CustomInput}
                                        setFieldValue={setFieldValue}
                                        className="mt-1"
                                    />
                                    <ErrorMessage
                                        name="logo"
                                        component="div"
                                        className="text-red-500 mt-1 text-sm"
                                    />
                                </div>
                            </div>

                            {/* Submit Button */}
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