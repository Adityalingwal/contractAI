
import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle, Clock, AlertCircle, Search, Filter } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

// Mock data for contractors
const contractorsData = [
  {
    id: "c1",
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    taskCount: 5,
    activeTaskCount: 2,
    lastPayment: "2023-03-15",
    paymentStatus: "paid",
    complianceStatus: "compliant",
  },
  {
    id: "c2",
    name: "Sara Chen",
    email: "sara.chen@example.com",
    taskCount: 3,
    activeTaskCount: 3,
    lastPayment: "2023-03-10",
    paymentStatus: "pending",
    complianceStatus: "compliant",
  },
  {
    id: "c3",
    name: "Michael Rodriguez",
    email: "michael.r@example.com",
    taskCount: 7,
    activeTaskCount: 1,
    lastPayment: "2023-03-05",
    paymentStatus: "paid",
    complianceStatus: "pending",
  },
  {
    id: "c4",
    name: "Emma Davis",
    email: "emma.d@example.com",
    taskCount: 2,
    activeTaskCount: 2,
    lastPayment: "2023-03-01",
    paymentStatus: "paid",
    complianceStatus: "compliant",
  },
  {
    id: "c5",
    name: "Brian Wilson",
    email: "brian.w@example.com",
    taskCount: 4,
    activeTaskCount: 0,
    lastPayment: "2023-02-28",
    paymentStatus: "failed",
    complianceStatus: "non-compliant",
  },
];

export const ContractorTable = () => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const filteredContractors = contractorsData.filter(contractor =>
    contractor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    contractor.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "paid":
        return (
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-emerald-500" />
            <span className="text-emerald-700">Paid</span>
          </div>
        );
      case "pending":
        return (
          <div className="flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5 text-amber-500" />
            <span className="text-amber-700">Pending</span>
          </div>
        );
      case "failed":
        return (
          <div className="flex items-center gap-1.5">
            <AlertCircle className="h-3.5 w-3.5 text-rose-500" />
            <span className="text-rose-700">Failed</span>
          </div>
        );
      default:
        return null;
    }
  };

  const getComplianceStatusBadge = (status: string) => {
    switch (status) {
      case "compliant":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-emerald-100 text-emerald-800">
            Compliant
          </span>
        );
      case "pending":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-amber-100 text-amber-800">
            Pending
          </span>
        );
      case "non-compliant":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-rose-100 text-rose-800">
            Non-compliant
          </span>
        );
      default:
        return null;
    }
  };

  const tableRowVariants = {
    hidden: { opacity: 0 },
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.05,
        duration: 0.3,
      },
    }),
  };

  return (
    <div className="bg-white border border-gray-100 rounded-xl shadow-sm overflow-hidden">
      <div className="p-4 border-b border-gray-100 flex justify-between items-center">
        <div className="relative w-full max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search contractors..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 bg-gray-50 border-gray-200"
          />
        </div>
        <Button variant="outline" size="sm" className="ml-2 flex items-center gap-1">
          <Filter className="h-3.5 w-3.5" />
          <span>Filter</span>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="hover:bg-transparent">
              <TableHead>Contractor Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Tasks</TableHead>
              <TableHead>Last Payment</TableHead>
              <TableHead>Payment Status</TableHead>
              <TableHead>Compliance</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredContractors.length > 0 ? (
              filteredContractors.map((contractor, index) => (
                <motion.tr
                  key={contractor.id}
                  custom={index}
                  initial="hidden"
                  animate="visible"
                  variants={tableRowVariants}
                  className={cn(
                    "cursor-pointer hover:bg-gray-50 transition-colors",
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/50"
                  )}
                  onClick={() => console.log("View contractor", contractor.id)}
                >
                  <TableCell className="font-medium">{contractor.name}</TableCell>
                  <TableCell>{contractor.email}</TableCell>
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium">{contractor.taskCount} total</span>
                      <span className="text-xs text-muted-foreground">
                        {contractor.activeTaskCount} active
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>{new Date(contractor.lastPayment).toLocaleDateString()}</TableCell>
                  <TableCell>{getPaymentStatusBadge(contractor.paymentStatus)}</TableCell>
                  <TableCell>{getComplianceStatusBadge(contractor.complianceStatus)}</TableCell>
                </motion.tr>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-10 text-muted-foreground">
                  No contractors found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
