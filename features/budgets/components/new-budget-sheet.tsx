import { useNewAccount } from "@/features/accounts/hooks/use-new-account";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet";
import { z } from "zod";
import { insertBudgetSchema } from "@/db/schema";
import { useCreateBudget } from "../api/use-create-budget";
import { useGetCategory } from "@/features/categories/api/use-get-category";
import { useGetCategories } from "@/features/categories/api/use-get-categories";
import { useGetAccounts } from "@/features/accounts/api/use-get-accounts";
import { useCreateCategory } from "@/features/categories/api/use-create-category";
import { BudgetForm } from "./budget-form";
import { useCreateAccount } from "@/features/accounts/api/use-create-account";
import { Loader2 } from "lucide-react";
import { create } from "zustand";
import { useNewBudget } from "../hooks/use-new-budget";


const formSchema = insertBudgetSchema.omit({
    id: true,
});


type FormValues= z.input<typeof formSchema>;

export const NewBudgetSheet = () => {
    const { isOpen, onClose} = useNewBudget();
     const createMutation = useCreateBudget();

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
     createMutation.isPending ||
     categoryMutation.isPending ||
     accountMutation.isPending;

     const isLoading = 
     categoryQuery.isLoading ||
     accountQuery.isLoading;
    const onSubmit = (values: FormValues) => {
  createMutation.mutate(values, {
    onSuccess: () => {
        onClose();
    },
  });
    };
    return (
        <Sheet open={isOpen}  onOpenChange={onClose}>
            <SheetContent className="space-y-4">
                <SheetHeader>
                    <SheetTitle>
                        New budget
                    </SheetTitle>
                    <SheetDescription>
                        Add a new budget
                    </SheetDescription>
                </SheetHeader>
                {isLoading
                  ? (
                      <div className="absolute inset-0 flex items-center justify-center">
                        <Loader2 className="size-4 text-muted-foreground animate-spin"/>
                      </div>
                  )
                  : (
                    <BudgetForm
                    onSubmit={onSubmit}
                    disabled={isPending}
                    categoryOptions={categoryOptions}
                    onCreateCategory={onCreateCategory}
                    accountOptions={accountOptions}
                    onCreateAccount={onCreateAccount}/>
                  
              
            )
        };
            </SheetContent>
        </Sheet>
    )

}