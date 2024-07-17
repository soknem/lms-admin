'use client'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import Link from 'next/link'
import { Input } from '@/components/ui/input';
import {StudentType, CourseType, ResCourseType, LectureRespondType} from "@/lib/types/admin/academics";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
import { StudentDataTable } from "@/components/admincomponent/academics/classes/enrolledStudents/data-table";
import { StuColumns } from "@/components/admincomponent/academics/classes/enrolledStudents/columns";
import { CourseDataTable } from "@/components/admincomponent/academics/classes/courses/data-table";
import { CourseColumns } from "@/components/admincomponent/academics/classes/courses/columns";
import {
  useGetClassByUuidQuery,
  useGetClassCourseByUuidQuery, useGetStudentFromClassQuery
} from "@/lib/features/admin/academic-management/classes/classApi";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "@/lib/store";
import {
  selectDetailClasses,
  setDetailClasses
} from "@/lib/features/admin/academic-management/detail-classes/detailClassesSlice";
import {
  selectSingleClass,
  setSingleClass
} from "@/lib/features/admin/academic-management/detail-classes/singleClassSlice";
import React from "react";
import {setStudent} from "@/lib/features/admin/user-management/student/studentSlice";



async function getStudents(): Promise<StudentType[]> {
  const res = await fetch(
    'https://665e76e91e9017dc16f01b0d.mockapi.io/api/1/student'
  )
  const data = await res.json()

  // console.log("data from page: ",data);
  return data
}

async function getCourses(): Promise<CourseType[]> {
  const res = await fetch(
    'https://6661241763e6a0189fe8962f.mockapi.io/api/v1/courses'
  )
  const data = await res.json()

  // console.log("data from page: ",data);
  return data
}

type Props = {
  params: { id: string };
  searchParams: { [key: string]: string | string[] | undefined };
};



export default function ClassDetail(props: Props) {

  const selectedClass = useSelector((state: RootState) => selectSingleClass(state));

  // course
  const { data: coursesData, isLoading: isCourseLoading, isSuccess: isCourseSuccess, error: courseError } = useGetClassCourseByUuidQuery(props.params.id);

  // class data
  const { data: classData, isLoading: isClassLoading,isSuccess: isClassSuccess, isError: isClassError, error: classError } = useGetClassByUuidQuery(props.params.id);

  const { data: stuData, isLoading: isStuDataLoading,isSuccess: isStuSuccess, isError: isStuError, error: stuError } = useGetStudentFromClassQuery(props.params.id);


  const dispatch = useDispatch();

  if(isClassSuccess && isStuSuccess){
    dispatch(setSingleClass(classData))
    dispatch(setStudent({ students: stuData.content, totalElements: stuData.totalElements }));
    console.log("classData: ",classData)
    console.log("stuData: ",stuData)
  }

  if (isClassLoading) {
    return <p>Loading...</p>;
  }

  // course
  console.log("course data", coursesData)


  const courseSemester1 = coursesData?.content.filter((course :any) => course.yearOfStudy.semester === 1);
  const courseSemester2 = coursesData?.content.filter((course :any) => course.yearOfStudy.semester === 2);

  const transformToCourseData = (courses : any[]) : any[] => {
    return courses?.map(course => ({
          uuid: course.uuid,
          subject: course.subject.title,
          startDate: course.courseStart ? new Date(course.courseStart) : null,
          endDate: course.courseEnd ? new Date(course.courseEnd) : null,
          status: course.status,
          instructor: course.instructor ? course.instructor.nameEn : "N/A",
          instructorUuid: course.instructor ? course.instructor.uuid : null,
          semester: course.yearOfStudy.semester,
          year: course.yearOfStudy.year,
          visibility: true,
          isDeleted: course.isDeleted
        }));
  };



  const totalCourses = selectedClass?.courses.length;
  const courseS1 = courseSemester1?.length || 1
  const courseS2 = courseSemester2?.length || 1


      return (
    <main>
      <section className="flex flex-col gap-4 h-full w-full p-9">
        <Breadcrumb >
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="/admin/academics/classes" className='font-semibold text-gray-30 uppercase'>Classes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-lms-primary uppercase">{classData?.classCode || "N/A" }</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className=' text-3xl font-bold text-lms-primary'>{classData?.classCode || "N/A"}</h1>
        <div>
          <Tabs defaultValue="enrolledStudent" className="w-full">

            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="enrolledStudent">Enrolled Students</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
            </TabsList>

            <TabsContent value="enrolledStudent">
              <StudentDataTable columns={StuColumns} data={stuData.content}/>
            </TabsContent>

            <TabsContent value="course" className="bg-white p-6 space-y-4 rounded-lg">
              <div className='flex justify-between '>
                <div>
                  <Label className='text-lms-gray-30'>Generation</Label>
                  <p className='flex font-medium text-lms-black-90'>{selectedClass?.generation?.name || "N/A"}</p>
                </div>

                <div>
                  <Label className='text-lms-gray-30'>Year</Label>
                  <p className='flex font-medium text-lms-black-90'>{selectedClass?.year || "N/A"}</p>
                </div>

                <div>
                  <Label className='text-lms-gray-30'>Academic Year</Label>
                  <p className='flex font-medium text-lms-black-90'>{classData?.academicYear?.academicYear || "N/A"}</p>
                </div>

                <div>
                  <Label className='text-lms-gray-30'>Study Program</Label>
                  <p className='flex font-medium text-lms-black-90'>{selectedClass?.studyProgram.studyProgramName || "N/A"}</p>
                </div>

                <div>
                  <Label className='text-lms-gray-30'>Shift</Label>
                  <p className='flex font-medium text-black'>{selectedClass?.shift.name || "N/A"}</p>
                </div>

                <div>
                  <Label className='text-lms-gray-30'>Total Courses</Label>
                  <div className='flex gap-2'>
                    <p className='flex text-lms-gray-30'>Total:<span
                        className='ml-2 text-lms-black-90 font-medium'>{totalCourses || "N/A"}</span></p>
                    <p className='flex text-lms-gray-30'>Semester I: <span
                        className='ml-2 text-lms-black-90 font-medium'>{courseS1 || "N/A"}</span></p>
                    <p className='flex text-lms-gray-30'>Semester II: <span
                        className='ml-2 text-lms-black-90 font-medium'>{courseS2 || "N/A"}</span></p>
                  </div>


                </div>
              </div>
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1">
                  <AccordionTrigger>SEMESTER I</AccordionTrigger>
                  <AccordionContent>

                    <CourseDataTable columns={CourseColumns} data={transformToCourseData(courseSemester1)} />

                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>SEMESTER II</AccordionTrigger>
                  <AccordionContent>

                    <CourseDataTable columns={CourseColumns} data={transformToCourseData(courseSemester2)} />

                  </AccordionContent>
                </AccordionItem>

              </Accordion>

            </TabsContent>
          </Tabs>

        </div>



      </section>

    </main>
  )
}
