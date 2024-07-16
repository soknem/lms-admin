"use client";
import {Formik, Form, Field, ErrorMessage, useFormik} from "formik";
import React, {useEffect, useState} from "react";
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import {IoCameraOutline} from "react-icons/io5";
import Select from "react-select";
import CreatableSelectComponent from "@/components/common/form/CreatableSelectComponent";
import UpdateCreatableSelectComponent from "@/components/common/form/UpdateCreatableSelectComponent";
import Image from "next/image";
import placeholderImage from "@/public/common/placeholderPf.png";
import {HiMiniDocumentText} from "react-icons/hi2";
import {FaAddressCard} from "react-icons/fa";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Calendar as CalendarIcon} from "lucide-react";
import {format} from "date-fns";
import {Calendar} from "@/components/ui/calendar";
import {useCreateSingleFileMutation} from "@/lib/features/uploadfile/file";
import {toast} from "react-hot-toast";
import {useUpdateStaffMutation} from "@/lib/features/admin/user-management/staff/staff";


export function EditStaffForm( {updateData} : any ) {

    console.log("data staff detail :" , updateData);

    const [profileImage, setProfileImage] = useState(updateData?.profileImage || '');

    const [cvPreview, setCvPreview] = useState(updateData?.uploadCv || '');

    const [idCardPreview, setIdCardPreview] = useState(updateData?.identityCard || '');

    const [cvFile, setCvFile] = useState<Blob | null>(null);
    const [idCardFile, setIdCardFile] = useState<Blob | null>(null);
    const [pfImageFile,  setPfImageFile] = useState<Blob | null>(null);

    const [birthDate, setBirthDate] = useState<Date | undefined>(undefined);

    const [createSingleFile] = useCreateSingleFileMutation();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>, setFile: React.Dispatch<React.SetStateAction<Blob | null>>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFile(file);
        }
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

    const initialGender = genderList.find(option => option.value === updateData?.gender);

    // **** Gender ****
    const [selectedGender, setSelectedGender] = useState(initialGender);

    const handleGenderChange = (selectedOption: any) => {
        const value = selectedOption?.value;
        setSelectedGender(value);
    };

    useEffect(() => {
         setSelectedGender(initialGender);
         formik.setFieldValue('gender', initialGender?.value);

        if (updateData && updateData.dob) {
            setBirthDate(new Date(updateData.dob));
            formik.setFieldValue('dob', new Date(updateData.dob));
        }

    }, [updateData]);


    // update staff
    const [updateStaff, { isLoading : isStfLoading, isSuccess : isStfSucess, error: isStfError }] = useUpdateStaffMutation();


    const handleUpdateStaff = async(values : any) => {

        const uuid = updateData?.uuid;

        const educationValues = values.educations.map((education: { label: string; value: string }) => education.value);

        const skillValues = values.skills.map((skill: { label: string; value: string }) => skill.value);


        try {


            const updatedData : any = {
                nameEn: values.nameEn,
                nameKh: values.nameKh,
                gender: selectedGender?.value,
                phoneNumber: values.phoneNumber,
                dob: values.dob,
                educations: educationValues,
                skills: skillValues,
                birthPlace: values.birthPlace,
                currentAddress: values.currentAddress,
                bio: values.bio,
                linkGit: values.linkGit,
                linkLinkedin: values.linkLinkedin,
                linkTelegram: values.linkTelegram,
            };



            if (cvFile) {
                const cvFormData = new FormData();
                cvFormData.append('file', cvFile);
                const cvResponse = await createSingleFile(cvFormData).unwrap();
                console.log('CV File uploaded:', cvResponse);
                updatedData.uploadCv = cvResponse.name;
            }

            if (idCardFile) {
                const idCardFormData = new FormData();
                idCardFormData.append('file', idCardFile);
                const idCardResponse = await createSingleFile(idCardFormData).unwrap();
                console.log('ID Card File uploaded:', idCardResponse);
                updatedData.identityCard = idCardResponse.name;
            }

            if (pfImageFile) {
                const pfImageFormData = new FormData();
                pfImageFormData.append('file', pfImageFile);
                const pfImageResponse = await createSingleFile(pfImageFormData).unwrap();
                console.log('Profile Image File uploaded:', pfImageResponse);
                updatedData.profileImage = pfImageResponse.name;
            }

           await updateStaff({uuid,updatedData}).unwrap();
            toast.success('Successfully updated!');
            console.log("Staff updated successfully");
        } catch (error) {
            toast.error('Failed to update staff!');
            console.error("Error update staff: ", error);
        }
    }

    const formik = useFormik({
        initialValues: {
            nameEn: updateData?.nameEn || "",
            nameKh: updateData?.nameKh || "",
            gender: updateData?.gender || '',
            email: updateData?.email || "",
            phoneNumber: updateData?.phoneNumber || "",
            dob: updateData?.dob || "",
            educations: updateData?.educations.map((edu: string) => ({ label: edu, value: edu })) || [],
            skills: updateData?.skills.map((skill: string) => ({ label: skill, value: skill })) || [],
            birthPlace: updateData?.birthPlace || "",
            currentAddress: updateData?.currentAddress || "",
            bio: updateData?.bio || "",
            linkGit: updateData?.linkGit || "",
            linkLinkedin: updateData?.linkLinkedin || "",
            linkTelegram: updateData?.linkTelegram || "",
            uploadCv: updateData?.uploadCv || '',
            identityCard: updateData?.identityCard || '',
            profileImage: updateData?.profileImage || '',
            position: updateData?.position || '',
        },
        // validationSchema: Yup.object({
        //     startTime: Yup.string().required("Required"),
        //     endTime: Yup.string().required("Required"),
        //     teachingType: Yup.string().required("Required"),
        // }),
        onSubmit: values => {
            const formattedValues = {
                ...values,
                dob: birthDate ? format(birthDate, "yyyy-MM-dd") : "",
            };
            console.log("Form values: ", formattedValues);
            handleUpdateStaff(formattedValues)
        }
    });

    // useEffect(() => {
    //     formik.setFieldValue('gender', selectedGender?.value);
    // }, [selectedGender, formik]);



    const openInNewTab = (url: string) => {
        const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
        if (newWindow) {
            newWindow.opener = null;
        }
    };

    return (
        <div>
            <p className="font-bold text-2xl mb-2">Personal Information</p>

            <form
                className="py-4 rounded-lg w-full flex flex-col justify-center items-center"
                onSubmit={formik.handleSubmit}
            >
                <div className="w-full grid grid-cols-3 gap-4 justify-center items-center ">
                    {/* image */}
                            <div className="h-[170px] w-[164px] relative rounded-[10px] grid row-span-2">
                                { pfImageFile ? (
                                    <>
                                        <Image className="object-cover h-[170px] w-[164px] rounded-[8px] overflow-hidden" width={100} height={100}
                                               src={URL.createObjectURL(pfImageFile)}
                                               alt="profile"/>
                                        <label
                                            className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2">
                                            <IoCameraOutline className="w-5 h-5"/>
                                            <input
                                                id="pf-dropzone-file"
                                                type="file"
                                                onChange={(e) => handleFileUpload(e, setPfImageFile)}
                                                className="hidden"
                                            />
                                        </label>
                                    </>
                                ) : (
                                    <div>
                                        {profileImage ? (
                                                <div className="h-[170px] w-[164px] relative rounded-[10px] grid row-span-2">
                                                    <Image className="object-cover h-[170px] w-[164px] rounded-[8px]" width={100} height={100}
                                                           src={profileImage}
                                                           alt="profile"/>
                                                    <label
                                                        className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2">
                                                        <IoCameraOutline className="w-5 h-5"/>
                                                        <input
                                                            id="cv-dropzone-file"
                                                            type="file"
                                                            onChange={(e) => handleFileUpload(e, setPfImageFile)}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>)

                                            : (
                                                <div>
                                                    <Image
                                                        className="object-cover h-[170px] w-[164px] rounded-[8px] overflow-hidden "
                                                        width={100} height={100}
                                                        src={placeholderImage}
                                                        alt="profile"/>
                                                    <label
                                                        className="w-[50px] h-[50px] bg-white rounded-full flex items-center justify-center absolute -right-4 -bottom-4 border-2">
                                                        <IoCameraOutline className="w-5 h-5"/>
                                                        <input
                                                            id="cv-dropzone-file"
                                                            type="file"
                                                            onChange={(e) => handleFileUpload(e, setPfImageFile)}
                                                            className="hidden"
                                                        />
                                                    </label>
                                                </div>
                                        )}
                                    </div>
                                )}

                            </div>


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
                            typeof formik.errors.nameEn === 'string' &&
                            <p className="text-red-700">{formik.errors.nameEn}</p>
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
                            className="khmer-font border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="សាំង សុគា"

                        />
                        {
                            typeof formik.errors.nameKh === 'string' &&
                            <p className="text-red-700">{formik.errors.nameKh}</p>
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
                            value={selectedGender}

                        />
                        {
                            typeof formik.errors.gender === 'string' &&
                            <p className="text-red-700">{formik.errors.gender}</p>
                        }

                    </div>

                    {/* DOB */}
                    <div>
                        <RequiredFieldLabelComponent labelText="Date Of Birth"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>

                        <div>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        className={cn(
                                            "text-gray-600 border  border-lms-gray-30 w-full justify-start text-left font-normal",
                                            !birthDate && "text-gray-600"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4"/>
                                        {birthDate ? (
                                            <span>{format(birthDate, "yyyy-MM-dd")}</span>
                                        ) : (
                                            <span>Pick a date</span>
                                        )}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0 bg-white ">
                                    <Calendar
                                        mode="single"
                                        selected={birthDate}
                                        onSelect={(date) => {
                                            setBirthDate(date as Date);
                                            formik.setFieldValue('dob', date);
                                        }}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                    </div>

                    {/*Email*/}
                    {/*<div>*/}
                    {/*    <RequiredFieldLabelComponent labelText="Email"*/}
                    {/*                                 labelClassName={` block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>*/}
                    {/*    <input*/}
                    {/*        type="text"*/}
                    {/*        name="email"*/}
                    {/*        onChange={formik.handleChange}*/}
                    {/*        value={formik.values.email}*/}
                    {/*        className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "*/}
                    {/*        placeholder="example@gmail.com"*/}

                    {/*    />*/}
                    {/*    {*/}
                    {/*        typeof formik.errors.email === 'string' &&*/}
                    {/*        <p className="text-red-700">{formik.errors.email}</p>*/}
                    {/*    }*/}
                    {/*</div>*/}

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
                            typeof formik.errors.phoneNumber === 'string' &&
                            <p className="text-red-700">{formik.errors.phoneNumber}</p>
                        }
                    </div>


                    {/*education*/}
                    <div>
                        <UpdateCreatableSelectComponent
                            label="Education"
                            fieldName="educations"
                            formik={formik}
                        />
                    </div>

                    {/*skills*/}
                    <div>
                        <UpdateCreatableSelectComponent
                            label="Skills"
                            fieldName="skills"
                            formik={formik}
                        />
                    </div>

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
                            typeof formik.errors.linkTelegram === 'string' &&
                            <p className="text-red-700">{formik.errors.linkTelegram}</p>
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
                            typeof formik.errors.linkLinkedin === 'string' &&
                            <p className="text-red-700">{formik.errors.linkLinkedin}</p>
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
                            typeof formik.errors.linkGit === 'string' &&
                            <p className="text-red-700">{formik.errors.linkGit}</p>
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
                            typeof formik.errors.currentAddress === 'string' &&
                            <p className="text-red-700">{formik.errors.currentAddress}</p>
                        }
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
                            typeof formik.errors.birthPlace === 'string' &&
                            <p className="text-red-700">{formik.errors.birthPlace}</p>
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
                            typeof formik.errors.bio === 'string' &&
                            <p className="text-red-700">{formik.errors.bio}</p>
                        }

                    </div>



                </div>
                <div className="w-full  ml-4 mt-4">
                    <p className="font-bold text-2xl mb-2">Documents</p>
                    <div className="grid grid-cols-2 gap-4 mt-4">
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
                                            <span className="font-semibold">Click to upload</span> or drag and
                                            drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or
                                            GIF
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
                                    <img src={URL.createObjectURL(cvFile)} width={300}
                                         alt="CV Uploaded Preview"/>
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
                                            <span className="font-semibold">Click to upload</span> or drag and
                                            drop
                                        </p>
                                        <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or
                                            GIF
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
                    </div>


                    {/*/!* Curriculum Vitae *!/*/}
                    {/*{cvPreview ? (*/}
                    {/*    <label htmlFor="cv-input"*/}
                    {/*           className="border rounded-[8px] flex items-center p-2 h-[40px] cursor-pointer" onClick={() => openInNewTab(cvPreview)}>*/}
                    {/*        <div className="p-1 mr-4 rounded-[8px]">*/}
                    {/*            <HiMiniDocumentText className="w-8 h-8 text-lms-primary"/>*/}
                    {/*        </div>*/}
                    {/*        <p className="leading-tight mr-4">Curriculum Vitae Preview</p>*/}
                    {/*        <input id="cv-input" type="file" className="hidden"/>*/}
                    {/*    </label>*/}

                    {/*): (*/}
                    {/*    <></>*/}
                    {/*)*/}
                    {/*}*/}


                    {/*/!* Identity Card *!/*/}
                    {/*{idCardPreview ? (*/}

                    {/*    <label htmlFor="id-input"*/}
                    {/*           className="border rounded-[8px] flex items-center p-2 h-[40px] cursor-pointer"  onClick={() => openInNewTab(idCardPreview)}>*/}
                    {/*        <div className="p-1 mr-4 rounded-[8px]">*/}
                    {/*            <FaAddressCard className="w-8 h-8 text-lms-primary"/>*/}
                    {/*        </div>*/}
                    {/*        <p className="leading-tight mr-4">Identity Card Preview</p>*/}
                    {/*        <input id="id-input" type="file" className="hidden"/>*/}
                    {/*    </label>*/}


                    {/*): (*/}
                    {/*   <></>*/}
                    {/*)*/}
                    {/*}*/}


                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                            disabled={isStfLoading}
                        >
                            {(isStfLoading) ? "Updating..." : "Update"}
                        </button>
                    </div>
                </div>
            </form>

        </div>


    );
}
