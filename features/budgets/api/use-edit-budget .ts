import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type SuccessResponseType = InferResponseType<typeof client.api.budgets[":id"]["$patch"]>;
type ErrorResponseType = { error: string };
type ResponseType = SuccessResponseType | ErrorResponseType;
type RequestType = InferRequestType<typeof client.api.budgets[":id"]["$patch"]>["json"];

export const useEditBudget = (id?: string) => {
    const queryClient = useQueryClient();

    const mutation = useMutation<ResponseType, Error, RequestType>({
        mutationFn: async (json) => {
            console.log('Editing budget with id:', id);
            console.log('Edit data:', json);
            
            if (!id) {
                throw new Error('Budget ID is missing');
            }

            const response = await client.api.budgets[":id"]["$patch"]({ param: { id }, json });
            
            if (!response.ok) {
                const errorData = await response.json() as ErrorResponseType;
                throw new Error(errorData.error || 'Failed to edit budget');
            }

            return await response.json() as SuccessResponseType;
        },
        onSuccess: (data) => {
            if ('error' in data) {
                // This should not happen as we're throwing errors in mutationFn
                console.error('Unexpected error in onSuccess:', data.error);
                toast.error(`Failed to edit budget: ${data.error}`);
                return;
            }
            console.log('Budget updated successfully:', data);
            toast.success('Budget updated');
            queryClient.invalidateQueries({ queryKey: ["budget", { id }] });
            queryClient.invalidateQueries({ queryKey: ["budgets"] });
        },
        onError: (error: Error) => {
            console.error('Failed to edit budget:', error);
            toast.error(`Failed to edit budget: ${error.message}`);
        },
    });

    return mutation;
};