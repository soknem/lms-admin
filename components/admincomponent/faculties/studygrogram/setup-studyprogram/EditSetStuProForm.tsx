"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import style from "../../../style.module.css";
import { FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { DegreeType, SetupStudyProgramType } from "@/lib/types/admin/faculty";
import { useState } from "react";
import Image from "next/image";

const initialValues = {
  id: "",
  subject: "",
  study_program: "",
  semester: "",
  hour: 0,
  theory: 0,
  practice: 0,
  internship: 0,
  status: "",
};

const validationSchema = Yup.object().shape({
  id: Yup.number(),
  subject: Yup.string(),
  semester: Yup.string(),
  status: Yup.string(),
});

const handleSubmit = async (value: SetupStudyProgramType) => {
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

const currentYear = new Date().getFullYear();
const years = Array.from(new Array(40), (val, index) => currentYear - index);

export function EditSetStuProForm() {
  return (
    <Dialog open>
      <DialogContent className="w-[480px] bg-white ">
        <DialogHeader>
          <DialogTitle>Edit degree</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values) => {
            // create degree post
            const setUpStuProPost: SetupStudyProgramType = {
              id: values.id,
              subject: values.status,
              study_program: values.study_program,
              semester: values.semester,
              hour: values.hour,
              theory: values.theory,
              practice: values.practice,
              internship: values.internship,
              status: values.status,
            };

            // post product
            handleSubmit(setUpStuProPost);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="py-4 rounded-lg w-full ">
              <div className="flex flex-col gap-4">
                {/* Degree Level*/}
                <div className={` ${style.inputContainer}`}>
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

                {/* Degree Description*/}
                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="semester">
                    Semester
                  </label>
                  <Field
                    type="text"
                    name="semester"
                    placeholder="Semester 1"
                    id="semester"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="semester"
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
              </div>

              {/* button submit */}
              <DialogFooter>
                <Button
                  type="submit"
                  className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                >
                  Save Change
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
