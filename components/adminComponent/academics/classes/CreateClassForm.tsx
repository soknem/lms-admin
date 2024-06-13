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

export default function CreateClassForm() {

  // dropdown
  const [showStatusBar, setShowStatusBar] = React.useState<Checked>(true)
  const [showActivityBar, setShowActivityBar] = React.useState<Checked>(false)
  const [showPanel, setShowPanel] = React.useState<Checked>(false)

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
            <FiPlus className="mr-2 h-4 w-4 " /> Add Class
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
              <RequiredFieldLabelComponent labelText="Class Code"
                                           labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
              <input
                  type="text"
                  name="className"
                  onChange={formik.handleChange}
                  value={formik.values.className}
                  className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                  placeholder="FY2025 - M1"

              />
              {
                formik.errors.className ? <p className="text-red-700">{formik.errors.className}</p> : null
              }
            </div>
            <div>
              <RequiredFieldLabelComponent labelText="Study Program"
                                           labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full border bg-gray-50 flex justify-between items-center">
                    Software Engineering
                    <IoIosArrowDown size={18}/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white w-[450px]">
                  <DropdownMenuCheckboxItem
                      checked={showStatusBar}
                      onCheckedChange={setShowStatusBar}
                  >
                    Computer Science
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                      checked={showPanel}
                      onCheckedChange={setShowPanel}
                  >
                    Data Analytic
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {
                formik.errors.studyProgramAlias ?
                    <p className="text-red-700">{formik.errors.studyProgramAlias}</p> : null
              }
            </div>
            <div>
              <RequiredFieldLabelComponent labelText="Generation"
                                           labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full border bg-gray-50 flex justify-between items-center">
                    Generation 1
                    <IoIosArrowDown size={18}/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white w-[450px]">
                  <DropdownMenuCheckboxItem
                      checked={showStatusBar}
                      onCheckedChange={setShowStatusBar}
                  >
                    Generation 2
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                      checked={showPanel}
                      onCheckedChange={setShowPanel}
                  >
                    Generation 3
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {
                formik.errors.generationAlias ?
                    <p className="text-red-700">{formik.errors.generationAlias}</p> : null
              }
            </div>
            <div>
              <RequiredFieldLabelComponent labelText="Shift"
                                           labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full border bg-gray-50 flex justify-between items-center">
                    Morning
                    <IoIosArrowDown size={18}/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white w-[450px]">
                  <DropdownMenuCheckboxItem
                      checked={showStatusBar}
                      onCheckedChange={setShowStatusBar}
                  >
                    Afternoon
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                      checked={showPanel}
                      onCheckedChange={setShowPanel}
                  >
                    Evening
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {
                formik.errors.shiftAlias ?
                    <p className="text-red-700">{formik.errors.shiftAlias}</p> : null
              }
            </div>
            <div>
              <RequiredFieldLabelComponent labelText="Academic Year"
                                           labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="w-full border bg-gray-50 flex justify-between items-center">
                    2025 - 2026
                    <IoIosArrowDown size={18}/>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="bg-white w-[450px]">
                  <DropdownMenuCheckboxItem
                      checked={showStatusBar}
                      onCheckedChange={setShowStatusBar}
                  >
                    2027 - 2028
                  </DropdownMenuCheckboxItem>
                  <DropdownMenuCheckboxItem
                      checked={showPanel}
                      onCheckedChange={setShowPanel}
                  >
                    2028 - 2029
                  </DropdownMenuCheckboxItem>
                </DropdownMenuContent>
              </DropdownMenu>
              {
                formik.errors.academicYear ?
                    <p className="text-red-700">{formik.errors.academicYear}</p> : null
              }
            </div>
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
                      <CommandEmpty>No student found.</CommandEmpty>
                      <CommandGroup>
                        {instructors.map((ins) => (
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
                formik.errors.academicYear ?
                    <p className="text-red-700">{formik.errors.academicYear}</p> : null
              }
            </div>
            <div>
              <RequiredFieldLabelComponent labelText="Visibility"
                                           labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>

              <RadioGroup defaultValue="default" className="flex gap-2">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default" id="r1"/>
                  <Label htmlFor="r1">Public</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="comfortable" id="r2"/>
                  <Label htmlFor="r2">Draft</Label>
                </div>

              </RadioGroup>

              {
                formik.errors.visibility ? <p className="text-red-700">{formik.errors.visibility}</p> : null
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