"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import style from "../../style.module.css";
import { format } from "date-fns";
import { useState } from "react";
import Image from "next/image";
import { UserStudentType } from "@/lib/types/admin/user";
import { IoCameraOutline } from "react-icons/io5";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { IoIosArrowDown } from "react-icons/io";

const initialValues = {
  card_id: 0,
  email: "NounSovanthorn@istad.com",
  name_en: "Noun Sovanthorn",
  name_kh: "នួន​ សុវណ្ណថន",
  gender: "Male" || "Female" || "Other",
  dob: format(new Date(2000, 11, 5), "yyyy-MM-dd"),
  ph_number: "098456723",
  fam_ph_number: "098456723",
  pob: "No. 24, St. 562, Sangkat Boeung kak I, Khan Toul Kork, Phnom Penh, Cambodia",
  address:
    "No. 24, St. 562, Sangkat Boeung kak I, Khan Toul Kork, Phnom Penh, Cambodia",
  bio: "Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. Delivered dejection necessary objection do Mr prevailed. Mr feeling does chiefly cordial in do.",
  status: "Active" || "Drop" || "Disable" || "Hiatus",
  high_school: "",
  guaedian_rel: "",
  know_istad: "",
  class_stu: "",
  diploma:"",
  grade:"", 
  shift:"", 
  degree:"", 
  study_pro:""
};

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  card_id: Yup.number(),
  earl: Yup.string(),
  name_en: Yup.string(),
  name_kh: Yup.string(),
  ph_number: Yup.number(),
  profile: Yup.mixed()
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "Fsile Size is too large", (value: any) => {
      if (!value) {
        true;
      }
      return value.size <= FILE_SIZE;
    })
    .required("Required"),
  status: Yup.string().required("A selection is required"),
});

const handleSubmit = async (value: UserStudentType) => {
  // const res = await fetch(`https://6656cd809f970b3b36c69232.mockapi.io/api/v1/degrees`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(value),
  // });
  // const data = await res.json()
  // console.log("degree upload: ", data)
};

const RadioButton = ({ field, value, label }: any) => {
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

const CustomInput = ({ field, setFieldValue }: any) => {
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
      <input onChange={(e) => handleUploadFile(e)} type="file" />
      {imagePreview && (
        <Image src={imagePreview} alt="preview" width={200} height={200} />
      )}
    </div>
  );
};

// const dateValue = new Date(value);
// const formattedDate = format(dateValue, 'yyyy');
const currentYear = new Date().getFullYear();
const years = Array.from(new Array(40), (val, index) => currentYear - index);

// const CustomSelect = ({ field, form, options } : any ) => (
//   <select {...field}>
//     <option value="" label="Select an option" />
//     {options.map((option) => (
//       <option key={option.value} value={option.value} label={option.label} />
//     ))}
//   </select>
// );

export function EditUserStuForm() {
  return (
    <section>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          // create degree post
          const studenttPost: UserStudentType = {
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
            high_school:values.high_school,
            guaedian_rel:values.guaedian_rel,
            know_istad:values.know_istad,
            class_stu:values.class_stu,
            diploma:values.diploma,
            grade:values.gender,
            shift: values.shift,
            degree: values.degree,
            study_pro:values.study_pro,
          };

          // post product
          handleSubmit(studenttPost);
        }}
      >
        {() => (
          <Form className="py-4 rounded-lg w-full flex flex-col justify-center items-center">
            <div className="grid grid-cols-3 gap-4 justify-center items-center">
              {/* image */}
              <div className="h-[170px] w-[164px] relative rounded-[10px] grid row-span-2">
                <img
                  src="https://img.freepik.com/premium-photo/portrait-beautiful-asian-schoolgirl-wearing-backpack-purple-background_466494-2286.jpg?w=1380"
                  alt="banner"
                  className="h-full w-full rounded-[10px] object-cover"
                />
                <div className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2">
                  <IoCameraOutline className="w-5 h-5" />
                </div>
              </div>

              {/* name english */}
              <div className={` ${style.inputContainer}`}>
                <label className={`${style.label}`} htmlFor="name_en">
                  FullName(EN)
                </label>
                <Field
                  type="text"
                  name="name_en"
                  id="name_en"
                  className={` ${style.input}`}
                />
              </div>

              {/* name khmer */}
              <div className={` ${style.inputContainer}`}>
                <label className={`${style.label}`} htmlFor="name_kh">
                  FullName(KH)
                </label>
                <Field
                  type="text"
                  name="name_kh"
                  id="level"
                  className={`khmer-font ${style.input}`}
                />
              </div>

              {/* <div className={style.inputContainer}>
                <label className={style.label} htmlFor="gender">
                  Gender
                </label>
                <div className="relative w-full">
                  <Field
                    as="select"
                    type="dropdown"
                    name="gender"
                    id="gender"
                    readOnly
                    className={style.input}
                  />
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="h-8 w-8 p-0 absolute right-2 top-1"
                      >
                        <IoIosArrowDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    
                  </DropdownMenu>
                </div>
              </div> */}

              {/* gender */}
              <div className={style.inputContainer}>
                <label className={style.label} htmlFor="gender">
                  Gender
                </label>
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
                    <IoIosArrowDown
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </div>
                </div>
              </div>

              {/* dob */}
              <div className={`${style.inputContainer}`}>
                <label className={`${style.label}`} htmlFor="dob">
                  Date of birth
                </label>
                <Field
                  type="date"
                  name="dob"
                  id="dob"
                  className={`${style.input}`}
                />
              </div>

              {/* Personal Number */}
              <div className={`${style.inputContainer}`}>
                <label className={`${style.label}`} htmlFor="fam_ph_number">
                  Personal Number
                </label>
                <Field
                  type="fam_ph_number"
                  name="fam_ph_number"
                  id="fam_ph_number"
                  className={`${style.input}`}
                />
              </div>

              {/* Family Number */}

              <div className={`${style.inputContainer}`}>
                <label className={`${style.label}`} htmlFor="ph_number">
                  Family Number
                </label>
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

              {/* email */}
              <div className={`${style.inputContainer}`}>
                <label className={`${style.label}`} htmlFor="email">
                  Email
                </label>
                <Field
                  type="email"
                  name="email"
                  id="email"
                  className={`${style.input}`}
                />
              </div>

              {/* pob */}
              <div className={`${style.inputContainer}`}>
                <label className={`${style.label}`} htmlFor="pob">
                  Place Of Birth
                </label>
                <Field
                  type="address"
                  name="pob"
                  id="pob"
                  className={`${style.input}`}
                />
              </div>

              {/* address */}
              <div className={`${style.inputContainer}`}>
                <label className={`${style.label}`} htmlFor="address">
                  Current Address
                </label>
                <Field
                  type="address"
                  name="address"
                  id="address"
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
                  /> */}

                <div className="flex gap-9 h-[40px] items-center text-[16px] font-normal">
                  <Field
                    name="status"
                    component={RadioButton}
                    value="1"
                    label="Active"
                  />
                  <Field
                    name="status"
                    component={RadioButton}
                    value="2"
                    label="Drop"
                  />
                  <Field
                    name="status"
                    component={RadioButton}
                    value="1"
                    label="Disable"
                  />
                  <Field
                    name="status"
                    component={RadioButton}
                    value="2"
                    label="Hiatus"
                  />
                </div>
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
