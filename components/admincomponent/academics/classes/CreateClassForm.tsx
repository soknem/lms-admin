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
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {cn} from "@/lib/utils";
import {Calendar as CalendarIcon} from "lucide-react";
import {Calendar} from "@/components/ui/calendar";

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

  const handleGenChange = (selectedOption: any) => {
    const alias = selectedOption?.value;
    formik.setFieldValue('generationAlias', alias);
  };



  // *** Study Program ***
  const {data: studyProgramData, error: studyProgramError, isLoading: isStudyProgramsLoading} = useGetStudyProgramsQuery({page: 0, pageSize: 10});

  const [studyPrograms, setStudyPrograms] = useState([]);

  useEffect(() => {
    if (studyProgramData) {
      const formattedProgram = studyProgramData.content.map((sp: StudyProgramType) => ({
        value: sp.alias,
        label: `${sp.studyProgramName}`,
      }));
      setStudyPrograms(formattedProgram);
    }
    if (studyProgramError) {
      console.error("failed to load study program", studyProgramError);
    }
  }, [studyProgramData, studyProgramError]);

  const handleProgramChange = (selectedOption: any) => {
    const alias = selectedOption?.value;
    formik.setFieldValue('studyProgramAlias', alias);
  };

  // *** Shift ***

  const { data: shiftData, error: shiftError, isLoading: isShiftsLoading } = useGetShiftQuery({ page: 0, pageSize: 10 });

  const [shifts, setShifts] = useState([]);


  useEffect(() => {
    if (shiftData) {
      const formattedShift = shiftData.content.map((sp: any) => ({
        value: sp.alias,
        label: `${sp.name}`,
      }));
      setShifts(formattedShift);
    }
    if (shiftError) {
      console.error("failed to load shift error", shiftError);
    }
  }, [shiftData, shiftError]);

  const handleShiftChange = (selectedOption: any) => {
    const alias = selectedOption?.value;
    formik.setFieldValue('shiftAlias', alias);
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
    }
    if (InsError) {
      console.error("failed to load instructor error", InsError);
    }
  }, [InsData, InsError]);

  const handleInstructorChange = (selectedOption : any) => {
    const uuid = selectedOption?.value;
    setSelectedInstructorUuid(uuid);
  };

  // *** academic year ****
  const {data: academicData, error: academicError, isLoading: isAcademicLoading, isSuccess: isAcademicSuccess} = useGetAcademicYearQuery({page: 0, pageSize: 10});

  const [academicYears, setAcademicYears] = useState([]);

  useEffect(() => {
    if (academicData) {
      const formattedAca = academicData.content.map((aca: any) => ({
        value: aca.alias,
        label: `${aca.academicYear}`,
      }));
      setAcademicYears(formattedAca);
    }
    if (InsError) {
      console.error("failed to load academic year error", academicError);
    }
  }, [academicData, academicError]);

  const handleAcademicYearChange = (selectedOption: any) => {
    const alias = selectedOption?.value;
    formik.setFieldValue('academicYearAlias', alias);
  };


  // handle create class
  const [createClass, { isLoading : isClassLoading, isSuccess : isClassSucess, error: isClassError }] = useAddClassMutation();

  const handleCreateClass = async (values : ClassCreateType) => {
    const newClass = {
      classCode: values.classCode,
      year: values.year,
      classStart: values.classStart,
      classEnd: values.classEnd,
      generationAlias: values.generationAlias ,
      studyProgramAlias: values.studyProgramAlias,
      instructorUuid: selectInstructorUuid,
      studentUuid: [],
      academicYearAlias: values.academicYearAlias ,
      isDraft: values.isDraft,
      status: selectedStatus,
      description: "Class Description",
      shiftAlias: values.shiftAlias,
    };


    try {
      await createClass(newClass).unwrap();
      toast.success('Successfully created!');
    } catch (error) {
      toast.error('Failed to create Class!');
      console.error("Error creating class: ", error); // Debugging the error
    }
  };

  const [startDate, setStartDate] = React.useState<Date>()
  const [endDate, setEndDate] = React.useState<Date>()

  const formik = useFormik({
    initialValues: {
      classCode: "",
      classStart: "",
      classEnd: "",
      year: 1,
      description: "Class Description",
      generationAlias: "",
      studyProgramAlias: "",
      shiftAlias: "",
      instructorUuid: "",
      studentUuid: null,
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
    //   handleCreateClass(values);
    // },
    onSubmit: (values) => {
      const formattedValues = {
        ...values,
        classStart: startDate ? format(startDate, "yyyy-MM-dd") : "",
        classEnd: endDate ? format(endDate,"yyyy-MM-dd") : ""
      };
      // dispatch(addLecture(formattedValues))
      handleCreateClass(formattedValues);
    }
  });

  return (
      <Modal isVisible={isVisible} onClose={onClose}>
        <h2 className="text-xl text-lms-black-90 font-bold mb-4">Create Class</h2>

        <form className="w-[960px]  space-y-4 md:space-y-6 " onSubmit={formik.handleSubmit}>
          <div className="grid grid-cols-2 gap-4">

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

            {/* Class Start  */}
            <div>
              <RequiredFieldLabelComponent labelText="Class Start"
                                           labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
              <div className="relative">
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                        className={cn(
                            "text-gray-600 border  border-lms-gray-30 w-full justify-start text-left font-normal",
                            !startDate && "text-gray-600"
                        )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4"/>
                      {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0 bg-white ">
                    <Calendar
                        mode="single"
                        selected={startDate}
                        onSelect={setStartDate}
                        initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

            </div>

            {/* Class End */}
            <div>
              <RequiredFieldLabelComponent labelText="Class End"
                                           labelClassName={`block mb-2 text-sm font-medium text-gray-900 dark:text-white`}/>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                      className={cn(
                          "text-gray-600 border  border-lms-gray-30 w-full justify-start text-left font-normal",
                          !endDate && "text-gray-600"
                      )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4"/>
                    {endDate ? format(endDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0 bg-white ">
                  <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      initialFocus
                  />
                </PopoverContent>
              </Popover>
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
              <label className="block text-gray-700 font-semibold mb-2">
                Generation
              </label>
              <Select
                  name="generationAlias"
                  options={generations}
                  value={generations.find(
                      (option: any) => option.value === formik.values.generationAlias
                  )}
                  onChange={(option) => handleGenChange(option)}
                  onBlur={formik.handleBlur}
                  className={`w-full ${
                      formik.touched.generationAlias && formik.errors.generationAlias
                          ? "border-red-500"
                          : "border-gray-300"
                  } `}
              />
              {formik.touched.generationAlias && formik.errors.generationAlias && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.generationAlias}</p>
              )}
            </div>

            {/* Study Program */}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Study Program
              </label>
              <Select
                  name="studyProgramAlias"
                  options={studyPrograms}
                  value={studyPrograms.find(
                      (option: any) => option.value === formik.values.studyProgramAlias
                  )}
                  onChange={(option) => handleProgramChange(option)}
                  onBlur={formik.handleBlur}
                  className={`w-full ${
                      formik.touched.studyProgramAlias && formik.errors.studyProgramAlias
                          ? "border-red-500"
                          : "border-gray-300"
                  }`}
              />
              {formik.touched.studyProgramAlias && formik.errors.studyProgramAlias && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.studyProgramAlias}</p>
              )}
            </div>

            {/* Shift */}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Shift
              </label>
              <Select
                  name="shiftAlias"
                  options={shifts}
                  value={shifts.find(
                      (option: any) => option.value === formik.values.shiftAlias
                  )}
                  onChange={(option) => handleShiftChange(option)}
                  onBlur={formik.handleBlur}
                  className={`w-full  ${
                      formik.touched.shiftAlias && formik.errors.shiftAlias
                          ? "border-red-500"
                          : "border-gray-300"
                  } `}
              />
              {formik.touched.shiftAlias && formik.errors.shiftAlias && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.shiftAlias}</p>
              )}
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
              {
                formik.errors.instructorUuid ? <p className="text-red-700">{formik.errors.instructorUuid}</p> : null
              }
            </div>

            {/* Academic Year */}

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Academic Year
              </label>
              <Select
                  name="academicYearAlias"
                  options={academicYears}
                  value={academicYears.find(
                      (option: any) => option.value === formik.values.academicYearAlias
                  )}
                  onChange={(option) => handleAcademicYearChange(option)}
                  onBlur={formik.handleBlur}
                  className={`w-full  ${
                      formik.touched.academicYearAlias && formik.errors.academicYearAlias
                          ? "border-red-500"
                          : "border-gray-300"
                  }`}
              />
              {formik.touched.academicYearAlias && formik.errors.academicYearAlias && (
                  <p className="text-red-500 text-sm mt-1">{formik.errors.academicYearAlias}</p>
              )}
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
                  name="status"
                  options={statusList}
                  onChange={handleStatusChange}
              />
              {
                formik.errors.status ? <p className="text-red-700">{formik.errors.status}</p> : null
              }
            </div>

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
