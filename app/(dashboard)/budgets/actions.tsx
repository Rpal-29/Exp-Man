"use client";
import { useOpenBudget } from "@/features/budgets/hooks/use-open-budget";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Edit, MoreHorizontal, Trash } from "lucide-react";
import { useDeleteBudget } from "@/features/budgets/api/use-delete-budget";
import { useConfirm } from "@/hooks/use-confirm";
type Props = {
    id:string;
};
export const Actions = ({ id }: Props) => {
    const [ConfirmDialog, confirm] = useConfirm(
        "Are you sure?",
        "You are about to delete this budget."

    )
    const deleteMutation = useDeleteBudget(id);
    const {
        onOpen
    } = useOpenBudget();
    const handleDelete =async() => {
        const ok = await confirm();

        if(ok) {
            deleteMutation.mutate();
        }
};
    return (
        <>
        <ConfirmDialog/>
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
               <Button variant="ghost" className="size-8 p-0">
                <MoreHorizontal className="size-4"/>
                </Button> 
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
            <DropdownMenuItem
              disabled={deleteMutation.isPending}
              onClick={() => onOpen(id)}>
                <Edit className="size-4 mr-2"/>
                Edit
            </DropdownMenuItem>
            <DropdownMenuItem
              disabled={deleteMutation.isPending}
              onClick={handleDelete}>
                <Trash className="size-4 mr-2"/>
                Delete
            </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
        </>
    );
};