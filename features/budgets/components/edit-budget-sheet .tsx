import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import { insertBudgetSchema } from "@/db/schema";
import { useOpenBudget } from "../hooks/use-open-budget";
import { useGetBudget } from "../api/use-get-budget";
import { Loader2 } from "lucide-react";
import { useEditBudget } from "../api/use-edit-budget ";
import { useDeleteBudget } from "../api/use-delete-budget";
import { useConfirm } from "@/hooks/use-confirm";
import { BudgetForm } from "./budget-form";


const formSchema = insertBudgetSchema.omit({
    id: true,
});

type FormValues= z.input<typeof formSchema>;

export const EditBudgetSheet = () => {
    const { isOpen, onClose,id} = useOpenBudget();
    const [ConfirmDialog , confirm] = useConfirm(
        "Are You sure?",
        "You are about to delete this budget."

    );
    const budgetQuery = useGetBudget(id);
    const editMutation = useEditBudget(id);
    const deleteMutation = useDeleteBudget(id);

    const categoryQuery = useGetCategories();
    const categoryMutation = useCreateCategory(); 
    const onCreateCategory = (name: string) => categoryMutation.mutate({
       name,
    });
    const categoryOptions = (categoryQuery.data ?? []).map((category) => ({
       label: category.name,
       value:  category.id,

    }))

    const accountQuery= useGetAccounts();
    const accountMutation = useCreateAccount(); 
    const onCreateAccount = (name: string) => accountMutation.mutate({
       name,
    });
    const accountOptions = (accountQuery.data ?? []).map((account) => ({
       label: account.name,
       value: account.id,

    }));


    const isPending = 
    editMutation.isPending ||
    deleteMutation.isPending ||
    budgetQuery.isLoading ||
    categoryMutation.isPending ||
    accountMutation.isPending;

    const isLoading = 
    budgetQuery.isLoading ||
    categoryQuery.isLoading ||
    accountQuery.isLoading;

    const onSubmit = ( values: FormValues) => {
    editMutation.mutate(values,{
        onSuccess:() => {
            onClose();
        },
    });
};

const onDelete = async () => {
    const ok = await confirm();

    if(ok) {
        deleteMutation.mutate(undefined,{
            onSuccess: () => {
                onClose();
            }
        });
    }
}


const defaultValues = budgetQuery.data ? {
   acountId: budgetQuery.data.accountId,
   categoryId: budgetQuery.data.categoryId,
   amount: budgetQuery.data.amount.toString(),
   date: budgetQuery.data.date 
   ? new Date(budgetQuery.data.date)
   : new Date(),
   Goal: budgetQuery.data.Goal,
} : {

    accountId: " ",
    categoryId: " ",
    amount: " ",
    date: new Date(),
    goal:" ",
   };
    return (
        <>
        <ConfirmDialog/>
        <Sheet open={isOpen}  onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        Edit Transaction
                    </SheetTitle>
                    <SheetDescription>
                        Edit an existing transaction.
                    </SheetDescription>
                </SheetHeader>
                {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin"></Loader2>
                    </div>
                ) : (
            
               <BudgetForm
               id={id}
               defaultValues={defaultValues}
               onSubmit={onSubmit}
               disabled={isPending}
               onDelete={onDelete}
               categoryOptions={categoryOptions}
               onCreateCategory={onCreateCategory}
               accountOptions={accountOptions}
               onCreateAccount={onCreateAccount}/>
                )
            }
            </SheetContent>
        </Sheet>
        </>
    );
}