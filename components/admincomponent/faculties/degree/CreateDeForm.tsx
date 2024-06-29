"use client";
import {Formik, Form, Field, ErrorMessage} from "formik";
import * as Yup from "yup";
import {Button} from "@/components/ui/button";
import style from "../../style.module.css";
import {FiPlus} from "react-icons/fi";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

import {DegreeType} from "@/lib/types/admin/faculty";
import {TbAsterisk} from "react-icons/tb";
import {useCreateDegreeMutation} from "@/lib/features/admin/faculties/degree/degree";

const initialValues = {
    alias: "",
    level: "",
    description: "",
    isDeleted: false,
    isDraft: false
};

const validationSchema = Yup.object().shape({
    alias: Yup.string().required('Alias is required'),
    level: Yup.string().required('Level is required'),
    description: Yup.string(),
    isDeleted: Yup.boolean().required('Please specify if the degree is deleted'),
    isDraft: Yup.boolean().required('Please specify if the degree is a draft'),
});

const handleSubmit = async (values: DegreeType, createDegree: any) => {
    try {
        const response = await createDegree(values).unwrap();
        console.log('Degree created successfully:', response);
        // Optionally, reset the form or close the dialog here
    } catch (error) {
        console.error('Failed to create degree:', error);
    }
};

const RadioButton = ({field, value, label}: any) => {
    return (
        <div>
            <input
                type="radio"
                {...field}
                id={value}
                value={value}
                checked={field.value === value}
            />
            <label className="pl-2" htmlFor={value}>
                {label}
            </label>
        </div>
    );
};

export function CreateDeForm() {
    const [createDegree] = useCreateDegreeMutation();

    return (
        <Dialog>

            <DialogTrigger asChild>
                <Button className="bg-lms-primary text-white hover:bg-lms-primary">
                    <FiPlus className="mr-2 h-4 w-4"/> Add degree
                </Button>
            </DialogTrigger>

            <DialogContent className="w-[480px] bg-white ">

                <DialogHeader>
                    <DialogTitle>Add Degree</DialogTitle>
                </DialogHeader>

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={(values) => handleSubmit(values, createDegree)}
                >
                    {() => (
                        <Form className="py-4 rounded-lg w-full ">
                            <div className="flex flex-col gap-1">

                                {/* Degree Alias*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="alias">
                                            Alias
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="text"
                                        placeholder="Associated Degree"
                                        name="alias"
                                        id="alias"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="alias"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Degree Level*/}
                                <div className={` ${style.inputContainer}`}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="level">
                                            Level
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <Field
                                        type="text"
                                        placeholder="Associated Degree"
                                        name="level"
                                        id="level"
                                        className={` ${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="level"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* Degree Description*/}
                                <div className={`${style.inputContainer}`}>
                                    <label className={`${style.label}`} htmlFor="description">
                                        Description
                                    </label>
                                    <Field
                                        type="text"
                                        name="description"
                                        placeholder="This is main degree of Engineering faculty"
                                        id="description"
                                        className={`${style.input}`}
                                    />
                                    <ErrorMessage
                                        name="description"
                                        component="div"
                                        className={`${style.error}`}
                                    />
                                </div>

                                {/* status */}
                                <div className={`${style.inputContainer}  `}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="isDraft">
                                            Visibility
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <div className="flex gap-4 h-[40px] items-center">
                                        <Field
                                            name="isDraft"
                                            component={RadioButton}
                                            value="true"
                                            label="Public"
                                        />
                                        <Field
                                            name="isDraft"
                                            component={RadioButton}
                                            value="false"
                                            label="Draft"
                                        />
                                    </div>

                                    <ErrorMessage
                                        name="isDraft"
                                        component={RadioButton}
                                        className={`${style.error}`}
                                    />
                                </div>

                                <div className={`${style.inputContainer}  `}>
                                    <div className="flex">
                                        <label className={`${style.label}`} htmlFor="isDeleted">
                                            Status
                                        </label>
                                        <TbAsterisk className='w-2 h-2 text-lms-error'/>
                                    </div>
                                    <div className="flex gap-4 h-[40px] items-center">
                                        <Field
                                            name="isDeleted"
                                            component={RadioButton}
                                            value="true"
                                            label="Public"
                                        />
                                        <Field
                                            name="isDeleted"
                                            component={RadioButton}
                                            value="false"
                                            label="Draft"
                                        />
                                    </div>

                                    <ErrorMessage
                                        name="isDeleted"
                                        component={RadioButton}
                                        className={`${style.error}`}
                                    />
                                </div>
                            </div>

                            {/* button submit */}
                            <DialogFooter>
                                <Button
                                    type="submit"
                                    className="text-white bg-lms-primary rounded-[10px] hover:bg-lms-primary"
                                >
                                    Add
                                </Button>
                            </DialogFooter>
                        </Form>
                    )}
                </Formik>
            </DialogContent>
        </Dialog>
    );
}
