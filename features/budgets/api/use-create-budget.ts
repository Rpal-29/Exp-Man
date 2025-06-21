// features/budgets/api/use-create-budget.ts

import { toast } from "sonner";
import { InferRequestType, InferResponseType } from "hono";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { client } from "@/lib/hono";

type ResponseType = InferResponseType<typeof client.api.budgets.$post>;
type RequestType = InferRequestType<typeof client.api.budgets.$post>["json"];

export const useCreateBudget = () => {
  const queryClient = useQueryClient();

  const mutation = useMutation<ResponseType, Error, RequestType>({
    mutationFn: async (budget) => {
      const response = await client.api.budgets.$post({ json: budget });
      if (!response.ok) {
        throw new Error('Failed to create budget');
      }
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Budget created");
      queryClient.invalidateQueries({ queryKey: ["budgets"] });
    },
    onError: (error) => {
      toast.error(`Error creating budget: ${error.message}`);
    }
  });

  return mutation;
};