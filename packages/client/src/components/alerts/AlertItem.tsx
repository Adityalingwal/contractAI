
import { AlertTriangle, CheckCircle, ClockIcon, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

type AlertType = "error" | "warning" | "info" | "success";

interface AlertItemProps {
  type: AlertType;
  title: string;
  description: string;
  timestamp: string;
  onResolve?: () => void;
}

export function AlertItem({ 
  type, 
  title, 
  description, 
  timestamp, 
  onResolve 
}: AlertItemProps) {
  const getIcon = () => {
    switch (type) {
      case "error":
        return <XCircle className="h-5 w-5 text-red-500" />;
      case "warning":
        return <AlertTriangle className="h-5 w-5 text-amber-500" />;
      case "info":
        return <ClockIcon className="h-5 w-5 text-blue-500" />;
      case "success":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
    }
  };
  
  return (
    <div className={cn(
      "flex items-start gap-3 p-4 rounded-xl border border-border bg-white shadow-subtle mb-3 transition-all duration-250 hover:shadow-elevated",
      type === "error" && "border-red-200 bg-red-50",
      type === "warning" && "border-orange-200 bg-orange-50",
      type === "info" && "border-blue-100 bg-blue-50",
      type === "success" && "border-green-100 bg-green-50"
    )}>
      <div className="flex-shrink-0 mt-0.5">
        {getIcon()}
      </div>
      
      <div className="flex-1">
        <div className="flex justify-between">
          <h4 className="text-sm font-medium">{title}</h4>
          <span className="text-xs text-muted-foreground">{timestamp}</span>
        </div>
        <p className="text-sm text-muted-foreground mt-1">{description}</p>
        
        {onResolve && (
          <div className="mt-3 flex justify-end">
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onResolve}
              className="text-xs"
            >
              Resolve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
