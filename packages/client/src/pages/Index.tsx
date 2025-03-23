
import { useState, useEffect } from "react";
import { Users, CreditCard, AlertTriangle, TrendingUp } from "lucide-react";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import { DashboardCard } from "@/components/dashboard/DashboardCard";
import { Chart } from "@/components/dashboard/Chart";
import { TenantTable } from "@/components/tenants/TenantTable";
import { AlertItem } from "@/components/alerts/AlertItem";

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
                Welcome back! Here's an overview of your property management metrics.
              </p>
              
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <DashboardCard 
                  title="Total Tenants" 
                  value={46} 
                  icon={<Users className="h-5 w-5" />}
                  description="Active tenants"
                  trend={{ value: 8, isPositive: true }}
                />
                
                <DashboardCard 
                  title="Pending Payments" 
                  value="$12,450" 
                  icon={<CreditCard className="h-5 w-5" />}
                  description="8 payments" 
                />
                
                <DashboardCard 
                  title="Reconciliation Issues" 
                  value={3} 
                  icon={<AlertTriangle className="h-5 w-5" />}
                  description="Unmatched payments"
                  trend={{ value: 12, isPositive: false }}
                  valueClassName={parseInt("3") > 0 ? "text-red-600" : ""}
                />
                
                <DashboardCard 
                  title="Average Score" 
                  value={82} 
                  icon={<TrendingUp className="h-5 w-5" />}
                  description="Financial health"
                  trend={{ value: 3, isPositive: true }}
                />
              </div>
              
              <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Chart 
                  type="line" 
                  title="Payment Trends" 
                  subtitle="Number of payments received per month" 
                />
                
                <Chart 
                  type="pie" 
                  title="Payment Status" 
                  subtitle="Distribution of current payment statuses" 
                />
              </div>
              
              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Tenants</h2>
                  <a href="/tenants" className="text-primary text-sm hover:underline">
                    View all tenants
                  </a>
                </div>
                
                <TenantTable />
              </div>
              
              <div className="mt-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold">Recent Alerts</h2>
                  <a href="/alerts" className="text-primary text-sm hover:underline">
                    View all alerts
                  </a>
                </div>
                
                <div className="space-y-4">
                  <AlertItem 
                    type="error"
                    title="Payment mismatch detected"
                    description="Payment for tenant Robert Chen (A-304) does not match expected amount."
                    timestamp="Today, 11:34 AM"
                    onResolve={() => {}}
                  />
                  
                  <AlertItem 
                    type="warning"
                    title="Late payment received"
                    description="Lisa Johnson (B-205) has submitted payment 6 days after due date."
                    timestamp="Yesterday, 3:12 PM"
                    onResolve={() => {}}
                  />
                  
                  <AlertItem 
                    type="info"
                    title="Upcoming payment due"
                    description="5 tenant payments are due within the next 2 days."
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
