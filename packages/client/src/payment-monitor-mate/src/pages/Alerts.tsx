
import { AlertTriangle, CheckCircle, Filter, Search } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { AlertItem } from "@/components/alerts/AlertItem";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const alertsData = [
  {
    id: "1",
    type: "error",
    title: "Payment mismatch detected",
    description: "Payment for tenant Robert Chen (A-304) does not match expected amount. Expected: $1,150.00, Received: $1,050.00.",
    timestamp: "Today, 11:34 AM",
  },
  {
    id: "2",
    type: "warning",
    title: "Late payment received",
    description: "Lisa Johnson (B-205) has submitted payment 6 days after due date.",
    timestamp: "Yesterday, 3:12 PM",
  },
  {
    id: "3",
    type: "info",
    title: "Upcoming payment due",
    description: "5 tenant payments are due within the next 2 days.",
    timestamp: "Yesterday, 9:22 AM",
  },
  {
    id: "4",
    type: "error",
    title: "Payment mismatch detected",
    description: "Payment for tenant Maria Garcia (C-103) does not match expected amount. Expected: $950.00, Received: $900.00.",
    timestamp: "May 18, 2023, 2:45 PM",
  },
  {
    id: "5",
    type: "warning",
    title: "Low financial health score",
    description: "Michael Brown (A-102) has a financial health score of 58, which is below the threshold of 60.",
    timestamp: "May 17, 2023, 10:11 AM",
  },
  {
    id: "6",
    type: "success",
    title: "Reconciliation completed",
    description: "All payments for the month of April have been successfully reconciled.",
    timestamp: "May 16, 2023, 4:30 PM",
  },
  {
    id: "7",
    type: "info",
    title: "System update",
    description: "The payment monitoring system will be updated on May 25, 2023, from 2:00 AM to 4:00 AM.",
    timestamp: "May 15, 2023, 9:00 AM",
  },
];

const Alerts = () => {
  const sidebarWidth = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [alerts, setAlerts] = useState(alertsData);
  
  const filteredAlerts = alerts.filter(alert => {
    const matchesSearch = alert.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         alert.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = typeFilter === "all" || alert.type === typeFilter;
    
    return matchesSearch && matchesType;
  });
  
  const handleResolve = (id: string) => {
    setAlerts(alerts.filter(alert => alert.id !== id));
  };
  
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      
      <div 
        className="flex-1 transition-all duration-300"
        style={{ marginLeft: `${sidebarWidth}px` }}
      >
        <Header sidebarWidth={sidebarWidth} />
        
        <main className="pt-24 pb-16 px-8">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col">
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-semibold">Alerts</h1>
                  <p className="text-muted-foreground mt-1">
                    Review and manage system alerts and notifications.
                  </p>
                </div>
                
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => setAlerts([])}
                >
                  <CheckCircle className="h-4 w-4" />
                  Mark All as Resolved
                </Button>
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search alerts..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex gap-3">
                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Alert Types" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Alert Types</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="success">Success</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="mt-6">
                {filteredAlerts.length > 0 ? (
                  <div className="space-y-4">
                    {filteredAlerts.map((alert) => (
                      <AlertItem 
                        key={alert.id}
                        type={alert.type as any}
                        title={alert.title}
                        description={alert.description}
                        timestamp={alert.timestamp}
                        onResolve={() => handleResolve(alert.id)}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="py-16 text-center bg-white rounded-xl border border-border">
                    <AlertTriangle className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No alerts found</h3>
                    <p className="text-muted-foreground">
                      {alerts.length === 0 
                        ? "All alerts have been resolved" 
                        : "Try adjusting your search or filter criteria"}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Alerts;
