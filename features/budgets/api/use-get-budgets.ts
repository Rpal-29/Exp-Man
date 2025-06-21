import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { client } from "@/lib/hono";
import { convertAmountFromMilliunits } from "@/lib/utils";

export const useGetBudgets  = () => {
    const params = useSearchParams();
    const from = params.get("from") || "";
    const to = params.get("to") || "";
    const accountId = params.get("accountId") || "";
    const query = useQuery({
        queryKey: ["budgets",{from,to,accountId}],
        queryFn: async () => {
           
           const response = await client.api.budgets.$get({
              query:{
                from,
                to,
                accountId,
              },
           });

           if (!response.ok) {
            throw new Error("Failed to fetch budgets");
           }

           const  { data }= await response.json();
           return data.map((budget) => ({
            ...budget,
            amount: convertAmountFromMilliunits(budget.amount),
           }));
        },

    });

    return query;
};