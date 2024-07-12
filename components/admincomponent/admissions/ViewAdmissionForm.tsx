"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import style from "../style.module.css";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog";

import React, {useEffect, useState} from "react";
import {TbAsterisk} from "react-icons/tb";
import {
    useGetAdmissionByAliasQuery
} from "@/lib/features/admin/admission-management/admission";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {selectAcademicYear} from "@/lib/features/admin/faculties/acdemicYear-management/academicYearSlice";

export function ViewAdmissionForm({uuid, onClose}: { uuid: string; onClose: () => void }) {
    const [open, setOpen] = useState(true);
    const [initialAlias, setInitialAlias] = useState("");
    const {data: admissionData, isSuccess} = useGetAdmissionByAliasQuery(uuid);
    const [initialValues, setInitialValues] = useState({
        uuid: "",
        academicYearAlias: "",
        openDate: "",
        endDate: "",
        telegramLink: "",
        remark: "",
        status: 0,
        isDeleted: false,
    });

    const academicYears = useSelector((state: RootState) => selectAcademicYear(state));
    const academicYearOption = academicYears.map(academicYear => ({
        value: academicYear.alias,
        label: academicYear.academicYear
    }));

    useEffect(() => {
        if (isSuccess && admissionData) {
            setInitialValues({
                uuid: admissionData.uuid,
                academicYearAlias: admissionData.academicYearAlias,
                openDate: admissionData.openDate,
                endDate: admissionData.endDate,
                telegramLink: admissionData.telegramLink,
                remark: admissionData.remark,
                status: admissionData.status,
                isDeleted: admissionData.isDeleted,
            });
            setInitialAlias(admissionData.alias);
        }
    }, [isSuccess, admissionData]);

    return (
        <Dialog open={open} onOpenChange={onClose} modal={true}>
            <DialogContent className="w-[480px] bg-white" onInteractOutside={(e) => e.preventDefault()}>
                <DialogHeader>
                    <DialogTitle className={`text-2xl font-semibold`}>Admission Information</DialogTitle>
                </DialogHeader>

                <Formik
                    enableReinitialize
                    initialValues={initialValues}
                    onSubmit={() => {
                    }}
                >
                    {() => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1 items-center">

                                {/*openDate*/}
                                <div className={style.inputContainer}>
                                    <div className="flex">
                                        <label className={style.label} htmlFor="openDate">
                                            Open Date
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        disabled
                                        type="date"
                                        name="openDate"
                                        id="openDate"
                                        className={style.input}
                                    />
                                </div>

                                {/*endDate*/}
                                <div className={style.inputContainer}>
                                    <div className="flex">
                                        <label className={style.label} htmlFor="endDate">
                                            End Date
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        disabled
                                        type="date"
                                        name="endDate"
                                        id="endDate"
                                        className={style.input}
                                    />
                                </div>

                                {/*telegramLink*/}
                                <div className={style.inputContainer}>
                                    <label className={style.label} htmlFor="telegramLink">
                                        Telegram Group URL
                                    </label>
                                    <Field
                                        disabled
                                        type="text"
                                        name="telegramLink"
                                        id="telegramLink"
                                        className={style.input}
                                    />
                                </div>

                                {/*remark*/}
                                <div className={style.inputContainer}>
                                    <label className={style.label} htmlFor="remark">
                                        Remark
                                    </label>
                                    <Field
                                        disabled
                                        type="text"
                                        name="remark"
                                        placeholder="This admission is for the first generation"
                                        id="remark"
                                        className={style.input}
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
