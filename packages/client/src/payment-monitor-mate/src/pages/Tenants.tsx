
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { TenantTable } from "@/components/tenants/TenantTable";
import { Button } from "@/components/ui/button";
import { Plus, Users } from "lucide-react";
import { useState } from "react";
import { useSidebar } from "@/hooks/use-sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const Tenants = () => {
  const sidebarWidth = useSidebar();
  const [selectedTenant, setSelectedTenant] = useState<any>(null);
  
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
                  <h1 className="text-3xl font-semibold">Tenants</h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your property tenants and their information.
                  </p>
                </div>
                
                <Button className="flex items-center gap-2">
                  <Plus className="h-4 w-4" />
                  Add Tenant
                </Button>
              </div>
              
              <div className="mt-8">
                <TenantTable 
                  onRowClick={(tenant) => setSelectedTenant(tenant)}
                />
              </div>
            </div>
          </div>
        </main>
      </div>
      
      <Dialog open={!!selectedTenant} onOpenChange={(open) => !open && setSelectedTenant(null)}>
        <DialogContent className="sm:max-w-[625px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Tenant Details
            </DialogTitle>
            <DialogDescription>
              View and manage detailed tenant information.
            </DialogDescription>
          </DialogHeader>
          
          {selectedTenant && (
            <div className="py-4">
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Tenant Name</h4>
                  <p className="text-foreground">{selectedTenant.name}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Unit Number</h4>
                  <p className="text-foreground">{selectedTenant.unit}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Virtual Account ID</h4>
                  <p className="text-foreground">{selectedTenant.accountId}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Due Date</h4>
                  <p className="text-foreground">{selectedTenant.dueDate}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Last Payment</h4>
                  <p className="text-foreground">{selectedTenant.lastPayment}</p>
                </div>
                <div>
                  <h4 className="text-sm font-medium text-muted-foreground mb-1">Payment Status</h4>
                  <span className={`status-badge ${selectedTenant.status}`}>
                    {selectedTenant.status === "ontime" ? "On-time" : 
                     selectedTenant.status === "late" ? "Late" : "Unmatched"}
                  </span>
                </div>
              </div>
              
              <div className="border-t border-border pt-6">
                <h3 className="text-sm font-medium mb-3">Financial Health Score</h3>
                
                <div className="bg-secondary rounded-full h-2.5 mb-2">
                  <div 
                    className="h-2.5 rounded-full" 
                    style={{ 
                      width: `${selectedTenant.score}%`,
                      backgroundColor: selectedTenant.score >= 80 ? "#34D399" : 
                                      selectedTenant.score >= 60 ? "#F97316" : "#EF4444"
                    }}
                  ></div>
                </div>
                
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>0</span>
                  <span>Score: {selectedTenant.score}/100</span>
                  <span>100</span>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end gap-3">
                <Button variant="outline">View Payment History</Button>
                <Button>Edit Tenant</Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Tenants;
