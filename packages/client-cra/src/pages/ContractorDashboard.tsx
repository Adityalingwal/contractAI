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

const ContractorDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState('createProfile');
  const location = useLocation();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
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
      default:
        return <div className="p-6">Hello</div>;
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar */}
      <motion.div
        className="w-64 border-r bg-card flex flex-col shadow-sm"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg text-primary">Contractor Portal</h3>
          </div>
        </div>

        <div className="py-4 flex-grow">
          <nav className="space-y-2 px-2">
            <Button
              variant={activeTab === 'createProfile' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('createProfile')}
            >
              <FileCheck className="h-4 w-4 mr-2" />
              Create Profile
            </Button>
            <Button
              variant={activeTab === 'paymentStatus' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('paymentStatus')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Status
            </Button>
            <Button
              variant={activeTab === 'editProfile' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('editProfile')}
            >
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>
            <Button
              variant={activeTab === 'myContracts' ? 'secondary' : 'ghost'}
              className="w-full justify-start"
              onClick={() => setActiveTab('myContracts')}
            >
              <FileText className="h-4 w-4 mr-2" />
              My Contracts
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

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background px-6 py-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="max-w-3xl mx-auto"
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

export default ContractorDashboard;
