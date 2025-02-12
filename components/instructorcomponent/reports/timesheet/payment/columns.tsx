"use client";


import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";


import { Button } from "@/components/ui/button";

import { useState, useEffect, ChangeEvent, MouseEvent } from "react";

import { OptionType, TranscriptType } from "@/lib/types/admin/academics";
import { PaymentType } from "@/lib/types/instructor/timesheet";

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

  // Custom render on cell
  const accessorKey = column.columnDef.accessorKey;
  if (column.id === "total") {
    return <span className="text-lms-success font-medium">{value}</span>;
  }

  if (tableMeta?.editedRows[row.id]) {
    return columnMeta?.type === "select" ? (
        // Custom on only normal dropdown
        <select
            className="border-1 border-gray-30 rounded-md focus:to-primary"
            onChange={onSelectChange}
            value={initialValue}
        >
          {columnMeta?.options?.map((option: OptionType) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
          ))}
        </select>
    ) : (
        // Custom on normal input text
        <input
            className="w-full p-2 border-1 border-gray-30 rounded-md"
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={onBlur}
            type={columnMeta?.type || "text"}
        />
    );
  }

  // Apply specific color for total value 22.5
  if (accessorKey === "total" && value === 22.5) {
    return <span style={{ color: "red" }}>{value}$</span>;
  }

  return <span>{value}</span>;
};

export const PaymentColumns: ColumnDef<PaymentType>[] = [
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
      const { lectureStartTime, lectureEndTime } = row.original;
      return (
          <span>{`${lectureStartTime} - ${lectureEndTime}`}</span>
      );
    },


  },  {
    accessorKey: "theoryRate",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            THEORYRATE
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "pwRate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          PW RATE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "theoryHours",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          THEORYHOUR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "pwHours",
    header: ({ column }) => {
      return (
          <Button
              variant="ghost"
              onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
          PW HOUR
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "totalOfSession",
    header: ({ column }) => {
      return (
          <Button variant="ghost">
            TOTAL
          </Button>
      );
    },
    cell: TableCell,
  },
];
