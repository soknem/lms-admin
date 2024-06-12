"use client";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
// @ts-ignore
import { StatusOption, UserStudentType } from "@/lib/types/admin/user";
// @ts-ignore
import ActionsCell from "./StudentActionCell";

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

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
      <select
        className="border-1 border-gray-300 dark:bg-white hover:scale-[105%] hover: cursor-pointer focus:outline-none "
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
        className="w-full p-2 border-1 border-gray-300 "
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
          value === "true"
            ? "Public text-green-500"
            : value === "false"
            ? "Disable text-red-500"
            : value === "draft"
            ? "Hiatus text-lms-gray-30"
            : ""
        }
      >
        {value === "true"
          ? "Public"
          : value === "false"
          ? "Disable"
          : value === "draft"
          ? "Hiatus"
          : ""}
      </span>
    );
  }

  if (column.id === "name_kh") {
    return <span className="khmer-font">{value}</span>;
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

export const userStudentColumns: ColumnDef<UserStudentType>[] = [
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
    accessorKey: "name_en",
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
    accessorKey: "name_kh",
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
    accessorKey: "ph_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PERSONAL NUMBER
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "fam_ph_number",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FAMILY NUMBER
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "email",
    header: () => {
      return <div>EMAIL</div>;
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
        { value: "draft", label: "Hiatus" },
      ],
    },
  },
  {
    id: "edit",
    cell: EditCell,
  },
  {
    id: "actions",
    cell: ActionsCell,
  },
];
