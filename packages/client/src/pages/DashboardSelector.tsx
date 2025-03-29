import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, User, Cpu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Logo } from "../components/common/Logo";
import { Footer } from "@/components/landing/Footer";

const DashboardSelector = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Back Button Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-subtle py-3">
        <div className="container flex items-center h-10 px-4 md:px-6">
          <Link 
            to="/" 
            className="flex items-center text-slate-700 hover:text-blue-700 transition-colors"
            onClick={(e) => {
              e.preventDefault();
              window.history.back();
            }}
          >
            <ArrowRight className="h-5 w-5 rotate-180 mr-2" />
            <span className="font-medium">Back</span>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center  px-4 bg-gradient-to-b from-slate-50 to-slate-100/80">
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            className="text-center mb-16"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7,
              ease: "easeOut"
            }}
          >
            <motion.div
              className="mb-4 flex justify-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="h-20 w-20 rounded-full bg-blue-700 flex items-center justify-center text-white mb-3">
                <Cpu className="h-10 w-10" />
              </div>
            </motion.div>
            
            <motion.h1 
              className="text-3xl md:text-4xl font-display font-bold mb-2 -mt-2 bg-gradient-to-r from-blue-700 to-indigo-800 bg-clip-text text-transparent text-center"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Contractor AI
            </motion.h1>
            
            <motion.p 
              className="text-xl text-slate-600 max-w-2xl mx-auto text-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Select the Role from Businessman or Contractor
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-14 max-w-8xl px-4 -mt-5">
            {/* Business Dashboard Card */}
            <DashboardCard 
              icon={<Building2 className="h-8 w-8 " />}
              title="Business Dashboard"
              description="Manage your contracts, assign tasks, and process payments all in one place."
              buttonText="Access Business Dashboard"
              to="/business"
              delay={0}
              color="bg-blue-600"
            />
            
            {/* Contractor Dashboard Card */}
            <DashboardCard 
              icon={<User className="h-8 w-8" />}
              title="Contractor Dashboard"
              description="View your assignments, track payments, and manage your profile with ease."
              buttonText="Access Contractor Dashboard"
              to="/explore-contractors"
              delay={0.1}
              color="bg-indigo-600"
            />
          </div>
        </div>
      </main>
    </div>
  );
};

interface DashboardCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  buttonText: string;
  to: string;
  delay: number;
  color: string;
}

const DashboardCard = ({ icon, title, description, buttonText, to, delay, color }: DashboardCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-md overflow-hidden border border-slate-200 flex flex-col h-full hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: delay,
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.02,
        transition: { duration: 0.2 }
      }}
    >
      <motion.div 
        className={`h-28 ${color} flex items-center justify-center`}
      >
        <motion.div 
          className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-white"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <div className="p-8 flex-grow text-center">
        <motion.h2 
          className="text-2xl font-semibold mb-4 text-center text-slate-800"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-slate-600 mb-6 text-center"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          {description}
        </motion.p>
      </div>
      <div className="px-8 pb-8 pt-0 mt-auto">
        <Link to={to} className="w-full" onClick={() => console.log('Navigation triggered')}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className={`w-full ${color} hover:bg-opacity-90 transition-opacity duration-300 text-white`}>
              {buttonText}
              <motion.div
                initial={{ x: 0 }}
                whileHover={{ x: 5 }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="ml-2 h-4 w-4" />
              </motion.div>
            </Button>
          </motion.div>
        </Link>
      </div>
    </motion.div>
  );
};

export default DashboardSelector;