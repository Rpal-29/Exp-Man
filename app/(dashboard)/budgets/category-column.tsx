import { useOpenCategory } from "@/features/categories/hooks/use-open-category";
import { TriangleAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { useOpenBudget } from "@/features/budgets/hooks/use-open-budget";

type Props = {
    id: string;
    category:string | null;
    categoryId: string | null;
};


export const CategoryColumn =  ({
    id,
    category,
    categoryId,
}: Props) => {
    const {onOpen: onOpenCategory} =  useOpenCategory();
    const {onOpen: onOpenBudget} =  useOpenBudget();


    const onClick = () => {
        if (categoryId) {
        onOpenCategory(categoryId);
        }else {
            onOpenBudget(id);
        }
    };

    return (
        <div 
        onClick={onClick}
        className={cn("flex items-center cursor pointer hover:underline",
            !category && "text-rose-500",
        )}>
            {!category && <TriangleAlert className="mr-2 size-4 shrink-0"/>}
            {category || "Uncategorized"}
        </div>
    )

}