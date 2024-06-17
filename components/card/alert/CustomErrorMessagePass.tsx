"use client";

import { useEffect } from "react";
import { useToast } from "@/components/ui/use-toast";
import { FormikErrors, FormikTouched } from "formik";

interface CustomErrorMessageProps {
  errors: FormikErrors<any>;
  touched: FormikTouched<any>;
  fieldName: string;
}

export function CustomErrorMessagePass({
  errors,
  touched,
  fieldName,
}: CustomErrorMessageProps) {
  const { toast } = useToast();

  useEffect(() => {
    const errorMessage = errors[fieldName];

    if (touched[fieldName] && typeof errorMessage === "string") {
      toast({
        variant: "red",
        title: "Validation Password Error",
        description: errorMessage,
      });
    }
  }, [errors, touched, fieldName, toast]);

  return null;
}
