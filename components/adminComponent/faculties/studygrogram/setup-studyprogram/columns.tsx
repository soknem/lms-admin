"use client";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";

import { SetupStudyProgramType, StatusOption } from "@/lib/types/admin/faculty";

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
    const newValue = e.target.value === "true";
    setValue(newValue);
    tableMeta?.updateData(row.index, column.id, newValue);
  };

  if (column.id === "logo") {
    return (
      <img
        src={value}
        alt="Logo"
        className="w-12 h-12 rounded-full object-cover"
      />
    );
  }

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      //custom on only normal dropdown
      <select
        className="border-1 border-gray-30 rounded-md focus:to-primary"
        onChange={onSelectChange}
        value={value ? "true" : "false"}
      >
        {columnMeta?.options?.map((option: StatusOption) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      //custom on normal input text
      <input
        className="w-full p-2 border-1 border-gray-30 rounded-md"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
    );
  }

  // Check if the column is the status column
  if (column.id === "status") {
    return (
      <span
        className={
          value === "true"
            ? "Public text-green-500"
            : value === "false"
            ? "Disable text-red-500"
            : value === "draft"
            ? "Draft text-gray-400"
            : ""
        }
      >
        {value === "true"
          ? "Public"
          : value === "false"
          ? "Disable"
          : value === "draft"
          ? "Draft"
          : ""}
      </span>
    );
  }

  return <span>{value}</span>;
};

// Dynamic Edit on cell
const EditCell = ({ row, table }: any) => {
  const meta = table.options.meta;

  const setEditedRows = async (e: MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.name;

    meta?.setEditedRows((old: any) => ({
      ...old,
      [row.id]: action === "edit" ? true : false,
    }));

    if (action === "cancel") {
      meta?.revertData(row.index, true);
    }
  };

  return (
    <div>
      {meta?.editedRows[row.id] ? (
        <div>
          <button
            className="mr-3 bg-red-100 rounded-full p-1"
            onClick={setEditedRows}
            name="cancel"
          >
            <RxCross2 size={20} className="text-red-500" />
          </button>

          <button
            onClick={setEditedRows}
            name="done"
            className="bg-green-100 rounded-full p-1"
          >
            <IoCheckmarkSharp size={20} className="text-green-500" />
          </button>
        </div>
      ) : (
        <button onClick={setEditedRows} name="edit">
          <MdEdit size={18} className="text-gray-30" />
        </button>
      )}
    </div>
  );
};

export const setupStudyProgramColumns: ColumnDef<SetupStudyProgramType>[] = [
  {
    accessorKey: "subject",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SUBJECT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "study_program",
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
    accessorKey: "semester",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          SEMESTER
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "hour",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          HOUR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "theory",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          THEORY
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "practice",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PRACTICE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "internship",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          INTERNSHIP
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
    meta: {
      type: "select",
      options: [
        { value: "true", label: "Public" },
        { value: "false", label: "Disable" },
        { value: "draft", label: "Draft" },
      ],
    },
  },
  {
    id: "edit",
    cell: EditCell,
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const study_program = row.original;

      return (
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
              onClick={() =>
                navigator.clipboard.writeText(study_program.subject)
              }
            >
              Copy ID
            </DropdownMenuItem>
            {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
            <DropdownMenuItem className="focus:bg-background">
              Sort
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-background">
              View
            </DropdownMenuItem>
            <DropdownMenuItem className="focus:bg-background">
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-background">
              Disable
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];
