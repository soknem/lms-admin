import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, {useState} from "react";
import {useFormik} from "formik";
import * as Yup from "yup";
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import {Button} from "@/components/ui/button";
import {IoIosArrowDown} from "react-icons/io";
import {DropdownMenuCheckboxItemProps} from "@radix-ui/react-dropdown-menu";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Check, ChevronsUpDown} from "lucide-react";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList} from "@/components/ui/command";
import {cn} from "@/lib/utils";
type Checked = DropdownMenuCheckboxItemProps["checked"]

export default function AddInstructorForm() {
    const [activeTab, setActiveTab] = useState("personal_info");

    const [source, setSource] = useState<Blob | null>(null);

    const onFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files && files[0]) {
            setSource(files[0]);
        } else {
            setSource(null);
        }
    };

    const handleNext = (currentTab: any) => {
        if (currentTab === "personal_info") {
            setActiveTab("edu_info");
        } else if (currentTab === "edu_info") {
            setActiveTab("school_info");
        }
    };

    const gender = [
        { value: "female", label: "Female" },
        { value: "male", label: "Male" },
    ];

    const position = [
        { value: "instructor", label: "instructor" },
        { value: "staff", label: "Staff" },
        { value: "AcademicManager", label: "Academic Manager" },
        { value: "Principle", label: "Principle" },
        { value: "Admin", label: "Admin" },
    ];

    // Combobox for eduction
    const [open, setOpen] = React.useState(false)
    const [value, setValue] = React.useState("")

    // education combobox data
    const educations = [
        {
            value: "bachelorDegree",
            label: "Bachelor Degree",
        },
        {
            value: "masterDegree",
            label: "Master Degree",
        },
        {
            value: "phd",
            label: "Phd",
        },

    ]

    // Combobox for skill
    const [openSkill, setOpenSkill] = React.useState(false)
    const [valueSkill, setValueSkill] = React.useState("")

    // skill combobox data
    const skills = [
        {
            value: "cyber",
            label: "Cyber Security",
        },
        {
            value: "dataA",
            label: "Data Analytic",
        },
        {
            value: "dataB",
            label: "Database",
        },
        {
            value: "spring",
            label: "Spring",
        },
        {
            value: "web",
            label: "Web Design",
        },

    ]



    const formik = useFormik({
        initialValues: {
            card_id: "",
            email: "",
            name_en: "",
            name_kh: "",
            gender: "",
            dob: "",
            ph_number: "",
            fam_ph_number: "",
            position: "",
            skill: "",
            education: "",
            pob: "",
            address: "",
            bio: "",
            telegram:"",
            linkedIn: "",
            github: "",
            status: "",
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
        <section
            className="flex flex-grow flex-col gap-6  w-[1240px] h-[1350px] 2xl:h-[1020px] items-center-center rounded-[10px]">
            <section className="flex items-center mt-4">
                <h1 className="text-3xl font-bold text-lms-black-90">
                    Add New Instructor
                </h1>
            </section>
            <Tabs
                value={activeTab}
                onValueChange={setActiveTab}
                defaultValue="personal_info"
                className="w-full py-0 my-0 "
            >
                <TabsList className="bg-transparent w-full h-[50px]  rounded-none  ">
                    <div className="bg-transparent w-full flex justify-between items-center gap-4">
                        <div className=" flex items-center gap-4">
                            <TabsTrigger
                                value="personal_info"
                                className="dark:text-gray-300 dark:hover:text-white rounded-full border border-lms-primary h-[30px] w-[30px] text-[24px] font-bold text-lms-primary flex items-center justify-center text-center"
                            >
                                1
                            </TabsTrigger>
                            <p className="text-lms-primary text-lg ">Personal Information</p>

                        </div>
                        <hr className="border-2 border-lms-grayBorder w-full "/>

                        {/* <div className="border-l border-lms-primary h-full mx-2"></div> Vertical line */}

                        <div className=" flex items-center gap-6">
                            <TabsTrigger
                                value="social-media"
                                className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[30px] w-[30px] text-[24px] font-bold text-lms-primary flex items-center justify-center text-center"
                            >
                                2
                            </TabsTrigger>
                            <p className="text-lms-primary text-lg ">Social Media</p>
                        </div>
                        <hr className="border-2 border-lms-grayBorder w-full "/>
                        <div className=" flex items-center gap-6">
                            <TabsTrigger
                                value="document_upload"
                                className="dark:text-gray-300 dark:hover:text-white bg-white rounded-full border border-lms-primary h-[30px] w-[30px] text-[24px] font-bold text-lms-primary flex items-center justify-center text-center"
                            >
                                3
                            </TabsTrigger>
                            <p className="text-lms-primary text-lg ">Upload Documents</p>
                        </div>


                    </div>
                </TabsList>
                <form
                    className="my-6 py-6 space-y-6 md:space-y-6 bg-white rounded-xl"
                    onSubmit={formik.handleSubmit}
                >
                    {/* Personal Information */}
                    <TabsContent value="personal_info">
                        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4 justify-center items-center mx-10 ">

                            {/* english name */}
                            <div>
                                <RequiredFieldLabelComponent labelText="FullName(EN)"
                                                             labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <input
                                    type="text"
                                    name="name_en"
                                    onChange={formik.handleChange}
                                    value={formik.values.name_en}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="Sang Sokea"

                                />
                                {
                                    formik.errors.name_en ?
                                        <p className="text-red-700">{formik.errors.name_en}</p> : null
                                }
                            </div>

                            {/* khmer name */}
                            <div>
                                <RequiredFieldLabelComponent labelText="FullName(KH)"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <input
                                    type="text"
                                    name="name_kh"
                                    onChange={formik.handleChange}
                                    value={formik.values.name_kh}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="សាំង សុគា"

                                />
                                {
                                    formik.errors.name_kh ?
                                        <p className="text-red-700">{formik.errors.name_kh}</p> : null
                                }
                            </div>

                            {/* Gender */}
                            <div>
                                <RequiredFieldLabelComponent labelText="gender"
                                                             labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <select
                                    name="gender"
                                    onChange={formik.handleChange}
                                    value={formik.values.gender}
                                    className="border-2 focus:border-lms-grayBorder bg-gray-50 border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                >
                                    <option value="" label="Select option"/>
                                    {gender.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.gender ?
                                    <p className="text-red-700">{formik.errors.gender}</p> : null}
                            </div>

                            {/*Email*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Email"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <input
                                    type="text"
                                    name="email"
                                    onChange={formik.handleChange}
                                    value={formik.values.email}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="example@gmail.com"

                                />
                                {
                                    formik.errors.email ?
                                        <p className="text-red-700">{formik.errors.email}</p> : null
                                }
                            </div>

                            {/* Phone number*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Phone Number"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <input
                                    type="text"
                                    name="ph_number"
                                    onChange={formik.handleChange}
                                    value={formik.values.ph_number}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="0986452348"

                                />
                                {
                                    formik.errors.ph_number ?
                                        <p className="text-red-700">{formik.errors.ph_number}</p> : null
                                }
                            </div>

                            {/*Position*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Position"
                                                             labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <select
                                    name="position"
                                    onChange={formik.handleChange}
                                    value={formik.values.position}
                                    className="border-2 focus:border-lms-grayBorder bg-gray-50 border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                >
                                    <option value="" label="Select option"/>
                                    {position.map((option) => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                                {formik.errors.position ?
                                    <p className="text-red-700">{formik.errors.position}</p> : null}
                            </div>
                            {/*education*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Education"
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
                                                ? educations.find((stu) => stu.value === value)?.label
                                                : "Select Education..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[450px] bg-white p-0">
                                        <Command>
                                            <CommandInput placeholder="Search Education..."/>
                                            <CommandList>
                                                <CommandEmpty>No student found.</CommandEmpty>
                                                <CommandGroup>
                                                    {educations.map((stu) => (
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
                                    formik.errors.education ?
                                        <p className="text-red-700">{formik.errors.education}</p> : null
                                }
                            </div>
                            {/*Skill*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Skill"
                                                             labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <Popover open={openSkill} onOpenChange={setOpenSkill}>
                                    <PopoverTrigger asChild>
                                        <Button
                                            variant="outline"
                                            role="combobox"
                                            aria-expanded={open}
                                            className="w-full bg-white justify-between"
                                        >
                                            {value
                                                ? educations.find((stu) => stu.value === value)?.label
                                                : "Select Skill..."}
                                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50"/>
                                        </Button>
                                    </PopoverTrigger>
                                    <PopoverContent className="w-[450px] bg-white p-0">
                                        <Command>
                                            <CommandInput placeholder="Search Skill..."/>
                                            <CommandList>
                                                <CommandEmpty>No student found.</CommandEmpty>
                                                <CommandGroup>
                                                    {skills.map((stu) => (
                                                        <CommandItem
                                                            key={stu.value}
                                                            value={stu.value}
                                                            onSelect={(currentValue) => {
                                                                setValueSkill(currentValue === value ? "" : currentValue)
                                                                setOpenSkill(false)
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
                                    formik.errors.skill ?
                                        <p className="text-red-700">{formik.errors.skill}</p> : null
                                }
                            </div>


                            {/*Place of birth*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Place Of Birth"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <textarea
                                    name="pob"
                                    onChange={formik.handleChange}
                                    value={formik.values.pob}
                                    className="h-[80px] border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="No. 24, St. 562, Sangkat Boeung kak I, Khan Toul Kork, Phnom Penh, Cambodia"

                                />
                                {
                                    formik.errors.pob ?
                                        <p className="text-red-700">{formik.errors.pob}</p> : null
                                }
                            </div>

                            {/* current address*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Current Address"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <textarea
                                    name="address"
                                    onChange={formik.handleChange}
                                    value={formik.values.address}
                                    className="h-[80px] border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="No. 24, St. 562, Sangkat Boeung kak I, Khan Toul Kork, Phnom Penh, Cambodia"

                                />
                                {
                                    formik.errors.address ?
                                        <p className="text-red-700">{formik.errors.address}</p> : null
                                }
                            </div>
                            {/*Bio*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Bio"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <textarea
                                    name="bio"
                                    onChange={formik.handleChange}
                                    value={formik.values.bio}
                                    className="h-[80px] border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="Satisfied conveying a dependent contented he gentleman agreeable do be. Warrant private blushes removed an in equally totally if. "

                                />
                                {
                                    formik.errors.bio ?
                                        <p className="text-red-700">{formik.errors.bio}</p> : null
                                }
                            </div>

                        </div>

                    </TabsContent>

                    {/* social-media */}
                    <TabsContent value="social-media">
                        <div className="grid grid-cols-2 2xl:grid-cols-3 gap-4 justify-center items-center mx-10 ">
                            {/*telegram*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Telegram"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <input
                                    type="text"
                                    name="telegram"
                                    onChange={formik.handleChange}
                                    value={formik.values.telegram}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="@sangSokea"

                                />
                                {
                                    formik.errors.telegram ?
                                        <p className="text-red-700">{formik.errors.telegram}</p> : null
                                }
                            </div>
                            {/*Linkedin*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Linkedin"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <input
                                    type="url"
                                    name="linkedIn"
                                    onChange={formik.handleChange}
                                    value={formik.values.linkedIn}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="Sang Sokea"

                                />
                                {
                                    formik.errors.linkedIn ?
                                        <p className="text-red-700">{formik.errors.linkedIn}</p> : null
                                }
                            </div>
                            {/*Github*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Github"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <input
                                    type="url"
                                    name="github"
                                    onChange={formik.handleChange}
                                    value={formik.values.github}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="Sang Sokea"

                                />
                                {
                                    formik.errors.github ?
                                        <p className="text-red-700">{formik.errors.github}</p> : null
                                }
                            </div>
                        </div>

                    </TabsContent>

                    {/* document_upload */}
                    <TabsContent value="document_upload">
                        <div className="grid grid-cols-2 gap-4 justify-center items-center mx-10 ">
                            {/*cv*/}
                            <div>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag
                                                and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            onChange={onFileUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <div>
                                    {source && (
                                        <img
                                            src={URL.createObjectURL(source)}
                                            width={300}
                                            alt="Uploaded Preview"
                                        />
                                    )}
                                </div>
                            </div>


                            {/*id card*/}
                            <div>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="dropzone-file"
                                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                                    >
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg
                                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 16"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag
                                                and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">
                                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                                            </p>
                                        </div>
                                        <input
                                            id="dropzone-file"
                                            type="file"
                                            onChange={onFileUpload}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <div>
                                    {source && (
                                        <img
                                            src={URL.createObjectURL(source)}
                                            width={300}
                                            alt="Uploaded Preview"
                                        />
                                    )}
                                </div>
                            </div>

                        </div>
                        <div className="flex items-center justify-end w-full pr-10 mt-6">
                            <Button type="submit" className="bg-lms-primary text-lms-white-80 hover:bg-lms-primary/90" >Add Instructor</Button>
                        </div>


                    </TabsContent>

                </form>
            </Tabs>
        </section>
    )

}
