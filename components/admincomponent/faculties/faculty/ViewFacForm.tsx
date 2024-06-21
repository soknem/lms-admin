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

import {FacultyType} from "@/lib/types/admin/faculty";
import {useState} from "react";
import Image from "next/image";
import {FaCamera} from "react-icons/fa6";
import {useRouter} from "next/navigation";

const initialValues = {
    alias: "",
    name: "",
    description: "",
    address: "",
    logo: "",
    isDraft: false,
    isDeleted: false,
};

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const handleSubmit = async (value: FacultyType) => {
    // const res = await fetch(`https://6656cd809f970b3b36c69232.mockapi.io/api/v1/facultys`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(value),
    // });
    // const data = await res.json()
    // console.log("faculty upload: ", data)
};

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

const CustomInput = ({field, setFieldValue}: any) => {
    const [imagePreview, setImagePreview] = useState("");

    const handleUploadFile = (e: any) => {
        const file = e.target.files[0];
        const localUrl = URL.createObjectURL(file);
        console.log(localUrl);
        setImagePreview(localUrl);

        setFieldValue(field.name, file);
    };
    return (
        <div>
            <input onChange={(e) => handleUploadFile(e)} type="file"/>
            {imagePreview && (
                <Image src={imagePreview} alt="preview" width={200} height={200}/>
            )}
        </div>
    );
};

const currentYear = new Date().getFullYear();
const years = Array.from(new Array(40), (val, index) => currentYear - index);

export function ViewFacForm() {
    const router = useRouter();
    const [open, setOpen] = useState(true);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[480px] bg-white ">
                <DialogHeader>
                    <DialogTitle>Faculty Information</DialogTitle>
                </DialogHeader>
                <Formik
                    initialValues={initialValues}
                    onSubmit={async (values) => {
                        // create faculty post
                        const FacultyPost: FacultyType = {
                            alias: values.alias,
                            name: values.name,
                            description: values.description,
                            address: values.address,
                            logo: values.logo,
                            isDraft: values.isDraft,
                            isDeleted: values.isDeleted,
                        };
                        router.push("/admin/faculties");
                        // post product
                        handleSubmit(FacultyPost);
                    }}
                >
                    {({setFieldValue}) => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col items-center gap-4">
                                {/* faculty logo */}
                                <div
                                    className={`flex items-center justify-center relative ${style.imageContainer}`}
                                >
                                    <img
                                        src="https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQ-d1OG0v3Iyah3hRWqN-Ik9aKcKe-hDk66ZSCftzYOfmI3z-Mk"
                                        alt="faculty"
                                        className="w-full h-full rounded-full"
                                    />
                                </div>

                                {/* faculty title*/}
                                <div className={` ${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="name">
                                        Title
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="Faculty of Engineering"
                                        name="name"
                                        id="name"
                                        className={` ${style.input}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="faculty">
                                        Description
                                    </label>
                                    <Field
                                        type="text"
                                        placeholder="This is main faculty of our academic"
                                        name="faculty"
                                        id="faculty"
                                        className={`${style.input}`}
                                    />
                                </div>

                                {/* status */}
                                <div className={`${style.inputContainer}  `}>
                                    <label className={`${style.label}`} htmlFor="status">
                                        Visibility
                                    </label>
                                    {/* <Field
                    type="number"
                    name="status"
                    id="status"
                    className={`${style.input}`}
                  />
                  */}

                                    <div className="flex gap-4 h-[40px] items-center">
                                        <Field
                                            name="status"
                                            component={RadioButton}
                                            value="1"
                                            label="Public"
                                        />
                                        <Field
                                            name="status"
                                            component={RadioButton}
                                            value="2"
                                            label="Draft"
                                        />
                                        <Field
                                            name="status"
                                            component={RadioButton}
                                            value="3"
                                            label="Disable"
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
