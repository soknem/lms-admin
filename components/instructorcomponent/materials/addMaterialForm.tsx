"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import style from "./style.module.css";
import { FiPlus, FiUploadCloud } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import Image from "next/image";
import {
  CurriculumType,
  SlideType,
  VideoType,
} from "@/lib/types/admin/materials";
import { IoIosArrowDown } from "react-icons/io";
import { MdAddToPhotos } from "react-icons/md";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Separator} from "@/components/ui/separator";
import {TbAsterisk} from "react-icons/tb";

const initialValues = {
  title: "",
  course: "",
  description: "",
  type: "",
  status: 0,
  subject: "",
  file: "",
};

const validationSchema = Yup.object().shape({
  academic_year: Yup.string().required("Required"),
  start_dater: Yup.string().required("Required"),
  end_dater: Yup.string().required("Required"),
  status: Yup.string().required("A selection is required"),
});

const handleSubmit = async (value: CurriculumType) => {
  // const res = await fetch(`https://6656cd809f970b3b36c69232.mockapi.io/api/v1/degrees`, {
  //   method: "POST",
  //   headers: {
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify(value),
  // });
  // const data = await res.json()
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

// const [selectedPhotos, setSelectedPhotos] = useState<string[]>([]);

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
        className="border border-gray-300 hover:bg-lms-background text-gray-900 text-sm rounded-lg bg-white w-full h-[215px] p-2 border-dashed flex justify-center items-center cursor-pointer relative overflow-hidden"
      >
        {!imagePreview ? (
          <div className="flex flex-col items-center justify-center gap-4">
            <FiUploadCloud className="text-lms-primary text-[34px]" />
            <p className="text-center text-md text-black">
              Select a file or drag and drop here
            </p>
            <p className="text-center text-md text-lms-gray-30">
              JPG, PNG or PDF, file size no more than 10MB
            </p>
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
export function CreateMaterialForm() {
  const [activeTab, setActiveTab] = useState("curriculum");
  const handleNext = (currentTab: any) => {
    if (currentTab === "curriculum") {
      setActiveTab("slide");
    } else if (currentTab === "slide") {
      setActiveTab("video");
    }
  };

  return (

      <div className="w-full flex flex-grow flex-col items-center-center rounded-[10px] border bg-white gap-6">
        <section className="h-[90px] flex items-center mx-10 ">
          <h1 className="text-3xl font-bold text-lms-black-90">
            Add Materials
          </h1>
        </section>
        <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            defaultValue="faculty"
            className="w-full "
        >
          <TabsList
              className="dark:bg-gray-800 bg-lms-background w-full h-[150px] flex items-center justify-center rounded-none gap-[20px]">
            <div className={`flex flex-col justify-center items-center gap-4`}>
              <TabsTrigger
                  value="curriculum"
                  className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
              >
                1
              </TabsTrigger>
              <span className="text-lms-primary text-lg ">Curriculum</span>
            </div>

            {/*<div className="h-[1px] w-[200px] bg-gray-300 dark:bg-gray-700"></div>*/}
            <Separator orientation="horizontal" className="w-[200px] bg-gray-300 dark:bg-gray-700"/>

            <div className={`flex flex-col justify-center items-center gap-4`}>
              <TabsTrigger
                  value="slide"
                  className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
              >
                2
              </TabsTrigger>
              <span className="text-lms-primary text-lg ">Slide</span>
            </div>

            {/*<div className="h-[1px] w-[200px] bg-gray-300 dark:bg-gray-700"></div>*/}
            <Separator orientation="horizontal" className="w-[200px] bg-gray-300 dark:bg-gray-700"/>

            <div className={`flex flex-col justify-center items-center gap-4`}>
              <TabsTrigger
                  value="video"
                  className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[50px] w-[50px] text-[32px] font-bold text-lms-primary flex items-center justify-center text-center"
              >
                3
              </TabsTrigger>
              <span className="text-lms-primary text-lg ">Video</span>
            </div>
          </TabsList>


          {/* Curriculum */}
          <TabsContent value="curriculum">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  // create degree post
                  const curriculumPost: CurriculumType = {
                    title: values.title,
                    course: values.course,
                    description: values.description,
                    type: values.type,
                    subject: values.subject,
                    file: values.file,
                    status: values.status,
                  };

                  // post product
                  handleSubmit(curriculumPost);
                }}
            >
              {({setFieldValue}) => (
                  <Form className="py-4 rounded-lg w-full h-[605px]">
                    <div className="flex flex-col gap-4 items-center justify-center">

                      <div className={style.inputContainer}>

                        <div className="flex">
                          <label className={style.label} htmlFor="subject">
                            Subject
                          </label>
                          <TbAsterisk className='w-2 h-2 text-lms-error'/>
                        </div>

                        <div className="relative w-full">
                          <Field
                              as="select"
                              name="subject"
                              id="subject"
                              className={`${style.input} appearance-none`}
                          >
                            <option value="" disabled hidden>
                              Select Subject
                            </option>
                            <option value="Web Design">Web Design</option>
                            <option value="Spring Framework">
                              Spring Framework
                            </option>
                            <option value="C++ Programming">
                              C++ Programming
                            </option>
                          </Field>
                          <ErrorMessage
                              name="subject"
                              component="div"
                              className={`${style.error}`}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <IoIosArrowDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>

                      <div className={`${style.inputContainer}`}>
                        <div className="flex">
                          <label className={`${style.label}`} htmlFor="title">
                            Title
                          </label>
                          <TbAsterisk className='w-2 h-2 text-lms-error'/>
                        </div>

                        <Field
                            type="text"
                            name="title"
                            placeholder="Web Design Curriculum"
                            id="title"
                            className={`${style.input}`}
                        />
                        <ErrorMessage
                            name="title"
                            component="div"
                            className={`${style.error}`}
                        />
                      </div>

                      <div className={`${style.inputContainer}`}>
                        <label className={`${style.label}`} htmlFor="description">
                          Description
                        </label>
                        <Field
                            // as="textarea"
                            type="text"
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

                      <div className={`${style.inputContainer}`}>
                        <label className={`${style.label}`} htmlFor="file">
                          File Upload
                        </label>
                        <Field
                            type="file"
                            name="file"
                            id="file"
                            component={CustomInput}
                            setFieldValue={setFieldValue}
                        />
                        <ErrorMessage
                            name="file"
                            component="div"
                            className={`${style.error}`}
                        />
                      </div>
                    </div>

                  </Form>
              )}
            </Formik>
            <div className="flex justify-end w-[900px]">
              <Button
                  type="submit"
                  className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                  onClick={() => handleNext(activeTab)}
              >
                Next
              </Button>
            </div>
          </TabsContent>

          {/* Slide */}
          <TabsContent value="slide">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  // create degree post
                  const curriculumPost: SlideType = {
                    title: values.title,
                    course: values.course,
                    description: values.description,
                    type: values.type,
                    subject: values.subject,
                    file: values.file,
                    status: values.status,
                  };

                  // post product
                  handleSubmit(curriculumPost);
                }}
            >
              {({setFieldValue}) => (
                  <Form className="py-4 rounded-lg w-full h-[605px]">
                    <div className="flex flex-col gap-4 items-center justify-center">

                      <div className={style.inputContainer}>
                        <div className="flex">
                          <label className={style.label} htmlFor="subject">
                            Subject
                          </label>
                          <TbAsterisk className='w-2 h-2 text-lms-error'/>
                        </div>

                        <div className="relative w-full">
                          <Field
                              as="select"
                              name="subject"
                              id="subject"
                              className={`${style.input} appearance-none`}
                          >
                            <option value="" disabled hidden>
                              Select Subjext
                            </option>
                            <option value="Web Design">Web Design</option>
                            <option value="Spring Framework">
                              Spring Framework
                            </option>
                            <option value="C++ Programming">
                              C++ Programming
                            </option>
                          </Field>
                          <ErrorMessage
                              name="subject"
                              component="div"
                              className={`${style.error}`}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <IoIosArrowDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>

                      <div className={`${style.inputContainer}`}>
                        <div className="flex">
                          <label className={`${style.label}`} htmlFor="title">
                            Title
                          </label>
                          <TbAsterisk className='w-2 h-2 text-lms-error'/>
                        </div>

                        <Field
                            type="text"
                            name="title"
                            placeholder="Web Design Slide"
                            id="title"
                            className={`${style.input}`}
                        />
                        <ErrorMessage
                            name="title"
                            component="div"
                            className={`${style.error}`}
                        />
                      </div>

                      <div className={`${style.inputContainer}`}>
                        <label className={`${style.label}`} htmlFor="description">
                          Description
                        </label>
                        <Field
                            // as="textarea"
                            type="text"
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

                      <div className={`${style.inputContainer}`}>
                        <label className={`${style.label}`} htmlFor="file">
                          File Upload
                        </label>
                        <Field
                            type="file"
                            name="file"
                            id="file"
                            component={CustomInput}
                            setFieldValue={setFieldValue}
                        />
                        <ErrorMessage
                            name="file"
                            component="div"
                            className={`${style.error}`}
                        />
                      </div>
                    </div>

                  </Form>
              )}
            </Formik>
            <div className="flex justify-end w-[900px]">
              <Button
                  type="submit"
                  className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                  onClick={() => handleNext(activeTab)}
              >
                Next
              </Button>
            </div>
          </TabsContent>

          {/* Video */}
          <TabsContent value="video">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={async (values) => {
                  // create degree post
                  const curriculumPost: VideoType = {
                    title: values.title,
                    course: values.course,
                    description: values.description,
                    type: values.type,
                    subject: values.subject,
                    file: values.file,
                    status: values.status,
                  };

                  // post product
                  handleSubmit(curriculumPost);
                }}
            >
              {({setFieldValue}) => (
                  <Form className="py-4 rounded-lg w-full h-[605px]">
                    <div className="flex flex-col gap-4 items-center justify-center">

                      <div className={style.inputContainer}>
                        <div className="flex">
                          <label className={style.label} htmlFor="subject">
                            Subject
                          </label>
                          <TbAsterisk className='w-2 h-2 text-lms-error'/>
                        </div>

                        <div className="relative w-full">
                          <Field
                              as="select"
                              name="subject"
                              id="subject"
                              className={`${style.input} appearance-none`}
                          >
                            <option value="" disabled hidden>
                              Select Subjext
                            </option>
                            <option value="Web Design">Web Design</option>
                            <option value="Spring Framework">
                              Spring Framework
                            </option>
                            <option value="C++ Programming">
                              C++ Programming
                            </option>
                          </Field>
                          <ErrorMessage
                              name="subject"
                              component="div"
                              className={`${style.error}`}
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <IoIosArrowDown
                                className="h-5 w-5 text-gray-400"
                                aria-hidden="true"
                            />
                          </div>
                        </div>
                      </div>

                      <div className={`${style.inputContainer}`}>
                        <div className="flex">
                          <label className={`${style.label}`} htmlFor="title">
                            Title
                          </label>
                          <TbAsterisk className='w-2 h-2 text-lms-error'/>
                        </div>

                        <Field
                            type="text"
                            name="title"
                            placeholder="Web Design Video"
                            id="title"
                            className={`${style.input}`}
                        />
                        <ErrorMessage
                            name="title"
                            component="div"
                            className={`${style.error}`}
                        />
                      </div>

                      <div className={`${style.inputContainer}`}>
                        <label className={`${style.label}`} htmlFor="description">
                          Description
                        </label>
                        <Field
                            // as="textarea"
                            type="text"
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

                      <div className={`${style.inputContainer}`}>
                        <label className={`${style.label}`} htmlFor="file">
                          File Upload
                        </label>
                        <Field
                            type="file"
                            name="file"
                            id="file"
                            component={CustomInput}
                            setFieldValue={setFieldValue}
                        />
                        <ErrorMessage
                            name="file"
                            component="div"
                            className={`${style.error}`}
                        />
                      </div>
                    </div>

                  </Form>
              )}
            </Formik>{" "}
            <div className="flex justify-end w-[900px]">
              <Button
                  type="submit"
                  className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
              >
                Upload
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
  );
}
