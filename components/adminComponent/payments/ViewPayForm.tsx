"use client";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import style from "../style.module.css";
import { FiPlus } from "react-icons/fi";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { DegreeType } from "@/lib/types/admin/faculty";
import { useState } from "react";
import Image from "next/image";
import { create } from "domain";
import { PaymentType } from "@/lib/types/admin/payments";

const initialValues = {
  id: 0,
  receipt_id: 0,
  student: {
    name: "",
    profile_image: "",
  },
  gender: "",
  date: "",
  discount: 0,
  total_payment: 0,
  balance_due: 0,
  academic_fee: 0,
  payment_method: "",
  status: "",
  remark: "",
  generation: "",
  year: "",
  academic: "",
  degree: "",
  faculty: "",
  major: "",
  class: "",
  shift: "",
};

const handleSubmit = async (value: PaymentType) => {
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

export function ViewPayForm() {
  return (
    <Dialog open>
      <DialogContent className="w-[1350px] bg-white ">
        <DialogHeader>
          <DialogTitle>Add Payment</DialogTitle>
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
          onSubmit={async (values) => {
            // create degree post
            const paymentPost: PaymentType = {
              receipt_id: values.receipt_id,
              student: {
                name: values.student.name,
                profile_image: values.student.profile_image,
              },
              gender: values.gender,
              date: values.date,
              discount: values.discount,
              total_payment: values.total_payment,
              balance_due: values.balance_due,
              academic_fee: values.academic_fee,
              payment_method: values.payment_method,
              status: values.status,
              remark: values.remark,
              generation: values.gender,
              year: values.year,
              academic: values.academic,
              degree: values.degree,
              faculty: values.faculty,
              major: values.major,
              class: values.class,
              shift: values.shift,
              id: values.id,
            };

            // post product
            handleSubmit(paymentPost);
          }}
        >
          {({ setFieldValue }) => (
            <Form className="py-4 rounded-lg w-full flex flex-col justify-center items-center">
              <div className="flex items-center justify-center relative w-[150px] h-[150px] rounded-full">
                <img
                  src="https://w7.pngwing.com/pngs/615/209/png-transparent-graphy-student-students-class-photography-people-thumbnail.png"
                  alt="faculty"
                  className="w-full h-full rounded-full"
                />
              </div>
              <div className="flex flex-wrap gap-4">
                <div className={` ${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="level">
                    Receipt ID
                  </label>
                  <Field
                    type="text"
                    placeholder="Chan Tola"
                    name="level"
                    id="level"
                    className={` ${style.input}`}
                  />
                </div>

                <div className={` ${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="level">
                    Student Name
                  </label>
                  <Field
                    type="text"
                    placeholder="Chan Tola"
                    name="level"
                    id="level"
                    className={` ${style.input}`}
                  />
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="degree">
                    Gender
                  </label>
                  <Field
                    type="text"
                    name="degree"
                    placeholder="Female"
                    id="degree"
                    className={`${style.input}`}
                  />
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="degree">
                    Academic Fee
                  </label>
                  <Field
                    type="text"
                    placeholder="$ 700"
                    name="degree"
                    id="degree"
                    className={`${style.input}`}
                  />
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="degree">
                    Discount
                  </label>
                  <Field
                    type="text"
                    placeholder="30 %"
                    name="degree"
                    id="degree"
                    className={`${style.input}`}
                  />
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="degree">
                    Paid Amount
                  </label>
                  <Field
                    type="text"
                    placeholder="$ 500"
                    name="degree"
                    id="degree"
                    className={`${style.input}`}
                  />
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="degree">
                    Balance Due
                  </label>
                  <Field
                    type="text"
                    placeholder="Feb 25, 2023"
                    name="degree"
                    id="degree"
                    className={`${style.input}`}
                  />
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="degree">
                    Paid Date
                  </label>
                  <Field
                    type="text"
                    placeholder="Feb 25, 2023"
                    name="degree"
                    id="degree"
                    className={`${style.input}`}
                  />
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="degree">
                    Payment Method
                  </label>
                  <Field
                    type="text"
                    placeholder="Cash Payment"
                    name="degree"
                    id="degree"
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
                      label="paid"
                    />
                    <Field
                      name="status"
                      component={RadioButton}
                      value="2"
                      label="Unpaid"
                    />
                  </div>
                </div>

                <div className={`${style.inputContainer}`}>
                  <label className={`${style.label}`} htmlFor="degree">
                    Remark
                  </label>
                  <Field
                    type="text"
                    placeholder="About to be fully paid"
                    name="degree"
                    id="degree"
                    className={`${style.input}`}
                  />
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
