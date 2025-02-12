'use client'
import * as React from "react";
import {useEffect, useState} from "react";
import Image from "next/image";
import {BsFillEyeFill} from "react-icons/bs";
import {HiEyeOff} from "react-icons/hi";
import {useRouter} from "next/navigation";
import {Button} from "@/components/ui/button";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {Formik, Form, Field, FormikErrors, FormikTouched, ErrorMessage} from "formik";
import * as Yup from "yup";
import {CustomErrorMessageEmail} from '../alert/CustomErrorMessageEmail';
import {CustomErrorMessagePass} from "../alert/CustomErrorMessagePass";
import {toast} from "react-hot-toast";
import FormLoading from "@/components/common/LoadingComponent/FormLoading";



interface InitialValues {
    emailOrUsername: string;
    password: string;
}

const initialValues: InitialValues = {
    emailOrUsername: "",
    password: "",
};

const validationSchema = Yup.object({
    emailOrUsername: Yup.string().required("Please enter your email or username."),
    password: Yup.string().required("Please enter your password."),
});

const getFieldClassName = (
    errors: FormikErrors<InitialValues>,
    touched: FormikTouched<InitialValues>,
    fieldName: keyof InitialValues
) => {
    const baseClass = "bg-gray-100 dark:bg-gray-100 tracking-[0.5px] border text-gray-900 dark:text-gray-700 text-[15px] rounded-[8px] focus:outline-blue-600 border-gray-300 block w-full p-2.5";
    const errorClass = "border-red-600 dark:border-red-600";
    const validClass = "border-gray-300 dark:border-gray-300";

    return touched[fieldName] && errors[fieldName]
        ? `${baseClass} ${errorClass}`
        : `${baseClass} ${validClass}`;
};

type DecodedToken = {
    iss: string;
    sub: string;
    exp: number;
    iat: number;
    isChangePassword: boolean;
    roles: string[];
}

function parseJwt(token: string): DecodedToken | null {
    if (!token) {
        return null;
    }
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
}

