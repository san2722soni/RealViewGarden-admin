"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { ReviewColumn, columns } from "./column";

interface ReviewClientProps {
  data: ReviewColumn[];
}

export const ReviewClient: React.FC<ReviewClientProps> = ({ data }) => {

  return (
    <>
        <Heading
          title={`Reviews (${data.length})`}
          description="Manage reviews for your store"
        />
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  );
};
