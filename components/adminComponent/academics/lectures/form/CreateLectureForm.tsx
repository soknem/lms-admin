'use client'
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button"
// import style from "../style.module.css";
import style from "@/components/adminComponent/style.module.css"
import { FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { GenerationType } from "@/lib/types/admin/academics";

const initialValues = {
  alias: "",
  generation: "",
  startYear: "",
  endYear: "",
  status: "",
};

const validationSchema = Yup.object().shape({
  alias: Yup.string().required("Required"),
  generation: Yup.string().required("Required"),
  startYear: Yup.string().required("Required"),
  EndYear: Yup.number().required("Required"),
  status: Yup.string().required('A selection is required'),
})


//handle submit here
const handleSubmit = async (value: GenerationType) => {
//   const res = await fetch(`https://6656cd809f970b3b36c69232.mockapi.io/api/v1/generations`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(value),
//   });

//   const data = await res.json()

//   console.log("generation upload: ", data)
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
      <label className="pl-2" htmlFor={value}>{label}</label>
    </div>
  );
};

// const dateValue = new Date(value);
// const formattedDate = format(dateValue, 'yyyy');
const currentYear = new Date().getFullYear();
const years = Array.from(new Array(40), (val, index) => currentYear - index);


export function CreateLectureForm() {
  return (
    <Dialog >
      <DialogTrigger asChild>
        <Button className='text-lms-white-80 bg-lms-primary hover:bg-lms-primary/90'>
          <FiPlus className="mr-2 h-4 w-4" /> Add Lecture
        </Button>
      </DialogTrigger>
      <DialogContent className="w-[1024px] bg-white">
        <DialogHeader>
          <DialogTitle>Add Lecture</DialogTitle>
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

            // create generation post
            const GenerationPost: GenerationType = {
              alias: values.alias,
              generation: values.generation,
              startYear: values.startYear,
              endYear: values.endYear,
              status: values.status

            }

            // post product
            handleSubmit(GenerationPost)
          }}
        >
          {({ setFieldValue }) => (
            <Form className="py-4 rounded-lg w-full ">
              <div className="flex flex-row flex-wrap gap-4">

                {/* Generation title*/}
                <div className={`${style.inputContainer}`} >
                  <label className={`${style.label}`} htmlFor="generation">
                    Title
                  </label>
                  <Field
                    type="text"
                    name="generation"
                    id="generation"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="generation"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                {/* Alias */}
                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="alias">
                    Alias
                  </label>
                  <Field
                    type="text"
                    name="alias"
                    id="alias"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="alias"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>

                {/* start year */}
                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="startYear">
                    Start Year
                  </label>
                  <Field
                    type="date"
                    name="startYear"
                    id="startYear"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="startYear"
                    component="div"
                    className={`${style.error}`}
                  />
                </div>


                {/* End year */}
                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="endYear">
                    End Year
                  </label>
                  <Field
                    type="date"
                    name="endYear"
                    id="endYear"
                    className={`${style.input}`}
                  />
                  <ErrorMessage
                    name="endYear"
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
                <Button type="submit" className="text-lms-white-80 bg-lms-primary hover:bg-lms-primary/90">Add</Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  )
}
