'use client'
import {Field, useFormik} from "formik";
import * as Yup from 'yup'
import React, {useEffect, useState} from "react";
import Modal from "@/components/common/ModalComponent";
import {useGetInstructorQuery} from "@/lib/features/admin/user-management/instructor/instructor";
import {toast} from "react-hot-toast";
import Select, {SingleValue} from "react-select";
import {useAddInstructorToCourseMutation} from "@/lib/features/admin/academic-management/courses/courseApi";
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import {Button} from "@/components/ui/button";
import {
    useGetStaffAuthoritiesByUuidQuery,
    useUpdateStaffAuthoritiesMutation
} from "@/lib/features/admin/user-management/staff/staff";



type PropsType = {
    onClose: () => void;
    isVisible: boolean;
    staffUuid: string;
}

type Authority = {
    authorityName: string;
}

type FormValues = {
    authorityNames: string[];
}

export default function EditUserAuthorityForm({ isVisible, onClose , staffUuid }: PropsType) {

    const {data: singleStaffData, error: singleStaffError, isSuccess: isSingleStaffSuccess  } = useGetStaffAuthoritiesByUuidQuery(staffUuid)

    const [updateStaffAuthority , {isLoading: isAuthorityLoading}] = useUpdateStaffAuthoritiesMutation();

    useEffect(() => {
        if (isSingleStaffSuccess && singleStaffData) {
            const authorityNames = singleStaffData.authorities.map((authority: Authority) => authority.authorityName);
            formik.setFieldValue('authorityNames', authorityNames, false);
            console.log('authority: ', authorityNames);
        }
    }, [isSingleStaffSuccess, singleStaffData]);

    // *** Authority name ***
    const authorityOptions: string[] = [
        "faculty:write",
        "faculty:update",
        "faculty:delete",
        "academic:read",
        "academic:write",
        "academic:update",
        "academic:delete",
        "admission:read",
        "admission:write",
        "admission:update",
        "admission:delete",
        "course:read",
        "course:write",
        "course:update",
        "course:delete",
        "payment:read",
        "payment:write",
        "payment:update",
        "payment:delete",
        "user:read",
        "user:write",
        "user:update",
        "user:delete",
        "admin:control",
    ];

    const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>, authority: string) => {
        const isChecked = event.target.checked;
        const currentAuthorities = formik.values.authorityNames;

        if (isChecked) {
            if (!currentAuthorities.includes(authority)) {
                formik.setFieldValue('authorityNames', [...currentAuthorities, authority]);
            }
        } else {
            const updatedAuthorities = currentAuthorities.filter((name) => name !== authority);
            formik.setFieldValue('authorityNames', updatedAuthorities);
        }
    };

    const formik = useFormik<FormValues>({
        initialValues: {
            authorityNames: []
        },
        validationSchema: Yup.object({

        }),

        onSubmit: async (values, { setSubmitting ,resetForm }) => {
            const uuid = staffUuid

            if (values.authorityNames.length > 0) {

                const modifiedAuthorityNames = values.authorityNames;

                formik.setFieldValue('authorityNames', modifiedAuthorityNames);

                const updatedData = {
                    authorityNames: modifiedAuthorityNames
                }

                try {
                    await updateStaffAuthority({uuid,updatedData}).unwrap();
                    toast.success("Updated Authority successfully.");
                    console.log("Authority formik: ",values)
                    resetForm();
                    onClose();
                } catch (error) {
                    toast.error("Failed to updated authority")
                    console.error('Failed to updated authority:', error);
                } finally {
                    setSubmitting(false);
                }
            }
        }
    });

    return(
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2 className="text-xl text-lms-black-90 font-bold mb-4">Edit Authorities</h2>
            <form className="z-50 w-[560px]  space-y-2" onSubmit={formik.handleSubmit}>
                <div className="mt-6">
                    <div className="grid grid-cols-3 gap-4 justify-center items-start">
                        {authorityOptions.map(authority => (
                            <div key={authority} className="flex items-center mb-2">
                                <input
                                    type="checkbox"
                                    name="authorityNames"
                                    value={authority}
                                    checked={formik.values.authorityNames.includes(authority)}
                                    onChange={(event) => handleCheckboxChange(event, authority)}
                                    className="form-checkbox"
                                />
                                <label className="ml-2">{authority}</label>
                            </div>
                        ))}
                    </div>
                </div>


                <div className="flex items-center justify-end w-full  mt-6"
                >
                    <Button type="submit"
                            className="bg-lms-primary text-lms-white-80 hover:bg-lms-primary/90"
                            disabled={isAuthorityLoading}
                    >{isAuthorityLoading ? "Updating" : "Update"}</Button>
                </div>
            </form>
        </Modal>
    )
        ;
}