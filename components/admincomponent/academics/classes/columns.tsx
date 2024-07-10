"use client";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import {TbArchive, TbEye, TbEyeCancel,TbFileImport } from "react-icons/tb";

import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { TbPencil } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";

import { OptionType, ClassTableFormType } from "@/lib/types/admin/academics";

import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import StatusBadge from "@/components/common/StatusBadge";
import {
  useDisableLectureMutation,
  useEnableLectureMutation, useGetLectureQuery
} from "@/lib/features/admin/academic-management/lecture/lecture";
import {useSelector} from "react-redux";
import {selectLecture} from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import CardDisableComponent from "@/components/card/staff/CardDisableComponent";
import UpdateLectureForm from "@/components/admincomponent/academics/lectures/form/UpdateLectureForm";
import {useRouter} from "next/navigation";
import {
  useDisableClassMutation,
  useEnableClassMutation, useGetClassesQuery
} from "@/lib/features/admin/academic-management/classes/classApi";
import {selectClasses} from "@/lib/features/admin/academic-management/classes/classSlice";
import {selectDetailClasses} from "@/lib/features/admin/academic-management/detail-classes/detailClassesSlice";
import EditClassForm from "@/components/admincomponent/academics/classes/EditClassForm";
import {RootState} from "@/lib/store";


const TableCell = ({ getValue, row, column, table }: any) => {
  const initialValue = getValue();
  const columnMeta = column.columnDef.meta;
  const tableMeta = table.options.meta;
  const [value, setValue] = useState(initialValue);

  useEffect(() => {
    setValue(initialValue);
  }, [initialValue]);

  const onBlur = () => {
    tableMeta?.updateData(row.index, column.id, value);
  };

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setValue(e.target.value);
    tableMeta?.updateData(row.index, column.id, e.target.value);
  };

  // custom render on cell
  const accessorKey = column.columnDef.accessorKey;

  // Custom rendering for specific columns : customize date which can take pick date time
  if (accessorKey === "isDraft") {
    const DisplayValue = value.toString();

    if (tableMeta?.editedRows[row.id]) {
      return (
        //custom year selector only
        <RadioGroup defaultValue="comfortable" className="flex">
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="false" id="public" />
            <Label htmlFor="public">Public</Label>
          </div>
          <div className="flex items-center space-x-2">
            <RadioGroupItem value="true" id="draft" />
            <Label htmlFor="draft">Draft</Label>
          </div>
        </RadioGroup>
      );
    } else {
      if (DisplayValue === "false") {
        return <StatusBadge type="success" status="Pubic" />;
      } else {
        return <StatusBadge type="default" status="Draft" />;
      }
    }
  }

  if (accessorKey === 'isDeleted') {
    const DisplayValue = value.toString();

    if (tableMeta?.editedRows[row.id]) {
      return (
          //custom year selector only
          <RadioGroup defaultValue="comfortable" className="flex">
            <div className="flex items-center space-x-2">
              <RadioGroupItem  value="false" id="active" />
              <Label htmlFor="public">Active</Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="true" id="disable" />
              <Label htmlFor="draft">Disable</Label>
            </div>
          </RadioGroup>
      );
    } else {

      if (DisplayValue === 'true') {
        return <StatusBadge type="error" status="Disable" />
      } else {
        return <StatusBadge type="success" status="Active" />
      }


    }
  }

  if (accessorKey === 'status') {

    switch (value) {
      case 1:
        return <StatusBadge type="success" status="Started" />
      case 2:
        return <StatusBadge type="warning" status="Pending" />
      case 3:
        return <StatusBadge type="error" status="Ended" />
    }
  }

  return <span>{value}</span>;
};

const ActionCell = ({ row } : any) => {

  const router = useRouter();

  const [isCardVisible, setIsCardVisible] = useState(false);
  const [isDeleted, setIsDeleted] = useState(row.original.isDeleted);
  
  const [enableClass] = useEnableClassMutation();
  const [disableClass] = useDisableClassMutation();



  // edit form
  const [isFormVisible, setIsFormVisible] = useState(false);



  // const { data: classesData, error: classesError } = useGetClassesQuery({ page: 0, pageSize: 10 });

  const classes = useSelector((state: RootState) => selectDetailClasses(state));

  console.log("classes detail: ",classes)


  const handleOpenCard = () => {
    setIsCardVisible(true);
  };

  const handleConfirm = async   (classUuid : string) => {
    if(isDeleted){
      await enableClass(classUuid).unwrap();
      setIsDeleted((prev :any) => !prev);
      console.log('Class enabled successfully');

    }else{
      await disableClass(classUuid).unwrap();
      setIsDeleted((prev : any) => !prev);
      console.log('Class disable successfully');
    }
    setIsCardVisible(false);
  };

  const handleCancel = () => {
    setIsCardVisible(false);
  };

  const handleEditClick = () => {
    setIsFormVisible(true);
  };

  const handleCloseForm = () => {
    setIsFormVisible(false);
  };



  return (
      <div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant='ghost' className='h-8 w-8 p-0'>
              <span className='sr-only'>Open menu</span>
              <MoreHorizontal className='h-4 w-4' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align='end' className="bg-white">
            <DropdownMenuItem onClick={() => router.push(`classes/${row.original.uuid}`)} className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium">
              <TbFileImport  size={20} className="text-gray-30 mr-2"  /> View
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleEditClick} className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium">
              <TbPencil size={20} className="text-gray-30 mr-2"  /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem
                className={`text-${isDeleted ? 'green-600' : 'red-600'} focus:text-${isDeleted ? 'green-600' : 'red-600'} font-medium focus:bg-background`}
                onClick={handleOpenCard}
            >
              {isDeleted ? (
                  <>
                    <TbEye size={20} className="text-green-600 mr-2" /> Enable
                  </>
              ) : (
                  <>
                    <TbEyeCancel size={20} className="text-red-600 mr-2" /> Disable
                  </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {isCardVisible && (
            <CardDisableComponent
                message={isDeleted ? "Do you really want to enable this item?" : "Do you really want to disable this item?"}
                onConfirm={() => handleConfirm(row.original.uuid)}
                onCancel={handleCancel}
                buttonTitle={isDeleted ? "Enable" : "Disable"}
            />
        )}
        {isFormVisible && (
            <EditClassForm uuid={row.original.uuid} onClose={handleCloseForm} classData={classes} />
        )}
      </div>
  );
};

export const columns: ColumnDef<ClassTableFormType>[] = [
  {
    accessorKey: "classCode",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CLASS CODE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "classStart",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CLASS START
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "classEnd",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            CLASS END
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "academicYear",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            ACADEMIC YEAR
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "instructor",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            INSTRUCTOR
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "shift",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SHIFT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "studyProgram",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            STUDY PROGRAM
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },


  {
    accessorKey: "generation",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          GENERATION
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },



  {
    accessorKey: "status",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            STATUS
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },

  {
    accessorKey: "isDraft",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          VISIBILITY
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "isDeleted",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            STATE
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    id: 'actions',
    cell: ActionCell,
  },

];
