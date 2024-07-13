// columns.ts
import { ColumnDef } from "@tanstack/react-table";
import {Course} from "@/lib/types/student/achievement";


export const columns: ColumnDef<Course>[] = [
    {
        accessorKey: "NO",
        header: "NO",
        cell: ({ row }) => (
            <div className="capitalize text-[#7828C8]">
                {row.getValue("NO")}
            </div>
        ),
    },
    {
        accessorKey: "title",
        header: "Title",
        cell: ({ row }) => (
            <div className="capitalize">{row.getValue("title")}</div>
        ),
    },
    {
        accessorKey: "score",
        header: "Score",
        cell: ({ row }) => (
            <div className="capitalize">
                {parseFloat(row.getValue("score")).toFixed(2)}
            </div>
        ),
    },
    {
        accessorKey: "credit",
        header: "Credit",
        cell: ({ row }) => (
            <div className="capitalize">{parseFloat(row.getValue("credit"))}</div>
        ),
    },
    {
        accessorKey: "grade",
        header: "Grade",
        cell: ({ row }) => (
            <div className="capitalize text-red-500 font-bold">
                {row.getValue("grade")}
            </div>
        ),
    },
];
