
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { PlusCircle, Users, Filter, Search } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ContractorTable } from "@/components/contractors/ContractorTable";

const Contractors = () => {
  const [sidebarWidth, setSidebarWidth] = useState(280);
  
  useEffect(() => {
    const handleSidebarToggle = (event: Event) => {
      const customEvent = event as CustomEvent;
      setSidebarWidth(customEvent.detail.width);
    };

    window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    };
  }, []);
  
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
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h1 className="text-3xl font-semibold flex items-center gap-2">
                    <Users className="h-7 w-7 text-indigo-600" />
                    Contractors
                  </h1>
                  <p className="text-muted-foreground mt-1">
                    Manage your contractors, review their tasks, and process payments.
                  </p>
                </div>
                
                <Button className="flex items-center gap-1.5">
                  <PlusCircle className="h-4 w-4" />
                  Add New Contractor
                </Button>
              </div>
              
              <div className="mt-8">
                <ContractorTable />
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Contractors;
