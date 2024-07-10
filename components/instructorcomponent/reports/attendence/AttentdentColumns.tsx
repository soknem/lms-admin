import { RxCross2 } from "react-icons/rx";
import { IoCheckmarkSharp } from "react-icons/io5";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState, useEffect, ChangeEvent, MouseEvent } from "react";
import { AttendanceT } from "@/lib/types/instructor/report";
import { BiSolidMessageSquareEdit } from "react-icons/bi";
import { StatusOption } from "@/lib/types/instructor/schedule";
import StatusBadge from "@/components/common/StatusBadge";

// Define TableCell component
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
  const accessorKey = column.columnDef.accessorKey;


  // Render status span
  if (accessorKey === 'student.status') {

    switch (value) {
      case 1:
        return <StatusBadge type="warning" status="Pending" />
      case 2:
        return <StatusBadge type="success" status="Started" />
      case 3:
        return <StatusBadge type="error" status="Ended" />
    }
  }
  // Default case: render plain span with value
  return <span>{value}</span>;
};

// Define EditCell component
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
                <IoCheckmarkSharp size={24} className="text-green-500" />
              </button>
            </div>
        ) : (
            <button onClick={setEditedRows} name="edit">
              <BiSolidMessageSquareEdit size={24} className="text-lms-primary" />
            </button>
        )}
      </div>
  );
};

// Define column definitions using ColumnDef<AttendanceT>
export const attentdentColumns: ColumnDef<AttendanceT>[] = [
  {
    accessorKey: "student.cardId",
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CARD ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: TableCell,
  },
  {
    accessorKey: "student.nameEn",
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          FULLNAME(EN)
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: TableCell,
  },
  {
    accessorKey: "student.gender",
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          GENDER
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: TableCell,
  },
  {
    accessorKey: "classCode",
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          CLASS
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: TableCell,
  },
  {
    accessorKey: "course.title",
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          COURSE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
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
    accessorKey: "totalScore",
    header: ({ column }) => (
        <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          TOTAL SCORE
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
    ),
    cell: TableCell,
  },
  {
    accessorKey: 'student.status',
    header: ({ column }) => {
      return (
          <Button
              variant='ghost'
              onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
          >
            STATUS
            <ArrowUpDown className='ml-2 h-4 w-4' />
          </Button>
      )
    },
    cell: TableCell

  },
  {
    id: "edit",
    cell: EditCell,
  },
];
