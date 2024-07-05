'use client'
import * as React from "react";
import {useState} from "react";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {BsFillEyeFill} from "react-icons/bs";
import {HiEyeOff} from "react-icons/hi";
import {Button} from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Formik, Form, Field, FormikErrors, FormikTouched} from 'formik';
import * as Yup from 'yup';
import {CustomErrorMessagePass} from "../alert/CustomErrorMessagePass";

// reset-password import
import {useUpdatePasswordMutation} from "@/lib/features/reset-password/resetPassword";
import {log} from "next/dist/server/typescript/utils";
import {useGetFacultiesQuery} from "@/lib/features/admin/faculties/faculty/faculty";


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
    password: Yup.string().required('Please enter your new password.'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password')], 'Confirm new passwords must match with new password').required('Confirm password is required'),
});

// Define function to get field class name based on validation status
const getFieldClassName = (errors: FormikErrors<InitialValues>, touched: FormikTouched<InitialValues>, fieldName: keyof InitialValues) => {
    const baseClass = "bg-gray-100 dark:bg-gray-100 tracking-[0.5px] border text-gray-900 dark:text-gray-700 text-[15px] rounded-[8px] focus:outline-blue-600 border-gray-300 block w-full p-2.5";
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

    const [updatePassword, {data, error, status}] = useUpdatePasswordMutation();

    // Function to handle form submission
    const handleSubmit = async (values: InitialValues) => {

        try {
            const response = await updatePassword({
                newPassword: values.password,
                confirmPassword: values.confirmPassword,
            }).unwrap();

            console.log("Password reset successful");
            alert('Password reset successful!');
            router.push('/login');

        } catch (e) {
            console.error('Error updating password:', e);
        }
    };


    // Router instance for navigation
    const router = useRouter();


    // Render the component
    return (
        <Card className="w-[450px] bg-white/80 backdrop-blur-[2px] dark:bg-white p-[16px] border border-gray-300 dark:border-white">
            <Formik
                initialValues={initialValues}
                validationSchema={validationSchema}
                onSubmit={(values, actions) => {
                    handleSubmit(values);
                }}
            >
                {({errors, touched}) => (
                    <section>
                        <CardHeader className="items-center dark:border-white ">
                            <section className="mb-5">
                                <Image src="/logo.png" alt="logo" width={130} height={130}/>
                            </section>
                            <CardTitle className="text-[36px] tracking-[0.5px] leading-[54px] font-bold text-[#253C95] dark:text-[#253C95]">
                                Change password
                            </CardTitle>
                            <CardDescription className="text-[20px] tracking-[0.5px] leading-[30px] text-gray-600 ">
                                Enter new password for your account
                            </CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Form>
                                <section className="grid w-full items-center gap-4 mt-[20px]">
                                    <section className="space-y-2">
                                        <label className="text-[16px] text-gray-800 " htmlFor="password">
                                            New Password
                                            <span className={`text-red-500`}> *</span>
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type={showPassword ? "text" : "password"}
                                                name="password"
                                                id="password"
                                                placeholder="New Password"
                                                className={getFieldClassName(errors, touched, 'password')}
                                            />
                                            {!showPassword ? <BsFillEyeFill
                                                className="absolute w-8 right-2 top-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                                                onClick={handleShowPassword}/> : <HiEyeOff
                                                className="absolute w-8 right-2 top-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                                                onClick={handleShowPassword}/>}
                                        </div>

                                        {/* Render CustomErrorMessagePass for password field */}
                                        <CustomErrorMessagePass errors={errors} touched={touched} fieldName="password"/>
                                    </section>
                                    <section className="space-y-2">
                                        <label className="text-[16px] text-gray-800" htmlFor="confirmPassword">
                                            Confirm New Password
                                            <span className={`text-red-500`}> *</span>
                                        </label>
                                        <div className="relative">
                                            <Field
                                                type={showConfirmPassword ? "text" : "password"}
                                                name="confirmPassword"
                                                id="confirmPassword"
                                                placeholder="Confirm New Password"
                                                className={getFieldClassName(errors, touched, 'confirmPassword')}
                                            />
                                            {!showConfirmPassword ? <BsFillEyeFill
                                                className="absolute w-8 right-2 top-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                                                onClick={handleShowConfirmPassword}/> : <HiEyeOff
                                                className="absolute w-8 right-2 top-4 text-gray-500 dark:text-gray-400 cursor-pointer"
                                                onClick={handleShowConfirmPassword}/>}
                                        </div>

                                        {/* Render CustomErrorMessagePass for confirmPassword field */}
                                        <CustomErrorMessagePass errors={errors} touched={touched}
                                                                fieldName="confirmPassword"/>
                                    </section>
                                </section>
                                <section className="flex flex-col justify-between mt-6">
                                    <Button type="submit"
                                            className="w-full bg-[#253C95] tracking-[0.5px] hover:bg-[#243888] rounded-xl text-white py-6 text-[16px] ">
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