
import { useEffect, useState } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  PieChart,
  Pie,
  Cell
} from "recharts";

const taskCompletionData = [
  { name: "Jan", value: 24 },
  { name: "Feb", value: 18 },
  { name: "Mar", value: 22 },
  { name: "Apr", value: 31 },
  { name: "May", value: 38 },
  { name: "Jun", value: 35 },
  { name: "Jul", value: 42 },
];

const invoiceStatusData = [
  { name: "On-time", value: 65, color: "#34D399" },
  { name: "Late", value: 25, color: "#F97316" },
  { name: "Unmatched", value: 10, color: "#EF4444" },
];

const contractorPerformanceData = [
  { name: "90-100", count: 12, label: "Excellent" },
  { name: "80-89", count: 18, label: "Good" },
  { name: "70-79", count: 8, label: "Average" },
  { name: "60-69", count: 5, label: "Below Average" },
  { name: "< 60", count: 3, label: "Poor" },
];

interface ChartProps {
  type: "line" | "pie" | "bar";
  title: string;
  subtitle?: string;
}

export function Chart({ type, title, subtitle }: ChartProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <div className="chart-container animate-pulse flex items-center justify-center h-72">
        <p className="text-muted-foreground">Loading chart...</p>
      </div>
    );
  }

  const renderChart = () => {
    switch (type) {
      case "line":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={taskCompletionData}
              margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)'
                }}
                formatter={(value) => [`${value} tasks`, 'Completed']}
              />
              <Line 
                type="monotone" 
                dataKey="value" 
                stroke="#6366F1" 
                strokeWidth={2.5}
                dot={{ r: 4, strokeWidth: 2 }}
                activeDot={{ r: 6, strokeWidth: 0, fill: "#6366F1" }}
              />
            </LineChart>
          </ResponsiveContainer>
        );
        
      case "pie":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={invoiceStatusData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={90}
                paddingAngle={2}
                dataKey="value"
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                labelLine={false}
              >
                {invoiceStatusData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)'
                }}
                formatter={(value) => [`${value}%`, 'Percentage']}
              />
              <Legend 
                verticalAlign="bottom" 
                align="center"
                layout="horizontal"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ paddingTop: 20 }}
              />
            </PieChart>
          </ResponsiveContainer>
        );
        
      case "bar":
        return (
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={contractorPerformanceData}
              margin={{ top: 20, right: 20, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" vertical={false} />
              <XAxis 
                dataKey="name" 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={{ stroke: '#f0f0f0' }}
              />
              <YAxis 
                tick={{ fontSize: 12 }} 
                tickLine={false}
                axisLine={false}
                width={30}
              />
              <Tooltip
                contentStyle={{ 
                  backgroundColor: 'white', 
                  border: '1px solid #f0f0f0',
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05), 0 2px 4px -1px rgba(0,0,0,0.03)'
                }}
                formatter={(value, name, props) => {
                  return [`${value} contractors`, props.payload.label];
                }}
              />
              <Bar 
                dataKey="count" 
                fill="rgba(99, 102, 241, 0.8)" 
                radius={[4, 4, 0, 0]} 
              />
            </BarChart>
          </ResponsiveContainer>
        );
    }
  };

  return (
    <div className="chart-container">
      <div className="mb-4">
        <h3 className="text-sm font-medium">{title}</h3>
        {subtitle && (
          <p className="text-xs text-muted-foreground mt-1">{subtitle}</p>
        )}
      </div>
      {renderChart()}
    </div>
  );
}
