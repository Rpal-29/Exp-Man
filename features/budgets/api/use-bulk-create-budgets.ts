import { toast } from "sonner";
import {InferRequestType, InferResponseType} from "hono";
import {useMutation, useQueryClient } from "@tanstack/react-query";
import {client} from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.budgets["bulk-create"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.budgets["bulk-create"]["$post"]> extends { json: infer U } ? U : never;

export const useBulkCreateBudgets = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            const response = await client.api.budgets["bulk-create"]["$post"]({ json });
            return await response.json();
          },
        onSuccess: () => {
            toast.success('budgets created');
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
        onError: () => {
            toast.error('Failed to create budgets');

        },
    });
    return mutation;

};