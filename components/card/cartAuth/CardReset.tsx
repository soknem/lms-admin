'use client'
import * as React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { BsFillEyeFill } from "react-icons/bs";
import { HiEyeOff } from "react-icons/hi";
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Formik, Form, Field, FormikErrors, FormikTouched } from 'formik';
import * as Yup from 'yup';
import { CustomErrorMessagePass } from "../alert/CustomErrorMessagePass";

// Define initial values for the form fields
interface InitialValues {
    password: string;
    confirmPassword: string;
}

const initialValues: InitialValues = {
    password: '',
    confirmPassword: '',
}

// Define validation schema using Yup
const validationSchema = Yup.object({
    password: Yup.string().required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Passwords must match').required('Confirm password is required'),
});

// Define function to get field class name based on validation status
const getFieldClassName = (errors: FormikErrors<InitialValues>, touched: FormikTouched<InitialValues>, fieldName: keyof InitialValues) => {
    const baseClass = "bg-gray-100 dark:bg-gray-100 border text-gray-900 dark:text-gray-900 text-[15px] rounded-xl focus:ring-blue-500 block w-full p-2.5";
    const errorClass = "border-red-500 dark:border-red-500 focus:border-red-500";
    const validClass = "border-gray-300 dark:border-gray-300";

    return touched[fieldName] && errors[fieldName] ? `${baseClass} ${errorClass}` : `${baseClass} ${validClass}`;
};

// Define CardReset component
export function CardReset() {
    // State variables for showing/hiding password fields
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Toggle function for showing/hiding password fields
    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    };

    // Function to handle form submission
    const handleSubmit = (values: InitialValues) => {
        // Your form submission logic goes here
    };

    // Router instance for navigation
    const router = useRouter();

    // Render the component
    return (
        <Card className="w-[550px] bg-white dark:bg-white p-[24px] border border-gray-300 dark:border-white">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    handleSubmit(values);
                }}
            >
                {({ errors, touched }) => (
                    <section>
                        <CardHeader className="items-center dark:border-black">
                            <section className="mb-5">
                                <Image src="/logo.png" alt="logo" width={200} height={200} />
                            </section>
                            <CardTitle className="text-[36px] font-bold text-[#253C95] dark:text-[#253C95]">
                                Reset your password
                            </CardTitle>
                            <CardDescription className="text-[20px] text-[#808897] dark:text-[#808897]">
                                Enter new password for your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form>
                                <section className="grid w-full items-center gap-4">
                                    <section className="space-y-2">
                                        <label className="text-[15px] text-gray-500 " htmlFor="password">
                                            Password
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                placeholder="Password"
                                                className={getFieldClassName(errors, touched, 'password')}
                                            />
                                            {!showPassword ? <BsFillEyeFill className="absolute w-8 right-2 top-4 text-gray-500 dark:text-gray-400 cursor-pointer" onClick={handleShowPassword} /> : <HiEyeOff className="absolute w-8 right-2 top-4 text-gray-500 dark:text-gray-400 cursor-pointer" onClick={handleShowPassword} />}
                                        </div>

                                        {/* Render CustomErrorMessagePass for password field */}
                                        <CustomErrorMessagePass errors={errors} touched={touched} fieldName="password" />
                                    </section>
                                    <section className="space-y-2">
                                        <label className="text-[15px] text-gray-500" htmlFor="confirmPassword">
                                            Confirm Password
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                placeholder="Confirm Password"
                                                className={getFieldClassName(errors, touched, 'confirmPassword')}
                                            />
                                            {!showConfirmPassword ? <BsFillEyeFill className="absolute w-8 right-2 top-4 text-gray-500 dark:text-gray-400 cursor-pointer" onClick={handleShowConfirmPassword} /> : <HiEyeOff className="absolute w-8 right-2 top-4 text-gray-500 dark:text-gray-400 cursor-pointer" onClick={handleShowConfirmPassword} />}
                                        </div>

                                        {/* Render CustomErrorMessagePass for confirmPassword field */}
                                        <CustomErrorMessagePass errors={errors} touched={touched} fieldName="confirmPassword" />
                                    </section>
                                </section>
                                <section className="flex flex-col justify-between mt-6">
                                    <Button onClick={() => router.push('/reset')} type="submit" className="w-full bg-[#253C95] hover:bg-[#243888] rounded-xl text-white py-6 text-[15px] ">
                                        Reset Password
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
