import { toast } from "sonner";
import {InferRequestType, InferResponseType} from "hono";
import {useMutation, useQueryClient } from "@tanstack/react-query";
import {client} from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.budgets[":id"]["$delete"]>;


export const useDeleteBudget = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponseType,
    Error
    >({
        mutationFn: async () => {
            const response = await client.api.accounts[":id"]["$delete"]({ param: {id},});
            return await response.json();
        },
        onSuccess: () => {
            toast.success('Budget deleted');
            queryClient.invalidateQueries({ queryKey: ["budget",{id}] });
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
        onError: () => {
            toast.error('Failed to delete budget');

        },
    });
    return mutation;

};