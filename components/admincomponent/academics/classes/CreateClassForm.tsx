import React, {useEffect, useState} from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import Select from "react-select";
import { IoCloseOutline } from "react-icons/io5";
import Modal from "@/components/common/ModalComponent"; // Adjust the path as necessary
import RequiredFieldLabelComponent from "@/components/common/RequiredFieldLabelComponent";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {Generation, selectClasses, Shift} from "@/lib/features/admin/academic-management/classes/classSlice";
import {selectGeneration, setGenerations} from "@/lib/features/admin/academic-management/generation/generationSlice";
import {useAddClassMutation, useGetClassesQuery} from "@/lib/features/admin/academic-management/classes/classApi";
import {useGetGenerationQuery} from "@/lib/features/admin/academic-management/generation/generation";
import {Class, ClassCreateType, GenerationType, ShiftType} from "@/lib/types/admin/academics";
import {useGetStudyProgramsQuery} from "@/lib/features/admin/faculties/studyProgram/studyprogram";
import {StudyProgramType} from "@/lib/types/admin/faculty";
import {useGetShiftQuery} from "@/lib/features/admin/faculties/shift/shift";
import {useGetInstructorQuery} from "@/lib/features/admin/user-management/instructor/instructor";
import {useGetAcademicYearQuery} from "@/lib/features/admin/faculties/academic-year/academicYear";
import {toast} from "react-hot-toast";
import {initialize} from "next/client";
import {format} from "date-fns";

type PropsType = {
  isVisible: boolean;
  onClose: () => void;
};

