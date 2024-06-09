// columns.tsx

import { ColumnDef } from '@tanstack/react-table';

export type invoices = {
  date: string;
  session: string;
  theory_rate: string;
  pw_rate: string;
  theory_hour: string;
  pw_hour: string;
  total: string;
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
    accessorKey: 'theory_rate',
    header: 'THEORY RATE',
  },
  {
    accessorKey: 'pw_rate',
    header: 'PW RATE',
  },
  {
    accessorKey: 'theory_hour',
    header: 'THEORY HOUR',
  },
  {
    accessorKey: 'pw_hour',
    header: 'PW HOUR',
  },
  {
    accessorKey: 'total',
    header: 'TOTAL',
  },
];
