import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FiPlus} from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from 'yup'
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import { DropdownMenuCheckboxItemProps } from "@radix-ui/react-dropdown-menu"
import React from "react";
type Checked = DropdownMenuCheckboxItemProps["checked"]


// combobox
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import { Check, ChevronsUpDown } from "lucide-react"

import { cn } from "@/lib/utils"
import {IoCloseOutline} from "react-icons/io5";
import Modal from "@/components/common/ModalComponent";
import AsyncSelect from "react-select/async";
import {useGetInstructorQuery} from "@/lib/features/admin/user-management/instructor/instructor";
import {useGetStudentAdmissionsQuery} from "@/lib/features/admin/admission-management/studentAdmission";
import {useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {selectSingleClass} from "@/lib/features/admin/academic-management/detail-classes/singleClassSlice";
import {useAddStudentToClassMutation} from "@/lib/features/admin/academic-management/classes/classApi";
import {toast} from "react-hot-toast";



type PropsType = {
    onClose: () => void;
    isVisible: boolean;
}


export default function AddEnrolledStuForm({ isVisible, onClose }: PropsType) {
    const selectedClass = useSelector((state: RootState) => selectSingleClass(state));
    const {data: stuData, error: stuError, isLoading: isStuLoading, isSuccess: isStuSuccess} = useGetStudentAdmissionsQuery({page: 0, pageSize: 10});

    const [addStudentToClass] = useAddStudentToClassMutation()
    const classUuid = selectedClass?.uuid

    console.log("Student Data: ",stuData)

    const filterstudent = (inputValue: string) => {
        if (!stuData) return [];
        return stuData.content.filter((student: { email: string }) =>
            student.email.toLowerCase().includes(inputValue.toLowerCase())
        ).map((student: { uuid: string, email: string }) => ({
            value: student.uuid,
            label: student.email
        }));
    };

    const loadOptions = (inputValue: string) =>
        new Promise<any[]>((resolve) => {
            setTimeout(() => {
                resolve(filterstudent(inputValue));
            }, 1000);
        });



    const formik = useFormik({
        initialValues: {
            studentAdmissionUuid: []
        },
        validationSchema: Yup.object({
            studentAdmissionUuid: Yup.array().min(1, 'Select at least one student').required('studentAdmissionUuids are required')
        }),


        onSubmit: async (values, { setSubmitting }) => {

            try {
                await addStudentToClass({
                    classUuid,
                    studentAdmissionUuid: values.studentAdmissionUuid.map((option: any) => option.value)
                }).unwrap();
                toast.success("Add students successfully.");
                console.log("student formik: ",values)

                onClose();
            } catch (error) {
                toast.error("Failed to add student")
                console.error('Failed to add studentAdmissionUuids:', error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return(
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2 className="text-xl text-lms-black-90 font-bold mb-4">Add Enrolled Student</h2>
            <form className="h-[400px] space-y-2 " onSubmit={formik.handleSubmit}>
                <AsyncSelect
                    isMulti
                    cacheOptions
                    defaultOptions
                    loadOptions={loadOptions}
                    onChange={selectedOptions => formik.setFieldValue('studentAdmissionUuid', selectedOptions)}
                    value={formik.values.studentAdmissionUuid}
                />
                {formik.errors.studentAdmissionUuid && formik.touched.studentAdmissionUuid ? (
                    <div className="text-red-500 text-sm">{formik.errors.studentAdmissionUuid}</div>
                ) : null}
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="mt-2 bg-lms-primary hover:bg-lms-primary/80 text-white font-bold py-2 px-4 rounded"
                        disabled={isStuLoading}
                    >
                        {formik.isSubmitting || isStuLoading ? "Adding..." : "Add"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}