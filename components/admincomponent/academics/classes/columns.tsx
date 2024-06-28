"use client";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { TbArchive } from "react-icons/tb";
import { TbFileIsr } from "react-icons/tb";
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

      if (DisplayValue === 'false') {
        return <StatusBadge type="success" status="Active" />
      } else {
        return <StatusBadge type="error" status="Disable" />
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


export const columns: ColumnDef<ClassTableFormType>[] = [
  {
    accessorKey: "classCode",
    header: ({ column }) => {
      return (
        <Button
          //to  customize the size of each column
          className="w-[200px] flex justify-start items-start"
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
    id: "actions",
    cell: ({ row }) => {
      const classes = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white">
            {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
            {/* <DropdownMenuItem className="focus:bg-background" >Edit</DropdownMenuItem> */}
            <DropdownMenuItem className="text-lms-gray-30 focus:text-gray-30 focus:bg-background font-medium">

            </DropdownMenuItem>
            <DropdownMenuItem className="text-gray-30 focus:text-gray-30 focus:bg-background font-medium">
              <TbPencil size={20} className="text-lms-gray-30 mr-2"  /> Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 focus:text-red-600 font-medium focus:bg-background">
              <TbArchive size={20} className="text-red-600 mr-2 " />
              Disable
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
