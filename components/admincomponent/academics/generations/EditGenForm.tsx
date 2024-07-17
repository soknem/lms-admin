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
import {useUpdateGenerationMutation} from "@/lib/features/admin/academic-management/generation/generation";



type PropsType = {
    onClose: () => void;
    isVisible: boolean;
    GenName: string;
    startGenYear: string;
    endGenYear: string;
    alias: string;
}


export default function EditGenForm({ isVisible, onClose,alias, GenName, startGenYear, endGenYear }: PropsType) {

   const [updateGeneration,{isLoading}] = useUpdateGenerationMutation();

    const currentYear = new Date().getFullYear();

    const formik = useFormik({
        initialValues: {
            startYear: startGenYear || "",
            endYear: endGenYear || "",
        },
        validationSchema: Yup.object({
            startYear: Yup.string().matches(/^\d+$/, "Start Year must be a valid year and contain only numbers.")
                .test('is-valid-start-year', 'Start Year must be a valid year.', value => {
                    const year = Number(value);
                    return year > 0 && year >= currentYear - 100;
                })
                .required("Start Year is required")
                .typeError("Start Year must be a number"),

            endYear: Yup.string().matches(/^\d+$/, "End Year must be a valid year and contain only numbers.")
                .required("End Year is required")
                .typeError("End Year must be a number")
                .test('is-valid-end-year', 'End Year must be a valid year.', value => {
                    const year = Number(value);
                    return year > 0;
                })
                .when('startYear', (startYear, schema) => {
                    return schema.test({
                        test: endYear => {
                            const start = Number(startYear);
                            const end = Number(endYear);
                            return end > start;
                        },
                        message: 'End Year must be greater than Start Year',
                    });
                }),
        }),


        onSubmit: async (values, { setSubmitting }) => {

            try {

                const updatedData = {
                    startYear: values.startYear,
                    endYear: values.endYear,
                }

                if(alias){
                    await updateGeneration({
                        alias,
                        updatedData
                    }).unwrap();
                    toast.success("Update generation successfully.");
                    console.log("generation formik: ",values)
                }
                onClose();
            } catch (error) {
                toast.error("Failed to update generation")
                console.error('Failed to update generation:', error);
            } finally {
                setSubmitting(false);
            }
        }
    });

    return(
        <Modal isVisible={isVisible} onClose={onClose}>
            <h2 className="text-xl text-lms-black-90 font-bold mb-4">Update Generation</h2>
            <form className=" w-[480px] space-y-2 " onSubmit={formik.handleSubmit}>
                <div>
                    <RequiredFieldLabelComponent labelText="Start Year"
                                                 labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}/>
                    <input
                        type="text"
                        name="startYear"
                        onChange={formik.handleChange}
                        value={formik.values.startYear}
                        className="border outline-lms-gray-30   bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                        placeholder="2025"

                    />
                    {
                        formik.errors.startYear ? <p className="text-red-700">{formik.errors.startYear}</p> : null
                    }
                </div>
                <div>
                    <RequiredFieldLabelComponent labelText="End Year"
                                                 labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}/>
                    <input
                        type="text"
                        name="endYear"
                        onChange={formik.handleChange}
                        value={formik.values.endYear}
                        className="border outline-lms-gray-30  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                        placeholder="2029"

                    />
                    {
                        formik.errors.endYear ? <p className="text-red-700">{formik.errors.endYear}</p> : null
                    }
                </div>
                <div className="flex justify-end">
                    <button
                        type="submit"
                        className="mt-2 bg-lms-primary hover:bg-lms-primary/80 text-white font-bold py-2 px-4 rounded"
                        disabled={isLoading}
                    >
                        {formik.isSubmitting || isLoading ? "Updating..." : "Update"}
                    </button>
                </div>
            </form>
        </Modal>
    );
}