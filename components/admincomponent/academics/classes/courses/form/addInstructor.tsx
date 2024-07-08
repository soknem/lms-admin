'use client'
import { useFormik } from "formik";
import * as Yup from 'yup'
import React, {useEffect, useState} from "react";
import Modal from "@/components/common/ModalComponent";
import {useGetInstructorQuery} from "@/lib/features/admin/user-management/instructor/instructor";
import {toast} from "react-hot-toast";
import Select, {SingleValue} from "react-select";
import {useAddInstructorToCourseMutation} from "@/lib/features/admin/academic-management/courses/courseApi";



type PropsType = {
    onClose: () => void;
    isVisible: boolean;
    courseUuid: string;
}


export default function AddInstructorForm({ isVisible, onClose , courseUuid }: PropsType) {

    // *** Instructor ***
    const {data: InsData, error: InsError, isLoading: isInsLoading, isSuccess: isInsSuccess} = useGetInstructorQuery({page: 0, pageSize: 10});

    const [instructors, setInstructors] = useState([]);

    useEffect(() => {
        if (InsData) {
            const formattedIns = InsData.content.map((ins: any) => ({
                value: ins.uuid,
                label: `${ins.username}`,
            }));
            setInstructors(formattedIns);
            console.log("instructor from create class: ",formattedIns)
        }
        if (InsError) {
            console.error("failed to load instructor error", InsError);
        }
    }, [InsData, InsError]);

    const handleInstructorChange = (selectedOption : any) => {
        const uuid = selectedOption?.value;
        formik.setFieldValue('instructorUuid', uuid);
    };

    const [AddInstructorToCourse] = useAddInstructorToCourseMutation()


    const formik = useFormik({
        initialValues: {
            instructorUuid: ""
        },
        validationSchema: Yup.object({
            instructorUuid: Yup.string().required("instructorUuid is required"),
        }),


        onSubmit: async (values, { setSubmitting ,resetForm }) => {
            const instructorUuid = values.instructorUuid;
            try {
                await AddInstructorToCourse({
                    courseUuid,
                    instructorUuid
                }).unwrap();
                toast.success("Add instructor successfully.");
                console.log("instructor formik: ",values)
                resetForm();
                onClose();
            } catch (error) {
                toast.error("Failed to add instructor")
                console.error('Failed to add instructor:', error);
            } finally {
                setSubmitting(false);
            }

        }
    });

    return(
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2 className="text-xl text-lms-black-90 font-bold mb-4">Add Instructor To Course</h2>
            <form className="h-[250px] space-y-2" onSubmit={formik.handleSubmit}>
                <div>
                    <label className="block text-gray-700 font-semibold mb-2">
                        Instructor
                    </label>
                    <Select
                        name="instructorUuid"
                        options={instructors}
                        value={instructors.find(
                            (option: any) => option.value === formik.values.instructorUuid
                        )}
                        onChange={(option) => handleInstructorChange(option)}
                        onBlur={formik.handleBlur}
                        className={`w-full ${
                            formik.touched.instructorUuid && formik.errors.instructorUuid
                                ? "border-red-500"
                                : "border-gray-300"
                        } `}
                    />
                    {formik.touched.instructorUuid && formik.errors.instructorUuid && (
                        <p className="text-red-500 text-sm mt-1">{formik.errors.instructorUuid}</p>
                    )}
                </div>

                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="mt-2 bg-lms-primary hover:bg-lms-primary/80 text-white font-bold py-2 px-4 rounded"
                        disabled={formik.isSubmitting}
                    >
                        {formik.isSubmitting ? "Adding..." : "Add"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}