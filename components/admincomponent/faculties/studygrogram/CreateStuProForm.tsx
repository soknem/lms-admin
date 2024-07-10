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

import {StudyProgramType} from "@/lib/types/admin/faculty";
import React, {useState} from "react";
import Image from "next/image";
import {TbAsterisk} from "react-icons/tb";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {
    useCreateStuProgramMutation,
    useGetStudyProgramsQuery
} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculties/faculty/faculty";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {
    selectFaculty
} from "@/lib/features/admin/faculties/faculty/facultySlice";
import {useGetDegreesQuery} from "@/lib/features/admin/faculties/degree/degree";
import {selectDegree, setDegrees} from "@/lib/features/admin/faculties/degree/degreeSlice";
import slugify from "slugify";
import Select from "react-select";
import {toast} from "react-hot-toast";

const initialValues = {
    alias: "",
    studyProgramName: "",
    logo: "",
    description: "",
    isDeleted: false,
    isDraft: false,
    degreeAlias: "",
    facultyAlias: ""
};

const validationSchema = Yup.object().shape({
    alias: Yup.string().required("Required"),
    studyProgramName: Yup.string().required("Required"),
    logo: Yup.string().required("Required"),
    description: Yup.string(),
    isDeleted: Yup.boolean().required("Required"),
    isDraft: Yup.boolean().required("Required"),
    degreeAlias: Yup.string().required("Required"),
    facultyAlias: Yup.string().required("Required")
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
                className="border border-gray-300 hover:bg-lms-background text-gray-900 text-sm rounded-lg bg-white w-[420px] h-[68px] p-2 border-dashed flex justify-center items-center cursor-pointer relative overflow-hidden"
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

export function CreateStudyProForm() {
    const [createSingleFile] = useCreateSingleFileMutation();
    const [createStuProgram] = useCreateStuProgramMutation();
    const {refetch: refetchStuPrograms} = useGetStudyProgramsQuery({page: 0, pageSize: 10});
    const [isOpen, setIsOpen] = useState(false);

    const {
        data: facultiesData,
    } = useGetFacultiesQuery({page: 0, pageSize: 10});
    const faculties = useSelector((state: RootState) => selectFaculty(state));

    const {
        data: degreesData,
    } = useGetDegreesQuery({page: 0, pageSize: 10});
    const degrees = useSelector((state: RootState) => selectDegree(state));

    const degreeOptions = degrees.map(degree => ({
        value: degree.alias,
        label: degree.level
    }));

    const facultyOptions = faculties.map(faculty => ({
        value: faculty.alias,
        label: faculty.name
    }));


    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        try {
            const fileData = new FormData();
            fileData.append("file", values.logo);

            const fileResponse = await createSingleFile(fileData).unwrap();
            console.log(fileResponse)

            if (fileResponse) {
                const newStuProgram: StudyProgramType = {
                    alias: values.alias,
                    studyProgramName: values.studyProgramName,
                    degreeAlias: values.degreeAlias,
                    facultyAlias: values.facultyAlias,
                    description: values.description,
                    logo: fileResponse.name,
                    isDeleted: values.isDeleted,
                    isDraft: values.isDraft,
                };

                await createStuProgram(newStuProgram).unwrap();
                resetForm();
                refetchStuPrograms();
                setIsOpen(false)
                toast.success('Successfully created!');
            }
        } catch (error) {
            toast.error('Failed to create study program!');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Dialog modal={true} open={isOpen} onOpenChange={setIsOpen}>

            <DialogTrigger asChild>
                <Button onClick={() => setIsOpen(true)} className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add Study Program
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[920px] items-center justify-center bg-white"
                           onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Add Study Program</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue, values}) => (
                        <Form className="py-4 rounded-lg w-full">
                            <div className="grid gap-x-4 grid-cols-2 gap-1 items-center justify-center">

                                {/* studyProgramName */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="studyProgramName">Title</label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field placeholder={`Master of Computer Science`} type="text"
                                           name="studyProgramName"
                                           id="studyProgramName"
                                           onChange={(e: any) => {
                                               setFieldValue(
                                                   "studyProgramName",
                                                   e.target.value
                                               );
                                               setFieldValue(
                                                   "alias",
                                                   slugify(e.target.value, {
                                                       lower: true,
                                                   })
                                               );
                                           }}
                                           className={`${style.input}`}/>
                                </div>

                                {/* alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">Slug</label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field disabled type="text" name="alias" id="alias"
                                           className={`${style.input}`}/>
                                </div>

                                {/* facultyAlias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="facultyAlias">Faculty</label>
                                    </div>
                                    <Select options={facultyOptions}/>
                                </div>

                                {/* degreeAlias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="degreeAlias">Degree</label>
                                    </div>
                                    <Select options={degreeOptions}/>
                                </div>

                                {/* description */}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">Description</label>
                                    <Field
                                        placeholder={`The Master of Computer Science program offers advanced studies in computer science theory, algorithms, and practical applications.`}
                                        as="textarea"
                                        rows={4}
                                        name="description"
                                        id="description"
                                        className={`${style.input}`}
                                    />
                                </div>

                                {/* isDraft */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="isDraft">Visibility</label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <div className="flex gap-4 h-[40px] items-center">
                                        <Field name="isDraft" component={RadioButton} value="false" label="Public"/>
                                        <Field name="isDraft" component={RadioButton} value="true" label="Draft"/>
                                    </div>
                                </div>

                                {/* logo */}
                                <div className="mb-4">
                                    <label htmlFor="logo" className="block text-sm font-medium text-gray-700 my-2">Faculty
                                        Logo</label>
                                    <Field type="file" name="logo" id="logo" component={CustomInput}
                                           setFieldValue={setFieldValue} className="mt-1"/>
                                </div>
                            </div>

                            {/* Submit Button */}
                            <DialogFooter>
                                <Button type="submit"
                                        className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary">Add</Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
