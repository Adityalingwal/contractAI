
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Check, ClipboardCheck, CreditCard, FileText, LightbulbIcon, Shield, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/common/Logo";
import { TestimonialCarousel } from "@/components/landing/TestimonialCarousel";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Footer } from "@/components/landing/Footer";
import { AnimatedBackground } from "@/components/landing/AnimatedBackground";

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
    <div className="min-h-screen relative overflow-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md shadow-subtle">
        <div className="container flex justify-between items-center h-16 px-4 md:px-6">
          <Logo />
          <nav className="hidden md:flex items-center space-x-8 text-sm font-medium">
            <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
            <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How It Works</a>
            <a href="#testimonials" className="text-muted-foreground hover:text-foreground transition-colors">Testimonials</a>
          </nav>
          <div className="flex items-center space-x-4">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">Login</Button>
            </Link>
            <Link to="/dashboard">
              <Button size="sm">Get Started</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center pt-20 pb-10">
        {/* Animated Background */}
        <AnimatedBackground />
        
        <div className="container max-w-6xl mx-auto px-4 z-10">
          <motion.div
            className="text-center space-y-8 py-24"
            variants={container}
            initial="hidden"
            animate="show"
          >
            <motion.h1 
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-display font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600"
              variants={item}
            >
              Scale Your Workforce, Not Your Overhead
            </motion.h1>
            <motion.p 
              className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto"
              variants={item}
            >
              <span className="font-medium">Automated Contractor Onboarding & Payments Powered by AI and Payman</span>
            </motion.p>
            <motion.div 
              className="flex flex-col md:flex-row items-center justify-center gap-4 mt-8 md:mt-12"
              variants={item}
            >
              <Link to="/dashboard">
                <Button size="lg" className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-600/90 hover:to-purple-600/90">
                  Get Started 
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="w-full md:w-auto border-2">
                Request a Demo
              </Button>
            </motion.div>
          </motion.div>
          
          <motion.div
            className="relative z-10 mt-12 max-w-5xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ 
              duration: 0.7, 
              delay: 0.8,
              ease: [0.25, 0.25, 0, 1]
            }}
          >
            <div className="relative">
              {/* Dashboard preview mockup */}
              <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-gray-200">
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
              
              {/* Glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-violet-500/20 blur-xl opacity-50 -z-10 rounded-3xl"></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 md:py-32 px-4 bg-white relative z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Powerful Features for Modern Businesses
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Our all-in-one platform streamlines your contractor management and payment processes
            </motion.p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
      <section id="how-it-works" className="py-20 md:py-32 px-4 bg-indigo-50 relative z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              How It Works
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
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
      <section id="testimonials" className="py-20 md:py-32 px-4 bg-white relative z-10">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <motion.h2 
              className="text-3xl md:text-4xl font-display font-bold mb-4"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              What Our Customers Say
            </motion.h2>
            <motion.p 
              className="text-xl text-muted-foreground max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Businesses across industries trust ContractorAI
            </motion.p>
          </div>

          <TestimonialCarousel />
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white relative z-10">
        <div className="container max-w-6xl mx-auto">
          <motion.div 
            className="text-center space-y-6"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-display font-bold">Ready to Transform Your Contractor Management?</h2>
            <p className="text-xl max-w-2xl mx-auto text-primary-foreground/90">
              Join innovative businesses saving time and reducing overhead with ContractorAI
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-4 mt-6">
              <Link to="/dashboard">
                <Button 
                  size="lg"
                  variant="secondary"
                  className="w-full md:w-auto"
                >
                  Get Started Now
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                size="lg"
                className="w-full md:w-auto bg-transparent border-white/20 hover:bg-white/10 text-white"
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
      className="bg-white p-6 rounded-2xl shadow-subtle hover:shadow-card transition-all duration-300 border border-border"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.5, 
        delay: delay,
        ease: [0.25, 0.25, 0, 1]
      }}
    >
      <div className="h-12 w-12 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center mb-4">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
      <ul className="mt-4 space-y-2">
        <li className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-indigo-600" /> 
          <span>Easy to implement</span>
        </li>
        <li className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-indigo-600" /> 
          <span>Automated workflows</span>
        </li>
        <li className="flex items-center gap-2 text-sm text-muted-foreground">
          <Check className="h-4 w-4 text-indigo-600" /> 
          <span>Time-saving solution</span>
        </li>
      </ul>
    </motion.div>
  );
};

export default Landing;
