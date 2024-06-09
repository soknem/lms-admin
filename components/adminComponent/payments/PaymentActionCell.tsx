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
import { EditPayForm } from "@/components/admincomponent/payments/EditPayForm";
import { ViewPayForm } from "@/components/admincomponent/payments/ViewPayForm";

const ActionsCell = ({ row }:any) => {
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const [isViewFormVisible, setViewFormVisible] = useState(false);
  const payment = row.original;

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
            onClick={() => navigator.clipboard.writeText(payment.student.name)}
          >
            Copy ID
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
      {isEditFormVisible && <EditPayForm />}
      {isViewFormVisible && <ViewPayForm />}
    </div>
  );
};

export default ActionsCell;
