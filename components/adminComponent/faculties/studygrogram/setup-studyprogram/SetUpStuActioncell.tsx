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
import { useRouter } from "next/navigation";
import { EditSetStuProForm } from "@/components/admincomponent/faculties/studygrogram/setup-studyprogram/EditSetStuProForm";

const ActionsCell = ({ row }: any) => {
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const study_program = row.original;
  const router = useRouter();

  const handleEditClick = () => {
    setEditFormVisible(true);
  };

  return (
    <div>
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
            onClick={() => navigator.clipboard.writeText(study_program.subject)}
          >
            Copy ID
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
          <DropdownMenuItem
            className="focus:bg-background"
            onClick={() => router.push("/admin/faculties/studyprogram-detail")}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-background"
            onClick={handleEditClick}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-background">
            Disable
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditFormVisible && <EditSetStuProForm />}
    </div>
  );
};

export default ActionsCell;
