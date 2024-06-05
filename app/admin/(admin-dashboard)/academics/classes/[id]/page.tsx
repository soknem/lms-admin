

// type Props = {
//     params: { code: string }
//     searchParams: { [key: string]: string | string[] | undefined }
// } 
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
import { StudentType , InstructorType } from "@/lib/types/admin/academics";
import { StudentDataTable } from "./(enrolled-students)/data-table";
import { columns } from "./(enrolled-students)/columns";
import { insColumns } from "./(assigned-instructor)/columns";
import { InstructorDataTable } from "./(assigned-instructor)/data-table";

async function getStudents(): Promise<StudentType[]> {
  const res = await fetch(
    'https://665e76e91e9017dc16f01b0d.mockapi.io/api/1/student'
  )
  const data = await res.json()

  // console.log("data from page: ",data);
  return data
}

async function getInstructors(): Promise<InstructorType[]> {
  const res = await fetch(
    'https://665e76e91e9017dc16f01b0d.mockapi.io/api/1/teachers'
  )
  const data = await res.json()

  // console.log("data from page: ",data);
  return data
}



export default async function ClassDetail() {
  const StuData = await getStudents()

  const insData = await getInstructors()


  return (
    <main>
      <section className="flex flex-col gap-4 h-full w-full p-9">
        <Breadcrumb className="mb-9">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink asChild>
                <Link href="admin/academics/classes" className='font-semibold text-gray-30 uppercase'>Classes</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold text-primary uppercase">Detail</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <h1 className=' text-3xl font-bold text-primary'>Class Information</h1>
        <div>
          <Tabs defaultValue="students" className="w-full">
            <TabsList>
              <TabsTrigger value="students">Enrolled Students</TabsTrigger>
              <TabsTrigger value="instructors">Assigned Instructor</TabsTrigger>
            </TabsList>
            <TabsContent value="students">

              <StudentDataTable columns={columns} data={StuData} />

            </TabsContent>
            <TabsContent value="instructors">

              <InstructorDataTable columns={insColumns} data={insData} />

            </TabsContent>
          </Tabs>
        </div>



      </section>

    </main>
  )
}
