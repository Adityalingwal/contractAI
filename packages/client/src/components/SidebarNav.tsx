import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import {
  Briefcase,
  PlusCircle,
  FileText,
  CreditCard,
  Bell,
  Home,
} from 'lucide-react';

interface SidebarNavProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  unreadCount: number;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ activeItem, setActiveItem, unreadCount }) => {
  return (
    <motion.div
      className="w-64 border-r bg-card flex flex-col shadow-sm"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="p-4 border-b">
        <div className="flex items-center gap-2">
          <Briefcase className="h-5 w-5 text-primary" />
          <h3 className="font-semibold text-lg text-primary">Business Portal</h3>
        </div>
      </div>

      <div className="py-4 flex-grow">
        <nav className="space-y-2 px-2">
          <Button
            variant={activeItem === 'find-contractors' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveItem('find-contractors')}
          >
            <Briefcase className="h-4 w-4 mr-2" />
            <span>Find Contractors</span>
          </Button>

          <Button
            variant={activeItem === 'post-contract' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveItem('post-contract')}
          >
            <PlusCircle className="h-4 w-4 mr-2" />
            <span>Post a Contract</span>
          </Button>

          <Button
            variant={activeItem === 'contract-status' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveItem('contract-status')}
          >
            <FileText className="h-4 w-4 mr-2" />
            <span>Contract Status</span>
          </Button>

          <Button
            variant={activeItem === 'send-payment' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveItem('send-payment')}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            <span>Send Payment</span>
          </Button>

          <Button
            variant={activeItem === 'notifications' ? 'secondary' : 'ghost'}
            className="w-full justify-start"
            onClick={() => setActiveItem('notifications')}
          >
            <Bell className="h-4 w-4 mr-2" />
            <span>Notifications</span>
            {unreadCount > 0 && (
              <Badge variant="secondary" className="ml-auto">
                {unreadCount}
              </Badge>
            )}
          </Button>
        </nav>
      </div>

      <div className="px-2 py-4 border-t mt-auto">
        <Button variant="ghost" className="w-full justify-start" asChild>
          <Link to="/">
            <Home className="h-4 w-4 mr-2" />
            <span>Return to Home</span>
          </Link>
        </Button>
      </div>
    </motion.div>
  );
};

export default SidebarNav;