export default function CreateClassForm({ isVisible, onClose }: PropsType) {
  const [isLoading, setIsLoading] = useState(false);

  // **** Status ****
  const [selectedStatus, setSelectedStatus] = useState('');

  const handleStatusChange = (selectedOption: any) => {
    const value = selectedOption?.value;
    setSelectedStatus(value);
  };

  // ===== StatusList =====
  const statusList = [
    {
      value: 1,
      label: 'Started',
    },
    {
      value: 2,
      label: 'Pending',
    },
    {
      value: 3,
      label: 'Ended',
    },
  ];


  // *** Generation ***
  const {data: generationData, error: generationError, isLoading: isGenerationsLoading} = useGetGenerationQuery({page: 0, pageSize: 10});

  const [generations, setGenerations] = useState([]);

  const [selectedGenAlias, setSelectedGenAlias] = useState('');

  useEffect(() => {
    if (generationData) {
      const formattedGenerations = generationData.content.map((gen: GenerationType) => ({
        value: gen.alias,
        label: `${gen.name}`,
      }));
      setGenerations(formattedGenerations);
    }
    if (generationError) {
      console.error("failed to load generation", generationError);
    }
  }, [generationData, generationError]);

  const handleGenChange = (selectedOption : any) => {
    const alias = selectedOption?.value;
    setSelectedGenAlias(alias);
  };

  console.log("generations", generations);

  // *** Study Program ***
  const {data: studyProgramData, error: studyProgramError, isLoading: isStudyProgramsLoading} = useGetStudyProgramsQuery({page: 0, pageSize: 10});

  const [studyPrograms, setStudyPrograms] = useState([]);

  const [selectedProgramAlias, setSelectedProgramAlias] = useState('');

  useEffect(() => {
    if (studyProgramData) {
      const formattedProgram = studyProgramData.content.map((sp: StudyProgramType) => ({
        value: sp.alias,
        label: `${sp.studyProgramName}`,
      }));
      setStudyPrograms(formattedProgram);
      console.log("study program: ",formattedProgram)
    }
    if (studyProgramError) {
      console.error("failed to load study program", studyProgramError);
    }
  }, [studyProgramData, studyProgramError]);

  const handleProgramChange = (selectedOption : any) => {
    const alias = selectedOption?.value;
    setSelectedProgramAlias(alias);
  };

  // *** Shift ***
  const {data: shiftData, error: shiftError, isLoading: isShiftsLoading} = useGetShiftQuery({page: 0, pageSize: 10});

  const [shifts, setShifts] = useState([]);

  const [selectShiftsAlias, setSelectedShiftsAlias] = useState('');

  useEffect(() => {
    if (shiftData) {
      const formattedShift = shiftData.content.map((sp: ShiftType) => ({
        value: sp.alias,
        label: `${sp.name}`,
      }));
      setShifts(formattedShift);
      console.log("Shift from create class: ",formattedShift)
    }
    if (shiftError) {
      console.error("failed to load shift error", shiftError);
    }
  }, [shiftData, shiftError]);

  const handleShiftChange = (selectedOption : any) => {
    const alias = selectedOption?.value;
    setSelectedShiftsAlias(alias);
  };

  // *** Instructor ***
  const {data: InsData, error: InsError, isLoading: isInsLoading, isSuccess: isInsSuccess} = useGetInstructorQuery({page: 0, pageSize: 10});

  const [instructors, setInstructors] = useState([]);

  const [selectInstructorUuid, setSelectedInstructorUuid] = useState('');

  useEffect(() => {
    if (InsData) {
      const formattedIns = InsData.content.map((ins: any) => ({
        value: ins.uuid,
        label: `${ins.username}`,
      }));
      setInstructors(formattedIns);
      console.log("instructor from create class: ",formattedIns)
    }
    if (InsError) {
      console.error("failed to load instructor error", InsError);
    }
  }, [InsData, InsError]);

  const handleInstructorChange = (selectedOption : any) => {
    const uuid = selectedOption?.value;
    setSelectedInstructorUuid(uuid);
  };

  // if (isShiftLoading ) {
  //   return <div>Loading...</div>;
  // }

  // *** academic year ****
  const {data: academicData, error: academicError, isLoading: isAcademicLoading, isSuccess: isAcademicSuccess} = useGetAcademicYearQuery({page: 0, pageSize: 10});

  const [academicYears, setAcademicYears] = useState([]);

  const [selectAcademicYearsUuid, setSelectedAcademicYearsUuid] = useState('');

  useEffect(() => {
    if (academicData) {
      const formattedAca = academicData.content.map((aca: any) => ({
        value: aca.uuid,
        label: `${aca.academicYear}`,
      }));
      setAcademicYears(formattedAca);
      console.log("instructor from create class: ",formattedAca)
    }
    if (InsError) {
      console.error("failed to load shift error", InsError);
    }
  }, [academicData, InsError]);

  const handleAcademicYearChange = (selectedOption : any) => {
    const uuid = selectedOption?.value;
    setSelectedAcademicYearsUuid(uuid);
  };


  // handle create class

  const [createClass, { isLoading : isClassLoading, isSuccess : isClassSucess, error: isClassError }] = useAddClassMutation();

  const handleCreateClass = async (values : ClassCreateType) => {
    const newClass = {
      classCode: values.classCode,
      year: values.year,
      generationAlias: selectedGenAlias,
      studyProgramAlias: selectedProgramAlias,
      shiftAlias: selectShiftsAlias,
      instructorUuid: selectInstructorUuid,
      studentUuid: [], // Ensuring studentUuid is an empty array
      academicYearAlias: selectAcademicYearsUuid,
      isDraft: values.isDraft,
      status: selectedStatus,
      description: ""
    };

    console.log("New Class Data: ", newClass); // Debugging the new class data

    try {
      await createClass(newClass).unwrap();
      toast.success('Successfully created!');
      console.log("Class created successfully"); // Debugging successful creation
    } catch (error) {
      toast.error('Failed to create Class!');
      console.error("Error creating class: ", error); // Debugging the error
    }
  };

  const formik = useFormik({
    initialValues: {
      classCode: "",
      year: 1,
      description: "",
      generationAlias: "",
      studyProgramAlias: "",
      shiftAlias: "",
      instructorUuid: "",
      studentUuid: null, // Initial empty array
      academicYearAlias: "",
      isDraft: true,
      status: 1,
    },
    validationSchema: Yup.object({
      classCode: Yup.string().required("Class code is required"),
      year: Yup.number()
          .required("Year is required")
          .integer("Year must be an integer")
          .min(1, "Year must be at least 1")
          .max(4, "Year must not greater than 4"),
      generationAlias: Yup.string().required("Generation is required"),
      studyProgramAlias: Yup.string().required("Study program is required"),
      shiftAlias: Yup.string().required("Shift is required"),
      instructorUuid: Yup.string().nullable(),
      studentUuid: Yup.string().nullable(),
      academicYearAlias: Yup.string().required("academic year is required"),
      isDraft: Yup.boolean().required("Visibility is required"),
      status: Yup.number().required("Status is required"),
    }),
    // onSubmit: (values) => {
    //   console.log("Create Class Form Values: ", values);
    //   handleCreateClass(values);
    // },
    onSubmit: (values) => {
      handleCreateClass(values);
    }
  });

  return (
      <Modal isVisible={isVisible} onClose={onClose}>
        <h2 className="text-xl text-lms-black-90 font-bold mb-4">Create Class</h2>
        <form className="h-[500px] space-y-4 md:space-y-6 overflow-y-scroll" onSubmit={formik.handleSubmit}>

          {/* Class Code */}
          <div>
            <RequiredFieldLabelComponent labelText="Class Code"
                                         labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}/>
            <input
                type="text"
                name="classCode"
                onChange={formik.handleChange}
                value={formik.values.classCode}
                className="border text-md outline-lms-gray-30  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                placeholder="FY2025-SE-A1"

            />
            {
              formik.errors.classCode ? <p className="text-red-700">{formik.errors.classCode}</p> : null
            }
          </div>

          {/* Year */}
          <div>
            <RequiredFieldLabelComponent labelText="Year"
                                         labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}/>
            <input
                type="number"
                name="year"
                onChange={formik.handleChange}
                value={formik.values.year}
                className="border text-md outline-lms-gray-30  bg-gray-50  border-lms-grayBorder text-gray-900 sm:text-sm rounded-lg block w-full p-2.5 "
                placeholder="1"

            />
            {
              formik.errors.year ? <p className="text-red-700">{formik.errors.year}</p> : null
            }
          </div>

          {/* Generation */}
          <div>
            <RequiredFieldLabelComponent labelText="Generation"
                                         labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>

            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="generationAlias"
                options={generations}
                onChange={handleGenChange}
            />
          </div>

          {/* Study Program */}
          <div>
            <RequiredFieldLabelComponent labelText="Study Program"
                                         labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>

            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="studyProgramAlias"
                options={studyPrograms}
                onChange={handleProgramChange}
            />
          </div>

          {/* Shift */}
          <div>
            <RequiredFieldLabelComponent labelText="Shift"
                                         labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>

            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="shiftAlias"
                options={shifts}
                onChange={handleShiftChange}
            />
          </div>

          {/* Instructor */}
          <div>
            <RequiredFieldLabelComponent labelText="Instructor"
                                         labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>

            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="instructorUuid"
                options={instructors}
                onChange={handleInstructorChange}
            />
          </div>

          {/* Academic Year */}
          <div>
            <RequiredFieldLabelComponent labelText="Academic Year"
                                         labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"/>

            <Select
                className="basic-single"
                classNamePrefix="select"
                isClearable={true}
                isSearchable={true}
                name="academicYearAlias"
                options={academicYears}
                onChange={handleAcademicYearChange}
            />
          </div>

          {/* Status */}
          <div>
            <RequiredFieldLabelComponent
                labelText="Status"
                labelClassName="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            />
            <Select
                className="basic-single"
                classNamePrefix="select"
                name="teachingType"
                options={statusList}
                onChange={handleStatusChange}
            />
          </div>

          {/* Visibility */}
          {/*<div>*/}
          {/*  <RequiredFieldLabelComponent*/}
          {/*      labelText="Visibility"*/}
          {/*      labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}*/}
          {/*  />*/}
          {/*  <input*/}
          {/*      type="radio"*/}
          {/*      id="isDraftTrue"*/}
          {/*      name="isDraft"*/}
          {/*      value="true"*/}
          {/*      checked={formik.values.isDraft}*/}
          {/*      onChange={() => formik.setFieldValue("isDraft", true)}*/}
          {/*  />*/}
          {/*  <label htmlFor="isDraftTrue" className="px-2 pr-4">Draft</label>*/}
          {/*  <input*/}
          {/*      type="radio"*/}
          {/*      id="isDraftFalse"*/}
          {/*      name="isDraft"*/}
          {/*      value="false"*/}
          {/*      checked={!formik.values.isDraft}*/}
          {/*      onChange={() => formik.setFieldValue("isDraft", false)}*/}
          {/*  />*/}
          {/*  <label htmlFor="isDraftFalse" className="px-2 pr-4">Public</label>*/}
          {/*  {formik.errors.isDraft && (*/}
          {/*      <p className="text-red-700">{formik.errors.isDraft}</p>*/}
          {/*  )}*/}
          {/*</div>*/}

          {/* Visibility */}
          <div>
            <RequiredFieldLabelComponent
                labelText="Visibility"
                labelClassName={`block mb-2 text-md font-medium text-gray-900 dark:text-white`}
            />
            <input
                type="radio"
                id="isDraftTrue"
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
            {formik.errors.isDraft && (
                <p className="text-red-700">{formik.errors.isDraft}</p>
            )}
          </div>


          <div className="flex justify-end">
            <button
                type="submit"
                className="mt-2 bg-lms-primary hover:bg-lms-primary/80 text-white font-bold py-2 px-4 rounded"
                disabled={isClassLoading}
            >
              {isClassLoading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </Modal>
  );
}
