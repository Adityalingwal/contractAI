
import React from "react";
import { motion } from "framer-motion";

export const AnimatedBackground: React.FC = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-10">
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-indigo-50/90 to-white/95 backdrop-blur-[2px]"></div>
      
      {/* Animated shapes */}
      <div className="absolute inset-0">
        {Array.from({ length: 6 }).map((_, index) => (
          <motion.div
            key={index}
            className="absolute rounded-full bg-gradient-to-br opacity-20"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 300 + 100}px`,
              height: `${Math.random() * 300 + 100}px`,
              background: index % 2 === 0 
                ? 'linear-gradient(225deg, #4F46E5 0%, #7C3AED 100%)' 
                : 'linear-gradient(225deg, #7C3AED 0%, #C4B5FD 100%)',
            }}
            animate={{
              x: [0, Math.random() * 40 - 20],
              y: [0, Math.random() * 40 - 20],
              scale: [1, 1.05, 0.95, 1],
            }}
            transition={{
              duration: 10 + index * 2,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />
        ))}
      </div>
      
      {/* Grid pattern */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSA2MCAwIEwgMCAwIDAgNjAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxMDAsMTAwLDEwMCwwLjEpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiIC8+PC9zdmc+')] opacity-10"></div>
      
      {/* Floating code-like elements */}
      <div className="absolute inset-0 overflow-hidden opacity-10">
        {Array.from({ length: 15 }).map((_, index) => (
          <motion.div
            key={`code-${index}`}
            className="absolute text-xs font-mono text-indigo-800 whitespace-nowrap"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              transform: `rotate(${Math.random() * 90 - 45}deg)`,
            }}
            animate={{
              y: [0, -100],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration: 10 + Math.random() * 5,
              repeat: Infinity,
              delay: Math.random() * 10,
            }}
          >
            {`{ contractor: "${['onboarding', 'payment', 'task', 'invoice'][Math.floor(Math.random() * 4)]}", status: "${['pending', 'completed', 'approved'][Math.floor(Math.random() * 3)]}" }`}
          </motion.div>
        ))}
      </div>
      
      {/* Floating blobs */}
      <motion.div 
        className="absolute top-10 right-[15%] w-72 h-72 bg-indigo-400/10 rounded-full blur-[80px]"
        animate={{ y: [0, 30, 0], opacity: [0.5, 0.3, 0.5] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div 
        className="absolute bottom-10 left-[10%] w-96 h-96 bg-purple-500/10 rounded-full blur-[100px]"
        animate={{ y: [0, -40, 0], opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div 
        className="absolute top-1/3 left-[20%] w-64 h-64 bg-violet-400/10 rounded-full blur-[70px]"
        animate={{ x: [0, 30, 0], opacity: [0.4, 0.6, 0.4] }}
        transition={{ duration: 9, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
};
