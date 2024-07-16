"use client";

import {ColumnDef} from "@tanstack/react-table";
import {ArrowUpDown} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useState, useEffect, ChangeEvent} from "react";
import ActionsCell from "@/components/admincomponent/payments/PaymentActionCell";
import {PaymentType, StatusOption} from "@/lib/types/admin/payments";
import {PiBankFill} from "react-icons/pi";
import {HiBanknotes, HiMiniBanknotes} from "react-icons/hi2";
import {RadioGroup, RadioGroupItem} from "@/components/ui/radio-group";
import {Label} from "@/components/ui/label";
import StatusBadge from "@/components/common/StatusBadge";

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

    if (column.id === "student") {
        const studentData = row.original;
        return (
            <div className="flex items-center">
                <img
                    src={studentData.studentProfile}
                    alt={studentData.studentName}
                    className="w-8 h-8 rounded-full mr-2"
                />
                <span>{studentData.studentName}</span>
            </div>
        );
    }

    // if (column.id === "remark") {
    //     return <span className={`line-clamp-1`}>{value || "No Remark"}</span>;
    // }

    if (column.id === "discount") {
        return <span className={`text-lms-error`}>{value} %</span>;
    }

    if (column.id === "balanceDue" || column.id === "paidAmount" || column.id === "totalPayment" || column.id === "academicFee") {
        return <span>$ {value}</span>;

    }

    if (column.id === "paymentMethod") {
        return (
            <span>
                {value === "Credit Card" || "cash" ? (
                    <div className={`flex items-center gap-2`}>
                        <HiBanknotes className={`text-xl text-lms-primary`}/> Cash Payment
                    </div>
                ) : value === "Bank Transfer" || "bank" ? (
                    <div className={`flex items-center gap-2`}>
                        <PiBankFill className={`text-xl text-lms-primary`}/> Bank Transfer
                    </div>
                ) : (
                    ""
                )}
            </span>
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
                    <option key={option.label}>
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

    if (column.id === 'status') {
        const DisplayValue = value.toString();

        if (tableMeta?.editedRows[row.id]) {
            return (
                //custom year selector only
                <RadioGroup defaultValue="comfortable" className="flex">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="false" id="active"/>
                        <Label htmlFor="active">Active</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="true" id="disable"/>
                        <Label htmlFor="disable">Disable</Label>
                    </div>
                </RadioGroup>
            );
        } else {

            if (DisplayValue === 'false') {
                return <StatusBadge type="success" status="Active"/>
            } else {
                return <StatusBadge type="error" status="Disabled"/>
            }
        }
    }

    if (column.id === "paidComplete") {
        return (
            <span
                className={
                    value === 3
                        ? "Paid text-[#548164] bg-green-200 px-3 py-1 rounded-[10px]"
                        : value === 1
                            ? "Partially text-white bg-red-500 px-3 py-1 rounded-[10px]"
                            : value === 2
                                ? "Unpaid text-white bg-lms-accent px-3 py-1 rounded-[10px]"
                                : ""
                }
            >
    {value === 1
        ? "Unpaid"
        : value === 2
            ? "Partially"
            : value === 3
                ? "Paid"
                : ""}
</span>

        );
    }

    return <span>{value}</span>;
};

export const paymentColumns: ColumnDef<PaymentType>[] = [

    // {
    //     accessorKey: "receiptId",
    //     header: ({column}) => {
    //         return (
    //             <Button
    //                 variant="ghost"
    //                 onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
    //             >
    //                 RECEIPT ID
    //                 <ArrowUpDown className="ml-2 h-4 w-4"/>
    //             </Button>
    //         );
    //     },
    //     cell: TableCell,
    // },

    {
        accessorKey: "student",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    STUDENT
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        filterFn: (row, columnId, filterValue) => {
            const student = row.original.studentName.toLowerCase();
            return student.includes(filterValue.toLowerCase());
        },
        cell: TableCell,
    },

    {
        accessorKey: "gender",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    GENDER
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "balanceDue",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    BALANCE DUE
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "paidAmount",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PAID AMOUNT
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "paidDate",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PAID DATE
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "discount",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    DISCOUNT
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "totalPayment",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    TOTAL PAYMENT
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "academicFee",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    ACADEMIC FEE
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "paymentMethod",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    PAYMENT METHOD
                    <ArrowUpDown className="ml-2 h-4 w-4"/>
                </Button>
            );
        },
        cell: TableCell,
    },

    {
        accessorKey: "paidComplete",
        header: ({column}) => {
            return (
                <Button
                    variant="ghost"
                    onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                >
                    REMARK
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
    },

    // {
    //     accessorKey: "remark",
    //     header: ({column}) => {
    //         return (
    //             <span>REMARK</span>
    //         );
    //     },
    //     cell: TableCell,
    // },

    {
        accessorKey: "generation",
        header: ({column}) => {
            return (
                <span>Generation</span>
            );
        },
        cell: TableCell,
        enableHiding: true,
    },

    {
        accessorKey: "year",
        header: ({column}) => {
            return (
                <span>Year</span>
            );
        },
        cell: TableCell,
        enableHiding: true,
    },

    {
        accessorKey: "academicYear",
        header: ({column}) => {
            return (
                <span>ACADEMIC YEAR</span>
            );
        },
        cell: TableCell,
        enableHiding: true,
    },

    {
        accessorKey: "degree",
        header: ({column}) => {
            return (
                <span>DEGREE</span>
            );
        },
        cell: TableCell,
        enableHiding: true,
    },

    {
        accessorKey: "faculty",
        header: ({column}) => {
            return (
                <span>FACULTY</span>
            );
        },
        cell: TableCell,
        enableHiding: true,
    },

    {
        accessorKey: "studyProgram",
        header: ({column}) => {
            return (
                <span>STUDY PROGRAM</span>
            );
        },
        cell: TableCell,
        enableHiding: true,
    },

    {
        accessorKey: "classCode",
        header: ({column}) => {
            return (
                <span>CLASS CODE</span>
            );
        },
        cell: TableCell,
        enableHiding: true,
    },

    {
        accessorKey: "shift",
        header: ({column}) => {
            return (
                <span>SHIFT</span>
            );
        },
        cell: TableCell,
        enableHiding: true,
    },

    {
        id: "actions",
        cell: ActionsCell,
    },
];
