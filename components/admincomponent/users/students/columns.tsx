"use client";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

import { ColumnDef } from "@tanstack/react-table";
import {ArrowUpDown, MoreHorizontal} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import {StatusOption, UserStuType, UserStudentType, UserStudentDetailType} from "@/lib/types/admin/user";
import {BiSolidMessageSquareEdit} from "react-icons/bi";
import StatusBadge from "@/components/common/StatusBadge";
import {
  useDisableLectureMutation,
  useEnableLectureMutation, useGetLectureQuery
} from "@/lib/features/admin/academic-management/lecture/lecture";
import {useSelector} from "react-redux";
import {selectLecture} from "@/lib/features/admin/academic-management/lecture/lectureSlice";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {TbCopy, TbEye, TbEyeCancel, TbFileImport, TbPencil} from "react-icons/tb";
import CardDisableComponent from "@/components/card/staff/CardDisableComponent";
import UpdateLectureForm from "@/components/admincomponent/academics/lectures/form/UpdateLectureForm";
import {useRouter} from "next/navigation";

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
    const newValue = e.target.value;
    setValue(newValue);
    tableMeta?.updateData(row.index, column.id, newValue);
  };


  // Ensure the "id" column is not editable
  if (column.id === "id") {
    return <span>{value}</span>;
  }

  if (column.id === "logo") {
    return (
      <img
        src={value}
        alt="Logo"
        className="w-12 h-12 rounded-full object-cover"
      />
    );
  }

  // Custom status
  if (column.id === 'studentStatus') {
    switch (value) {
      case 1:
        return <StatusBadge type="success" status="Active" />
      case 2:
        return <StatusBadge type="default" status="Hiatus" />
      case 3:
        return <StatusBadge type="error" status="Drop" />
      case 4:
        return <StatusBadge type="error" status="Disable" />
      default:
        return <StatusBadge type="default" status="Unknown" />
    }
  }

  if(column.id === "nameEn"){
    return (
        <span className=" uppercase">
        {value}
      </span>
    );
  }

  if (column.id === "gender") {
    return (
        <span className={value === "F" ? "font-semibold text-orange-400" : "font-semibold"}>
        {value === "F" ? "Female" : value === "M" ? "Male" : ""}
      </span>
    );
  }

  if (column.id === "nameKh") {
    return <span className="khmer-font">{value}</span>;
  }
  return <span>{value}</span>;
};

const ActionCell = ({ row } : any) => {
  const router = useRouter()
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
            <DropdownMenuItem onClick={() => router.push(`users/student/${row.original.uuid}`)} className=" focus:bg-background font-medium">
              <TbFileImport  size={20} className="text-lms-gray-30 mr-2"  /> <p className="text-lms-gray-80" >View</p>
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => router.push(``)} className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium">
              <TbPencil size={20} className="text-lms-gray-30 mr-2"   /> <p className="text-lms-gray-80" >Edit</p>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>


      </div>
  );
};

export const userStudentColumns: ColumnDef<UserStudentDetailType>[] = [
  {
    accessorKey: "cardId",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CARD ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "nameEn",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NAME ( EN )
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "nameKh",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          NAME ( KH )
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "gender",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            GENDER
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "dob",
    header: ({ column }) => {
      return (
          <Button
              className="w-[120px] flex justify-start items-start"
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            DOB
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            EMAIL
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "phoneNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TELEPHONE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "familyNumber",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FAMILY TEL
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },

  {
    accessorKey: "studentStatus",
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
    meta: {
      type: "select",
      options: [
        { value: "true", label: "Public" },
        { value: "false", label: "Disable" },
        { value: "draft", label: "Hiatus" },
      ],
    },

  },
  {
    id: "actions",
    cell: ActionCell,
  },
];

