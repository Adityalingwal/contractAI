
import { useState } from "react";
import { 
  ChevronDown, 
  ChevronsUpDown, 
  ChevronUp, 
  Search, 
  Filter, 
  MoreHorizontal 
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";

interface Tenant {
  id: string;
  name: string;
  unit: string;
  accountId: string;
  dueDate: string;
  lastPayment: string;
  status: "ontime" | "late" | "unmatched";
  score: number;
}

const mockTenants: Tenant[] = [
  {
    id: "1",
    name: "John Smith",
    unit: "A-101",
    accountId: "VA-2345",
    dueDate: "05/15/2023",
    lastPayment: "05/12/2023",
    status: "ontime",
    score: 92,
  },
  {
    id: "2",
    name: "Lisa Johnson",
    unit: "B-205",
    accountId: "VA-3671",
    dueDate: "05/10/2023",
    lastPayment: "05/16/2023",
    status: "late",
    score: 78,
  },
  {
    id: "3",
    name: "Robert Chen",
    unit: "A-304",
    accountId: "VA-1290",
    dueDate: "05/01/2023",
    lastPayment: "05/01/2023",
    status: "ontime",
    score: 95,
  },
  {
    id: "4",
    name: "Maria Garcia",
    unit: "C-103",
    accountId: "VA-5432",
    dueDate: "05/05/2023",
    lastPayment: "05/05/2023",
    status: "unmatched",
    score: 65,
  },
  {
    id: "5",
    name: "David Kim",
    unit: "B-412",
    accountId: "VA-7821",
    dueDate: "05/15/2023",
    lastPayment: "05/14/2023",
    status: "ontime",
    score: 88,
  },
];

interface TenantTableProps {
  onRowClick?: (tenant: Tenant) => void;
}

export function TenantTable({ onRowClick }: TenantTableProps) {
  const [tenants, setTenants] = useState<Tenant[]>(mockTenants);
  const [sortField, setSortField] = useState<keyof Tenant | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSort = (field: keyof Tenant) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };
  
  const getSortedTenants = () => {
    if (!sortField) return tenants;
    
    return [...tenants].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === "asc" ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === "asc" ? 1 : -1;
      }
      return 0;
    });
  };
  
  const getFilteredTenants = () => {
    const sorted = getSortedTenants();
    
    if (!searchTerm) return sorted;
    
    return sorted.filter(tenant => 
      tenant.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      tenant.unit.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };
  
  const renderSortIcon = (field: keyof Tenant) => {
    if (sortField !== field) {
      return <ChevronsUpDown className="ml-2 h-4 w-4" />;
    }
    
    return sortDirection === "asc" ? 
      <ChevronUp className="ml-2 h-4 w-4" /> : 
      <ChevronDown className="ml-2 h-4 w-4" />;
  };
  
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
        <div className="relative w-full sm:max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search tenants..." 
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" size="sm" className="gap-2">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
        </div>
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-border">
        <table className="data-table">
          <thead className="bg-muted/50">
            <tr>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort("name")}
              >
                <div className="flex items-center">
                  Tenant Name
                  {renderSortIcon("name")}
                </div>
              </th>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort("unit")}
              >
                <div className="flex items-center">
                  Unit
                  {renderSortIcon("unit")}
                </div>
              </th>
              <th>
                <div className="flex items-center">
                  Account ID
                </div>
              </th>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort("dueDate")}
              >
                <div className="flex items-center">
                  Due Date
                  {renderSortIcon("dueDate")}
                </div>
              </th>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort("lastPayment")}
              >
                <div className="flex items-center">
                  Last Payment
                  {renderSortIcon("lastPayment")}
                </div>
              </th>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort("status")}
              >
                <div className="flex items-center">
                  Status
                  {renderSortIcon("status")}
                </div>
              </th>
              <th 
                className="cursor-pointer"
                onClick={() => handleSort("score")}
              >
                <div className="flex items-center">
                  Score
                  {renderSortIcon("score")}
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {getFilteredTenants().map((tenant) => (
              <tr 
                key={tenant.id} 
                className={cn(
                  "hover:bg-muted/40 transition-colors",
                  onRowClick && "cursor-pointer"
                )}
                onClick={() => onRowClick && onRowClick(tenant)}
              >
                <td className="font-medium">{tenant.name}</td>
                <td>{tenant.unit}</td>
                <td>{tenant.accountId}</td>
                <td>{tenant.dueDate}</td>
                <td>{tenant.lastPayment}</td>
                <td>
                  <span className={`status-badge ${tenant.status}`}>
                    {tenant.status === "ontime" ? "On-time" : 
                     tenant.status === "late" ? "Late" : "Unmatched"}
                  </span>
                </td>
                <td>
                  <div 
                    className={cn(
                      "flex items-center",
                      tenant.score >= 80 ? "text-green-600" : 
                      tenant.score >= 60 ? "text-orange-600" : "text-red-600"
                    )}
                  >
                    <span className="font-medium">{tenant.score}</span>
                  </div>
                </td>
                <td>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <MoreHorizontal className="h-4 w-4" />
                        <span className="sr-only">Open menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem>View details</DropdownMenuItem>
                      <DropdownMenuItem>Edit tenant</DropdownMenuItem>
                      <DropdownMenuItem>View payment history</DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
