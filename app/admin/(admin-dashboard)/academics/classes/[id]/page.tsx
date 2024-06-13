
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
import { StudentType, CourseType } from "@/lib/types/admin/academics";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Label } from "@/components/ui/label";
// @ts-ignore
import { StudentDataTable } from "@/components/admincomponent/academics/classes/enrolledStudents/data-table";
// @ts-ignore
import { StuColumns } from "@/components/admincomponent/academics/classes/enrolledStudents/columns";
// @ts-ignore
import { CourseDataTable } from "@/components/admincomponent/academics/classes/courses/data-table";
// @ts-ignore
import { CourseColumns } from "@/components/admincomponent/academics/classes/courses/columns";



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



export default async function ClassDetail() {
  const stuData = await getStudents()

  const courseData = await getCourses()


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
              <BreadcrumbPage className="font-semibold text-lms-primary uppercase">FY2025 - A1</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className=' text-3xl font-bold text-lms-primary'>FY2025 - A1</h1>
        <div>
          <Tabs defaultValue="enrolledStudent" className="w-full">

            <TabsList className="grid w-[400px] grid-cols-2">
              <TabsTrigger value="enrolledStudent">Enrolled Students</TabsTrigger>
              <TabsTrigger value="course">Courses</TabsTrigger>
            </TabsList>

            <TabsContent value="enrolledStudent">
              <StudentDataTable columns={StuColumns} data={stuData} />
            </TabsContent>

            <TabsContent value="course" className="bg-white p-6 space-y-4 rounded-lg">
              <div className='flex justify-between '>
                <div>
                  <Label className='text-lms-gray-30'>Generation</Label>
                  <p className='flex font-medium text-lms-black-90'>Generation 1</p>
                </div>

                <div>
                  <Label className='text-lms-gray-30'>Year</Label>
                  <p className='flex font-medium text-lms-black-90'>Foundation Year</p>
                </div>

                <div>
                  <Label className='text-lms-gray-30'>Academic Year</Label>
                  <p className='flex font-medium text-lms-black-90'>2024-2025</p>
                </div>

                <div>
                  <Label className='text-lms-gray-30'>Degree</Label>
                  <p className='flex font-medium text-lms-black-90'>Bachelor</p>
                </div>

                <div>
                  <Label className='text-lms-gray-30'>Study Program</Label>
                  <p className='flex font-medium text-lms-black-90'>Software Engineer</p>
                </div>

                <div>
                  <Label className='text-lms-gray-30'>Enrolled Student</Label>
                  <div className='flex gap-2'>
                    <p className='flex text-lms-gray-30'>Total:<span className='ml-2 text-lms-black-90 font-medium'>10</span></p>
                    <p className='flex text-lms-gray-30'>Male: <span className='ml-2 text-lms-black-90 font-medium'>5</span></p>
                    <p className='flex text-lms-gray-30'>Female: <span className='ml-2 text-lms-black-90 font-medium'>5</span></p>
                  </div>


                </div>
              </div>
              <Accordion type="single" collapsible className="w-full" defaultValue="item-1">
                <AccordionItem value="item-1"  >
                  <AccordionTrigger>SEMESTER I</AccordionTrigger>
                  <AccordionContent>

                    <CourseDataTable columns={CourseColumns} data={courseData} />

                  </AccordionContent>
                </AccordionItem>
                <AccordionItem value="item-2">
                  <AccordionTrigger>SEMESTER II</AccordionTrigger>
                  <AccordionContent>

                    <CourseDataTable columns={CourseColumns} data={courseData} />

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
