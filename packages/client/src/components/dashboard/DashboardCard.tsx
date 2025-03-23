
import { ReactNode } from 'react';
import { cn } from '@/lib/utils';

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  valueClassName?: string;
}

export function DashboardCard({ 
  title, 
  value, 
  icon, 
  description, 
  trend, 
  className,
  valueClassName
}: DashboardCardProps) {
  return (
    <div className={cn("dashboard-card", className)}>
      <div className="flex justify-between items-start">
        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
        <div className="text-primary">
          {icon}
        </div>
      </div>
      
      <div className={cn("card-value", valueClassName)}>{value}</div>
      
      {(description || trend) && (
        <div className="flex items-center">
          {description && (
            <p className="card-label">{description}</p>
          )}
          
          {trend && (
            <div className={cn(
              "flex items-center text-xs font-medium ml-auto",
              trend.isPositive ? "text-green-600" : "text-red-600"
            )}>
              <span className="mr-1">
                {trend.isPositive ? "↑" : "↓"}
              </span>
              <span>{trend.value}%</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
