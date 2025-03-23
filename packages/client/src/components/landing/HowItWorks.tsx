
import { motion } from "framer-motion";
import { ArrowRight, CreditCard, FileText, Users, Zap } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Tenant Registration",
    description: "Assign virtual accounts to each tenant for clear payment attribution",
    icon: <Users className="h-8 w-8" />,
    color: "from-blue-500 to-cyan-400"
  },
  {
    id: 2,
    title: "Payment Receipt",
    description: "Automatically receive and record all payment transactions",
    icon: <CreditCard className="h-8 w-8" />,
    color: "from-purple-500 to-indigo-400"
  },
  {
    id: 3,
    title: "Automated Matching",
    description: "AI-powered system matches payments to the correct tenant accounts",
    icon: <Zap className="h-8 w-8" />,
    color: "from-green-500 to-emerald-400"
  },
  {
    id: 4,
    title: "Financial Insights",
    description: "Generate reports and get AI-driven analytics on payment patterns",
    icon: <FileText className="h-8 w-8" />,
    color: "from-orange-500 to-amber-400"
  }
];

export function HowItWorks() {
  return (
    <div className="relative">
      {/* Flow connector */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-primary/20 to-transparent hidden md:block" />
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              duration: 0.5, 
              delay: index * 0.1,
              ease: [0.25, 0.25, 0, 1]
            }}
            className="relative"
          >
            <div className="flex flex-col items-center text-center">
              <div className={`h-20 w-20 rounded-full bg-gradient-to-br ${step.color} text-white flex items-center justify-center mb-6 shadow-lg relative z-10`}>
                {step.icon}
                <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white text-primary border border-border flex items-center justify-center font-bold shadow-subtle">
                  {step.id}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="absolute top-10 left-1/2 w-full hidden md:block">
                  <ArrowRight className="text-primary/30 h-6 w-6" />
                </div>
              )}
              
              <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
