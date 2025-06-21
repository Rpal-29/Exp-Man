import { format } from "date-fns";
import { formatCurrency } from "@/lib/utils";
import { Separator } from "@/components/ui/separator";

interface TooltipPayload {
  payload: {
    name: string;
  };
  value: number;
}

interface CategoryTooltipProps {
  active: boolean;
  payload: TooltipPayload[];
}

export const CategoryTooltip = ({ active, payload }: CategoryTooltipProps) => {
  if (!active || !payload || payload.length === 0) return null;

  const name = payload[0].payload.name;
  const value = payload[0].value;
  const totalValue = payload.reduce((acc, item) => acc + item.value, 0);
  const percentage = totalValue !== 0 ? (value / totalValue) * 100 : 0;

  return (
    <div className="rounded-sm bg-white shadow-sm border overflow-hidden">
      <div className="text-sm p-2 px-3 bg-muted-foreground">
        {name}
      </div>
      <Separator />
      <div className="flex items-center justify-between gap-x-4">
        <div className="flex items-center gap-x-2">
          <div className="size-1.5 bg-rose-500 rounded-full" />
          <p className="text-sm text-muted-foreground">Expenses</p>
        </div>
        <p className="text-sm text-right font-medium">
          {formatCurrency(value)} ({percentage.toFixed(2)}%)
        </p>
      </div>
    </div>
  );
};