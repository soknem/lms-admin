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
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { PaymentType, StatusOption } from "@/lib/types/admin/payments";

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

  if (column.id === "student") {
    const studentData = row.original;
    return (
      <div className="flex items-center">
        <img
          src={studentData.profile_image}
          alt={studentData.name}
          className="w-8 h-8 rounded-full mr-2"
        />
        <span>{studentData.name}</span>
      </div>
    );
  }

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select
        className="border-1 border-gray-300 rounded-md focus:to-primary"
        onChange={onSelectChange}
        value={value}
      >
        {columnMeta?.options?.map((option: StatusOption) => (
          <option key={option.label} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    ) : (
      <input
        className="w-full p-2 border-1 border-gray-300 rounded-md"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={onBlur}
        type={columnMeta?.type || "text"}
      />
    );
  }

  if (column.id === "status") {
    return (
      <span
        className={
          value === "Active"
            ? "text-green-500"
            : value === "Drop"
            ? "text-red-500"
            : value === "Hiatus"
            ? "text-gray-400"
            : ""
        }
      >
        {value}
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

export const paymentColumns: ColumnDef<PaymentType>[] = [
  {
    accessorKey: "card_id",
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
    accessorKey: "fullname_en",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FULLNAME(EN)
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
    accessorKey: "class",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CLASS
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "course",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          COURSE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "p",
    header: "P",
    cell: TableCell,
  },
  {
    accessorKey: "ea",
    header: "EA",
    cell: TableCell,
  },
  {
    accessorKey: "ua",
    header: "UA",
    cell: TableCell,
  },
  {
    accessorKey: "total_score",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TOTAL SCORE
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
        { value: "Active", label: "Active" },
        { value: "Drop", label: "Drop" },
        { value: "Hiatus", label: "Hiatus" },
      ],
    },
  },
  {
    id: "edit",
    cell: EditCell,
  },
];
