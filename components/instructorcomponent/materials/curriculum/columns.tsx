"use client";
import {RxCross2} from "react-icons/rx";
import {IoCheckmarkSharp} from "react-icons/io5";


import {ColumnDef} from "@tanstack/react-table";
import {MoreHorizontal, ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {useState, useEffect, ChangeEvent, MouseEvent} from "react";
import {MaterialType, StatusOption} from "@/lib/types/instructor/materials";
import {BiSolidMessageSquareEdit} from "react-icons/bi";

const TableCell = ({getValue, row, column, table}: any) => {
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
              value == 1
                  ? "Public text-[#548164] bg-green-200 px-3 py-1 rounded-[10px]"
                  : value == 2
                      ? "Disable text-white bg-red-500 px-3 py-1 rounded-[10px]"
                      : value == 3
                          ? "Draft bg-gray-200 text-gray-500 px-3 py-1 rounded-[10px]"
                          : ""
            }
        >
  {value == 1
      ? "Public"
      : value == 2
          ? "Disable"
          : value == 3
              ? "Draft"
              : ""}
</span>

    );
  }

  return <span>{value}</span>;
};

// Dynamic Edit on cell
const EditCell = ({row, table}: any) => {
  const meta = table.options.meta;

  const setEditedRows = async (e: MouseEvent<HTMLButtonElement>) => {
    const action = e.currentTarget.name;

    meta?.setEditedRows((old: any) => ({
      ...old,
      [row.id]: action === "edit",
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
                <RxCross2 size={20} className="text-red-500"/>
              </button>

              <button
                  onClick={setEditedRows}
                  name="done"
                  className="bg-green-100 rounded-full p-1"
              >
                <IoCheckmarkSharp size={20} className="text-green-500"/>
              </button>
            </div>
        ) : (
            <button onClick={setEditedRows} name="edit">
              <BiSolidMessageSquareEdit size={24} className="text-lms-primary"/>
            </button>
        )}
      </div>
  );
};

export const curriculumColumns: ColumnDef<MaterialType>[] = [
  {
    accessorKey: "title",
    header: ({column}) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            TITLE
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "course",
    header: ({column}) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            COURSE
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "description",
    header: () => {
      return <div>DESCRIPTION</div>;
    },
    cell: TableCell,
  },
  {
    accessorKey: "type",
    header: ({column}) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            TYPE
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "status",
    header: ({column}) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            STATUS
            <ArrowUpDown className="ml-2 h-4 w-4"/>
          </Button>
      );
    },
    cell: TableCell,
    meta: {
      type: "select",
      options: [
        {value: 1, label: "Public"},
        {value: 2, label: "Disable"},
        {value: 3, label: "Draft"},
      ],
    },
  },
  {
    id: "edit",
    cell: EditCell,
  },
  {
    id: "actions",
    cell: ({row}) => {
      const curriculum = row.original;
      return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4"/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="bg-white">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                  className="focus:bg-background"
                  onClick={() => navigator.clipboard.writeText(curriculum.title)}
              >
                Copy ID
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
              {/* <DropdownMenuItem className="focus:bg-background" >Edit</DropdownMenuItem> */}
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-background">
                Disable
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      );
    },
  },
];
