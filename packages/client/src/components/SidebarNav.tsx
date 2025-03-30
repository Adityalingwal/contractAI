import React from 'react';
import { motion } from 'framer-motion';
import { Button } from './ui/button';
import { Link } from 'react-router-dom';
import { Briefcase, Users, PlusSquare, Bell, FileCheck, CreditCard, Home } from 'lucide-react';

interface SidebarNavProps {
  activeItem: string;
  setActiveItem: (item: string) => void;
  unreadCount: number;
}

const SidebarNav: React.FC<SidebarNavProps> = ({ activeItem, setActiveItem, unreadCount }) => {
  const buttonVariants = {
    hover: {
      scale: 1.05,
      backgroundColor: 'rgba(75, 85, 99, 0.1)',
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <motion.div
      className="w-64 border-r bg-white flex flex-col shadow-lg"
      initial={{ x: -50, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
    >
      <div className="p-4">
        <div className="flex items-center gap-2">
          <motion.div
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, ease: 'easeInOut' }}
          >
            <Briefcase className="h-5 w-5 text-blue-600" />
          </motion.div>
          <h3 className="font-semibold text-lg text-black">Business Portal</h3>
        </div>
      </div>

      <div className="border-b mx-2 mb-2"></div>

      <div className="py-4 flex-grow">
        <nav className="space-y-2 px-2">
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              variant={activeItem === 'find-contractors' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${activeItem === 'find-contractors' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : 'hover:bg-blue-50 text-black'}`}
              onClick={() => setActiveItem('find-contractors')}
            >
              <Users className="h-4 w-4 mr-2 text-blue-600" />
              Find Contractors
            </Button>
          </motion.div>

          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              variant={activeItem === 'post-contract' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${activeItem === 'post-contract' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : 'hover:bg-blue-50 text-black'}`}
              onClick={() => setActiveItem('post-contract')}
            >
              <PlusSquare className="h-4 w-4 mr-2 text-blue-600" />
              Post Contract
            </Button>
          </motion.div>

          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              variant={activeItem === 'contract-status' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${activeItem === 'contract-status' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : 'hover:bg-blue-50 text-black'}`}
              onClick={() => setActiveItem('contract-status')}
            >
              <FileCheck className="h-4 w-4 mr-2 text-blue-600" />
              Contract Status
            </Button>
          </motion.div>

          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button
              variant={activeItem === 'send-payment' ? 'secondary' : 'ghost'}
              className={`w-full justify-start ${activeItem === 'send-payment' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : 'hover:bg-blue-50 text-black'}`}
              onClick={() => setActiveItem('send-payment')}
            >
              <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
              Send Payment
            </Button>
          </motion.div>
        </nav>
      </div>

      <div className="px-2 py-4 border-t mt-auto">
        <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
          <Button
            variant="ghost"
            className="w-full justify-start text-black hover:bg-blue-50"
            asChild
          >
            <Link to="/">
              <Home className="h-4 w-4 mr-2 text-blue-600" />
              <span>Return to Home</span>
            </Link>
          </Button>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default SidebarNav;
