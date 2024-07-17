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

import {DegreeType, FacultyType, StudyProgramType} from "@/lib/types/admin/faculty";
import React, {useEffect, useRef, useState} from "react";
import Image from "next/image";
import {TbAsterisk} from "react-icons/tb";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {
    useEditStuProByAliasMutation,
    useGetStuProByAliasQuery
} from "@/lib/features/admin/faculties/studyProgram/studyprogram";

import {IoCameraOutline} from "react-icons/io5";
import {toast} from "react-hot-toast";
import logo_holder from "@/public/common/logo_holder.png";
import slugify from "slugify";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculties/faculty/faculty";
import {useGetDegreesQuery} from "@/lib/features/admin/faculties/degree/degree";

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
    alias: Yup.string()
        .required('Alias is required'),
    studyProgramName: Yup.string()
        .required('Study Program Name is required'),
    logo: Yup.mixed()
        .test("fileFormat", "Unsupported Format", (value: any) => {
            if (!value) return true;
            return SUPPORTED_FORMATS.includes(value.type);
        })
        .test("fileSize", "File Size is too large", (value: any) => {
            if (!value) return true;
            return value.size <= FILE_SIZE;
        })
        .nullable(),
    isDraft: Yup.boolean(),
    degreeAlias: Yup.string()
        .required('Degree Alias is required'),
    facultyAlias: Yup.string()
        .required('Faculty Alias is required'),
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
                        src={imagePreview || logo_holder}
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
    const [faculties, setFaculties] = useState<{ value: string; label: string }[]>([]);
    const [degrees, setDegrees] = useState<{ value: string; label: string }[]>([]);
    const {
        data: facultiesData,
    } = useGetFacultiesQuery({page: 0, pageSize: 0});

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

    useEffect(() => {
        if (facultiesData) {
            const facultiesOption = facultiesData?.content?.map((faculty: FacultyType) => ({
                value: faculty.alias,
                label: faculty.name
            }));
            setFaculties(facultiesOption);
        }
    }, [facultiesData, dispatch]);
    const getFacultiesLabel = (value: string) => {
        const option = faculties.find(option => option.value === value);
        return option ? option.label : '';
    };

    const {
        data: degreesData,
    } = useGetDegreesQuery({page: 0, pageSize: 0});

    useEffect(() => {
        if (degreesData) {
            const degreesOption = degreesData?.content?.map((degree: DegreeType) => ({
                value: degree.alias,
                label: degree.level
            }));
            setDegrees(degreesOption);
        }
    }, [degreesData, dispatch]);

    const getDegreesLabel = (value: string) => {
        const option = degrees.find(option => option.value === value);
        return option ? option.label : '';
    };


    useEffect(() => {
        if (isSuccess && stuProData) {
            setInitialValues({
                alias: stuProData.alias,
                studyProgramName: stuProData.studyProgramName,
                logo: stuProData.logo,
                description: stuProData.description || "No description",
                isDraft: stuProData.isDraft,
                degreeAlias: stuProData.degree.alias,
                facultyAlias: stuProData.faculty.alias,
                isDeleted: stuProData.isDeleted,
            });
            setInitialAlias(stuProData.alias);
            setLogo(stuProData.logo)
        }
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
            onClose();
            toast.success('Successfully updated!');

        } catch (error) {
            toast.error('Failed to update study program');
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
                    {({setFieldValue, isSubmitting}) => (
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
                                    <Field
                                        disabled
                                        placeholder={`master-of-computer-science`}
                                        type="text"
                                        name="alias"
                                        id="alias"
                                        className={`${style.input}`}/>
                                    <ErrorMessage
                                        name="alias"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* facultyAlias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="facultyAlias">Faculty</label>
                                    </div>

                                    <Field
                                        disabled
                                        type="text"
                                        name="fileType"
                                        id="fileType"
                                        value={getFacultiesLabel(initialValues.facultyAlias)} // Set value to pre-populate
                                        onChange={(option: any) => setFieldValue("facultyAlias", option?.value)}
                                        className={`${style.input}`}
                                    />
                                </div>

                                {/* degreeAlias */}
                                <div className={`${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="degreeAlias">Degree</label>
                                    </div>
                                    <Field
                                        disabled
                                        type="text"
                                        name="fileType"
                                        id="fileType"
                                        value={getDegreesLabel(initialValues.degreeAlias)} // Set value to pre-populate
                                        onChange={(option: any) => setFieldValue("degreeAlias", option?.value)}
                                        className={`${style.input}`}
                                    />
                                </div>

                                {/* description */}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">Description</label>
                                    <Field
                                        as={`textarea`}
                                        rows={4}
                                        name="description"
                                        id="description"
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
                                    disabled={isSubmitting}
                                >
                                    {isSubmitting ? 'Editing...' : 'Save Changes'}
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
