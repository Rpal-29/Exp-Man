import { toast } from "sonner";
import {InferRequestType, InferResponseType} from "hono";
import {useMutation, useQueryClient } from "@tanstack/react-query";
import {client} from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.transactions["bulk-delete"]["$post"]>;
type RequestType = InferRequestType<typeof client.api.transactions["bulk-delete"]["$post"]>
["json"];

export const useBulkDeleteTransactions = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async ({ json: { ids } }) => {
            console.log('ids:', ids);
            const response = await client.api.transactions["bulk-delete"].$post({ json: { ids } });
            return await response.json();
          },
        onSuccess: () => {
            toast.success('transactions deleted');
            queryClient.invalidateQueries({ queryKey: ["transactions"] });
        },
        onError: () => {
            toast.error('Failed to delete transactions');

        },
    });
    return mutation;

};