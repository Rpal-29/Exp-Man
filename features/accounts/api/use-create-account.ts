import { toast } from "sonner";
import { InferRequestType , InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {client} from "@/lib/hono";


type ResponseType = InferResponseType<typeof client.api.accounts.$post>;
type RequestType = InferRequestType<typeof client.api.accounts.$post>["json"];

export const useCreateAccount = () => {
    const queryClient = useQueryClient();


    const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
    >({
        mutationFn: async (json) => {
            try {
              const response = await client.api.accounts.$post({ json });
              return await response.json();
            } catch (error) {
              throw error;
            }
          },
        onSuccess: () => {
            toast.success("Account created");
            queryClient.invalidateQueries({queryKey:["accounts"]});
        },
        onError: () => {
            toast.error("Error creating account");
        },
    });
    return mutation;
}