import {Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger} from "@/components/ui/dialog";
import {Button} from "@/components/ui/button";
import {FiPlus} from "react-icons/fi";
import { useFormik } from "formik";
import * as Yup from 'yup'
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import {Label} from "@/components/ui/label";


export default function CreateGenForm() {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const formik = useFormik({
        initialValues: {
            title: "",
            startYear: "",
            endYear: "",
            visibility:""
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required("Required"),
            startYear: Yup.string()
                .required("Required"),
            endYear: Yup.string()
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
                    <FiPlus className="mr-2 h-4 w-4 " /> Add Generation
                </Button>
            </DialogTrigger>
            <DialogContent className="bg-white w-[500px] ">
                <DialogHeader>
                    <DialogTitle>Add Generation</DialogTitle>
                </DialogHeader>
                <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={formik.handleSubmit}
                >
                    <div>
                        <RequiredFieldLabelComponent labelText="Title"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="text"
                            name="title"
                            onChange={formik.handleChange}
                            value={formik.values.title}
                            className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="Generation 1"

                        />
                        {
                            formik.errors.title ? <p className="text-red-700">{formik.errors.title}</p> : null
                        }
                    </div>
                    <div>
                        <RequiredFieldLabelComponent labelText="Start Year"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="text"
                            name="startYear"
                            onChange={formik.handleChange}
                            value={formik.values.startYear}
                            className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="2025"

                        />
                        {
                            formik.errors.startYear ? <p className="text-red-700">{formik.errors.startYear}</p> : null
                        }
                    </div>
                    <div>
                        <RequiredFieldLabelComponent labelText="End Year"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
                        <input
                            type="text"
                            name="endYear"
                            onChange={formik.handleChange}
                            value={formik.values.endYear}
                            className="border-2 focus:border-lms-error  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                            placeholder="2029"

                        />
                        {
                            formik.errors.endYear ? <p className="text-red-700">{formik.errors.endYear}</p> : null
                        }
                    </div>
                    <div>
                        <RequiredFieldLabelComponent labelText="Visibility"
                                                     labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>

                        <RadioGroup defaultValue="default" className="flex gap-2">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="default" id="r1" />
                                <Label htmlFor="r1">Public</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="comfortable" id="r2" />
                                <Label htmlFor="r2">Draft</Label>
                            </div>

                        </RadioGroup>

                        {
                            formik.errors.visibility ? <p className="text-red-700">{formik.errors.visibility}</p> : null
                        }
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" className=" text-lms-white-80 bg-lms-primary hover:bg-lms-primary rounded-[8px]" >Add</Button>
                    </div>

                </form>
            </DialogContent>
        </Dialog>
    );
}