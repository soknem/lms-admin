'use client';
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsFillEyeFill } from "react-icons/bs";
import { HiEyeOff } from "react-icons/hi";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Formik, Form, Field, FormikErrors, FormikTouched } from "formik";
import * as Yup from "yup";
import { useToast } from "@/components/ui/use-toast";
import { CustomErrorMessageEmail } from '../alert/CustomErrorMessageEmail'
import { CustomErrorMessagePass } from "../alert/CustomErrorMessagePass";

interface InitialValues {
  email: string;
  password: string;
}

const initialValues: InitialValues = {
  email: "",
  password: "",
};

const validationSchema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

const getFieldClassName = (
  errors: FormikErrors<InitialValues>,
  touched: FormikTouched<InitialValues>,
  fieldName: keyof InitialValues
) => {
  const baseClass =
    "bg-gray-50 border text-gray-900 text-[15px] rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 focus:outline-none focus:border-gray-500 focus:ring-[1px] ";
  const errorClass = "border-red-500";
  const validClass = "border-gray-300";

  return touched[fieldName] && errors[fieldName]
    ? `${baseClass} ${errorClass}`
    : `${baseClass} ${validClass}`;
};

export function CardLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const { toast } = useToast();
  const router = useRouter();

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = (values: InitialValues, actions: any) => {
    fetch(`http://localhost:3000/api/signIn`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(values),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          toast({
            title: "Login Successful",
            description: "You have successfully logged in.",
          });
          // Perform additional success actions here, e.g., redirect
          router.push("/dashboard");
        } else {
          toast({
            title: "Login Failed",
            description: "Invalid credentials, please try again.",
            variant: "destructive",
          });
          actions.setSubmitting(false);
        }
      })
      .catch((error) => {
        toast({
          title: "Login Failed",
          description: "An unexpected error occurred, please try again later.",
          variant: "destructive",
        });
        actions.setSubmitting(false);
      });
  };

  return (
    <Card className="w-[550px] bg-white p-[24px]">
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, actions) => {
          handleSubmit(values, actions);
        }}
      >
        {({ errors, touched }) => (
          <section>
            <CardHeader className="items-center">
              <section className="mb-5">
                <Image src="/logo.png" alt="logo" width={200} height={200} />
              </section>

              <CardTitle className="text-[36px] font-bold text-[#253C95]">
                Welcome Back!
              </CardTitle>

              <CardDescription className="text-[20px] text-[#808897]">
                Login to access to your account
              </CardDescription>
            </CardHeader>

            <CardContent>
              <Form>
                <section className="grid w-full items-center gap-4">
                  <section className="space-y-2">
                    <label className="text-[15px]" htmlFor="email">
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

                  <section className="space-y-2">
                    <label className="text-[15px]" htmlFor="password">
                      Password
                    </label>

                    <div className="relative">
                      <Field
                        type={showPassword ? "text" : "password"}
                        name="password"
                        id="password"
                        placeholder="Password"
                        className={getFieldClassName(errors, touched, "password")}
                      />
                      {!showPassword ? (
                        <BsFillEyeFill
                          className="absolute w-8 right-2 top-4 text-gray-500 cursor-pointer"
                          onClick={handleShowPassword}
                        />
                      ) : (
                        <HiEyeOff
                          className="absolute w-8 right-2 top-4 text-gray-500 cursor-pointer"
                          onClick={handleShowPassword}
                        />
                      )}
                      <CustomErrorMessagePass errors={errors} touched={touched} fieldName="password" />
                    </div>
                  </section>
                </section>

                <section className="flex flex-col justify-between gap-5">
                  <a
                    className="cursor-pointer flex justify-center mt-6"
                    onClick={() => router.push("/reset")}
                  >
                    <p className="text-[15px] text-[#253C95] hover:underline">
                      First time login?
                    </p>
                  </a>

                  <Button
                    type="submit"
                    className="w-full text-white py-6 text-[15px]"
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
