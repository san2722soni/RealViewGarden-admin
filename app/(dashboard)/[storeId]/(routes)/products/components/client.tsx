"use client";

import axios from "axios";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus, BellRing } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { ProductColumn, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";
import toast from "react-hot-toast";

interface ProductClientProps {
  data: ProductColumn[];
}

export const ProductClient: React.FC<ProductClientProps> = ({ data }) => {
  const router = useRouter();
  const params = useParams();

  async function Notify() {
    try {
      await axios.post(`/api/send`, { storeId: params.storeId });
      toast.success("MAIL sent");
    } catch (error: any) {
      console.log(error);
      if (error.response.status == 401) {
        toast.error("No Subscribers...");
      } else {
        toast.error("Something went wrong");
      }
    }
  }

  return (
    <>
      <div className="flex items-center justify-between">
        <Heading
          title={`Products (${data.length})`}
          description="Manage Prodcuts for your store"
        />
        <Button onClick={() => router.push(`/${params.storeId}/products/new`)}>
          <Plus className="mr-2 h-4 w-4" />
          Add new
        </Button>

      </div>
      <div className="w-full flex items-end justify-end">
        <Button className="" type="button" onClick={() => Notify()}>
          Notifiy Subscribers {`->`}
          <BellRing className="ml-4 text-whtie font-4xl" />
        </Button>
      </div>
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
      <Heading title="API" description="API calls for Products" />
      <Separator />
      <ApiList entityName="products" entityIdName="productId" />
    </>
  );
};
