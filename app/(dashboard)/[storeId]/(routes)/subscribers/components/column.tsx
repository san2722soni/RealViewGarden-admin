"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions";

export type SubscriberColumn = {
  id: string, 
  email: string, 
  createdAt: string
}

export const columns: ColumnDef<SubscriberColumn>[] = [
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "createdAt",
    header: "Date"
  },
  {
    id: "actions",
    cell: ({ row }) => <CellAction data={row.original} />
  },
]
