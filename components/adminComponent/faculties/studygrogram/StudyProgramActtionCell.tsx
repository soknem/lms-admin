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
import { EditPayForm } from "@/components/admincomponent/payments/EditPayForm";
// @ts-ignore
import { ViewPayForm } from "@/components/admincomponent/payments/ViewPayForm";
// @ts-ignore
import { EditStudyProForm } from "./EditStudyProgramForm";
import { useRouter } from "next/navigation";

const ActionsCell = ({ row }: any) => {
  const [isEditFormVisible, setEditFormVisible] = useState(false);
  const study_program = row.original;
  const router = useRouter();

  const handleEditClick = () => {
    setEditFormVisible(true);
  };

  const handleClick = (
    event: React.MouseEvent<HTMLDivElement>,
    path: string
  ) => {
    event.stopPropagation();
    router.push(path);
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
            onClick={(event) =>
              handleClick(event, `/admin/faculties/studyprogram-detail`)
            }
          >
            View
          </DropdownMenuItem>
          {/* </Link> */}
          <DropdownMenuItem
            className="focus:bg-background"
            onClick={() => handleEditClick}
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
