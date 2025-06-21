import { useQuery } from "@tanstack/react-query";
import { client } from "@/lib/hono";
import { convertAmountFromMilliunits } from "@/lib/utils";


export const useGetBudget = (id?:string) => {
    const query = useQuery({
        enabled: !!id,
        queryKey: ["budget",{id}],
        queryFn: async () => {
           
           const response = await client.api.budgets[":id"].$get({
            param:  {id}
           });

           if (!response.ok) {
            throw new Error("Failed to fetch budget");
           }

           const  { data }= await response.json();
           return {
            ...data,
            amount: convertAmountFromMilliunits(data.amount),
           };
        },

    });

    return query;
};