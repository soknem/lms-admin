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
import {useState} from "react";
import Image from "next/image";
import {FaCamera} from "react-icons/fa6";
import {useRouter} from "next/navigation";
import {TbAsterisk} from "react-icons/tb";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";

const initialValues = {
    alias: "",
    name: "",
    description: "",
    address: "",
    logo: "",
    isDeleted: true,
    isDraft: true
};

// const validationSchema = Yup.object().shape({
//     alias: Yup.string().required('Alias is required'),
//     name: Yup.string().required('Title is required'),
//     address: Yup.string().required('Address is required'),
//     isDraft: Yup.boolean().required('Visibility is required'),
//
// });

const RadioButton = ({field, value, label}: any) => {
    return (
        <div>
            <input
                type="radio"
                {...field}
                id={value}
                value={value}
                // checked={field.value === value}
            />
            <label className="pl-2" htmlFor={value}>
                {label}
            </label>
        </div>
    );
};


export function EditFacForm() {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = async (values: any, {setSubmitting, resetForm}: any) => {
        // const [createSingleFile] = useCreateSingleFileMutation();
        //
        // try {
        //     // Upload the logo file
        //     const fileData = new FormData();
        //     fileData.append("file", values.logo);
        //
        //     const fileResponse = await createSingleFile(fileData).unwrap();
        //     console.log(fileResponse)
        //
        //     if (fileResponse) {
        //         // File uploaded successfully, now create the faculty
        //         const newFaculty: FacultyType = {
        //             alias: values.alias,
        //             name: values.name,
        //             description: values.description,
        //             address: values.address,
        //             logo: fileResponse.name, // Assuming the response contains the URL of the uploaded file
        //             isDeleted: values.isDeleted,
        //             isDraft: values.isDraft,
        //         };
        //
        //         // const res = await createFaculty(newFaculty).unwrap();
        //         resetForm();
        //         // Handle success (e.g., show a success message or close the dialog)
        //     }
        // } catch (error) {
        //     // Handle error (e.g., show an error message)
        //     console.error("Error creating faculty: ", error);
        // } finally {
        //     setSubmitting(false);
        // }
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[480px] bg-white ">

                <DialogHeader>
                    <DialogTitle>Edit Faculty</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    // validationSchema={validationSchema}
                    onSubmit={handleSubmit}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1">
                                {/* faculty logo */}
                                <div
                                    className={`flex items-center justify-center relative ${style.imageContainer}`}
                                >
                                    <img
                                        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ-d1OG0v3Iyah3hRWqN-Ik9aKcKe-hDk66ZSCftzYOfmI3z-Mk"
                                        alt="faculty"
                                        className="w-full h-full rounded-full"
                                    />
                                    <div
                                        className="w-8 h-8 bg-lms-background rounded-full flex items-center justify-center absolute right-0 bottom-1">
                                        <FaCamera/>
                                    </div>
                                </div>

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
