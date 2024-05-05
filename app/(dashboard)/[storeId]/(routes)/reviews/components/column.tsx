"use client"

import { ColumnDef } from "@tanstack/react-table"
import { CellAction } from "./cell-actions";

export type ReviewColumn = {
  id: string;
  name: string;
  imageUrl: string, 
  email: string;
  occupation: string;
  description: string;
  createdAt: string;
}

export const columns: ColumnDef<ReviewColumn>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "occupation",
    header: "Occupation",
  },
  {
    accessorKey: "description",
    header: "Description",
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
