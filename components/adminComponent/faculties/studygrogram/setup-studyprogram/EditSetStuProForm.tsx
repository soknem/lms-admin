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
  DialogTrigger,
} from "@/components/ui/dialog";

import { DegreeType, SetupStudyProgramType } from "@/lib/types/admin/faculty";
import { useState } from "react";
import Image from "next/image";
import { create } from "domain";

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

export function EditSetStuProForm() {
  return (
    <Dialog open>
      <DialogContent className="w-[480px] bg-white ">
        <DialogHeader>
          <DialogTitle>Add degree</DialogTitle>
          {/* <DialogDescription>
            Make changes to your profile here. Click save when you're done.
          </DialogDescription> */}
        </DialogHeader>
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
                  <label className={`${style.label}`} htmlFor="level">
                    Subject
                  </label>
                  <Field
                    type="text"
                    placeholder="Introduction to IT"
                    name="level"
                    id="level"
                    className={` ${style.input}`}
                  />
                  <ErrorMessage
                    name="level"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                {/* Degree Description*/}
                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="degree">
                    Semester
                  </label>
                  <Field
                    type="text"
                    name="degree"
                    placeholder="Semester 1"
                    id="degree"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="degree"
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
