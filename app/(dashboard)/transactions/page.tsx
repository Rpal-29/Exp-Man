"use client";
import { Button } from "@/components/ui/button";
import { Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { useNewTransaction } from "@/features/transactions/hooks/use-new-transaction";
import { Loader2, Plus } from "lucide-react";
import { columns } from "./columns";
import { DataTable } from "@/components/data-table";
import { Skeleton } from "@/components/ui/skeleton";
import { useBulkDeleteTransactions } from "@/features/transactions/api/use-bulk-delete-transactions";
import { useGetTransactions } from "@/features/transactions/api/use-get-transactions";
import { useState } from "react";
import { UploadButton } from "./uplaod-button";

enum VARIANTS {
    LIST= "LIST",
    IMPORT = "IMPORT"
};

const INITIAL_IMPORT_RESULTS = {
    data: [],
    errors:[],
    meta: {},
};


const TransactionsPage = () => {
    const [Variant,setVariant] = useState<VARIANTS>(VARIANTS.LIST);
//const onUpload = (results: typeof INITIAL_IMPORT_RESULTS)
const NewTransaction = useNewTransaction();
const deleteTransactions = useBulkDeleteTransactions();
const transactionsQuery = useGetTransactions();
const transactions = transactionsQuery.data || [];

const isDiasabled = 
transactionsQuery.isLoading ||
deleteTransactions.isPending;

if (transactionsQuery.isLoading) {
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
if (Variant === VARIANTS.IMPORT) {
    return (
        <>
         <div>
            This is a screen for import
         </div>
        </>
    );
};

    return (
        <div className="max-w-screen-2xl mx-auto w-full pb-10 -mt-24">
            <Card className="border-none drop-shadow-sm">
                <CardHeader className="gap-y-2 lg:flex-row lg:items-center lg:justify-between">
                    <CardTitle className="text-xl line-clamp-1">
            Transaction History</CardTitle>
            <div className="flex items-center gap-x-2">
            <Button onClick= {NewTransaction.onOpen} size="sm">
                <Plus className="size-4 mr-2"/>
                Add new </Button>
                <UploadButton
                  onUpload={() => {}}/></div>
                </CardHeader>
                <CardContent>
                <DataTable
                filterKey="payee"
                columns={columns}
                data={transactions} 
                onDelete={(row) => {
                    const ids = row.map((r) => r.original.id);
                    deleteTransactions.mutate({ json: { ids } });
                  }}
                  
                disabled={isDiasabled}/>
                </CardContent></Card>
        </div>
    );
};

export default TransactionsPage;