'use client'
import React, {useState} from "react";
import {Formik, Form, Field, ErrorMessage, FormikHelpers} from "formik";
import * as Yup from "yup";
import {IoCameraOutline, IoArrowDown} from "react-icons/io5";
import {TbAsterisk} from "react-icons/tb";
import {useDispatch} from "react-redux";
import { useUpdateSettingInstructorMutation } from "@/lib/features/instructor/course/instructorCourse";
import { useCreateSingleFileMutation } from "@/lib/features/uploadfile/file";
import {StudentSetting} from "@/lib/types/student/StudentSetting";
import style from "../style.module.css";
import {InstructorSettingRequest} from "@/lib/types/instructor/setting";
import LoadingIcon from "@/public/loadingIcon";

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string().required("Personal Number is required").matches(/^[\d\s]+$/, "Personal Number must be a number"),
    currentAddress: Yup.string().required("Current Address is required"),
    birthPlace: Yup.string().required("Place of Birth is required"),
    linkGit: Yup.string().url("Invalid URL").required("Git link is required"),
    linkLinkedin: Yup.string().url("Invalid URL").required("Linkedin link is required"),
    linkTelegram: Yup.string().url("Invalid URL").required("Telegram link is required"),
});

export function EditInstructorProForm({
                                          gender,
                                          profileImage,
                                          phoneNumber,
                                          bio,
                                          linkGit,
                                          linkLinkedin,
                                          linkTelegram,
                                          currentAddress,
                                          birthPlace,

                                      }: InstructorSettingRequest) {
    const dispatch = useDispatch();
    const [patchStudentSettings] = useUpdateSettingInstructorMutation();
    const [uploadProfileImage] = useCreateSingleFileMutation();
    const [profileImagePreview, setProfileImagePreview] = useState(profileImage);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues: InstructorSettingRequest = {
        gender,
        profileImage,
        phoneNumber,
        bio,
        linkGit,
        linkLinkedin,
        linkTelegram,
        currentAddress,
        birthPlace,
    };

    const handleSubmit = async (values: InstructorSettingRequest, {resetForm}: FormikHelpers<InstructorSettingRequest>) => {
        setIsSubmitting(true);
        try {
            const response = await patchStudentSettings(values).unwrap();
            console.log(response);
            resetForm();
        } catch (error) {
            console.error("Error submitting form: ", error);
        }
        finally {
            setIsSubmitting(false);

        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        const file = event.currentTarget.files?.[0];
        if (file && SUPPORTED_FORMATS.includes(file.type) && file.size <= FILE_SIZE) {
            const formData = new FormData();
            formData.append("file", file);

            console.log("Uploading image...", formData);
            try {
                const response = await uploadProfileImage(formData).unwrap();
                console.log("response", response);
                const {name, uri} = response;

                console.log("name", name);
                console.log("uri", uri);


                setProfileImagePreview(uri);
                setFieldValue("profileImage", name);

                console.log(`Image uploaded successfully: ${name}, ${uri}`);
            } catch (error) {
                console.error("Failed to upload the image: ", error);
            }
        } else {
            console.error("Invalid file format or size");
        }
    };

    return (
        <section className="w-full py-8 relative ">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {({setFieldValue}) => (
                    <Form className="pb-6 rounded-lg w-full flex flex-col justify-center items-center">
                        <div
                            className="w-full grid lg:gap-4 gap-2 lg:grid-cols-3 justify-center md:grid-cols-2 grid-cols-1">
                            <div className="h-[200px] w-[200px] relative rounded-[10px] grid row-span-2">
                                <div
                                    style={{
                                        width: '200px',
                                        height: '200px',
                                        backgroundImage: `url(${profileImagePreview || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        borderRadius: '10px'
                                    }}
                                    className="h-full w-full object-cover"
                                ></div>
                                <div
                                    className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => handleImageUpload(e, setFieldValue)}
                                    />
                                    <IoCameraOutline className="w-5 h-5"/>
                                </div>
                            </div>

                            <div className="mb-5">
                                <div className="flex">
                                    <label className={style.label} htmlFor="gender">Gender</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <div className="relative w-full">
                                    <Field
                                        as="select"
                                        name="gender"
                                        id="gender"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none">
                                        <option value="" disabled hidden>Select Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <IoArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </div>
                                </div>
                                <ErrorMessage name="gender" component="div" className={style.error}/>
                            </div>

                            <div className="mb-5">
                                <div className="flex">
                                    <label className={style.label} htmlFor="phoneNumber">Personal Number</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <Field
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="086 341 985"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"/>
                                <ErrorMessage name="phoneNumber" component="div" className={style.error}/>
                            </div>

                            {/*Telegram Link*/}
                            <div className="mb-5">
                                <div className="flex">
                                    <label className={style.label} htmlFor="linkTelegram">Telegram Link</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <Field
                                    type="text"
                                    name="linkTelegram"
                                    id="linkTelegram"
                                    placeholder="https://t.me/username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"/>
                                <ErrorMessage name="linkTelegram" component="div" className={style.error}/>
                            </div>

                            {/*Git Link*/}
                            <div className="mb-5">
                                <div className="flex">
                                    <label className={style.label} htmlFor="linkGit">Git Link</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <Field
                                    type="text"
                                    name="linkGit"
                                    id="linkGit"
                                    // ulr git link
                                    placeholder=" https://github.com/username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"/>
                                <ErrorMessage name="linkGit" component="div" className={style.error}/>
                            </div>


                            {/*Linkedin Link*/}
                            <div className="mb-5">
                                <div className="flex">
                                    <label className={style.label} htmlFor="linkLinkedin">Telegram Link</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <Field
                                    type="text"
                                    name="linkLinkedin"
                                    id="linkLinkedin"
                                    placeholder="https://www.linkedin.com/in/username"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"/>
                                <ErrorMessage name="linkLinkedin" component="div" className={style.error}/>
                            </div>


                            <div className="mb-5">
                                <div className="flex">
                                    <label className={style.label} htmlFor="birthPlace">Place of Birth</label>
                                </div>
                                <Field
                                    as="textarea"
                                    name="birthPlace"
                                    placeholder="House 123 , Street 310 , Phum 4 , Boeung Keng Kang 1 , Chamkarmon , Phnom Penh , Cambodia"
                                    id="birthPlace"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
                                    rows="2"
                                    cols="30"/>
                                <ErrorMessage name="birthPlace" component="div" className={style.error}/>
                            </div>

                            <div className="mb-5">
                                <div className="flex">
                                    <label className={style.label} htmlFor="currentAddress">Current Address</label>
                                </div>
                                <Field
                                    as="textarea"
                                    name="currentAddress"
                                    id="currentAddress"
                                    placeholder="House 123 , Street 310 , Phum 4 , Boeung Keng Kang 1 , Chamkarmon , Phnom Penh , Cambodia"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
                                    rows="2"
                                    cols="30"/>
                                <ErrorMessage name="currentAddress" component="div" className={style.error}/>
                            </div>

                            <div className="mb-5">
                                <div className="flex">
                                    <label className={style.label} htmlFor="bio">Bio</label>
                                </div>
                                <Field
                                    as="textarea"
                                    name="bio"
                                    id="bio"
                                    placeholder="I am a student at Liger Leadership Academy. I am studying in the foundation program. I am 15 years old."
                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none"
                                    rows="2"
                                    cols="30"/>
                                <ErrorMessage name="bio" component="div" className={style.error}/>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className="absolute mb-6 bottom-0 right-0 mt-4 px-4 py-2 bg-lms-primary hover:bg-blue-700 text-white rounded-xl flex items-center justify-center w-24"  // Added w-24 for fixed width
                            disabled={isSubmitting}  // Disable button when submitting
                        >
                            {isSubmitting ? <LoadingIcon/> : 'Submit'}
                        </button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}

export default EditInstructorProForm;
