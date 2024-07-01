'use client';

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FormikErrors, FormikTouched } from "formik";
import { MdErrorOutline } from "react-icons/md";


interface CustomErrorMessageProps {
    errors: FormikErrors<any>;
    touched: FormikTouched<any>;
    fieldName: string;
}

export function CustomErrorMessageEmail({ errors, touched, fieldName }: CustomErrorMessageProps) {
    const { toast } = useToast();


    useEffect(() => {



        const errorMessage = errors[fieldName];

        if (touched[fieldName] && typeof errorMessage === 'string') {


            toast({
                variant: "red",
                description: (
                    <div className="flex items-center">
                        <MdErrorOutline size={20} className="mr-2 text-red-500" />
                        {errorMessage}
                    </div>
                ),
            });
        }
    }, [errors, touched, fieldName, toast]);

    return null;
}
