import { create } from "zustand";

type OpenBudgetState = {
    id?: string;
    isOpen: boolean;
    onOpen: (id: string) => void;
    onClose: () => void;
};

export const useOpenBudget = create<OpenBudgetState>((set) => ({
    id: undefined,
    isOpen: false,
    onOpen: (id: string) => set({ isOpen: true,id}),
    onClose: () => set({ isOpen: false, id: undefined }),
}));
 