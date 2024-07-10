import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import React, { useState} from "react";
import { useFormik} from "formik";
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import {Button} from "@/components/ui/button";
import {DropdownMenuCheckboxItemProps} from "@radix-ui/react-dropdown-menu";
type Checked = DropdownMenuCheckboxItemProps["checked"]
import CreatableSelectComponent from "@/components/common/form/CreatableSelectComponent";
import {toast} from "react-hot-toast";
import {useAddInstructorMutation} from "@/lib/features/admin/user-management/instructor/instructor";
import {FiUploadCloud} from "react-icons/fi";
import Image from "next/image";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import Select from "react-select";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {cn} from "@/lib/utils";
import {Calendar as CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";


export default function AddInstructorForm() {
    const [activeTab, setActiveTab] = useState("personal_info");

    const [cvFile, setCvFile] = useState<Blob | null>(null);
    const [idCardFile, setIdCardFile] = useState<Blob | null>(null);
    const [imagePfFile, setImagePfFile] = useState<Blob | null>(null);

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<Blob | null>>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
    };

    // **** Status ****
    const [selectedGender, setSelectedGender] = useState('');

    const handleGenderChange = (selectedOption: any) => {
        const value = selectedOption?.value;
        setSelectedGender(value);
    };

    const genderList = [
        {
            value: "F",
            label: 'Female',
        },
        {
            value: "M",
            label: 'Male',
        },

    ];

    const [addInstructor, { isLoading : isInsLoading, isSuccess : isInsSucess, error: isInsError }] = useAddInstructorMutation();

    const [createSingleFile] = useCreateSingleFileMutation();

    const [birthDate, setBirthDate] = React.useState<Date>()

    const handleAddInstructor = async (values : any) => {

        if (!cvFile || !idCardFile || !imagePfFile) {
            console.error('CV file or ID card or Profile Image file is missing.');
            return;
        }

        try {
            // Upload CV file
            const cvFormData = new FormData();
            cvFormData.append('file', cvFile);

            const cvResponse = await createSingleFile(cvFormData).unwrap();
            console.log('CV File uploaded:', cvResponse);

            // Upload ID card file
            const idCardFormData = new FormData();
            idCardFormData.append('file', idCardFile);

            const idCardResponse = await createSingleFile(idCardFormData).unwrap();
            console.log('ID Card File uploaded:', idCardResponse);

            // Upload Profile Image
            const imagePfFormData = new FormData();
            imagePfFormData.append('file', imagePfFile);

            const imagePfResponse = await createSingleFile(imagePfFormData).unwrap();
            console.log('Pf File uploaded:', imagePfFile);

            const newInstructor = {
                nameEn: values.nameEn,
                nameKh: values.nameKh,
                gender: selectedGender,
                email: values.email,
                phoneNumber: values.phoneNumber,
                position: "INSTRUCTOR",
                dob: values.dob,
                educations: values.educations,
                skills: values.skills,
                birthPlace: values.birthPlace,
                currentAddress: values.currentAddress,
                bio: values.bio,
                linkGit: values.linkGit,
                linkLinkedin: values.linkLinkedin,
                linkTelegram: values.linkTelegram,
                uploadCv: cvResponse.name,
                identityCard: idCardResponse.name,
                profileImage: imagePfResponse.name
            };

            console.log("New Instructor Data: ", newInstructor); // Debugging the new class data

            try {
                await addInstructor(newInstructor).unwrap();
                toast.success('Successfully created!');
                console.log("Class created successfully"); // Debugging successful creation
            } catch (error) {
                toast.error('Failed to create instructor!');
                console.error("Error creating instructor: ", error); // Debugging the error
            }
        } catch (error) {
            console.error('Error uploading files:', error);
            // Handle error state
        }


    };


    const formik = useFormik({
        initialValues: {
            nameEn: "",
            nameKh: "",
            gender: "",
            email: "",
            phoneNumber: "",
            dob: "",
            educations: [],
            skills: [],
            birthPlace: "",
            currentAddress: "",
            bio: "",
            linkGit: "",
            linkLinkedin: "",
            linkTelegram: "",
            uploadCv: "",
            identityCard: "",
            profileImage: ""
        },
        // validationSchema: Yup.object({
        //     startTime: Yup.string()
        //         .required("Required"),
        //     endTime: Yup.string()
        //         .required("Required"),
        //     teachingType: Yup.string()
        //         .required("Required"),
        //     date: Yup.string()
        //         .required("Required"),
        // }),
        onSubmit: values => {
            // console.log(values)
            // handleAddInstructor(values);
            const formattedValues = {
                ...values,
                dob: birthDate ? format(birthDate, "yyyy-MM-dd") : "",
            };
            // dispatch(addLecture(formattedValues))
            console.log("form values: ",values);
            handleAddInstructor(formattedValues);
        }
    })

    const CustomInput = ({ field, form, setFieldValue, ...props }: any) => {
        const [imagePreview, setImagePreview] = useState("");

        const handleUploadFile = (e : any) => {
            const file = e.target.files[0];
            const localUrl = URL.createObjectURL(file);
            setImagePreview(localUrl);

            setFieldValue(field.name, file);
        };

        return (
            <div className="w-full">
                <input
                    type="file"
                    onChange={handleUploadFile}
                    className="hidden"
                    id="file"
                />
                <label
                    htmlFor="file"
                    className="border border-gray-300 hover:bg-lms-background text-gray-900 text-sm rounded-lg bg-white w-full h-[68px] p-2 border-dashed flex justify-center items-center cursor-pointer relative overflow-hidden"
                >
                    {!imagePreview ? (
                        <div className="flex items-center justify-center gap-8">
                            <FiUploadCloud className="text-lms-primary text-[34px]" />
                            <div className="flex flex-col items-start justify-start gap-1">
                                <p className="text-center text-md text-black">
                                    Select a file or drag and drop here
                                </p>
                                <p className="text-center text-md text-lms-gray-30">
                                    JPG, PNG or PDF, file size no more than 10MB
                                </p>
                            </div>
                        </div>
                    ) : (
                        <div style={{ position: 'relative', width: '100%', height: '100%' }}>
                            <Image
                                src={imagePreview}
                                alt="preview"
                                fill
                                style={{ objectFit: 'contain' }}
                            />
                        </div>
                    )}
                </label>
            </div>
        );
    };

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
                                    name="nameEn"
                                    onChange={formik.handleChange}
                                    value={formik.values.nameEn}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="Sang Sokea"

                                />
                                {
                                    formik.errors.nameEn ?
                                        <p className="text-red-700">{formik.errors.nameEn}</p> : null
                                }
                            </div>

                            {/* khmer name */}
                            <div>
                                <RequiredFieldLabelComponent labelText="FullName(KH)"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <input
                                    type="text"
                                    name="nameKh"
                                    onChange={formik.handleChange}
                                    value={formik.values.nameKh}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="សាំង សុគា"

                                />
                                {
                                    formik.errors.nameKh ?
                                        <p className="text-red-700">{formik.errors.nameKh}</p> : null
                                }
                            </div>

                            {/* Gender */}
                            <div>
                                <RequiredFieldLabelComponent
                                    labelText="Gender"
                                    labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                />
                                <Select
                                    className="basic-single"
                                    classNamePrefix="select"
                                    name="gender"
                                    options={genderList}
                                    onChange={handleGenderChange}
                                />
                                {
                                    formik.errors.gender ? <p className="text-red-700">{formik.errors.gender}</p> : null
                                }
                            </div>

                            <div>
                                <RequiredFieldLabelComponent labelText="Date Of Birth"
                                                             labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <div className="relative">
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                className={cn(
                                                    "text-gray-600 border  border-lms-gray-30 w-full justify-start text-left font-normal",
                                                    !birthDate && "text-gray-600"
                                                )}
                                            >
                                                <CalendarIcon className="mr-2 h-4 w-4"/>
                                                {birthDate ? format(birthDate, "PPP") : <span>Pick a date</span>}
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0 bg-white ">
                                            <Calendar
                                                mode="single"
                                                selected={birthDate}
                                                onSelect={setBirthDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>

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
                                    name="phoneNumber"
                                    onChange={formik.handleChange}
                                    value={formik.values.phoneNumber}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="0986452348"

                                />
                                {
                                    formik.errors.phoneNumber ?
                                        <p className="text-red-700">{formik.errors.phoneNumber}</p> : null
                                }
                            </div>

                            {/*education*/}
                            <div>
                                <CreatableSelectComponent
                                    label="Education"
                                    fieldName="educations"
                                    formik={formik}
                                />
                            </div>


                            {/*Skill*/}
                            <div>
                                <CreatableSelectComponent
                                    label="Skills"
                                    fieldName="skills"
                                    formik={formik}
                                />
                            </div>


                            {/*Place of birth*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Place Of Birth"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <textarea
                                    name="birthPlace"
                                    onChange={formik.handleChange}
                                    value={formik.values.birthPlace}
                                    className="h-[80px] border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="No. 24, St. 562, Sangkat Boeung kak I, Khan Toul Kork, Phnom Penh, Cambodia"
                                />
                                {
                                    formik.errors.birthPlace ?
                                        <p className="text-red-700">{formik.errors.birthPlace}</p> : null
                                }
                            </div>


                            {/*Current Address*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Current Address"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <textarea
                                    name="currentAddress"
                                    onChange={formik.handleChange}
                                    value={formik.values.currentAddress}
                                    className="h-[80px] border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="No. 24, St. 562, Sangkat Boeung kak I, Khan Toul Kork, Phnom Penh, Cambodia"
                                />
                                {
                                    formik.errors.currentAddress ?
                                        <p className="text-red-700">{formik.errors.currentAddress}</p> : null
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
                                    name="linkTelegram"
                                    onChange={formik.handleChange}
                                    value={formik.values.linkTelegram}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="@sangSokea"

                                />
                                {
                                    formik.errors.linkTelegram ?
                                        <p className="text-red-700">{formik.errors.linkTelegram}</p> : null
                                }
                            </div>
                            {/*Linkedin*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Linkedin"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <input
                                    type="url"
                                    name="linkLinkedin"
                                    onChange={formik.handleChange}
                                    value={formik.values.linkLinkedin}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="Sang Sokea"

                                />
                                {
                                    formik.errors.linkLinkedin ?
                                        <p className="text-red-700">{formik.errors.linkLinkedin}</p> : null
                                }
                            </div>
                            {/*Github*/}
                            <div>
                                <RequiredFieldLabelComponent labelText="Github"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <input
                                    type="url"
                                    name="linkGit"
                                    onChange={formik.handleChange}
                                    value={formik.values.linkGit}
                                    className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                                    placeholder="Sang Sokea"

                                />
                                {
                                    formik.errors.linkGit ?
                                        <p className="text-red-700">{formik.errors.linkGit}</p> : null
                                }
                            </div>
                        </div>

                    </TabsContent>

                    {/* document_upload */}
                    <TabsContent value="document_upload">
                        <div className="grid grid-cols-2 gap-4 justify-center items-start mx-10 ">
                            {/* CV File Upload */}
                            <div>
                                <RequiredFieldLabelComponent labelText="Upload CV File"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="cv-dropzone-file"
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
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF
                                                (MAX. 800x400px)</p>
                                        </div>
                                        <input
                                            id="cv-dropzone-file"
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, setCvFile)}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <div>
                                    {cvFile && (
                                        <img src={URL.createObjectURL(cvFile)} width={300} alt="CV Uploaded Preview"/>
                                    )}
                                </div>
                            </div>

                            {/* ID Card File Upload */}
                            <div>
                                <RequiredFieldLabelComponent labelText="Upload ID Card"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="idcard-dropzone-file"
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
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF
                                                (MAX. 800x400px)</p>
                                        </div>
                                        <input
                                            id="idcard-dropzone-file"
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, setIdCardFile)}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <div className="w-full flex justify-center mt-6 ">
                                    {idCardFile && (
                                        <img src={URL.createObjectURL(idCardFile)} width={300}
                                             alt="ID Card Uploaded Preview"/>
                                    )}
                                </div>
                            </div>


                            {/* Image Pf File Upload */}
                            <div>
                                <RequiredFieldLabelComponent labelText="Upload Profile Image"
                                                             labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                                <div className="flex items-center justify-center w-full">
                                    <label
                                        htmlFor="pf-dropzone-file"
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
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth="2"
                                                    d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                                />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                                <span className="font-semibold">Click to upload</span> or drag and drop
                                            </p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF
                                                (MAX. 800x400px)</p>
                                        </div>
                                        <input
                                            id="pf-dropzone-file"
                                            type="file"
                                            onChange={(e) => handleFileUpload(e, setImagePfFile)}
                                            className="hidden"
                                        />
                                    </label>
                                </div>
                                <div className="w-full flex justify-center mt-6 ">
                                    {imagePfFile && (
                                        <img src={URL.createObjectURL(imagePfFile)} width={300}
                                             alt="Profile Image Uploaded Preview"/>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center justify-end w-full pr-10 mt-6">
                            <Button type="submit" className="bg-lms-primary text-lms-white-80 hover:bg-lms-primary/90" disabled={isInsLoading}>{isInsLoading ? "Adding..." : "Add"}</Button>
                        </div>
                    </TabsContent>

                </form>
            </Tabs>
        </section>
    )

}
