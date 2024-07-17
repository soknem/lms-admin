import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FormikHelpers } from "formik";
import * as Yup from "yup";
import { IoCameraOutline, IoArrowDown } from "react-icons/io5";
import { TbAsterisk } from "react-icons/tb";
import {
    usePatchStudentSettingsMutation,
    useUploadProfileImageMutation,
} from "@/lib/features/student/setting/StudentSetting";
import { StudentSetting } from "@/lib/types/student/StudentSetting";
import style from "../style.module.css";
import LoadingIcon from "@/public/loadingIcon";

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
    gender: Yup.string().required("Gender is required"),
    phoneNumber: Yup.string().required("Personal Number is required").matches(/^[\d\s]+$/, "Personal Number must be a number"),
    biography: Yup.string().required("Bio is required"),
    currentAddress: Yup.string().required("Current Address is required"),
    birthPlace: Yup.string().required("Place of Birth is required"),
    familyPhoneNumber: Yup.string().required("Family Number is required").matches(/^[\d\s]+$/, "Family Number must be a number"),
    guardianRelationShip: Yup.string().required("Guardian Relationship is required"),
});

export function EditStudentProForm({
                                   gender,
                                   profileImage,
                                   phoneNumber,
                                   biography,
                                   currentAddress,
                                   familyPhoneNumber,
                                   guardianRelationShip,
                                   birthPlace,
                               }: StudentSetting) {

    const [patchStudentSettings] = usePatchStudentSettingsMutation();
    const [uploadProfileImage] = useUploadProfileImageMutation();
    const [profileImagePreview, setProfileImagePreview] = useState(profileImage);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues: StudentSetting = {
        gender,
        profileImage,
        phoneNumber,
        biography,
        currentAddress,
        familyPhoneNumber,
        guardianRelationShip,
        birthPlace,
    };

    const handleSubmit = async (values: StudentSetting, { resetForm }: FormikHelpers<StudentSetting>) => {
        setIsSubmitting(true);
        try {
            const response = await patchStudentSettings(values).unwrap();
            resetForm();
            // onFormSubmit();
        } catch (error) {
            console.error("Error submitting form: ", error);
        } finally {
            setIsSubmitting(false);
        }
    };

    console.log(" BEFORE SELECT TO UPLOAD IMAGE")
    const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>, setFieldValue: any) => {
        console.log(" SELECT TO UPLOAD IMAGE")
        const file = event.currentTarget.files?.[0];
        console.log(" FILE", file)
        if (file && SUPPORTED_FORMATS.includes(file.type) && file.size <= FILE_SIZE) {
            console.log(" FILE SIZE", file.size)
            const formData = new FormData();
            console.log(" FORM DATA", formData)
            formData.append("file", file);
            console.log("Uploading image: ", file);

            try {
                const response = await uploadProfileImage(formData).unwrap();
                console.log(" RESPONSE", response)
                const { name, uri } = response;

                setProfileImagePreview(uri);
                setFieldValue("profileImage", name);
                console.log("Image uploaded successfully: ", response)
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
                initialValues={initialValues}
                validationSchema={validationSchema}
                enableReinitialize={true}
                onSubmit={handleSubmit}
            >

                {({ setFieldValue }) => (

                    <Form className="pb-6 rounded-lg w-full flex flex-col justify-center items-center">


                        <div className="w-full grid lg:gap-x-4 gap-x-2 lg:grid-cols-3 justify-center md:grid-cols-2 grid-cols-1">

                            {/* Profile Image*/}
                            <div className="h-[180px] w-[180px] relative rounded-[10px] grid row-span-2 ">
                                <div
                                    style={{
                                        width: '180px',
                                        height: '180px',
                                        backgroundImage: `url(${profileImagePreview || "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png"})`,
                                        backgroundSize: 'cover',
                                        backgroundRepeat: 'no-repeat',
                                        borderRadius: '10px'
                                    }}
                                    className="h-full w-full object-cover "
                                ></div>

                                {/*Upload Image*/}
                                <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2">
                                    <input
                                        type="file"
                                        accept="image/*"
                                        className="absolute w-full h-full opacity-0 cursor-pointer"
                                        onChange={(e) => handleImageUpload(e, setFieldValue)}
                                    />
                                    <IoCameraOutline className="w-5 h-5" />
                                </div>
                            </div>

                            {/*Gender*/}
                            <section>
                                <div className="flex mt-3 ">
                                    <label className={style.label} htmlFor="gender">
                                        Gender
                                    </label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <div className="relative w-full">
                                    <Field
                                        as="select"
                                        name="gender"
                                        id="gender"
                                        className={`${style.input} `}
                                    >
                                        <option value="" disabled hidden>Select Gender</option>
                                        <option value="M">Male</option>
                                        <option value="F">Female</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <IoArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </div>
                                <ErrorMessage name="gender" component="div" className={style.error} />
                            </section>

                            {/*Phone number*/}
                            <section>
                                <div className="flex mt-3 ">
                                    <label className={style.label} htmlFor="phoneNumber">Personal Number</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field
                                    type="text"
                                    name="phoneNumber"
                                    id="phoneNumber"
                                    placeholder="086 341 985"
                                    className={`${style.input} `}
                                />
                                <ErrorMessage name="phoneNumber" component="div" className={style.error} />
                            </section>

                            {/*Family Phone number*/}
                            <section>
                                <div className="flex mt-3 ">
                                    <label className={style.label} htmlFor="familyPhoneNumber">Family Number</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field
                                    type="text"
                                    name="familyPhoneNumber"
                                    id="familyPhoneNumber"
                                    placeholder="016 359 615"
                                    className={`${style.input} `}
                                />
                                <ErrorMessage name="familyPhoneNumber" component="div" className={style.error} />
                            </section>

                            {/*Guardian Relationship*/}
                            <section>
                                <div className="flex mt-3 ">
                                    <label className={style.label} htmlFor="guardianRelationShip">Guardian Relationship</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <div className="relative w-full">
                                    <Field
                                        as="select"
                                        name="guardianRelationShip"
                                        id="guardianRelationShip"
                                        className={`${style.input} `}
                                    >
                                        <option value="" disabled hidden>Select Guardian Relationship</option>
                                        <option value="Mother">Mother</option>
                                        <option value="Father">Father</option>
                                        <option value="Sibling">Sibling</option>
                                        <option value="Other">Other</option>
                                    </Field>
                                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                                        <IoArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                                    </div>
                                </div>
                                <ErrorMessage name="guardianRelationShip" component="div" className={style.error} />
                            </section>

                            {/*Place Of Birth*/}
                            <section>
                                <div className="flex mt-3 ">
                                    <label className={style.label} htmlFor="birthPlace">Place of Birth</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field
                                    as="textarea"
                                    name="birthPlace"
                                    placeholder="House 123 , Street 310 , Phum 4 , Boeung Keng Kang 1 , Chamkarmon , Phnom Penh , Cambodia"
                                    id="birthPlace"
                                    rows="2"
                                    cols="30"
                                    className={`${style.input} `}
                                />
                                <ErrorMessage name="birthPlace" component="div" className={style.error} />
                            </section>

                            {/*Current Address*/}
                            <section>
                                <div className="flex mt-3 ">
                                    <label className={style.label} htmlFor="currentAddress">Current Address</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field
                                    as="textarea"
                                    name="currentAddress"
                                    id="currentAddress"
                                    placeholder="House 123 , Street 310 , Phum 4 , Boeung Keng Kang 1 , Chamkarmon , Phnom Penh , Cambodia"
                                    className={`${style.input} `} rows="2"
                                    cols="30"
                                />
                                <ErrorMessage name="currentAddress" component="div" className={style.error} />
                            </section>

                            {/*Bio*/}
                            <section>
                                <div className="flex mt-3 ">
                                    <label className={style.label} htmlFor="biography">Bio</label>
                                    <TbAsterisk className="w-2 h-2 text-lms-error" />
                                </div>
                                <Field
                                    as="textarea"
                                    name="biography"
                                    id="biography"
                                    placeholder="I am a student at Liger Leadership Academy. I am studying in the foundation program. I am 15 years old."
                                    className={`${style.input} `} rows="2"
                                    cols="30"
                                />
                                <ErrorMessage name="biography" component="div" className={style.error} />
                            </section>
                        </div>

                        {/*Submit Button*/}
                        <button
                            type="submit"
                            className="absolute bottom-0 right-0 mt-4 px-4 py-2 bg-lms-primary hover:bg-blue-700 text-white rounded-xl flex items-center justify-center w-24"  // Added w-24 for fixed width
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

export default EditStudentProForm;
