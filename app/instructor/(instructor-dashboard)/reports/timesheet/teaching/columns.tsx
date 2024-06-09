// columns.tsx

import { ColumnDef } from '@tanstack/react-table';

export type invoices = {
  date: string;
  session: string;
  schedule: string;
  teaching_type: string;

  status: string;
};

export const columns: ColumnDef<invoices>[] = [
  {
    accessorKey: 'date',
    header: 'DATE',
  },
  {
    accessorKey: 'session',
    header: 'SESSION',
  },
  {
    accessorKey: 'schedule',
    header: 'SCHEDULE',
  },
  {
    accessorKey: 'teaching_type',
    header: 'TEACHING TYPE',
  },
  {
    accessorKey: 'status',
    header: 'THEORY HOUR',
  },
 
];
