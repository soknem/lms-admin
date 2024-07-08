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

import {StudyProgramType} from "@/lib/types/admin/faculty";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {TbAsterisk} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {
    useEditStuProByAliasMutation,
    useGetStudyProgramsQuery, useGetStuProByAliasQuery
} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculties/faculty/faculty";
import {selectFaculty, setFaculties} from "@/lib/features/admin/faculties/faculty/facultySlice";
import {useGetDegreesQuery} from "@/lib/features/admin/faculties/degree/degree";
import {selectDegree, setDegrees} from "@/lib/features/admin/faculties/degree/degreeSlice";
import {IoCameraOutline} from "react-icons/io5";

// const validationSchema = Yup.object().shape({
//     alias: Yup.string().required("Required"),
//     studyProgramName: Yup.string().required("Required"),
//     logo: Yup.string().required("Required"),
//     description: Yup.string(),
//     isDeleted: Yup.boolean().required("Required"),
//     isDraft: Yup.boolean().required("Required"),
//     degreeAlias: Yup.string().required("Required"),
//     facultyAlias: Yup.string().required("Required")
// });

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

export function EditStudyProForm({alias, onClose}: { alias: string; onClose: () => void }) {
    const dispatch = useDispatch<AppDispatch>();
    const [open, setOpen] = useState(true);
    const [createSingleFile] = useCreateSingleFileMutation();
    const [editStuProgram] = useEditStuProByAliasMutation();

    const [initialAlias, setInitialAlias] = useState("");
    const [logo, setLogo] = useState(null);
    const {data: stuProData, isSuccess} = useGetStuProByAliasQuery(alias);
    const {refetch: refetchStuPrograms} = useGetStudyProgramsQuery({page: 0, pageSize: 10});
    const [initialValues, setInitialValues] = useState({
        alias: "",
        studyProgramName: "",
        description: "",
        logo: "",
        isDraft: false,
        degreeAlias: "",
        isDeleted: false,
        facultyAlias: "",
    });

    const {
        data: facultiesData,
    } = useGetFacultiesQuery({page: 0, pageSize: 10});
    const faculties = useSelector((state: RootState) => selectFaculty(state));

    useEffect(() => {
        if (facultiesData) {
            dispatch(setFaculties(facultiesData.content));
        }

    }, [facultiesData, dispatch]);

    const {
        data: degreesData,
    } = useGetDegreesQuery({page: 0, pageSize: 10});
    const degrees = useSelector((state: RootState) => selectDegree(state));

    useEffect(() => {
        if (degreesData) {
            dispatch(setDegrees(degreesData.content));
        }

    }, [degreesData, dispatch]);

    useEffect(() => {
        if (isSuccess && stuProData) {
            setInitialValues({
                alias: stuProData.alias,
                studyProgramName: stuProData.studyProgramName,
                logo: stuProData.logo,
                description: stuProData.description,
                isDraft: stuProData.isDraft,
                degreeAlias: stuProData.degree.alias,
                facultyAlias: stuProData.faculty.alias,
                isDeleted: stuProData.isDeleted,
            });
            setInitialAlias(stuProData.alias);
            setLogo(stuProData.logo)
        }

        console.log("Initial values: ", initialValues);
    }, [isSuccess, stuProData]);
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
                // If the logo hasn't changed, set logoUrl to null
                logoUrl = null;
            }

            const edtStuProByAlias: StudyProgramType = {
                alias: values.alias,
                studyProgramName: values.studyProgramName,
                description: values.description,
                degreeAlias: values.degreeAlias,
                facultyAlias: values.facultyAlias,
                isDeleted: values.isDeleted,
                logo: logoUrl,
                isDraft: values.isDraft,
            };


            console.log("Edit study program: ", edtStuProByAlias);
            await editStuProgram({alias: initialAlias, updatedData: edtStuProByAlias}).unwrap();

            // Now update the alias if it has changed
            if (values.alias !== initialAlias) {
                await editStuProgram({
                    alias: values.alias,
                    updatedData: {
                        ...edtStuProByAlias,
                        alias: values.alias,
                    }
                }).unwrap();
            }


            resetForm();
            refetchStuPrograms();
            onClose();
            console.log("Edit successfully");
        } catch (error) {
            console.error("Error Editing study program: ", error);
        } finally {
            setSubmitting(true);
        }
    };

    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="w-[920px] items-center justify-center bg-white"
                           onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle>Edit Study Program</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={handleSubmit}

                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="grid gap-x-4 grid-cols-2 gap-1 items-center justify-center">

                                <div className="w-full grid col-span-2 ">
                                    <div className={`w-full flex items-center justify-between`}>
                                        <Field
                                            name="logo"
                                            component={CustomInput}
                                            setFieldValue={setFieldValue}
                                            previewUrl={initialValues.logo}
                                        />
                                    </div>
                                </div>

                                {/* studyProgramName */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="studyProgramName">Title</label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field type="text" name="studyProgramName" id="studyProgramName"
                                           className={`${style.input}`}/>
                                </div>

                                {/* alias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">Slug</label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field type="text" name="alias" id="alias" className={`${style.input}`}/>
                                </div>

                                {/* description */}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">Description</label>
                                    <Field as={`textarea`} name="description" id="description"
                                           className={`${style.input}`}/>
                                </div>

                                {/* isDraft */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="isDraft">Visibility</label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <div className="flex gap-4 h-[40px] items-center">
                                        <Field name="isDraft" component={RadioButton} value={false} label="Public"/>
                                        <Field name="isDraft" component={RadioButton} value={true} label="Draft"/>
                                    </div>
                                </div>

                            </div>

                            {/* button submit */}
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
