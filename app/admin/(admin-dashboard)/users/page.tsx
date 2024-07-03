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
import {useGetStaffQuery} from "@/lib/features/admin/user-management/staff/staff";


export default function Users() {

  // === student ===
  const { data: studentData, error: studentError, isLoading: studentLoading, isSuccess: isStudentSuccess } = useGetStudentQuery({ page: 0, pageSize: 10 });

  let stuData = [];

  if(isStudentSuccess){
    stuData = studentData.content;
    console.log("student data: ", stuData)
  }

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
            <UserStudentTable columns={userStudentColumns} data={stuData}/>
          </TabsContent>

          <TabsContent value="staff">
              <StaffList/>
          </TabsContent>
        </Tabs>
      </div>

    </main>
  );
}
