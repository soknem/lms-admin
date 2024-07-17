"use client";
import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";
import { MdEdit } from "react-icons/md";

import { ColumnDef } from "@tanstack/react-table";
import { MoreHorizontal, ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";

import { useState, useEffect, ChangeEvent, MouseEvent } from "react";

import { ScheduleType, StatusOption } from "@/lib/types/instructor/schedule";
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
    const newValue = e.target.value;
    setValue(newValue);
    tableMeta?.updateData(row.index, column.id, newValue);
  };

  // custom render on cell
  const accessorKey = column.columnDef.accessorKey;

  // Custom status
  if (column.id === "status") {
    return (
        <span
            className={
              value === 2
                  ? "Started text-[#548164] bg-green-200 px-3 py-1 rounded-[10px]"
                  : value === 3
                      ? "Ended text-white bg-red-500 px-3 py-1 rounded-[10px]"
                      : value === 1
                          ? "Pending text-white bg-lms-accent px-3 py-1 rounded-[10px]"
                          : ""
            }
        >
            {value === 2
                ? "Started"
                : value === 3
                    ? "Ended"
                    : value === 1
                        ? "Pending"
                        : ""}
        </span>
    );
  }

  // Ensure the "id" column is not editable
  if (column.id === "id") {
    return <span>{value}</span>;
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
  // if (column.id === "status") {
  //   return (
  //     <span
  //       className={
  //         value === "active"
  //           ? "Public text-green-500"
  //           : value === "inactive"
  //           ? "Disable text-red-500"
  //           : value === "disable"
  //           ? "Draft text-gray-400"
  //           : ""
  //       }
  //     >
  //       {value === "active"
  //         ? "Public"
  //         : value === "inactive"
  //         ? "Disable"
  //         : value === "disable"
  //         ? "Draft"
  //         : ""}
  //     </span>
  //   );
  // }

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

export const scheduleColumns: ColumnDef<ScheduleType>[] = [
  {
    accessorKey: "lectureDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DATE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },

  {
    accessorKey: "timeRange",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            SESSION
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: ({ row }) => {
      const { startTime, endTime } = row.original;
      return (
          <span>{`${startTime} - ${endTime}`}</span>
      );
    },


  },

  {
    accessorKey: "classCode",
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
    accessorKey: "courseTitle",
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
        { value: "active", label: "Public" },
        { value: "inactive", label: "Disable" },
        { value: "disable", label: "Draft" },
      ],
    },
  },

];
