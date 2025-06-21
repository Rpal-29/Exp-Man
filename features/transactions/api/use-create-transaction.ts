import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.transactions.$post>;
type RequestType = InferRequestType<typeof client.api.transactions.$post>;

type Transaction = {
  date: Date;
  amount: number;
  payee: string;
  accountId: string;
  notes?: string | null | undefined;
  categoryId?: string | null | undefined;
}

export const useCreateTransaction = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, Transaction>({
    mutationFn: async (transaction: Transaction) => {
      try {
        const response = await client.api.transactions.$post({ json: transaction });
        return await response.json();
      } catch (error) {
        throw error;
      }
    },
    onSuccess: () => {
      toast.success("Transaction created");
      queryClient.invalidateQueries({ queryKey: ["transactions"] });
    },
    onError: () => {
      toast.error("Error creating transaction");
    }
  });
  return mutation;
}