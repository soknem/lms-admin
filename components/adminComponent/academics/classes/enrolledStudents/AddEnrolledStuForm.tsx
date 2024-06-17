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

const students = [
    {
        value: "Noun Sovannthorn",
        label: "Noun Sovannthorn",
    },
    {
        value: "Pov Soknem",
        label: "Pov Soknem",
    },
    {
        value: "Sanh Panha",
        label: "Sanh Panha",
    },
]


export default function AddEnrolledStuForm() {

    // combobox
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const [openIns, setOpenIns] = React.useState(false)
    const [valueIns, setValueIns] = React.useState("")

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
        initialValues: {
            className: "",
            studyProgramAlias: "",
            shiftAlias: "",
            generationAlias: "",
            academicYear: "",
            visibility:""
        },
        validationSchema: Yup.object({
            className: Yup.string()
                .required("Required"),
            studyProgramAlias: Yup.string()
                .required("Required"),
            shiftAlias: Yup.string()
                .required("Required"),
            generationAlias: Yup.string()
                .required("Required"),
        }),
        onSubmit: values => {
            console.log(values)
        }
    })
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button className='text-lms-white-80 bg-lms-primary hover:bg-lms-primary/90'>
                    <FiPlus className="mr-2 h-4 w-4 " /> Add Students
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white w-[500px] ">
                <DialogHeader>
                    <DialogTitle>Add Students</DialogTitle>
                </DialogHeader>
                <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={formik.handleSubmit}
                >

                    <div>
                        <RequiredFieldLabelComponent labelText="Students"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full bg-white justify-between"
                                >
                                    {value
                                        ? students.find((stu) => stu.value === value)?.label
                                        : "Select Student..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[450px] bg-white p-0">
                                <Command>
                                    <CommandInput placeholder="Search Student..."/>
                                    <CommandList>
                                        <CommandEmpty>No student found.</CommandEmpty>
                                        <CommandGroup>
                                            {students.map((stu) => (
                                                <CommandItem
                                                    key={stu.value}
                                                    value={stu.value}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === stu.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {stu.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {
                            formik.errors.academicYear ?
                                <p className="text-red-700">{formik.errors.academicYear}</p> : null
                        }
                    </div>


                    <div className="flex justify-end">
                        <Button type="submit"
                                className=" text-lms-white-80 bg-lms-primary hover:bg-lms-primary rounded-[8px]">Add</Button>
                    </div>

                </form>
            </DialogContent>
        </Dialog>
    );
}