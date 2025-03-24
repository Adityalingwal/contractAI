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
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h1 className="text-3xl md:text-4xl font-display font-bold mb-4">
              Choose Your Dashboard
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Select the dashboard that best fits your role
            </p>
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
      className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200 flex flex-col h-full"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: [0.25, 0.25, 0, 1]
      }}
    >
      <div className={`h-24 bg-gradient-to-r ${gradient} flex items-center justify-center`}>
        <div className="h-16 w-16 rounded-full bg-white/20 flex items-center justify-center text-white">
          {icon}
        </div>
      </div>
      <div className="p-6 flex-grow">
        <h2 className="text-2xl font-semibold mb-3">{title}</h2>
        <p className="text-muted-foreground mb-6">{description}</p>
      </div>
      <div className="p-6 pt-0 mt-auto">
        <Link to={to} className="w-full">
          <Button className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-600/90 hover:to-purple-600/90">
            {buttonText}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </motion.div>
  );
};

export default DashboardSelector;