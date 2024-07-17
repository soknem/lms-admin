"use client";


import { ColumnDef } from "@tanstack/react-table";

import { MoreHorizontal, ArrowUpDown } from "lucide-react";


import { Button } from "@/components/ui/button";

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
          <ArrowUpDown className="ml-2 h-4 w-4" />
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
          className="w-[160px] flex justify-start items-start"
        >
          TEACHING TYPE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: TableCell,
  },
  {
    accessorKey: "paidStatus",
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
