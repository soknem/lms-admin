"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { format } from "date-fns";
import { useState } from "react";
import Image from "next/image";
import { IoCameraOutline } from "react-icons/io5";
import { IoIosArrowDown } from "react-icons/io";
import { TbAsterisk } from "react-icons/tb";
import style from "../style.module.css";
import { FieldInputProps, FormikHelpers } from 'formik';


const initialValues = {
  card_id: 0,
  email: "NounSovanthorn@istad.com",
  name_en: "Noun Sovanthorn",
  name_kh: "នួន សុវណ្ណថន",
  gender: "Male" || "Female" || "Other",
  dob: format(new Date(2000, 11, 5), "yyyy-MM-dd"),
  ph_number: "098456723",
  fam_ph_number: "098456723",
  pob: "No. 24, St. 562, Sangkat Boeung kak I, Khan Toul Kork, Phnom Penh, Cambodia",
  address: "No. 24, St. 562, Sangkat Boeung kak I, Khan Toul Kork, Phnom Penh, Cambodia",
  bio: "Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.",
  status: "Active" || "Drop" || "Disable" || "Hiatus",
  high_school: "",
  guaedian_rel: "",
  know_istad: "",
  class_stu: "",
  diploma: "",
  grade: "",
  shift: "",
  degree: "",
  study_pro: ""
};

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  card_id: Yup.number(),
  email: Yup.string(),
  name_en: Yup.string(),
  name_kh: Yup.string(),
  ph_number: Yup.number(),
  profile: Yup.string()
      .nullable()
      .test("fileFormat", "Unsupported Format", (value: string | null | undefined) => {
        if (!value) {
          return true;
        }
        // Ensure value is of type File before accessing 'type' property
        if (typeof value === 'object' && 'type' in value) {
          return SUPPORTED_FORMATS.includes(value);
        }
        return false;
      })
      .test("fileSize", "File Size is too large", (value: string | null | undefined) => {
        if (!value) {
          return true;
        }
        // Ensure value is of type File before accessing 'size' property
        if (typeof value === 'object' && 'size' in value) {
          return value <= FILE_SIZE;
        }
        return false;
      })
      .required("Required"),
});

const CustomInput = () => {
  const [imagePreview, setImagePreview] = useState("");


  return (
      <div>
        <input type="file" />
        {imagePreview && <Image src={imagePreview} alt="preview" width={200} height={200} />}
      </div>
  );
};

const currentYear = new Date().getFullYear();
const years = Array.from(new Array(40), (val, index) => currentYear - index);

export function EditStuProForm() {
  return (
      <section className="w-full">
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={async (values) => {
              // create degree post
              const studentPost = {
                card_id: values.card_id,
                email: values.email,
                name_en: values.name_en,
                name_kh: values.name_kh,
                dob: values.dob,
                ph_number: values.ph_number,
                fam_ph_number: values.fam_ph_number,
                pob: values.pob,
                address: values.address,
                bio: values.bio,
                gender: values.gender,
                status: values.status,
                high_school: values.high_school,
                guaedian_rel: values.guaedian_rel,
                know_istad: values.know_istad,
                class_stu: values.class_stu,
                diploma: values.diploma,
                grade: values.grade,
                shift: values.shift,
                degree: values.degree,
                study_pro: values.study_pro
              };
            }}
        >
          {() => (
              <Form className="py-4 rounded-lg w-full flex flex-col justify-center items-center">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center items-center">
                  {/* image */}
                  <div className="h-[170px] w-[164px] relative rounded-[10px] grid row-span-2">
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
                      <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <IoIosArrowDown className="h-5 w-5 text-gray-400" aria-hidden="true"/>
                      </div>
                    </div>
                  </div>

                  {/* Personal Number */}
                  <div className={style.inputContainer}>
                    <div className="flex">
                      <label className={style.label} htmlFor="fam_ph_number">
                        Personal Number
                      </label>
                      <TbAsterisk className='w-2 h-2 text-lms-error'/>
                    </div>

                    <Field
                        type="fam_ph_number"
                        name="fam_ph_number"
                        id="fam_ph_number"
                        className={style.input}
                    />
                  </div>

                  {/* Family Number */}
                  <div className={style.inputContainer}>
                    <div className="flex">
                      <label className={style.label} htmlFor="ph_number">
                        Family Number
                      </label>
                      <TbAsterisk className='w-2 h-2 text-lms-error'/>
                    </div>

                    <Field
                        type="ph_number"
                        name="ph_number"
                        id="ph_number"
                        className={style.input}
                    />
                    <ErrorMessage name="ph_number" component="div" className={style.error}/>
                  </div>

                  {/* Place Of Birth */}
                  <div className={style.inputContainer}>
                    <div className="flex">
                      <label className={style.label} htmlFor="pob">
                        Place Of Birth
                      </label>
                      <TbAsterisk className='w-2 h-2 text-lms-error'/>
                    </div>

                    <Field
                        as="textarea"
                        name="pob"
                        id="pob"
                        className={style.input}
                        rows="2"
                        cols="30"
                    />
                  </div>

                  {/* Address */}
                  <div className={style.inputContainer}>
                    <div className="flex">
                      <label className={style.label} htmlFor="address">
                        Current Address
                      </label>
                      <TbAsterisk className='w-2 h-2 text-lms-error'/>
                    </div>

                    <Field
                        as="textarea"
                        name="address"
                        id="address"
                        className={style.input}
                        rows="2"
                        cols="30"
                    />
                  </div>

                  {/* Bio */}
                  <div className={style.inputContainer}>
                    <div className="flex">
                      <label className={style.label} htmlFor="bio">
                        Bio
                      </label>
                      <TbAsterisk className='w-2 h-2 text-lms-error'/>
                    </div>

                    <Field
                        as="textarea"
                        name="bio"
                        id="bio"
                        className={style.input}
                        rows="4"
                        cols="30"
                    />
                  </div>
                </div>
              </Form>
          )}
        </Formik>
      </section>
  );
}