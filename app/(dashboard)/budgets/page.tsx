// app/(dashboard)/budgets/page.tsx
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useNewBudget } from "@/features/budgets/hooks/use-new-budget";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteBudgets } from "@/features/budgets/api/use-bulk-delete-budgets";
import { useGetBudgets } from "@/features/budgets/api/use-get-budgets";
import { useState } from "react";
import { NewBudgetSheet } from "@/features/budgets/components/new-budget-sheet";

enum VARIANTS {
    LIST = "LIST",
    IMPORT = "IMPORT"
}

const BudgetsPage = () => {
    const [variant] = useState<VARIANTS>(VARIANTS.LIST);
    const { onOpen } = useNewBudget();
    const deleteBudgets = useBulkDeleteBudgets();
    const budgetsQuery = useGetBudgets();
    const budgets = budgetsQuery.data || [];

    const isDisabled = budgetsQuery.isLoading || deleteBudgets.isPending;

    if (budgetsQuery.isLoading) {
        return (
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader>
                        <Skeleton className="h-8 w-48"/>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[500px] w-full flex items-center justify-center">
                            <Loader2 className="size-6 text-slate-300 animate-spin"/>
                        </div>
                    </CardContent>
                </Card> 
            </div>
        );
    }

    if (variant === VARIANTS.IMPORT) {
        return (
            <div>
                This is a screen for import
            </div>
        );
    }

    return (
        <>
            <NewBudgetSheet />
            <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
                <Card className="border-none drop-shadow-sm">
                    <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                        <CardTitle className="text-xl line-clamp-1">
                            Budget History
                        </CardTitle>
                        <div className="flex items-center gap-x-2">
                            <Button onClick={onOpen} size="sm">
                                <Plus className="size-4 mr-2"/>
                                Add new
                            </Button>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <DataTable
                            filterKey="goal"
                            columns ={columns}
                            data={budgets} 
                            onDelete={(row) => {
                                const ids = row.map((r) => r.original.id);
                                deleteBudgets.mutate({ json: { ids } });
                            }}
                            disabled={isDisabled}
                        />
                    </CardContent>
                </Card>
            </div>
        </>
    );
};

export default BudgetsPage;