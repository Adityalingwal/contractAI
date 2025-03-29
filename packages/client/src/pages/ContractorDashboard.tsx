import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import './ContractorDashboard.css';
import { Briefcase, FileText, User, FileCheck, Home, CreditCard } from 'lucide-react';
import { MyContracts } from '../components/MyContracts';
import { PaymentStatus } from '../components/PaymentStatus';
import { EditProfile } from '../components/EditProfile';
import { ApplyGigs } from './ApplyGigs';

const ContractorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('applyForGigs');
  const location = useLocation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  const buttonVariants = {
    hover: { 
      scale: 1.05, 
      backgroundColor: "rgba(75, 85, 99, 0.1)",
      transition: { duration: 0.2 }
    },
    tap: { scale: 0.95 }
  };

  const headingStyle = {
    color: "black"
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'paymentStatus':
        return <PaymentStatus />;
      case 'editProfile':
        return <EditProfile />;
      case 'myContracts':
        return <MyContracts />;
      case 'applyForGigs':
        return <ApplyGigs />
      default:
        return <ApplyGigs />;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-white">
      {/* Left Sidebar */}
      <motion.div
        className="w-64 border-r  bg-white flex flex-col shadow-lg"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <Briefcase className="h-5 w-5 text-blue-600 " />
            </motion.div>
            <h3 className="font-semibold text-lg text-black ">Contractor Portal</h3>
          </div>
        </div>

        <div className="border-b  mx-2 mb-2"></div>

        <div className="py-4 flex-grow">
          <nav className="space-y-2 px-2">
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                variant={activeTab === 'applyForGigs' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'applyForGigs' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : 'hover:bg-blue-50 text-black'}`}
                onClick={() => setActiveTab('applyForGigs')}
              >
                <FileText className="h-4 w-4 mr-2 text-blue-600" />
                Apply for Gigs
              </Button>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                variant={activeTab === 'editProfile' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'editProfile' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : 'hover:bg-blue-50 text-black'}`}
                onClick={() => setActiveTab('editProfile')}
              >
                <User className="h-4 w-4 mr-2 text-blue-600" />
                Edit Profile
              </Button>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                variant={activeTab === 'myContracts' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'myContracts' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : 'hover:bg-blue-50 text-black'}`}
                onClick={() => setActiveTab('myContracts')}
              >
                <FileText className="h-4 w-4 mr-2 text-blue-600" />
                My Contracts
              </Button>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                variant={activeTab === 'paymentStatus' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'paymentStatus' ? 'bg-blue-100 text-blue-900 hover:bg-blue-200' : 'hover:bg-blue-50 text-black'}`}
                onClick={() => setActiveTab('paymentStatus')}
              >
                <CreditCard className="h-4 w-4 mr-2 text-blue-600" />
                Payment Status
              </Button>
            </motion.div>
          </nav>
        </div>

        <div className="px-2 py-4 border-t mt-auto">
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button variant="ghost" className="w-full justify-start text-black hover:bg-blue-50" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2 text-blue-600" />
                <span>Return to Home</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-white p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="h-full w-full mx-auto bg-white text-black  p-6"
        >
          <motion.div variants={itemVariants}>
            {renderContent()}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default ContractorDashboard;
