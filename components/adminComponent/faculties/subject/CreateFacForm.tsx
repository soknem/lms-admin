"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import style from "../../style.module.css";
import { FiPlus, FiUploadCloud } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { FacultyType, SubjectType } from "@/lib/types/admin/faculty";
import { useState } from "react";
import Image from "next/image";

const initialValues = {
  subject: "",
  logo: "",
  hour: 0,
  theory: 0,
  practice: 0,
  internship: 0,
  description: "",
  status: "",
};

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  subject: Yup.string().required("Required"),
  hour: Yup.number(),
  theory: Yup.number(),
  practice: Yup.number(),
  hinternshipour: Yup.number(),
  description: Yup.string(),
  logo: Yup.mixed()
    .test("fileFormat", "Unsupported Format", (value: any) => {
      if (!value) {
        return true;
      }
      return SUPPORTED_FORMATS.includes(value.type);
    })
    .test("fileSize", "File Size is too large", (value: any) => {
      if (!value) {
        true;
      }
      return value.size <= FILE_SIZE;
    })
    .required("Required"),
  status: Yup.string().required("A selection is required"),
});

const handleSubmit = async (value: SubjectType) => {
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
    setImagePreview(localUrl);

    setFieldValue(field.name, file);
  };

  return (
    <div className="w-full">
      <input
        type="file"
        onChange={handleUploadFile}
        className="hidden "
        id="file"
      />
      <label
        htmlFor="file"
        className="border border-gray-300 hover:bg-lms-background text-gray-900 text-sm rounded-lg bg-white w-full h-[68px] p-2 border-dashed flex justify-center items-center cursor-pointer relative overflow-hidden"
      >
        {!imagePreview ? (
          <div className="flex  items-center justify-center gap-8">
            <FiUploadCloud className="text-lms-primary text-[34px]" />
            <div className="flex flex-col items-start justify-start gap-1">
              <p className="text-center text-md text-black">
                Select a file or drag and drop here
              </p>
              <p className="text-center text-md text-lms-gray-30">
                JPG, PNG or PDF, file size no more than 10MB
              </p>
            </div>
          </div>
        ) : (
          <Image
            src={imagePreview}
            alt="preview"
            layout="fill"
            objectFit="cover"
          />
        )}
      </label>
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

export function CreateSubjectForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white-80 bg-white border">
          <FiPlus className="mr-2 h-4 w-4" /> Add Subject
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[540px] bg-white ">
        <DialogHeader>
          <DialogTitle>Add Subject</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            // create faculty post
            const SubjectPost: SubjectType = {
              subject: values.subject,
              logo: values.logo,
              hour: values.hour,
              theory: values.theory,
              practice: values.practice,
              internship: values.internship,
              description: values.description,
              status: values.status,
            };

            // post product
            handleSubmit(SubjectPost);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="py-4 rounded-lg w-full ">
              <div className="flex flex-col items-center gap-4">
                {/* faculty title*/}
                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="subject">
                    Subject
                  </label>
                  <Field
                    type="text"
                    placeholder="Introduction to IT"
                    name="subject"
                    id="subject"
                    className={` ${style.input}`}
                  />
                  <ErrorMessage
                    name="subject"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                <div
                  className={`flex gap-4 h-[40px] items-center justify-between ${style.inputContainer}`}
                >
                  <div className="w-[80px] ">
                    <label className={`${style.label}`} htmlFor="hour">
                      Hour
                    </label>
                    <Field name="hour" className={` ${style.input}`} />
                  </div>

                  <div className="w-[80px] ">
                    <label className={`${style.label}`} htmlFor="theory">
                      Theory
                    </label>
                    <Field name="theory" className={` ${style.input}`} />
                  </div>

                  <div className="w-[80px] ">
                    <label className={`${style.label}`} htmlFor="practice">
                      Practice
                    </label>
                    <Field name="practice" className={` ${style.input}`} />
                  </div>

                  <div className="w-[80px] ">
                    <label className={`${style.label}`} htmlFor="internship">
                      Interniship
                    </label>
                    <Field name="internship" className={` ${style.input}`} />
                  </div>
                </div>

                {/* Faculty Description */}
                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="description">
                    Description
                  </label>
                  <Field
                    type="text"
                    placeholder="a foundational program designed to equip you with essential knowledge and skills in the field of IT. This course is tailored for beginners and those looking to strengthen their understanding of information technology concepts and applications. "
                    name="description"
                    id="description"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className={`${style.error}`}
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

                  <ErrorMessage
                    name="status"
                    component={RadioButton}
                    className={`${style.error}`}
                  />
                </div>

                {/* Subjeect Image*/}
                <div className={`${style.inputContainer}  `}>
                  <label
                    htmlFor="logo"
                    className="block text-sm font-medium text-gray-700 my-2"
                  >
                    Faculty Logo
                  </label>
                  <Field
                    type="file"
                    name="logo"
                    id="logo"
                    component={CustomInput}
                    setFieldValue={setFieldValue}
                    className="mt-1"
                  />
                  <ErrorMessage
                    name="logo"
                    component="div"
                    className="text-red-500 mt-1 text-sm"
                  />
                </div>
              </div>

              {/* button submit */}
              <DialogFooter>
                <Button
                  type="submit"
                  className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                >
                  Add
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
