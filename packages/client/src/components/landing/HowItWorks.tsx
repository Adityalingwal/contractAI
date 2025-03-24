
import { motion } from "framer-motion";
import { ArrowRight, ClipboardCheck, CreditCard, FileText, Users, Zap } from "lucide-react";

const steps = [
  {
    id: 1,
    title: "Contractor Registration",
    description: "Easy onboarding with automated Payman AI payee creation",
    icon: <Users className="h-8 w-8" />,
    color: "from-indigo-500 to-blue-400"
  },
  {
    id: 2,
    title: "Task Assignment",
    description: "AI-driven matching of contractors to specific tasks",
    icon: <ClipboardCheck className="h-8 w-8" />,
    color: "from-purple-500 to-indigo-400"
  },
  {
    id: 3,
    title: "Invoicing & Approval",
    description: "Generate and approve invoices for completed tasks",
    icon: <FileText className="h-8 w-8" />,
    color: "from-green-500 to-emerald-400"
  },
  {
    id: 4,
    title: "Automated Payments",
    description: "Seamless payment processing via ACH/USDC with compliance tracking",
    icon: <CreditCard className="h-8 w-8" />,
    color: "from-violet-500 to-purple-400"
  }
];

export function HowItWorks() {
  return (
    <div className="relative">
      {/* Flow connector */}
      <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent hidden md:block" />
      
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
                <span className="absolute -top-2 -right-2 h-8 w-8 rounded-full bg-white text-indigo-600 border border-border flex items-center justify-center font-bold shadow-subtle">
                  {step.id}
                </span>
              </div>
              
              {index < steps.length - 1 && (
                <div className="absolute top-10 left-1/2 w-full hidden md:block">
                  <ArrowRight className="text-indigo-400/30 h-6 w-6" />
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
