"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import style from "../../style.module.css";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";
import React, {useEffect, useState} from "react";
import {TbAsterisk} from "react-icons/tb";
import {useGetAcademicYearByAliasQuery} from "@/lib/features/admin/faculties/acdemicYear-management/academicYear";

const RadioButton = ({field, value, label}: any) => {
    return (
        <div>
            <input
                type="radio"
                {...field}
                id={value.toString()}
                value={value.toString()}
                checked={field.value.toString() === value.toString()}
            />
            <label className="pl-2" htmlFor={value.toString()}>
                {label}
            </label>
        </div>
    );
};

export function ViewAcademicYeaForm({alias}: { alias: string }) {
    const [open, setOpen] = useState(true);
    const [initialAlias, setInitialAlias] = useState("");
    const {data: academicYearData, isSuccess} = useGetAcademicYearByAliasQuery(alias);
    const [initialValues, setInitialValues] = useState({
        alias: "",
        academicYear: "",
        status: 0,
        isDeleted: false,
        isDraft: false
    });

    useEffect(() => {
        if (isSuccess && academicYearData) {
            setInitialValues({
                alias: academicYearData.alias,
                academicYear: academicYearData.academicYear,
                status: academicYearData.status,
                isDeleted: academicYearData.isDeleted,
                isDraft: academicYearData.isDraft
            });
            setInitialAlias(academicYearData.alias);
        }
    }, [isSuccess, academicYearData]);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Dialog open={open} onOpenChange={handleClose}>
            <DialogContent className="w-[480px] bg-white ">
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Degree Information</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={() => {
                    }}
                >
                    {() => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1">

                                {/* academicYear*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="academicYear">
                                            Academic Year
                                        </label>
                                    </div>
                                    <Field
                                        disabled
                                        type="text"
                                        name="academicYear"
                                        id="academicYear"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="academicYear"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Academic Year Alias*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Slug
                                        </label>
                                    </div>
                                    <Field
                                        disabled
                                        type="text"
                                        name="alias"
                                        id="alias"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="alias"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`flex w-full justify-between flex-wrap space-y-2`}>

                                    {/* isDraft */}
                                    <div className={``}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="isDraft">
                                                Visibility
                                            </label>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                disabled
                                                name="isDraft"
                                                component={RadioButton}
                                                value="true"
                                                label="Public"
                                            />
                                            <Field
                                                disabled
                                                name="isDraft"
                                                component={RadioButton}
                                                value="false"
                                                label="Draft"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDraft"
                                            component={RadioButton}
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    <div className={``}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="isDeleted">
                                                Status
                                            </label>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                disabled
                                                name="isDeleted"
                                                component={RadioButton}
                                                value="true"
                                                label="Public"
                                            />
                                            <Field
                                                disabled
                                                name="isDeleted"
                                                component={RadioButton}
                                                value="false"
                                                label="Draft"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDeleted"
                                            component={RadioButton}
                                            className={`${style.error}`}
                                        />
                                    </div>

                                    <div className={``}>
                                        <div className="flex">
                                            <label className={`${style.label}`} htmlFor="status">
                                                Starting
                                            </label>
                                        </div>
                                        <div className="flex gap-4 h-[40px] items-center">
                                            <Field
                                                disabled
                                                name="status"
                                                component={RadioButton}
                                                value="1"
                                                label="Starting"
                                            />
                                            <Field
                                                disabled
                                                name="status"
                                                component={RadioButton}
                                                value="2"
                                                label="Ended"
                                            />
                                            <Field
                                                disabled
                                                name="status"
                                                component={RadioButton}
                                                value="3"
                                                label="Achieved"
                                            />
                                        </div>

                                        <ErrorMessage
                                            name="isDeleted"
                                            component={RadioButton}
                                            className={`${style.error}`}
                                        />
                                    </div>

                                </div>
                            </div>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
