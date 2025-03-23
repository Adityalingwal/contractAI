
import { Calendar, CreditCard, Download, Filter, Search } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const paymentData = [
  {
    id: "P-12345",
    tenant: "John Smith",
    unit: "A-101",
    amount: "$1,250.00",
    date: "05/12/2023",
    status: "ontime",
    method: "Bank Transfer",
  },
  {
    id: "P-12346",
    tenant: "Lisa Johnson",
    unit: "B-205",
    amount: "$1,350.00",
    date: "05/16/2023",
    status: "late",
    method: "Credit Card",
  },
  {
    id: "P-12347",
    tenant: "Robert Chen",
    unit: "A-304",
    amount: "$1,150.00",
    date: "05/01/2023",
    status: "ontime",
    method: "Bank Transfer",
  },
  {
    id: "P-12348",
    tenant: "Maria Garcia",
    unit: "C-103",
    amount: "$950.00",
    date: "05/05/2023",
    status: "unmatched",
    method: "Check",
  },
  {
    id: "P-12349",
    tenant: "David Kim",
    unit: "B-412",
    amount: "$1,200.00",
    date: "05/14/2023",
    status: "ontime",
    method: "Bank Transfer",
  },
  {
    id: "P-12350",
    tenant: "Sarah Wilson",
    unit: "D-201",
    amount: "$1,100.00",
    date: "05/09/2023",
    status: "ontime",
    method: "Credit Card",
  },
  {
    id: "P-12351",
    tenant: "Michael Brown",
    unit: "A-102",
    amount: "$1,250.00",
    date: "05/02/2023",
    status: "ontime",
    method: "Bank Transfer",
  },
];

const PaymentLogs = () => {
  const sidebarWidth = useSidebar();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [date, setDate] = useState<Date>();
  
  const filteredPayments = paymentData.filter(payment => {
    const matchesSearch = payment.tenant.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.unit.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         payment.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });
  
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
                  <h1 className="text-3xl font-semibold">Payment Logs</h1>
                  <p className="text-muted-foreground mt-1">
                    Track and review tenant payment history.
                  </p>
                </div>
                
                <Button variant="outline" className="gap-2">
                  <Download className="h-4 w-4" />
                  Export
                </Button>
              </div>
              
              <div className="mt-8 flex flex-col md:flex-row gap-4 justify-between">
                <div className="relative w-full md:max-w-md">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input 
                    placeholder="Search payment ID, tenant or unit..." 
                    className="pl-10"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                
                <div className="flex flex-wrap gap-3">
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="All Statuses" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="ontime">On-time</SelectItem>
                      <SelectItem value="late">Late</SelectItem>
                      <SelectItem value="unmatched">Unmatched</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button variant="outline" className="w-[240px] justify-start text-left font-normal">
                        <Calendar className="mr-2 h-4 w-4" />
                        {date ? format(date, "PPP") : <span>Pick a date</span>}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <CalendarComponent
                        mode="single"
                        selected={date}
                        onSelect={setDate}
                        initialFocus
                        className="p-3 pointer-events-auto"
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
              
              <div className="mt-6 bg-white rounded-xl border border-border overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead className="bg-muted/50">
                      <tr>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Payment ID
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Tenant
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Unit
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Amount
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Date
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Status
                        </th>
                        <th className="px-6 py-3 text-left text-xs font-medium text-muted-foreground uppercase tracking-wider">
                          Method
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      {filteredPayments.map((payment) => (
                        <tr key={payment.id} className="hover:bg-muted/40 transition-colors">
                          <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-foreground">
                            {payment.id}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                            {payment.tenant}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                            {payment.unit}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                            {payment.amount}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                            {payment.date}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm">
                            <span className={`status-badge ${payment.status}`}>
                              {payment.status === "ontime" ? "On-time" : 
                               payment.status === "late" ? "Late" : "Unmatched"}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-foreground">
                            {payment.method}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                
                {filteredPayments.length === 0 && (
                  <div className="py-12 text-center">
                    <CreditCard className="mx-auto h-10 w-10 text-muted-foreground mb-3" />
                    <h3 className="text-lg font-medium">No payments found</h3>
                    <p className="text-muted-foreground">
                      Try adjusting your search or filter criteria.
                    </p>
                  </div>
                )}
              </div>
              
              <div className="mt-6 flex justify-between items-center">
                <p className="text-sm text-muted-foreground">
                  Showing {filteredPayments.length} of {paymentData.length} payments
                </p>
                
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" disabled>
                    Previous
                  </Button>
                  <Button variant="outline" size="sm">
                    Next
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default PaymentLogs;
