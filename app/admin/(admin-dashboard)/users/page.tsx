'use client'
import { userStudentColumns } from "@/components/admincomponent/users/students/columns";
import { UserStudentTable } from "@/components/admincomponent/users/students/data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getStudent } from "@/lib/endpoints/MokApi";
import StaffList from "@/components/admincomponent/users/staff/StaffList";
import {useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "@/lib/store";
import {useGetStudentQuery} from "@/lib/features/admin/user-management/student/student";
import {selectStudent, setStudent} from "@/lib/features/admin/user-management/student/studentSlice";
import {useEffect} from "react";
import {setAssessment} from "@/lib/features/admin/academic-management/assesment/assessmentSlice";


export default function Users() {
  const dispatch = useDispatch<AppDispatch>();

  const { data, error, isLoading } = useGetStudentQuery({ page: 0, pageSize: 10 });

  const StudentData = useSelector((state: RootState) => selectStudent(state));

  useEffect(() => {
    if(data) {
      dispatch(setStudent(data.content))
    }
    if(error){
      console.error("failed to load students", error);
    }
  }, [data, error, dispatch]);

  console.log("student data: ", StudentData)

  // const userStuData = await getStudent();


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
            <UserStudentTable columns={userStudentColumns} data={StudentData}/>
          </TabsContent>

          <TabsContent value="staff">
              <StaffList/>
          </TabsContent>
        </Tabs>
      </div>

    </main>
  );
}
