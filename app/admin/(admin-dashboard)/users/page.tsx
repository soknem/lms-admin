
// @ts-ignore
import { userStudentColumns } from "@/components/admincomponent/users/students/columns";
// @ts-ignore
import { UserStudentTable } from "@/components/admincomponent/users/students/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter } from "next/navigation";
import { getStudent } from "@/lib/endpoints/MokApi";
// @ts-ignore
import StaffList from "@/components/admincomponent/users/staff/StaffList";


export default async function Users() {

  const userStuData = await getStudent();



  return (
    <main className="flex flex-col h-fullw-full p-9">
      <h1 className=" text-3xl font-bold text-lms-primary">Users</h1>
      <div>
        <Tabs defaultValue="student" className="w-full my-4">
          <TabsList className="grid w-[400px] grid-cols-2">
            <TabsTrigger value="student">Students</TabsTrigger>
            <TabsTrigger value="staff">Staff</TabsTrigger>
          </TabsList>

          <TabsContent value="student">
            <UserStudentTable columns={userStudentColumns} data={userStuData}/> 
          </TabsContent>

          <TabsContent value="staff">
              <StaffList/>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  );
}
