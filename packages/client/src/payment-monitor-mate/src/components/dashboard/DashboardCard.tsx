
import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

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
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
          <div className="text-indigo-600 bg-indigo-50 p-2 rounded-lg">
            {icon}
          </div>
        </div>
        
        <div className={cn(
          "mt-3 text-3xl font-bold tracking-tight", 
          valueClassName
        )}>
          {value}
        </div>
        
        {(description || trend) && (
          <div className="mt-2 flex items-center">
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            
            {trend && (
              <div className={cn(
                "flex items-center text-xs font-medium ml-auto px-1.5 py-0.5 rounded",
                trend.isPositive 
                  ? "text-emerald-700 bg-emerald-50" 
                  : "text-rose-700 bg-rose-50"
              )}>
                <motion.span 
                  className="mr-1"
                  initial={{ y: 10, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                >
                  {trend.isPositive ? "↑" : "↓"}
                </motion.span>
                <span>{trend.value}%</span>
              </div>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
