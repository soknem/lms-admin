// EditStuProForm.tsx
"use client";
import { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { TbAsterisk } from "react-icons/tb";
import style from "../style.module.css";
import { StudentSetting } from "@/lib/types/student/StudentSetting";
import { useDispatch } from 'react-redux';
import { setStudentSetting } from '@/lib/features/student/setting/StudentProfileSlice';
import { useGetStudentSettingsMutation } from '@/lib/features/student/setting/StudentSetting';







const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];




const validationSchema = Yup.object().shape({
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string().required("Personal Number is required"),
    bio: Yup.string().required("Bio is required"),
    currentAddress: Yup.string().required("Current Address is required"),
    birthPlace: Yup.string().required("Place of Birth is required"),
    fam_ph_number: Yup.string().required("Family Number is required"),
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

    const handleSubmit = async (values: StudentSetting) => {
        try {
            const response = await getStudentSettings(values).unwrap();
            console.log(response);
            dispatch(setStudentSetting(values));
        } catch (error) {
            console.log(error);
        }
    };

    const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.currentTarget.files?.[0];
        if (file && SUPPORTED_FORMATS.includes(file.type) && file.size <= FILE_SIZE) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setStudentData({ ...studentData, profileImage: reader.result as string });
            };
            reader.readAsDataURL(file);
        } else {
            console.error("Invalid file format or size");
        }
    };

    return (
        <section className="w-full">
            <Formik
                initialValues={studentData}
                validationSchema={validationSchema}
                onSubmit={handleSubmit}
            >
                {() => (
                    <Form className="py-4 rounded-lg w-full flex flex-col justify-center items-center">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                            {/* image */}
                            <div className="h-[170px] w-[164px] relative rounded-[10px] grid row-span-2">
                                <img
                                    src={studentData.profileImage || "https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"}
                                    alt="profile"
                                    className="h-full w-full rounded-[10px] object-cover"
                                />
                                <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute w-full h-full opacity-0 cursor-pointer"
                                        onChange={handleImageUpload}
                                    />
                                    <IoCameraOutline className="w-5 h-5" />
                                </div>
                            </div>

                            {/* gender */}
                            <div className={style.inputContainer}>
                                <div className="flex">
                                    <label className={style.label} htmlFor="gender">Gender</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <div className="relative w-full">
                                    <Field as="select" name="gender" id="gender" className={`${style.input} appearance-none`}>
                                        <option value="" disabled hidden>Select Gender</option>
                                        <option value=""></option>
                                        <option value="Male">Male</option>
                                        <option value="Female">Female</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <IoIosArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </div>
                                <ErrorMessage name="gender" component="div" className={style.error} />
                            </div>

                            {/* Personal Number */}
                            <div className={style.inputContainer}>
                                <div className="flex">
                                    <label className={style.label} htmlFor="phoneNumber">Personal Number</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field type="text" name="phoneNumber" id="phoneNumber" className={style.input} />
                                <ErrorMessage name="phoneNumber" component="div" className={style.error} />
                            </div>

                            {/* Family Number */}
                            <div className={style.inputContainer}>
                                <div className="flex">
                                    <label className={style.label} htmlFor="fam_ph_number">Family Number</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field type="text" name="fam_ph_number" id="fam_ph_number" className={style.input} />
                                <ErrorMessage name="fam_ph_number" component="div" className={style.error} />
                            </div>

                            {/* Guardian Relationship */}
                            <div className={style.inputContainer}>
                                <div className="flex">
                                    <label className={style.label} htmlFor="guardianRelationShip">Guardian Relationship</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field type="text" name="guardianRelationShip" id="guardianRelationShip" className={style.input} />
                                <ErrorMessage name="guardianRelationShip" component="div" className={style.error} />
                            </div>

                            {/* Place Of Birth */}
                            <div className={style.inputContainer}>
                                <div className="flex">
                                    <label className={style.label} htmlFor="birthPlace">Place Of Birth</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field as="textarea" name="birthPlace" id="birthPlace" className={style.input} rows="2" cols="30" />
                                <ErrorMessage name="birthPlace" component="div" className={style.error} />
                            </div>

                            {/* Address */}
                            <div className={style.inputContainer}>
                                <div className="flex">
                                    <label className={style.label} htmlFor="currentAddress">Current Address</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field as="textarea" name="currentAddress" id="currentAddress" className={style.input} rows="2" cols="30" />
                                <ErrorMessage name="currentAddress" component="div" className={style.error} />
                            </div>

                            {/* Bio */}
                            <div className={style.inputContainer}>
                                <div className="flex">
                                    <label className={style.label} htmlFor="bio">Bio</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field as="textarea" name="bio" id="bio" className={style.input} rows="2" cols="30" />
                                <ErrorMessage name="bio" component="div" className={style.error} />
                            </div>
                        </div>

                        <button type="submit" className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">Submit</button>
                    </Form>
                )}
            </Formik>
        </section>
    );
}
