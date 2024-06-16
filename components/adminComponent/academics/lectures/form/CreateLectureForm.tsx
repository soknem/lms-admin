import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FiPlus} from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from 'yup'
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Label} from "@/components/ui/label";
// dropdown import
import { IoIosArrowDown } from "react-icons/io";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
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
            status:""
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
                    <DialogTitle>Add Class</DialogTitle>
                </DialogHeader>
                <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <RequiredFieldLabelComponent labelText="Start Time"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="text"
                            name="className"
                            onChange={formik.handleChange}
                            value={formik.values.startTime}
                            className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="8:30AM"

                        />
                        {
                            formik.errors.startTime ? <p className="text-red-700">{formik.errors.startTime}</p> : null
                        }
                    </div>
                    <div>
                        <RequiredFieldLabelComponent labelText="End Time"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="text"
                            name="className"
                            onChange={formik.handleChange}
                            value={formik.values.endTime}
                            className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="10:00AM"

                        />
                        {
                            formik.errors.endTime ? <p className="text-red-700">{formik.errors.endTime}</p> : null
                        }
                    </div>

                    <div>
                        <RequiredFieldLabelComponent labelText="Course"
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
                                        ? courses.find((ins) => ins.value === value)?.label
                                        : "Select Course..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[450px] bg-white p-0">
                                <Command>
                                    <CommandInput placeholder="Search Course..."/>
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


                    <div>
                        <RequiredFieldLabelComponent labelText="Instructors"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <Popover open={openIns} onOpenChange={setOpenIns}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full bg-white justify-between"
                                >
                                    {value
                                        ? instructors.find((ins) => ins.value === value)?.label
                                        : "Select Instructor..."}
                                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[450px] bg-white p-0">
                                <Command>
                                    <CommandInput placeholder="Search Instructor..."/>
                                    <CommandList>
                                        <CommandEmpty>No instructor found.</CommandEmpty>
                                        <CommandGroup>
                                            {instructors.map((ins) => (
                                                <CommandItem
                                                    key={ins.value}
                                                    value={ins.value}
                                                    onSelect={(currentValue) => {
                                                        setValueIns(currentValue === value ? "" : currentValue)
                                                        setOpenIns(false)
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
                    <div>
                        <RequiredFieldLabelComponent labelText="Class"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <Popover open={openCls} onOpenChange={setOpenCls}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-full bg-white justify-between"
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
                    <div>
                        <RequiredFieldLabelComponent labelText="Status"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>

                        <RadioGroup defaultValue="default" className="flex gap-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="r1"/>
                                <Label htmlFor="r1">Started</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="r2"/>
                                <Label htmlFor="r2">Pending</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="ended" id="r3"/>
                                <Label htmlFor="r3">Ended</Label>
                            </div>

                        </RadioGroup>

                        {
                            formik.errors.status ? <p className="text-red-700">{formik.errors.status}</p> : null
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