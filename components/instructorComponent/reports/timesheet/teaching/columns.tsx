"use client";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";

import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { TbArchive } from "react-icons/tb";
import { TbFileIsr } from "react-icons/tb";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { TbTrash } from "react-icons/tb";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";

import { TeachingType } from "@/lib/types/instructor/teachingtype";



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
  if (column.id === "status") {
    return <span className="text-lms-success font-medium">{value}</span>;
  }

  return <span>{value}</span>;
};

export const TeachingColumns: ColumnDef<TeachingType>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DATE
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "session",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SESSION
        </Button>
      );
    },
    cell: TableCell,
  },

  {
    accessorKey: "schedule",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SCHEDULE
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "teachingType",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          //to  customize the size of each column
          className="w-[130px] flex justify-start items-start"
        >
          TEACHING TYPE
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
          //to  customize the size of each column
          className="w-[130px] flex justify-start items-start"
        >
          STATUS
        </Button>
      );
    },
    cell: TableCell,
  },
  
];
