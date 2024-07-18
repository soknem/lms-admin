import React, { useEffect, useState } from "react";
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable } from "@tanstack/react-table";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { PaymentType } from "@/lib/types/instructor/timesheet";


type DataTableProps<TData extends PaymentType, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  allData: TData[];
  selectedDate: Date;
}
export function PaymentDataTable<TData extends PaymentType, TValue>({ columns, allData, selectedDate }: DataTableProps<TData, TValue>) {

  const [data, setData] = useState(() => [...allData]);

  useEffect(() => {
    if (selectedDate) {
      setData(allData.filter(item => new Date(item.date).getMonth() === selectedDate.getMonth() && new Date(item.date).getFullYear() === selectedDate.getFullYear()));
    } else {
      setData([...allData]);
    }
  }, [selectedDate, allData]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const calculateTotal = () => {
    return data
        .reduce((total, row) => {
          const value = parseFloat(String((row as PaymentType).totalOfSession));
          return total + (isNaN(value) ? 0 : value);
        }, 0)
        .toFixed(2);
  };

  return (
      <>
        <div>
          <Table>
            <TableHeader className="text-lms-gray-30 center ">
              {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                        <TableHead key={header.id} className="text-center ">
                          {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                        </TableHead>
                    ))}
                  </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                      <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                        {row.getVisibleCells().map((cell) => (
                            <TableCell key={cell.id} className=" text-center ">
                              {flexRender(cell.column.columnDef.cell, cell.getContext())}
                            </TableCell>
                        ))}
                      </TableRow>
                  ))
              ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
              )}
            </TableBody>
          </Table>
          <section className="w-full h-[50px] items-center flex justify-between bg-lms-grayBorder px-8 hover:bg-lms-grayBorder">
            <div className="h-15 text-[18px] text-lms-black90 bg-lms-grayBorder">Total</div>
            <div className="font-normal text-[18px] text-lms-black90 bg-lms-grayBorder ">${calculateTotal()}</div>
          </section>
        </div>
      </>
  );
}
