import CurrencyInput from "react-currency-input-field";
import {Info, MinusCircle, PlusCircle} from "lucide-react";
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

type Props = {
    value: string;
    onChange: (value: string | undefined) => void;
    placeholder? : string;
    disabled?: boolean;
};

export const AmountInput = ({
    value,
    onChange,
    placeholder,
    disabled,
}: Props) => {
    const parsedValue = parseFloat(value);
    const isIncome = parsedValue > 0;
    const isExpense = parsedValue < 0;
    const onReverseValue = () => {
        if(!value) return;
        const newValue = parseFloat(value) * -1;
        onChange(newValue.toString());
    };
    return(
        <div className="relative">
            <TooltipProvider>
                <Tooltip delayDuration={100}>
                 <TooltipTrigger asChild>
                <button type="button" onClick={onReverseValue}
                className={cn(
                    "bg-slate-400 hover:bg-slate-500 absolute top-1.5 left-1.5 rounded-md p-2 flex items-center justify-center transition",
                   isIncome && "bg-emerald-500 hover:bg-emerald-600",
                   isExpense && "bg-red-500 hover:bg-red-600",
               )}>
                    {!parsedValue && <Info className="size-3 text-white"/>}
                    {isIncome && <PlusCircle className="size-3 text-white"/>}
                    {isExpense && <MinusCircle className="size-3 text-white"/>}
                </button>
                 </TooltipTrigger>
                 <TooltipContent>
                    Use [+] for Income and [-] for Expenses
                 </TooltipContent>
                </Tooltip>
            </TooltipProvider>
            <CurrencyInput
            prefix="₹"
            className="pl-10 flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50"
              placeholder={placeholder}
              value={value}
              decimalsLimit={2}
              decimalScale={2}
              onValueChange={onChange}
              disabled={disabled}
              />
              <p className="text-xs text-muted-foreground mt-2">
                {isIncome && "This will count as Income"}
                {isExpense && "This will count as Expense"}

              </p>
        </div>

    );
}