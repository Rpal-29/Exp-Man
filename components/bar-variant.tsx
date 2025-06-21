import {
    Tooltip,
    XAxis,
    ResponsiveContainer,
    CartesianGrid,
    BarChart,
    Bar,
  } from "recharts";
import { CustomTooltip } from "@/components/custom-tooltip";
  
  type Props = {
    data?: {
      date: string;
      income: number;
      expenses: number;
    }[];
  };
  
  export const BarVariant = ({ data }: Props) => {
    if (!data) {
      return <div>No data available</div>;
    }
  
    return (
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            axisLine={false}
            tickLine={false}
            dataKey="date"
            tickFormatter={(value) => value}
            style={{ fontSize: "12px" }}
            tickMargin={16}
          />
          <Tooltip content={<CustomTooltip />} />
          <Bar
            dataKey="income"
            fill="#3b82f6"
            className="drop-shadow-sm"
            key="income"
          />
          <Bar
            dataKey="expenses"
            fill="#f43f5e"
            className="drop-shadow-sm"
            key="expenses"
          />
        </BarChart>
      </ResponsiveContainer>
    );
  };