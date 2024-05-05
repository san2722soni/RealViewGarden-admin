"use client"
import axios from "axios";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { ReviewColumn } from "./column";
import { useParams, useRouter } from "next/navigation";

import { DropdownMenu, DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DropdownMenuContent, DropdownMenuLabel, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Button } from "@/components/ui/button";
import { Copy, Edit, MoreHorizontal, Trash } from "lucide-react";
import { AlertModal } from "@/components/modals/alert-modal";

interface CellActionProps {
    data: ReviewColumn;
};

export const CellAction: React.FC<CellActionProps> = ({ data }) => {

    const router = useRouter();
    const params = useParams();

    const [loading, setLoading] = useState(false);
    const [open, setOpen] = useState(false);

    const onCopy = (description: string) => {
        navigator.clipboard.writeText(description);
        toast.success("Review message copied to the clipboard.");
      };

      const onDelete = async () => {
        try {
          setLoading(true);
          await axios.delete(`/api/${params.storeId}/reviews/${data.id}`);
          router.refresh();
          toast.success("Review deleted.");
        } catch (error) {
          toast.error("Make sure review exists.");
        } finally {
          setLoading(false);
          setOpen(false);
        }
      };
    
    return (
        <>
        <AlertModal isOpen={open} onClose={() => setOpen(false)} onConfirm={onDelete} loading={loading}/>
       <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>
                Actions
            </DropdownMenuLabel>
            <DropdownMenuItem onClick={() => onCopy(data.description)}>
                <Copy className="mr-2 h-4 w-4"/>
                Copy msg
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => setOpen(true)}>
                <Trash className="mr-2 h-4 w-4"/>
                Delete
            </DropdownMenuItem>
        </DropdownMenuContent>
       </DropdownMenu>
       </>
    )
};