export function CardLogin({SetIsSuccess} : any) {
    const [showPassword, setShowPassword] = useState(false);
    const [decodedToken, setDecodedToken] = useState<DecodedToken | null>(null);
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formikValues, setFormikValues] = useState(initialValues);

    const handleShowPassword = () => {
        setShowPassword(!showPassword);
    };

    useEffect(() => {
        setTimeout(() => {
            SetIsSuccess(false);
        }, 5000);
    }, [SetIsSuccess]);

    const handleSubmit = (values: InitialValues, actions: any) => {
        setLoading(true); // Show loading
        fetch(`${process.env.NEXT_PUBLIC_LMS_URL}/api/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("data from login: ", data);
                if (data.accessToken) {
                    const decoded = parseJwt(data.accessToken);
                    console.log("decoded token: ", decoded);
                    if (decoded) {
                        if (!decoded.isChangePassword) {
                            router.push("/reset-password");
                        } else {
                            setDecodedToken(decoded);
                            // Check user role and navigate accordingly
                            if (decoded.roles.includes("admin")) {
                                console.log("decoded Token from login: ", "admin");
                                router.push("/admin/summary-dashboard");
                            } else if (decoded.roles.includes("student")) {
                                console.log("decoded Token from login: ", "student");
                                router.push("/student/courses");
                            } else if (decoded.roles.includes("instructor")) {
                                console.log("decoded Token from login: ", "instructor");
                                router.push("/instructor/courses");
                            } else {
                                toast.error("Unauthorized Role")
                                setLoading(false);
                                setIsSubmitting(false);
                            }

                        }
                        toast.success("Login Successfully!");
                        SetIsSuccess(true)
                    }
                } else {
                    toast.error("Login Failed!")
                    actions.setSubmitting(false);
                    setIsSubmitting(false);
                    setLoading(false);
                }


            })
            .catch((error) => {
                console.error("Error:", error);
                toast.error(error.message);
                actions.setSubmitting(false);
                setIsSubmitting(false);
                setLoading(false);
            });
    };

    useEffect(() => {
        const emailOrUsernameInput = document.getElementById("emailOrUsername") as HTMLInputElement;
        const passwordInput = document.getElementById("password") as HTMLInputElement;

        if (emailOrUsernameInput && passwordInput) {
            setFormikValues({
                emailOrUsername: emailOrUsernameInput.value,
                password: passwordInput.value,
            });
        }
    }, []);

    return (
        <>
            {loading ? (
                <FormLoading />
            ) : (
                <></>
            )}
            <Card
                className={`w-[450px] bg-white/80 backdrop-blur-[2px] dark:bg-white p-[16px] border border-gray-300 dark:border-white ${loading ? "blur-[1px]" : ""}`}>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values, actions) => {
                        handleSubmit(values, actions);
                    }}
                >
                    {({errors, touched,values, handleChange, }) => (
                        <section>
                            <CardHeader className="items-center dark:border-white">
                                <section className="mb-5">
                                    <Image src="/logo.png" alt="logo" width={130} height={130}/>
                                </section>
                                <CardTitle
                                    className="  text-[40px] text-center font-bold text-[#253C95] tracking-[0.5px] leading-[54px] dark:text-[#253C95]">
                                    Welcome
                                </CardTitle>
                                <CardDescription className="text-[20px] text-gray-600 tracking-[0.5px] ">
                                    Login to access your account
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Form>

                                    <section className="grid w-full items-center gap-4 mt-[20px]">
                                        <section className="space-y-2">
                                            <label
                                                className="text-[16px] leading-[24px] tracking-[0.5px] text-gray-800"
                                                htmlFor="email">
                                                Email
                                                <span className={`text-red-600 `}> *</span>
                                            </label>


                                            <Field

                                                type="text"
                                                name="emailOrUsername"
                                                id="emailOrUsername"
                                                className={getFieldClassName(errors, touched, "emailOrUsername")}
                                                size="sm"
                                                autoFocus
                                                placeholder=" Email or Username"
                                                variant="bordered"
                                                value={values.emailOrUsername}
                                                onChange={handleChange}
                                                disabled={loading}

                                            />

                                            <ErrorMessage
                                                name="emailOrUsername"
                                                component="div"
                                                className="text-red-600  text-[15px] mt-1 leading-[24px] tracking-[0.5px] "/>


                                        </section>


                                        <section className="space-y-2">


                                            <label
                                                className="text-[16px] leading-[24px] tracking-[0.5px] text-gray-800"
                                                htmlFor="password">
                                                Password
                                                <span className={`text-red-600 `}> *</span>
                                            </label>


                                            <section className="relative">
                                                <Field
                                                    type={showPassword ? "text" : "password"}
                                                    name="password"
                                                    id="password"
                                                    placeholder="Password"
                                                    className={getFieldClassName(errors, touched, "password")}
                                                    value={values.password}
                                                    onChange={handleChange}
                                                    disabled={loading}
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


                                            <ErrorMessage
                                                name="password"
                                                component="div"
                                                className="text-red-600  text-[15px] mt-1 leading-[24px] tracking-[0.5px] "/>


                                        </section>

                                        <Button
                                            className="text-[16px] hover:scale-[100.2%] tracking-[0.5px] w-full bg-[#253C95] dark:bg-[#253C95] hover:bg-lms-primary dark:hover:bg-lms-primary text-white font-bold py-2 my-3 rounded-[8px]"
                                            type="submit"
                                            disabled={loading}

                                        >
                                            {loading ? "Logging in..." : "Login"}
                                        </Button>

                                    </section>
                                    {/*{loading ?  <Lottie className={"h-[250px] w-[250px] "} animationData={}/> : null}*/}


                                </Form>
                            </CardContent>
                        </section>
                    )}
                </Formik>
            </Card>


        </>

    );
}
