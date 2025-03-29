
import { motion } from "framer-motion";
import { Users } from "lucide-react";
import { cn } from "../../lib/utils";

interface LogoProps {
  variant?: "default" | "sidebar";
  className?: string;
  animate?: boolean;
}

export function Logo({ variant = "default", className, animate = true }: LogoProps) {
  const iconVariants = {
    initial: { rotate: 0 },
    hover: { rotate: 15, transition: { duration: 0.3 } }
  };

  const textVariants = {
    initial: { opacity: 1 },
    hover: { opacity: 1 }
  };

  return (
    <motion.div
      className={cn(
        "flex items-center gap-3",
        variant === "sidebar" ? "text-sidebar-foreground" : "text-foreground",
        className
      )}
      initial="initial"
      whileHover={animate ? "hover" : "initial"}
    >
      <motion.div
        className={cn(
          "flex items-center justify-center",
          variant === "sidebar" ? "text-sidebar-primary" : "bg-gradient-to-r from-primary to-purple-600 text-white rounded-lg p-2"
        )}
        variants={iconVariants}
      >
        <Users className="w-5 h-5" />
      </motion.div>
      <motion.span
        className="font-display font-semibold text-lg whitespace-nowrap"
        variants={textVariants}
      >
        ContractorAI
      </motion.span>
    </motion.div>
  );
}
