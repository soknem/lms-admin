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
import { EditSubjectForm } from "@/components/admincomponent/faculties/subject/EditSubForm";
import { ViewSubjectForm } from "@/components/admincomponent/faculties/subject/VeiwSubForm";

const ActionsCell = ({ row }: any) => {
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [isViewFormVisible, setViewFormVisible] = useState(false);
  const subject = row.original;
  const handleEditClick = () => {
    setEditFormVisible(true);
    setViewFormVisible(false); // Close view form if open
  };

  const handleViewClick = () => {
    setViewFormVisible(true);
    setEditFormVisible(false); // Close edit form if open
  };

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
            onClick={() => navigator.clipboard.writeText(subject.subject)}
          >
            Copy ID
          </DropdownMenuItem>
          {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
          <DropdownMenuItem className="focus:bg-background">
            Sort
          </DropdownMenuItem>
          <DropdownMenuItem
            className="focus:bg-background"
            onClick={handleViewClick}
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
      {isEditFormVisible && <EditSubjectForm />}
      {isViewFormVisible && <ViewSubjectForm />}
    </div>
  );
};

export default ActionsCell;
