
import { useState } from "react";
import { NavLink } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Bell, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  CreditCard,
  BarChart4
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/common/Logo";

export function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  
  const toggleSidebar = () => {
    setCollapsed(!collapsed);
    // Dispatch a custom event that the Index page can listen to
    window.dispatchEvent(new CustomEvent('sidebarToggle', { 
      detail: { collapsed: !collapsed, width: !collapsed ? 80 : 280 } 
    }));
  };
  
  return (
    <div 
      className={cn(
        "h-screen bg-sidebar fixed left-0 top-0 z-30 border-r border-sidebar-border transition-all duration-300 ease-apple",
        collapsed ? "w-[80px]" : "w-[280px]"
      )}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-center px-6 h-16 border-b border-sidebar-border transition-all duration-300">
          {!collapsed && (
            <div className="flex items-center overflow-hidden animate-fade-in">
              <Logo variant="sidebar" animate={false} />
            </div>
          )}
          {collapsed && (
            <div className="w-full flex justify-center animate-fade-in">
              <Logo variant="sidebar" className="justify-center" animate={false} />
            </div>
          )}
        </div>
        
        <nav className="flex-1 py-6 px-3 overflow-y-auto">
          <ul className="space-y-1.5">
            <SidebarItem 
              to="/dashboard" 
              icon={<LayoutDashboard size={20} />} 
              label="Dashboard" 
              collapsed={collapsed}
            />
            <SidebarItem 
              to="/contractors" 
              icon={<Users size={20} />} 
              label="Contractors" 
              collapsed={collapsed} 
            />
            <SidebarItem 
              to="/payment-logs" 
              icon={<CreditCard size={20} />} 
              label="Payment Logs" 
              collapsed={collapsed} 
            />
            <SidebarItem 
              to="/reports" 
              icon={<BarChart4 size={20} />} 
              label="Reports" 
              collapsed={collapsed} 
            />
            <SidebarItem 
              to="/alerts" 
              icon={<Bell size={20} />} 
              label="Alerts" 
              collapsed={collapsed} 
              badge={3}
            />
            <SidebarItem 
              to="/settings" 
              icon={<Settings size={20} />} 
              label="Settings" 
              collapsed={collapsed} 
            />
          </ul>
        </nav>
        
        <div className="mt-auto border-t border-sidebar-border p-3">
          <button
            className="w-full flex items-center justify-center p-2 text-muted-foreground rounded-lg hover:bg-sidebar-accent transition-colors"
            onClick={toggleSidebar}
          >
            {collapsed ? (
              <ChevronRight size={18} />
            ) : (
              <div className="w-full flex items-center justify-between">
                <span className="text-sm font-medium">Collapse Sidebar</span>
                <ChevronLeft size={18} />
              </div>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

interface SidebarItemProps {
  to: string;
  icon: React.ReactNode;
  label: string;
  collapsed: boolean;
  badge?: number;
}

function SidebarItem({ to, icon, label, collapsed, badge }: SidebarItemProps) {
  return (
    <li>
      <NavLink
        to={to}
        className={({ isActive }) => cn(
          "sidebar-item",
          isActive && "active",
          collapsed && "justify-center px-2"
        )}
      >
        <span className="flex-shrink-0">{icon}</span>
        {!collapsed && (
          <span className="truncate">{label}</span>
        )}
        {!collapsed && badge !== undefined && (
          <span className="ml-auto inline-flex items-center justify-center px-2 py-0.5 rounded-full text-xs font-medium bg-primary text-primary-foreground">
            {badge}
          </span>
        )}
        {collapsed && badge !== undefined && (
          <span className="absolute top-0 right-0 translate-x-1/3 -translate-y-1/3 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground text-xs">
            {badge}
          </span>
        )}
      </NavLink>
    </li>
  );
}
