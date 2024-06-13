import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
// @ts-ignore
import { EditFacForm } from "./EditFacForm";
// @ts-ignore
import { ViewFacForm } from "./ViewFacForm";
import { useRouter } from "next/navigation";
// @ts-ignore
import { EditUserStuForm } from "./EditUserStu";

const ActionsCell = ({ row }: any) => {
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const student = row.original;
  const router = useRouter();

  return (
    <div>
      {" "}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-white">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <DropdownMenuItem
            className="focus:bg-background"
            onClick={() => navigator.clipboard.writeText(student.card_id)}
          >
            Copy ID
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-background"
            onClick={() => router.push("/admin/users/stu-detail")}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-background"
            onClick={() => router.push("/admin/users/edit-student")}
          >
            Edit
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
          {/* <DropdownMenuItem className="focus:bg-background" >Edit</DropdownMenuItem> */}
          <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-background">
            Disable
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditFormVisible && <EditUserStuForm />}
      {/* {isViewFormVisible && <ViewFacForm />} */}
    </div>
  );
};

export default ActionsCell;
