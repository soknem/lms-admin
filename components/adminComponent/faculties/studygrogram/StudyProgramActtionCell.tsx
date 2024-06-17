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

import { EditStudyProForm } from "./EditStudyProgramForm";
import { useRouter } from "next/navigation";

const ActionsCell = ({ row }: any) => {
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [isViewFormVisible, setViewFormVisible] = useState(false);
  const study_program = row.original;
  const router = useRouter();

  const handleEditClick = () => {
    setEditFormVisible(true);
    setViewFormVisible(false); // Close view form if open
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
            onClick={() => navigator.clipboard.writeText(study_program.id)}
          >
            Copy ID
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
          <DropdownMenuItem className="focus:bg-background">
            Sort
          </DropdownMenuItem>
          {/* <Link href={`/admin/faculties/studyprogram-detail`}> */}
          <DropdownMenuItem
            className="focus:bg-background"
            onClick={(e) => {
              // e.preventDefault();
              e.stopPropagation();
              router.push("/admin/faculties/studyprogram-detail");
            }}
          >
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-background"
            onClick={(e) => {
              // e.preventDefault();
              e.stopPropagation();
              handleEditClick();
            }}
          >
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-background">
            Disable
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      {isEditFormVisible && <EditStudyProForm />}
    </div>
  );
};

export default ActionsCell;
