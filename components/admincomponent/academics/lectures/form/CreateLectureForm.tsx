import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FiPlus} from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from 'yup'
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Label} from "@/components/ui/label";
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


const instructors = [
    {
        value: "Sang Sokea",
        label: "Sang Sokea",
    },
    {
        value: "Mom Reksmey",
        label: "Mom Reksmey",
    },
    {
        value: "Chan Chayya",
        label: "Chan Chayya",
    },

]

const courses = [
    {
        value: "Intro",
        label: "Introduction to IT",
    },
    {
        value: "Intensive English",
        label: "Intensive English I",
    },


]

const classes = [
    {
        value: "m1",
        label: "FY2025-M1",
    },
    {
        value: "a1",
        label: "FY2025-A1",
    },

]

export default function CreateLectureForm() {

    // dropdown
    const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
    const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
    const [showPanel, setShowPanel] = React.useState<Checked>(false)

    // combobox
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    const [openIns, setOpenIns] = React.useState(false)
    const [valueIns, setValueIns] = React.useState("")

    const [openCls, setOpenCls] = React.useState(false)
    const [valueCls, setValueCls] = React.useState("")

    const formik = useFormik({
        initialValues: {
            startTime: "",
            endTime: "",
            instructor: "",
            teachingType: "",
            date: "",
            course: "",
            class: "FY2025-M1",
            isDraft: true,
        },
        validationSchema: Yup.object({
            startTime: Yup.string()
                .required("Required"),
            endTime: Yup.string()
                .required("Required"),
            teachingType: Yup.string()
                .required("Required"),
            date: Yup.string()
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
                    <FiPlus className="mr-2 h-4 w-4 " /> Add Lecture
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white w-[500px] ">
                <DialogHeader>
                    <DialogTitle>Add Lecture</DialogTitle>
                </DialogHeader>
                <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={formik.handleSubmit}
                >
                    {/*Start Time*/}
                    <div>
                        <RequiredFieldLabelComponent labelText="Start Time"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="time"
                            name="startTime"
                            onChange={formik.handleChange}
                            value={formik.values.startTime}
                            className="border outline-lms-gray-30 bg-gray-50 border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="8:30AM"

                        />
                        {
                            formik.errors.startTime ? <p className="text-red-700">{formik.errors.startTime}</p> : null
                        }
                    </div>

                    {/*End Time*/}
                    <div>
                        <RequiredFieldLabelComponent labelText="End Time"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="time"
                            name="endTime"
                            onChange={formik.handleChange}
                            value={formik.values.endTime}
                            className="border outline-lms-gray-30 bg-gray-50 border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="8:30AM"

                        />
                        {
                            formik.errors.endTime ? <p className="text-red-700">{formik.errors.endTime}</p> : null
                        }
                    </div>

                    {/* Class */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Class"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <Popover open={openCls} onOpenChange={setOpenCls}>
                            <PopoverTrigger asChild>
                                <Button
                                    role="combobox"
                                    aria-expanded={open}
                                    className="text-gray-600 border  border-lms-gray-30 w-full bg-white justify-between"
                                >
                                    {value
                                        ? classes.find((ins) => ins.value === value)?.label
                                        : "Select Class..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[450px] bg-white p-0">
                                <Command>
                                    <CommandInput placeholder="Search Class..."/>
                                    <CommandList>
                                        <CommandEmpty>No course found.</CommandEmpty>
                                        <CommandGroup>
                                            {classes.map((ins) => (
                                                <CommandItem
                                                    key={ins.value}
                                                    value={ins.value}
                                                    onSelect={(currentValue) => {
                                                        setValueCls(currentValue === value ? "" : currentValue)
                                                        setOpenCls(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === ins.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {ins.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {
                            formik.errors.class ?
                                <p className="text-red-700">{formik.errors.class}</p> : null
                        }
                    </div>

                    {/* Course */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Course"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    role="combobox"
                                    aria-expanded={open}
                                    className="text-gray-600 border  border-lms-gray-30 w-full bg-white justify-between"
                                >
                                    {value
                                        ? courses.find((ins) => ins.value === value)?.label
                                        : "Select Course..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[450px] bg-white p-0 ">
                                <Command>
                                    <CommandInput className="text-gray-500" placeholder="Search Course..."/>
                                    <CommandList>
                                        <CommandEmpty>No course found.</CommandEmpty>
                                        <CommandGroup>
                                            {courses.map((ins) => (
                                                <CommandItem
                                                    key={ins.value}
                                                    value={ins.value}
                                                    onSelect={(currentValue) => {
                                                        setValue(currentValue === value ? "" : currentValue)
                                                        setOpen(false)
                                                    }}
                                                >
                                                    <Check
                                                        className={cn(
                                                            "mr-2 h-4 w-4",
                                                            value === ins.value ? "opacity-100" : "opacity-0"
                                                        )}
                                                    />
                                                    {ins.label}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    </CommandList>
                                </Command>
                            </PopoverContent>
                        </Popover>
                        {
                            formik.errors.instructor ?
                                <p className="text-red-700">{formik.errors.instructor}</p> : null
                        }
                    </div>




                    {/* Visibility */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Visibility"
                                                     labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}/>

                        <input
                            type="radio"
                            id="isDraftFalse"
                            name="isDraft"
                            value="true"
                            checked={formik.values.isDraft}
                            onChange={() => formik.setFieldValue("isDraft", true)}
                        />
                        <label htmlFor="isDraftTrue" className="px-2 pr-4">Draft</label>

                        <input
                            type="radio"
                            id="isDraftFalse"
                            name="isDraft"
                            value="false"
                            checked={!formik.values.isDraft}
                            onChange={() => formik.setFieldValue("isDraft", false)}
                        />
                        <label htmlFor="isDraftFalse" className="px-2 pr-4">Public</label>

                        {formik.errors.isDraft && <p className="text-red-700">{formik.errors.isDraft}</p>}
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