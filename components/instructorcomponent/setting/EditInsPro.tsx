"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import style from "../style.module.css";
import {format} from "date-fns";
import {useState} from "react";
import Image from "next/image";
import {UserStudentType} from "@/lib/types/admin/user";
import {IoCameraOutline} from "react-icons/io5";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {IoIosArrowDown} from "react-icons/io";
import {TbAsterisk} from "react-icons/tb";

const initialValues = {

};

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string()
        .required("Personal Number is required")
        .matches(/^[\d\s]+$/, "Personal Number must be a number"),
    bio: Yup.string().required("Bio is required"),
    currentAddress: Yup.string().required("Current Address is required"),
    birthPlace: Yup.string().required("Place of Birth is required"),
    fam_ph_number: Yup.string()
        .required("Family Number is required")
        .matches(/^[\d\s]+$/, "Family Number must be a number"),
    guardianRelationShip: Yup.string().required("Guardian Relationship is required"),
});

const handleSubmit = async (value: UserStudentType) => {

};

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


export function EditInsProForm() {
    return (
        <section>
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {


                    // post product
                    handleSubmit();
                }}
            >
                {() => (
                    <Form className="py-4 rounded-lg w-full flex flex-col justify-center items-center">

                        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4 justify-center items-center">


                            {/* image */}
                            <div className="h-[200px] w-[200px] relative rounded-[10px] grid row-span-2">
                                <img
                                    src="https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"
                                    alt="banner"
                                    className="h-full w-full rounded-[10px] object-cover"
                                />
                                <div
                                    className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2">
                                    <IoCameraOutline className="w-5 h-5"/>
                                </div>
                            </div>


                            {/* gender */}
                            <div className={style.inputContainer}>
                                <div className="flex">
                                    <label className={style.label} htmlFor="gender">
                                        Gender
                                    </label>
                                    <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                </div>

                                <div className="relative w-full">
                                    <Field
                                        as="select"
                                        name="gender"
                                        id="gender"
                                        className={`${style.input} appearance-none`}
                                    >
                                        <option value="" disabled hidden>
                                            Select Gender
                                        </option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <IoIosArrowDown
                                            className="h-5 w-5 text-gray-400"
                                            aria-hidden="true"
                                        />
                                    </div>
                                </div>
                            </div>


                            {/* Personal Number */}
                            <div className={`${style.inputContainer}`}>
                                <div className="flex">
                                    <label className={`${style.label}`} htmlFor="fam_ph_number">
                                        Personal Number
                                    </label>
                                    <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                </div>

                                <Field
                                    type="fam_ph_number"
                                    name="fam_ph_number"
                                    id="fam_ph_number"
                                    className={`${style.input}`}
                                />
                            </div>


                            {/* Family Number */}
                            <div className={`${style.inputContainer}`}>
                                <div className="flex">
                                    <label className={`${style.label}`} htmlFor="ph_number">
                                        Family Number
                                    </label>
                                    <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                </div>

                                <Field
                                    type="ph_number"
                                    name="ph_number"
                                    id="ph_number"
                                    className={`${style.input}`}
                                />
                                <ErrorMessage
                                    name="ph_number"
                                    component="div"
                                    className={`${style.error}`}
                                />
                            </div>



                            {/*Guardian Relationship*/}
                            <div className="mb-5 ">
                                <div className="flex">
                                    <label className={style.label} htmlFor="guardianRelationShip">Guardian
                                        Relationship</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <Field
                                    type="text"
                                    placeholder="Parents"
                                    name="guardianRelationShip"
                                    id="guardianRelationShip"
                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none "/>
                                <ErrorMessage
                                    name="guardianRelationShip"
                                    component="div"
                                    className={style.error}/>
                            </div>


                            {/* pob */}
                            <div className={`${style.inputContainer}`}>
                                <div className="flex">
                                    <label className={`${style.label}`} htmlFor="pob">
                                        Place Of Birth
                                    </label>
                                    <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                </div>

                                <Field
                                    type="address"
                                    name="pob"
                                    id="pob"
                                    className={`${style.input}`}
                                />
                            </div>


                            {/* address */}
                            <div className={`${style.inputContainer}`}>
                                <div className="flex">
                                    <label className={`${style.label}`} htmlFor="address">
                                        Current Address
                                    </label>
                                    <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                </div>

                                <Field
                                    type="address"
                                    name="address"
                                    id="address"
                                    className={`${style.input}`}
                                />
                            </div>


                            {/* bio */}
                            <div className={`${style.inputContainer}`}>
                                <label className={`${style.label}`} htmlFor="bio">
                                    Bio
                                </label>
                                <Field
                                    type="text"
                                    as="textarea"
                                    name="bio"
                                    id="bio"
                                    className={`${style.input}`}
                                />
                            </div>


                        </div>


                    </Form>
                )}
            </Formik>
        </section>
    );
}
