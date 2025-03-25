import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Building2, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import { Footer } from "@/components/landing/Footer";

const DashboardSelector = () => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md shadow-subtle">
        <div className="container flex justify-between items-center h-16 px-4 md:px-6">
          <Link to="/">
            <Logo />
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow flex items-center justify-center py-20 px-4 bg-gradient-to-b from-white to-indigo-50/50">
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
            <motion.h1 
              className="text-3xl md:text-4xl font-display font-bold mb-4 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent"
              initial={{ scale: 0.95 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Choose Your Dashboard
            </motion.h1>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Select the dashboard that best fits your role
            </motion.p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Business Dashboard Card */}
            <DashboardCard 
              icon={<Building2 className="h-8 w-8" />}
              title="Business Dashboard"
              description="Manage your contractors, assign tasks, and process payments all in one place."
              buttonText="Access Business Dashboard"
              to="/business"
              delay={0}
              gradient="from-indigo-600 to-blue-600"
            />
            
            {/* Contractor Dashboard Card */}
            <DashboardCard 
              icon={<User className="h-8 w-8" />}
              title="Contractor Dashboard"
              description="View your assignments, track payments, and manage your profile with ease."
              buttonText="Access Contractor Dashboard"
              to="/contractor"
              delay={0.1}
              gradient="from-purple-600 to-pink-600"
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
  gradient: string;
}

const DashboardCard = ({ icon, title, description, buttonText, to, delay, gradient }: DashboardCardProps) => {
  return (
    <motion.div 
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col h-full hover:shadow-2xl transition-shadow duration-300"
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
        className={`h-24 bg-gradient-to-r ${gradient} flex items-center justify-center`}
        whileHover={{ 
          scale: 1.05,
          transition: { duration: 0.2 }
        }}
      >
        <motion.div 
          className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-white"
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.6 }}
        >
          {icon}
        </motion.div>
      </motion.div>
      <div className="p-6 flex-grow">
        <motion.h2 
          className="text-2xl font-semibold mb-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.2 }}
        >
          {title}
        </motion.h2>
        <motion.p 
          className="text-muted-foreground mb-6"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          {description}
        </motion.p>
      </div>
      <div className="p-6 pt-0 mt-auto">
        <Link to={to} className="w-full" onClick={() => console.log('Navigation triggered')}>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 transition-colors duration-300">
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