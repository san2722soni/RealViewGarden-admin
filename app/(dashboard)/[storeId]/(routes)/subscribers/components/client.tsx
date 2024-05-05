"use client";

import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/ui/data-table";

import { SubscriberColumn, columns } from "./column";

interface SubscriberClientProps {
  data: SubscriberColumn[];
}

export const ReviewClient: React.FC<SubscriberClientProps> = ({ data }) => {

  return (
    <>
        <Heading
          title={`Subscribers (${data.length})`}
          description="Manage subscribers for your store"
        />
      <Separator />
      <DataTable searchKey="email" columns={columns} data={data} />
    </>
  );
};
