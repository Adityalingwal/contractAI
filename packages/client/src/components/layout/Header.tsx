
import { useState, useEffect } from "react";
import { Bell, Search, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface HeaderProps {
  sidebarWidth: number;
}

export function Header({ sidebarWidth }: HeaderProps) {
  const [notifications, setNotifications] = useState(3);
  const [width, setWidth] = useState(sidebarWidth);
  
  useEffect(() => {
    const handleSidebarToggle = (event: Event) => {
      const customEvent = event as CustomEvent;
      setWidth(customEvent.detail.width);
    };

    window.addEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    return () => {
      window.removeEventListener('sidebarToggle', handleSidebarToggle as EventListener);
    };
  }, []);
  
  return (
    <header 
      className="h-16 fixed top-0 right-0 z-20 bg-white/80 backdrop-blur-md border-b border-border flex items-center px-6 transition-all duration-300"
      style={{ width: `calc(100% - ${width}px)`, left: `${width}px` }}
    >
      <div className="flex-1 max-w-md">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search..." 
            className="pl-10 bg-secondary border-none" 
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <Button 
            variant="ghost" 
            size="icon" 
            className="text-muted-foreground hover:text-foreground"
            onClick={() => setNotifications(0)}
          >
            <Bell size={20} />
            {notifications > 0 && (
              <Badge 
                className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-primary text-primary-foreground"
              >
                {notifications}
              </Badge>
            )}
          </Button>
        </div>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button 
              variant="ghost" 
              className="relative h-9 w-9 rounded-full overflow-hidden border border-border"
            >
              <User className="h-5 w-5 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
