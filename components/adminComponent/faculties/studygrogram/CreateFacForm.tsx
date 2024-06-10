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

import { FacultyType, StudyProgramType } from "@/lib/types/admin/faculty";
import { useState } from "react";
import Image from "next/image";

const initialValues = {
  id: "",
  name: "",
  faculty: "",
  degree: "",
  logo: "",
  description: "",
  link: "",
  status: "",
};

const FILE_SIZE = 1024 * 1024 * 2; // 2MB
const SUPPORTED_FORMATS = ["image/jpg", "image/jpeg", "image/png", "image/gif"];

const validationSchema = Yup.object().shape({
  id: Yup.number(),
  name: Yup.string().required("Required"),
  faculty: Yup.string().required("Required"),
  degree: Yup.string().required("Required"),
  description: Yup.string().required("Required"),
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

const handleSubmit = async (value: StudyProgramType) => {
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

export function CreateStudyProForm() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-white-80 bg-white border">
          <FiPlus className="mr-2 h-4 w-4" /> Add Study Program
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[480px] bg-white ">
        <DialogHeader>
          <DialogTitle>Add Study Program</DialogTitle>
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
            // create faculty post
            const StudyProPost: StudyProgramType = {
              id: values.id,
              name: values.name,
              description: values.description,
              logo: values.logo,
              faculty: values.faculty,
              degree: values.degree,
              link: values.link,
              status: values.status,
            };

            // post product
            handleSubmit(StudyProPost);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="py-4 rounded-lg w-full ">
              <div className="flex flex-col gap-2">
                {/* study program title*/}
                <div className={` ${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="name">
                    Title
                  </label>
                  <Field
                    type="text"
                    placeholder="Information Technology"
                    name="name"
                    id="name"
                    className={` ${style.input}`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                {/* study program fac */}
                <div className={` ${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="name">
                    Faculty
                  </label>
                  <Field
                    type="text"
                    placeholder="Technology"
                    name="name"
                    id="name"
                    className={` ${style.input}`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                {/* study program degree */}
                <div className={` ${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="name">
                    Degree
                  </label>
                  <Field
                    type="text"
                    placeholder="Bachelor"
                    name="name"
                    id="name"
                    className={` ${style.input}`}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                {/* study program Description */}
                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="faculty">
                    Description
                  </label>
                  <Field
                    type="text"
                    placeholder="This software engineering major prepares students for careers in software engineering by teaching the complete process and methods, including gathering business requirements, designing software architecture, developing software, testing, and managing projects. The curriculum focuses on essential skills like algorithm problem solving and system design. Through project-based learning, students gain industry-level experience early on by working in teams and using the latest tools and technologies. This hands-on approach develops skills in communication, problem-solving, and teamwork. Additionally, a one-year industry placement provides real-world experience. Graduates are ready for roles such as software developer, full-stack developer, DevOps engineer, software architect, and more, with opportunities in various sectors like healthcare, finance, technology, and government."
                    name="faculty"
                    id="faculty"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="faculty"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="faculty">
                    Learning Outcome
                  </label>
                  <Field
                    type="text"
                    placeholder="Upon completion of this program, the students will be able toWork effectively in small groups on medium-scale computing projectsUnderstand the social and ethical implications of working as a professional in the field of computer science"
                    name="faculty"
                    id="faculty"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="faculty"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="faculty">
                    Career Expectation
                  </label>
                  <Field
                    type="text"
                    placeholder="Digital InnovatorIT 
Project ManagerData AnalystSoftware Developer (Web, Mobile, Java, API…)"
                    name="faculty"
                    id="faculty"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="faculty"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="faculty">
                    Video Link{" "}
                  </label>
                  <Field
                    type="text"
                    placeholder="https://www.youtube.com/watch?v=7_7g5IHu0rs&list=PL_V2z3lwuCDf3_po8kU0tJBydjOIOzk6U&index=1&t=1s"
                    name="faculty"
                    id="faculty"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="faculty"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                {/* Product Image*/}
                <div className="mb-4">
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
