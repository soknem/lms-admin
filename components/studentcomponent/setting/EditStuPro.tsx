"use client";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { TbAsterisk } from "react-icons/tb";
import style from "../style.module.css";
import { StudentSetting } from "@/lib/types/student/StudentSetting";
import { useDispatch } from 'react-redux';
import { setStudentSetting } from '@/lib/features/student/setting/StudentProfileSlice';
import { useGetStudentSettingsMutation, useUploadProfileImageMutation } from "@/lib/features/student/setting/StudentSetting";

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

export function EditStuProForm({
                                   gender,
                                   profileImage,
                                   phoneNumber,
                                   bio,
                                   currentAddress,
                                   fam_ph_number,
                                   guardianRelationShip,
                                   birthPlace,
                               }: StudentSetting) {
    const dispatch = useDispatch();
    const [getStudentSettings] = useGetStudentSettingsMutation();
    const [uploadProfileImage, { isLoading: isUploading, error: uploadError }] = useUploadProfileImageMutation();

    const initialValues: StudentSetting = {
        gender: gender,
        profileImage: profileImage,
        phoneNumber: phoneNumber,
        bio: bio,
        currentAddress: currentAddress,
        fam_ph_number: fam_ph_number,
        guardianRelationShip: guardianRelationShip,
        birthPlace: birthPlace,
    };

    const [studentData, setStudentData] = useState<StudentSetting>(initialValues);

    const handleSubmit = async (values: StudentSetting, { resetForm }: FormikHelpers<StudentSetting>) => {
        try {
            const response = await getStudentSettings(values).unwrap();
            console.log(response);
            dispatch(setStudentSetting(values));
            resetForm();
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file && SUPPORTED_FORMATS.includes(file.type) && file.size <= FILE_SIZE) {
            const formData = new FormData();
            formData.append("file", file);

            try {
                const response = await uploadProfileImage(formData).unwrap();
                setStudentData((prevData) => ({
                    ...prevData,
                    profileImage: response.name,
                    profileImageName: response.uri
                }));
                console.log("Image uploaded successfully: ", response.uri);
                console.log("Image uploaded successfully: ", response.name);
            } catch (error) {
                console.error("Failed to upload the image: ", error);
            }
        } else {
            console.error("Invalid file format or size");
        }
    };

    return (
        <section className="w-full py-8 relative">
            <Formik
                initialValues={studentData}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >
                {({ resetForm }) => (
                    <Form className="py-2 rounded-lg w-full flex flex-col justify-center items-center ">
                        <div
                            className=" w-full grid lg:gap-4 gap-2 lg:grid-cols-3 justify-center md:grid-cols-2 grid-cols-1 ">
                            {/* image */}
                            <div className="h-[200px] w-[200px] relative rounded-[10px] grid row-span-2">
                                <img
                                    src={studentData.profileImageName || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"}
                                    alt="profile"
                                    className="h-full w-full rounded-[10px] object-cover"
                                />
                                <div
                                    className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleImageUpload}
                                    />
                                    <IoCameraOutline className="w-5 h-5"/>
                                </div>
                            </div>

                            {/* gender */}
                            <div className="mb-5 ">
                                <div className="flex">
                                    <label className={style.label} htmlFor="gender">Gender</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <div className="relative w-full">
                                    <Field
                                        as="select"
                                        name="gender"
                                        id="gender"
                                        className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none ">
                                        <option value="" disabled hidden>Select Gender</option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <div
                                        className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <IoIosArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                                    </div>
                                </div>
                                <ErrorMessage
                                    name="gender"
                                    component="div"
                                    className={style.error}/>
                            </div>

                            {/* Personal Number */}
                            <div className="mb-5 ">
                                <div className="flex">
                                    <label className={style.label} htmlFor="phoneNumber">Personal Number</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <Field
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="086 341 985"
                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none "/>
                                <ErrorMessage
                                    name="phoneNumber"
                                    component="div"
                                    className={style.error}/>
                            </div>

                            {/* Family Number */}
                            <div className="mb-5 ">
                                <div className="flex">
                                    <label className={style.label} htmlFor="fam_ph_number">Family Number</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <Field
                                    type="text"
                                    name="fam_ph_number"
                                    id="fam_ph_number"
                                    placeholder="016 359 615"
                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none "/>
                                <ErrorMessage
                                    name="fam_ph_number"
                                    component="div"
                                    className={style.error}/>
                            </div>

                            {/* Guardian Relationship */}
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

                            {/* Birth Place */}
                            <div className="mb-5 ">
                                <div className="flex">
                                    <label className={style.label} htmlFor="birthPlace">Place Of Birth</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <Field
                                    as="textarea"
                                    name="birthPlace"
                                    placeholder="House 123 , Street 310 , Phum 4 , Boeung Keng Kang 1 , Chamkarmon , Phnom Penh , Cambodia"
                                    id="birthPlace"
                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none "
                                    rows="2"
                                    cols="30"/>
                                <ErrorMessage
                                    name="birthPlace"
                                    component="div"
                                    className={style.error}/>
                            </div>

                            {/* Address */}
                            <div className="mb-5 ">
                                <div className="flex">
                                    <label className={style.label} htmlFor="currentAddress">Current Address</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <Field
                                    as="textarea"
                                    name="currentAddress"
                                    id="currentAddress"
                                    placeholder="House 123 , Street 310 , Phum 4 , Boeung Keng Kang 1 , Chamkarmon , Phnom Penh , Cambodia"
                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none "
                                    rows="2"
                                    cols="30"/>
                                <ErrorMessage
                                    name="currentAddress"
                                    component="div"
                                    className={style.error}/>
                            </div>

                            {/* Bio */}
                            <div className="mb-5 ">
                                <div className="flex">
                                    <label className={style.label} htmlFor="bio">Bio</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error"/>
                                </div>
                                <Field
                                    as="textarea"
                                    name="bio"
                                    id="bio"
                                    placeholder="I am a student at Liger Leadership Academy. I am studying in the foundation program. I am 15 years old."
                                    className=" bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2 focus:outline-blue-600 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 appearance-none "
                                    rows="2"
                                    cols="30"/>
                                <ErrorMessage
                                    name="bio"
                                    component="div"
                                    className={style.error}/>
                            </div>
                        </div>

                        <button
                            type="submit"
                            className=" absolute bottom-0 right-0 mt-4 px-4 py-2 bg-lms-primary hover:bg-blue-700 text-white rounded-xl  ">
                            Submit
                        </button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}
