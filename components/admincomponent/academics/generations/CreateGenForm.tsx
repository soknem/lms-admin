'use client'
import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FiPlus} from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from 'yup'
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Label} from "@/components/ui/label";
import {CreateGenerationType} from "@/lib/types/admin/academics";
import {AppDispatch, RootState} from "@/lib/store";
import {useDispatch, useSelector} from "react-redux";
import {addGeneration} from "@/lib/features/admin/academic-management/generation/generationSlice";
import {
    useCreateGenerationMutation,
    useGetGenerationQuery
} from "@/lib/features/admin/academic-management/generation/generation";
import {isAxiosError} from "axios";
import {useState} from "react";

export default function CreateGenForm() {

    const dispatch = useDispatch<AppDispatch>();
    const [createGeneration] = useCreateGenerationMutation();
    const [isLoading, setIsLoading] = useState(false);
    const { refetch: refetchGenerations } = useGetGenerationQuery({ page: 0, pageSize: 10 });

    // Regex pattern
    const aliasPattern = /^[a-z0-9]+(-[a-z0-9]+)*$/;

    const handleCreateGeneration = async (values : CreateGenerationType) => {
        try {
            setIsLoading(true);

            const newGeneration = {
                alias: values.alias,
                name: values.name,
                startYear: values.startYear,
                endYear: values.endYear,
                isDraft: values.isDraft,
            };

            const result = await createGeneration(newGeneration).unwrap();

            console.log('Generation created successfully');
            refetchGenerations();


        } catch (err : any) {
            console.error('Error creating generation:', err);
            if(err.status === 409){
                console.log("Generation already exists. Please choose a different alias.")
            }else{
                console.log("Generation creation failed:");
            }

        }

    };

    const formik = useFormik({
        initialValues: {
            alias: "",
            name: "",
            startYear: 0,
            endYear: 0,
            isDraft: true,
        },
        validationSchema: Yup.object({
            alias: Yup.string()
                .matches(
                    aliasPattern,
                    "Alias must be in lowercase, contain no spaces, ex: generation-2"
                )
                .required("Alias is Required"),
            name: Yup.string()
                .required("Title is Required"),
            startYear: Yup.number()
                .required("Start Year is required")
                .typeError("Start Year must be a number"),
            endYear: Yup.number()
                .required("End Year is required")
                .typeError("End Year must be a number"),
            isDraft: Yup.boolean()
        }),
        onSubmit: values => {
            handleCreateGeneration(values);
        }
    })
    return(
        <Dialog>
            <DialogTrigger asChild>
                <Button className='text-lms-white-80 bg-lms-primary hover:bg-lms-primary/90'>
                    <FiPlus className="mr-2 h-4 w-4 " /> Add Generation
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white w-[500px] ">
                <DialogHeader className="mb-4">
                    <DialogTitle className="text-xl">Add Generation</DialogTitle>
                </DialogHeader>
                <form
                    className="space-y-4 md:space-y-6 text-md"
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <RequiredFieldLabelComponent labelText="Alias"
                                                     labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="text"
                            name="alias"
                            onChange={formik.handleChange}
                            value={formik.values.alias}
                            className="border text-md outline-lms-gray-30  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="generation-1"

                        />
                        {
                            formik.errors.alias ? <p className="text-red-700">{formik.errors.alias}</p> : null
                        }
                    </div>
                    <div>
                        <RequiredFieldLabelComponent labelText="Title"
                                                     labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="text"
                            name="name"
                            onChange={formik.handleChange}
                            value={formik.values.name}
                            className="border outline-lms-gray-30  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="Generation 1"

                        />
                        {
                            formik.errors.name ? <p className="text-red-700">{formik.errors.name}</p> : null
                        }
                    </div>
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