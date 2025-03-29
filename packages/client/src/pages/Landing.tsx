import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ClipboardCheck, CreditCard, FileText, LightbulbIcon, Shield, Users, Briefcase, Brain, Cpu } from "lucide-react";
import { Button } from "../components/ui/button";
import { Logo } from "../components/common/Logo";
import { TestimonialCarousel } from "../components/landing/TestimonialCarousel";
import { HowItWorks } from "../components/landing/HowItWorks";
import { Footer } from "../components/landing/Footer";
import { AnimatedBackground } from "../components/landing/AnimatedBackground";
import { useState, useEffect } from "react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    }
  }
};

const item = {
  hidden: { y: 20, opacity: 0 },
  show: { 
    y: 0, 
    opacity: 1,
    transition: { 
      type: "spring",
      stiffness: 100,
      damping: 10
    }
  }
};

const Landing = () => {
  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-b from-white to-gray-50">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md shadow-sm border-b border-gray-100">
        <div className="container flex justify-between items-center h-20 px-4 md:px-8">
          <div className="flex items-center gap-2">
            <Cpu className="h-6 w-6 text-indigo-600" />
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Contractor AI
            </h1>
          </div>
          <nav className="hidden md:flex items-center space-x-10 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-indigo-600 hover:scale-105 transition-all">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-indigo-600 hover:scale-105 transition-all">How It Works</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-indigo-600 hover:scale-105 transition-all">Testimonials</a>
          </nav>
          <div className="flex items-center space-x-5">
            <Link to="/dashboard-selector">
              <Button variant="outline" size="sm" className="px-6 shadow-sm border-gray-200 hover:border-indigo-300 hover:text-indigo-600 transition-colors">Login</Button>
            </Link>
            <Link to="/dashboard-selector">
              <Button size="sm" className="px-6 shadow-md hover:shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white transition-all">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16">
        {/* Animated Background */}
        <AnimatedBackground />
        
        <div className="container max-w-6xl mx-auto px-4 z-10">
          <motion.div
            className="text-center space-y-10 py-20 md:py-28"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 drop-shadow-sm"
              variants={item}
            >
              Scale Your Workforce, Not Your Overhead
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed"
              variants={item}
            >
              <span className="font-medium">Automated Contractor Onboarding & Payments Powered by AI and Payman</span>
            </motion.p>
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-6 mt-12"
              variants={item}
            >
              <Link to="/dashboard-selector">
                <Button size="lg" className="w-full md:w-auto px-8 py-6 text-base font-medium bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl transition-all duration-300 text-white">
                  Get Started 
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full md:w-auto px-8 py-6 text-base font-medium border-2 shadow-sm hover:shadow-md transition-all duration-300">
                Request a Demo
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative z-10 mt-8 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.8,
              ease: [0.25, 0.25, 0, 1]
            }}
          >
            <div className="relative transform hover:scale-[1.02] transition-transform duration-500">
              {/* Dashboard preview mockup */}
              <div className="bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
                <div className="h-6 bg-gray-100 flex items-center px-4">
                  <div className="flex space-x-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-500"></div>
                    <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                  </div>
                </div>
                <div className="p-1">
                  <div className="bg-gray-50 rounded-lg p-6 relative overflow-hidden">
                    <div className="grid grid-cols-12 gap-4">
                      {/* Sidebar mockup */}
                      <div className="col-span-3 bg-white rounded-lg shadow-sm h-64 p-4">
                        <div className="h-6 w-2/3 bg-indigo-100 rounded mb-4"></div>
                        <div className="space-y-3">
                          <div className="h-4 bg-gray-100 rounded"></div>
                          <div className="h-4 bg-indigo-100 rounded"></div>
                          <div className="h-4 bg-gray-100 rounded"></div>
                          <div className="h-4 bg-gray-100 rounded"></div>
                        </div>
                      </div>
                      
                      {/* Content mockup */}
                      <div className="col-span-9 space-y-4">
                        <div className="h-8 w-1/3 bg-gray-200 rounded"></div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="bg-white p-4 rounded-lg shadow-sm h-32">
                            <div className="h-4 w-1/2 bg-gray-100 rounded mb-3"></div>
                            <div className="h-8 w-1/3 bg-indigo-100 rounded mb-3"></div>
                            <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm h-32">
                            <div className="h-4 w-1/2 bg-gray-100 rounded mb-3"></div>
                            <div className="h-8 w-1/3 bg-green-100 rounded mb-3"></div>
                            <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                          </div>
                          <div className="bg-white p-4 rounded-lg shadow-sm h-32">
                            <div className="h-4 w-1/2 bg-gray-100 rounded mb-3"></div>
                            <div className="h-8 w-1/3 bg-purple-100 rounded mb-3"></div>
                            <div className="h-4 w-2/3 bg-gray-100 rounded"></div>
                          </div>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm h-40">
                          <div className="h-4 w-1/4 bg-gray-200 rounded mb-4"></div>
                          <div className="grid grid-cols-2 gap-4 h-28">
                            <div className="bg-gray-50 rounded">
                              <div className="h-full w-full flex flex-col justify-center items-center p-2">
                                <div className="h-8 w-8 bg-indigo-200 rounded-full mb-2"></div>
                                <div className="h-3 w-16 bg-gray-200 rounded"></div>
                                <div className="h-2 w-24 bg-gray-100 rounded mt-1"></div>
                              </div>
                            </div>
                            <div className="bg-gray-50 rounded">
                              <div className="h-full flex items-center p-2">
                                <div className="h-full w-full flex flex-col justify-between py-2">
                                  <div className="h-2 w-full bg-gray-200 rounded"></div>
                                  <div className="h-2 w-3/4 bg-gray-200 rounded"></div>
                                  <div className="h-2 w-5/6 bg-gray-200 rounded"></div>
                                  <div className="h-2 w-2/3 bg-gray-200 rounded"></div>
                                  <div className="h-2 w-4/5 bg-gray-200 rounded"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Enhanced glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/30 via-purple-500/30 to-violet-500/30 blur-xl opacity-70 -z-10 rounded-3xl animate-pulse"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-16 md:py-24 px-4 bg-white relative z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-3xl md:text-5xl font-display font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Powerful Features for Modern Businesses
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our all-in-one platform streamlines your contractor management and payment processes
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4">
            <FeatureCard 
              icon={<Users />}
              title="Contractor Onboarding"
              description="Easy registration with automated Payman AI payee creation"
              delay={0}
            />
            <FeatureCard 
              icon={<ClipboardCheck />}
              title="Task Assignment"
              description="AI-driven matching of contractors to specific tasks"
              delay={0.1}
            />
            <FeatureCard 
              icon={<CreditCard />}
              title="Automated Payments"
              description="Seamless payment processing via ACH/USDC"
              delay={0.2}
            />
            <FeatureCard 
              icon={<Shield />}
              title="Compliance & Tax"
              description="Automated tax info collection and compliance logging"
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="py-16 md:py-24 px-4 bg-gradient-to-b from-indigo-50 to-white relative z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <motion.h2 
              className="text-3xl md:text-5xl font-display font-bold mb-6 text-indigo-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our platform simplifies your contractor management in just a few steps
            </motion.p>
          </div>

          <HowItWorks />
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="testimonials" className="py-16 md:py-24 px-4 bg-white relative z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <motion.h2 
              className="text-3xl md:text-5xl font-display font-bold mb-6 text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What Our Customers Say
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Businesses across industries trust ContractorAI
            </motion.p>
          </div>

          {/* Testimonial carousel with arrows */}
          <TestimonialSlider />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 md:py-20 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative z-10 overflow-hidden">
        {/* Add decorative elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-10 pointer-events-none">
          <div className="absolute -right-24 -top-24 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
          <div className="absolute -left-24 -bottom-24 w-96 h-96 rounded-full bg-white/20 blur-3xl"></div>
        </div>
        <div className="container max-w-6xl mx-auto relative z-10">
          <motion.div 
            className="text-center space-y-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-5xl font-display font-bold">Ready to Transform Your Contractor Management?</h2>
            <p className="text-xl max-w-2xl mx-auto text-primary-foreground/90 leading-relaxed">
              Join innovative businesses saving time and reducing overhead with ContractorAI
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6 mt-10">
              <Link to="/dashboard-selector">
                <Button 
                  size="lg"
                  variant="secondary"
                  className="w-full md:w-auto px-8 py-6 text-base font-medium shadow-lg hover:shadow-xl transition-all"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full md:w-auto px-8 py-6 text-base font-medium bg-transparent border-white/20 hover:bg-white/10 text-white shadow-lg hover:shadow-xl transition-all"
              >
                Schedule a Demo
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
};

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard = ({ icon, title, description, delay }: FeatureCardProps) => {
  return (
    <motion.div 
      className="bg-white p-8 rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-indigo-100 group hover:-translate-y-2"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: [0.25, 0.25, 0, 1]
      }}
    >
      <div className="h-14 w-14 rounded-xl bg-indigo-100 text-indigo-600 flex items-center justify-center mb-6 group-hover:bg-indigo-200 group-hover:scale-110 transition-all duration-300">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-3">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <ul className="mt-6 space-y-3">
        <li className="flex items-center gap-3 text-sm text-muted-foreground">
          <Check className="h-5 w-5 text-indigo-600" /> 
          <span>Easy to implement</span>
        </li>
        <li className="flex items-center gap-3 text-sm text-muted-foreground">
          <Check className="h-5 w-5 text-indigo-600" /> 
          <span>Automated workflows</span>
        </li>
        <li className="flex items-center gap-3 text-sm text-muted-foreground">
          <Check className="h-5 w-5 text-indigo-600" /> 
          <span>Time-saving solution</span>
        </li>
      </ul>
    </motion.div>
  );
};

const TestimonialSlider = () => {
  // Sample testimonial data with avatar images
  const testimonials = [
    {
      name: "Sarah Johnson",
      position: "CEO, TechInnovate Inc.",
      avatar: "https://i.pravatar.cc/150?img=32", // Random female avatar
      text: "ContractorAI has revolutionized how we manage our global contractor workforce. The automated onboarding and payments have cut our administrative overhead by 75%, and the AI matching delivers better talent for our projects."
    },
    {
      name: "David Rodriguez",
      position: "Operations Director, Global Consulting Group",
      avatar: "https://i.pravatar.cc/150?img=68", // Random male avatar
      text: "Managing compliance across different jurisdictions was a nightmare before ContractorAI. Now we have a centralized system that automatically handles tax documents and compliance requirements. The time savings alone is worth the investment."
    },
    {
      name: "Jennifer Chen",
      position: "Financial Controller, Creative Solutions",
      avatar: "https://i.pravatar.cc/150?img=47", // Random female avatar
      text: "The payment automation through ContractorAI has been a game-changer. We've eliminated payment delays, contractors get paid faster, and our finance team spends 80% less time on payment processing. The crypto and ACH options give our contractors flexibility they love."
    },
    {
      name: "Michael Thompson",
      position: "CTO, Digital Frontiers",
      avatar: "https://i.pravatar.cc/150?img=12", // Random male avatar
      text: "As a tech company, we appreciate ContractorAI's intelligent approach to contractor management. The AI-powered matching algorithm consistently finds us the right talent for specialized projects, saving us countless hours of screening candidates."
    },
    {
      name: "Aisha Patel",
      position: "HR Director, Global Ventures Ltd",
      avatar: "https://i.pravatar.cc/150?img=25", // Random female avatar
      text: "Our contractor compliance has improved dramatically since implementing ContractorAI. The automated tax form collection and verification ensures we're always meeting regulatory requirements across multiple countries."
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  // Auto-play functionality
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (isAutoPlaying) {
      interval = setInterval(() => {
        nextTestimonial();
      }, 5000); // Change testimonial every 5 seconds
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentIndex, isAutoPlaying]);

  // Pause auto-play on hover
  const handleMouseEnter = () => setIsAutoPlaying(false);
  const handleMouseLeave = () => setIsAutoPlaying(true);

  const nextTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  return (
    <div 
      className="relative max-w-4xl mx-auto px-4"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <motion.div 
        className="bg-white p-8 md:p-12 rounded-2xl shadow-lg border border-gray-100 min-h-[300px] overflow-hidden"
        initial={{ boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)" }}
        whileHover={{ 
          boxShadow: "0 20px 25px -5px rgba(79, 70, 229, 0.1), 0 10px 10px -5px rgba(79, 70, 229, 0.04)",
          borderColor: "#e0e7ff"
        }}
        transition={{ duration: 0.3 }}
      >
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ 
            duration: 0.5,
            type: "spring",
            stiffness: 100,
            damping: 12
          }}
          className="text-center"
        >
          <motion.div 
            className="mx-auto mb-8 h-24 w-24 rounded-full overflow-hidden border-4 border-indigo-100"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              boxShadow: "0 0 0 4px rgba(99, 102, 241, 0.2)"
            }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <img 
              src={testimonials[currentIndex].avatar} 
              alt={testimonials[currentIndex].name}
              className="h-full w-full object-cover"
            />
          </motion.div>
          
          <motion.p 
            className="text-xl text-gray-700 italic mb-8 leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            "{testimonials[currentIndex].text}"
          </motion.p>
          
          <motion.div 
            className="mb-4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <h4 className="font-semibold text-xl">{testimonials[currentIndex].name}</h4>
            <p className="text-muted-foreground">{testimonials[currentIndex].position}</p>
          </motion.div>
          
          <motion.div 
            className="flex justify-center text-amber-400 space-x-1"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.5 }}
          >
            {[...Array(5)].map((_, i) => (
              <motion.svg 
                key={i} 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-6 w-6" 
                viewBox="0 0 20 20" 
                fill="currentColor"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + (i * 0.1), duration: 0.3 }}
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </motion.svg>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Navigation dots with animation */}
      <div className="flex justify-center mt-8 space-x-2">
        {testimonials.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              index === currentIndex ? 'bg-indigo-600 w-6' : 'bg-gray-300 hover:bg-gray-400 w-3'
            }`}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
            aria-label={`Go to testimonial ${index + 1}`}
          />
        ))}
      </div>

      {/* Animated navigation arrows */}
      <motion.button 
        onClick={prevTestimonial}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 bg-white p-3 rounded-full shadow-md border border-gray-100 text-gray-600 z-10"
        whileHover={{ 
          scale: 1.1, 
          backgroundColor: "#EEF2FF",
          borderColor: "#C7D2FE", 
          color: "#4F46E5",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)"
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: "-1rem", opacity: 1 }}
        transition={{ duration: 0.5 }}
        aria-label="Previous testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
      </motion.button>
      
      <motion.button 
        onClick={nextTestimonial}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 bg-white p-3 rounded-full shadow-md border border-gray-100 text-gray-600 z-10"
        whileHover={{ 
          scale: 1.1, 
          backgroundColor: "#EEF2FF",
          borderColor: "#C7D2FE", 
          color: "#4F46E5",
          boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1)" 
        }}
        whileTap={{ scale: 0.95 }}
        initial={{ x: 50, opacity: 0 }}
        animate={{ x: "1rem", opacity: 1 }}
        transition={{ duration: 0.5 }}
        aria-label="Next testimonial"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </motion.button>
      
      {/* Auto-play indicator */}
      <motion.div 
        className="absolute bottom-0 left-0 h-1 bg-indigo-500 rounded"
        initial={{ width: "0%" }}
        animate={{ width: isAutoPlaying ? "100%" : "0%" }}
        transition={{ 
          duration: isAutoPlaying ? 5 : 0.3,
          ease: "linear",
          repeat: isAutoPlaying ? Infinity : 0,
          repeatType: "loop"
        }}
      />
    </div>
  );
};

export default Landing;
