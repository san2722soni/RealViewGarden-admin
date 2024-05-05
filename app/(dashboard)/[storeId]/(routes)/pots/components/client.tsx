"use client";

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter, useParams } from "next/navigation";
import { PotColumn, columns } from "./column";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface SizesClientProps {
    data: PotColumn[]
}

export const PotsClient: React.FC<SizesClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();

    return(
        <>
        <div className="flex items-center justify-between">
            <Heading title={`Materials (${data.length})`} description="Manage materials for your store" />
            <Button onClick={() => router.push(`/${params.storeId}/pots/new`)}>
                <Plus className="mr-2 h-4 w-4" />
                Add new
            </Button>
        </div>
        <Separator />
        <DataTable searchKey="name" columns={columns} data={data}/> 
        <Heading title="API" description="API calls for pots" />
        <Separator />
        <ApiList entityName="pots" entityIdName="potId"/>
        </>
    )
}