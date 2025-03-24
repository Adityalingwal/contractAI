
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Users, ClipboardCheck, CreditCard, TrendingUp } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Chart } from "@/components/dashboard/Chart";
import { ContractorTable } from "@/components/contractors/ContractorTable";
import { AlertItem } from "@/components/alerts/AlertItem";
import { Button } from "@/components/ui/button";

const Dashboard = () => {
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

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  const chartVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        delay: 0.4,
        duration: 0.6,
        ease: "easeOut"
      }
    }
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
              <h1 className="text-3xl font-semibold">Dashboard</h1>
              <p className="text-muted-foreground mt-1">
                Welcome back! Here's an overview of your contractor management metrics.
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <motion.div 
                  custom={0} 
                  initial="hidden" 
                  animate="visible" 
                  variants={cardVariants}
                >
                  <DashboardCard 
                    title="Active Contractors" 
                    value={38} 
                    icon={<Users className="h-5 w-5" />}
                    description="Total contractors"
                    trend={{ value: 12, isPositive: true }}
                    className="h-full"
                  />
                </motion.div>
                
                <motion.div 
                  custom={1} 
                  initial="hidden" 
                  animate="visible" 
                  variants={cardVariants}
                >
                  <DashboardCard 
                    title="Tasks Assigned" 
                    value={64} 
                    icon={<ClipboardCheck className="h-5 w-5" />}
                    description="24 in progress" 
                    trend={{ value: 8, isPositive: true }}
                    className="h-full"
                  />
                </motion.div>
                
                <motion.div 
                  custom={2} 
                  initial="hidden" 
                  animate="visible" 
                  variants={cardVariants}
                >
                  <DashboardCard 
                    title="Pending Invoices" 
                    value="$42,850" 
                    icon={<CreditCard className="h-5 w-5" />}
                    description="12 invoices"
                    trend={{ value: 15, isPositive: false }}
                    className="h-full"
                  />
                </motion.div>
                
                <motion.div 
                  custom={3} 
                  initial="hidden" 
                  animate="visible" 
                  variants={cardVariants}
                >
                  <DashboardCard 
                    title="Compliance Rate" 
                    value="94%" 
                    icon={<TrendingUp className="h-5 w-5" />}
                    description="Tax and legal"
                    trend={{ value: 3, isPositive: true }}
                    className="h-full"
                  />
                </motion.div>
              </div>
              
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  variants={chartVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Chart 
                    type="line" 
                    title="Task Completion Trends" 
                    subtitle="Number of tasks completed per month" 
                  />
                </motion.div>
                
                <motion.div
                  className="bg-white p-6 rounded-xl shadow-sm border border-gray-100"
                  variants={chartVariants}
                  initial="hidden"
                  animate="visible"
                >
                  <Chart 
                    type="pie" 
                    title="Invoice Status" 
                    subtitle="Distribution of current invoice statuses" 
                  />
                </motion.div>
              </div>
              
              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Contractors</h2>
                  <Button asChild variant="link" className="text-indigo-600 gap-1">
                    <a href="/contractors">
                      View all contractors
                      <span className="sr-only">View all contractors</span>
                    </a>
                  </Button>
                </div>
                
                <ContractorTable />
              </div>
              
              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Alerts</h2>
                  <Button asChild variant="link" className="text-indigo-600 gap-1">
                    <a href="/alerts">
                      View all alerts
                      <span className="sr-only">View all alerts</span>
                    </a>
                  </Button>
                </div>
                
                <div className="space-y-4">
                  <AlertItem 
                    type="error"
                    title="Payment failure detected"
                    description="Payment for contractor Alex Johnson failed due to incorrect bank details."
                    timestamp="Today, 11:34 AM"
                    onResolve={() => {}}
                  />
                  
                  <AlertItem 
                    type="warning"
                    title="Invoice approval pending"
                    description="Sara Chen's invoice for Project X has been waiting for approval for 3 days."
                    timestamp="Yesterday, 3:12 PM"
                    onResolve={() => {}}
                  />
                  
                  <AlertItem 
                    type="info"
                    title="Tax information missing"
                    description="5 contractors have incomplete tax information required for compliance."
                    timestamp="Yesterday, 9:22 AM"
                  />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
