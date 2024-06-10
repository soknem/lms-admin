'use client'
import * as React from "react";
import { useState } from "react";
import Image from "next/image";
import { BsFillEyeFill } from "react-icons/bs";
import { HiEyeOff } from "react-icons/hi";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Formik, Form, Field, FormikErrors, FormikTouched } from "formik";
import * as Yup from "yup";
import { CustomErrorMessageEmail } from '../alert/CustomErrorMessageEmail';
import { CustomErrorMessagePass } from "../alert/CustomErrorMessagePass";

// Define initial values for the form fields
interface InitialValues {
  email: string;
  password: string;
}

const initialValues: InitialValues = {
  email: "",
  password: "",
};

// Define validation schema using Yup
const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

// Define function to get field class name based on validation status
const getFieldClassName = (
  errors: FormikErrors<InitialValues>,
  touched: FormikTouched<InitialValues>,
  fieldName: keyof InitialValues
) => {
  const baseClass = "bg-gray-100 dark:bg-gray-100 border text-gray-900 dark:text-gray-700 text-[15px] rounded-xl focus:ring-blue-500 block w-full p-2.5";
  const errorClass = "border-red-500 dark:border-red-500 focus:border-red-500";
  const validClass = "border-gray-300 dark:border-gray-300";

  return touched[fieldName] && errors[fieldName]
    ? `${baseClass} ${errorClass}`
    : `${baseClass} ${validClass}`;
};

// Define static users
interface User {
  password: string;
  redirect: string;
}

const users: Record<string, User> = {
  "admin@gmail.com": { password: "admin123", redirect: "/admin/faculties" },
  "instructor@gmail.com": { password: "instructor123", redirect: "/instructor/courses" },
  "student@gmail.com": { password: "student123", redirect: "/student/courses" },
};

// Define CardLogin component
export function CardLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values: InitialValues, actions: any) => {
    const user = users[values.email];
    if (user && user.password === values.password) {
      alert("Login Successful");
      router.push(user.redirect);
    } else {
      alert("Login Failed");
      actions.setSubmitting(false);
    }
  };

  return (
    <Card className="w-[550px] bg-white dark:bg-white p-[24px] border border-gray-300 dark:border-white">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {({ errors, touched }) => (
          <section>
            <CardHeader className="items-center dark:border-white">
              <section className="mb-5">
                <Image src="/logo.png" alt="logo" width={200} height={200} />
              </section>
              <CardTitle className="text-[36px] font-bold text-[#253C95] dark:text-[#253C95]">
                Welcome Back!
              </CardTitle>
              <CardDescription className="text-[20px] text-[#808897] dark:text-[#808897]">
                Login to access your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form>
                <section className="grid w-full items-center gap-4">
                  {/* Email field */}
                  <section className="space-y-2">
                    <label className="text-[15px] dark:text-gray-600" htmlFor="email">
                      Email
                    </label>
                    <Field
                      type="email"
                      name="email"
                      id="email"
                      className={getFieldClassName(errors, touched, "email")}
                      size="sm"
                      autoFocus
                      placeholder="sample@gmail.com"
                      variant="bordered"
                    />
                    <CustomErrorMessageEmail errors={errors} touched={touched} fieldName="email" />
                  </section>
                  {/* Password field */}
                  <section className="space-y-2">
                    <label className="text-[15px] dark:text-gray-600" htmlFor="password">
                      Password
                    </label>
                    <section className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Password"
                        className={getFieldClassName(errors, touched, "password")}
                      />
                      {!showPassword ? (
                        <BsFillEyeFill
                          className="absolute w-8 right-2 top-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                          onClick={handleShowPassword}
                        />
                      ) : (
                        <HiEyeOff
                          className="absolute w-8 right-2 top-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                          onClick={handleShowPassword}
                        />
                      )}
                    </section>
                    <CustomErrorMessagePass errors={errors} touched={touched} fieldName="password" />
                  </section>
                  {/* Link for first time login */}
                  <p className="text-center mt-4">
                    <a href="/reset" className="text-[#253C95] dark:text-[#253C95] hover:underline">
                      First time login?
                    </a>
                  </p>
                  {/* Submit button */}
                  <Button
                    className="w-full bg-[#253C95] dark:bg-[#253C95] hover:bg-blue-500 dark:hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-xl"
                    type="submit"
                  >
                    Login
                  </Button>
                </section>
              </Form>
            </CardContent>
          </section>
        )}
      </Formik>
    </Card>
  );
}