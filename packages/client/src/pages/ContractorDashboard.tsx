import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import './ContractorDashboard.css';
import { Briefcase, FileText, User, FileCheck, Home, CreditCard } from 'lucide-react';
import ContractorForm from './ContractorForm';
import { MyContracts } from '../components/MyContracts';
import { PaymentStatus } from '../components/PaymentStatus';
import { EditProfile } from '../components/EditProfile';
import { ApplyGigs } from './ApplyGigs';

const ContractorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('createProfile');
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

  const renderContent = () => {
    switch (activeTab) {
      case 'createProfile':
        return <ContractorForm />;
      case 'paymentStatus':
        return <PaymentStatus />;
      case 'editProfile':
        return <EditProfile />;
      case 'myContracts':
        return <MyContracts />;
      case 'applyForGigs':
        return <ApplyGigs />
      default:
        return <div className="p-6">Hello</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Left Sidebar */}
      <motion.div
        className="w-64 border-r bg-gradient-to-b from-gray-900 to-gray-800 flex flex-col shadow-xl"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="p-4 border-b border-gray-700">
          <div className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            >
              <Briefcase className="h-5 w-5 text-teal-400" />
            </motion.div>
            <h3 className="font-semibold text-lg text-white">Contractor Portal</h3>
          </div>
        </div>

        <div className="py-4 flex-grow">
          <nav className="space-y-2 px-2">
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                variant={activeTab === 'createProfile' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'createProfile' ? 'bg-gray-700 text-teal-300 hover:bg-gray-600' : 'hover:bg-gray-700 text-gray-300'}`}
                onClick={() => setActiveTab('createProfile')}
              >
                <FileCheck className="h-4 w-4 mr-2" />
                Create Profile
              </Button>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                variant={activeTab === 'paymentStatus' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'paymentStatus' ? 'bg-gray-700 text-teal-300 hover:bg-gray-600' : 'hover:bg-gray-700 text-gray-300'}`}
                onClick={() => setActiveTab('paymentStatus')}
              >
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Status
              </Button>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                variant={activeTab === 'editProfile' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'editProfile' ? 'bg-gray-700 text-teal-300 hover:bg-gray-600' : 'hover:bg-gray-700 text-gray-300'}`}
                onClick={() => setActiveTab('editProfile')}
              >
                <User className="h-4 w-4 mr-2" />
                Edit Profile
              </Button>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                variant={activeTab === 'myContracts' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'myContracts' ? 'bg-gray-700 text-teal-300 hover:bg-gray-600' : 'hover:bg-gray-700 text-gray-300'}`}
                onClick={() => setActiveTab('myContracts')}
              >
                <FileText className="h-4 w-4 mr-2" />
                My Contracts
              </Button>
            </motion.div>
            
            <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
              <Button
                variant={activeTab === 'applyForGigs' ? 'secondary' : 'ghost'}
                className={`w-full justify-start ${activeTab === 'applyForGigs' ? 'bg-gray-700 text-teal-300 hover:bg-gray-600' : 'hover:bg-gray-700 text-gray-300'}`}
                onClick={() => setActiveTab('applyForGigs')}
              >
                <FileText className="h-4 w-4 mr-2" />
                Apply for Gigs
              </Button>
            </motion.div>
          </nav>
        </div>

        <div className="px-2 py-4 border-t border-gray-700 mt-auto">
          <motion.div whileHover="hover" whileTap="tap" variants={buttonVariants}>
            <Button variant="ghost" className="w-full justify-start text-gray-300 hover:bg-gray-700" asChild>
              <Link to="/">
                <Home className="h-4 w-4 mr-2" />
                <span>Return to Home</span>
              </Link>
            </Button>
          </motion.div>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-gradient-to-br from-gray-900 to-gray-800 p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="h-full w-full mx-auto bg-gray-800 text-white rounded-lg shadow-lg p-6 border border-gray-700"
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
