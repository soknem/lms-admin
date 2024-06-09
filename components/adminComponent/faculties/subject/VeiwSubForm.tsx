"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import style from "../../style.module.css";
import { FiPlus } from "react-icons/fi";
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
import { FaCamera } from "react-icons/fa6";

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

export function ViewSubjectForm() {
  return (
    <Dialog open>
      <DialogContent className="w-[540px] bg-white ">
        {/* <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Name
            </Label>
            <Input
              id="name"
              defaultValue="Pedro Duarte"
              className="col-span-3"
            />
          </div>
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="username" className="text-right">
              Username
            </Label>
            <Input
              id="username"
              defaultValue="@peduarte"
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button type="submit">Save changes</Button>
        </DialogFooter> */}

        <Formik
          initialValues={initialValues}
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
                <div
                  className={`flex items-center justify-center relative ${style.imageContainer}`}
                >
                  <img
                    src="https://api.istad.co/media/image/a3c4f87e-7a85-44c3-a568-6c5abef76cfe.png"
                    alt="faculty"
                    className="w-full h-full rounded-full"
                  />
                </div>

                {/* faculty title*/}
                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="name">
                    Subject
                  </label>
                  <Field
                    type="text"
                    placeholder="Introduction to IT"
                    name="name"
                    id="name"
                    className={` ${style.input}`}
                  />
                </div>

                <div
                  className={`flex gap-4 h-[40px] items-center justify-between ${style.inputContainer}`}
                >
                  <div className="w-[80px] ">
                    <label className={`${style.label}`} htmlFor="name">
                      Hour
                    </label>
                    <Field name="hour" className={` ${style.input}`} />
                  </div>
                  <div className="w-[80px] ">
                    <label className={`${style.label}`} htmlFor="name">
                      Theory
                    </label>
                    <Field name="hour" className={` ${style.input}`} />
                  </div>
                  <div className="w-[80px] ">
                    <label className={`${style.label}`} htmlFor="name">
                      Practice
                    </label>
                    <Field name="hour" className={` ${style.input}`} />
                  </div>
                  <div className="w-[80px] ">
                    <label className={`${style.label}`} htmlFor="name">
                      Interniship
                    </label>
                    <Field name="hour" className={` ${style.input}`} />
                  </div>
                </div>

                {/* Faculty Description */}
                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="faculty">
                    Description
                  </label>
                  <Field
                    type="text"
                    placeholder="a foundational program designed to equip you with essential knowledge and skills in the field of IT. This course is tailored for beginners and those looking to strengthen their understanding of information technology concepts and applications. "
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
