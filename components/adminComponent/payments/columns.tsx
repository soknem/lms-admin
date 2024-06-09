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
import { EditPayForm } from "./EditPayForm";
import { ViewPayForm } from "./ViewPayForm";

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

  // if (column.id === "profile_image") {
  //   return (
  //     <img
  //       src={value}
  //       alt="profile"
  //       className="w-full h-full rounded-full object-cover"
  //     />
  //   );
  // }

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

export const paymentColumns: ColumnDef<PaymentType>[] = [
  {
    accessorKey: "receipt_id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          RECEIPT ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },

  // {
  //   accessorKey: "profile_image",
  //   header: () => {
  //     return <div>PROFLE</div>;
  //   },
  //   cell: TableCell,
  // },
  // {
  //   accessorKey: "name",
  //   header: ({ column }) => {
  //     return (
  //       <Button
  //         variant="ghost"
  //         onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //       >
  //         NAME
  //         <ArrowUpDown className="ml-2 h-4 w-4" />
  //       </Button>
  //     );
  //   },
  //   cell: TableCell,
  // },
  {
    accessorKey: "student",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          STUDENT
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
          generation
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
    accessorKey: "date",
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
    accessorKey: "discount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          DISCOUNT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "total_payment",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TOTAL PAYMENT
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "balance_due",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          BALANCE DUE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "academic_fee",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          ACDEMIC FEE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "payment_method",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PAYMENT METHOD
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
      const [isEditFormVisible, setEditFormVisible] = useState(false);
      const [isViewFormVisible, setViewFormVisible] = useState(false);
      const payment = row.original;
      const handleEditClick = () => {
        setEditFormVisible(true);
        setViewFormVisible(false); // Close view form if open
      };

      const handleViewClick = () => {
        setViewFormVisible(true);
        setEditFormVisible(false); // Close edit form if open
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
                onClick={() =>
                  navigator.clipboard.writeText(payment.student.name)
                }
              >
                Copy ID
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-background"
                onClick={handleViewClick}
              >
                View
              </DropdownMenuItem>
              <DropdownMenuItem
                className="focus:bg-background"
                onClick={handleEditClick}
              >
                Edit
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator className="bg-background px-2" /> */}
              {/* <DropdownMenuItem className="focus:bg-background" >Edit</DropdownMenuItem> */}
              <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-background">
                Disable
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          {isEditFormVisible && <EditPayForm/>}
          {isViewFormVisible && <ViewPayForm />}
        </div>
      );
    },
  },
];
