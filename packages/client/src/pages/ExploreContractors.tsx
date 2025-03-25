import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { 
  Briefcase, Mail, Phone, Star, DollarSign, 
  User, Calendar, Building, X, Award, Clock, CheckCircle, FileText
} from 'lucide-react';

// Dummy data for contractors
const dummyContractors = [
  {
    name: "John Smith",
    email: "john.smith@example.com",
    phone: "+1 234-567-8900",
    address: "123 Main St, Boston, MA",
    skills: "Plumbing, Electrical",
    experience: "10 years",
    hourlyRate: "75",
    completedProjects: [
      {
        projectName: "Kitchen Renovation",
        completionDate: "2024-02-15",
        description: "Complete kitchen remodeling",
        feedback: "Excellent work and very professional"
      }
    ]
  },
  {
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 234-567-8901",
    address: "456 Oak Ave, Chicago, IL",
    skills: "Carpentry, Painting",
    experience: "8 years",
    hourlyRate: "65",
    completedProjects: [
      {
        projectName: "Office Renovation",
        completionDate: "2024-01-20",
        description: "Commercial office space renovation",
        feedback: "Great attention to detail"
      }
    ]
  }
];

// Add animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const cardVariants = {
  hidden: { 
    opacity: 0, 
    y: 20 
  },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  hover: {
    y: -10,
    scale: 1.02,
    transition: {
      duration: 0.2
    }
  }
};

// Add modal variants
const modalVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: { 
    opacity: 1, 
    scale: 1,
    transition: { type: "spring", duration: 0.5 }
  },
  exit: { 
    opacity: 0, 
    scale: 0.8,
    transition: { duration: 0.2 }
  }
};

const ExploreContractors = () => {
  const [selectedContractor, setSelectedContractor] = useState(null);
  const location = useLocation();
  const newContractor = location.state?.contractorData;
  
  // Combine dummy data with new contractor if exists
  const allContractors = newContractor 
    ? [newContractor, ...dummyContractors]
    : dummyContractors;

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-100 via-purple-50 to-white py-12 px-4">
      <motion.div 
        className="max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.h1 
          className="text-4xl font-bold text-center mb-12 bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-blue-600"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Explore Other Contractors
        </motion.h1>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
          variants={containerVariants}
        >
          {allContractors.map((contractor, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover="hover"
              onClick={() => setSelectedContractor(contractor)}
              className="cursor-pointer"
            >
              <Card className="shadow-lg backdrop-blur-sm bg-white/90">
                <CardHeader className="bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-t-xl">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <motion.div
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <User className="w-6 h-6" />
                    </motion.div>
                    {contractor.name}
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="p-6 space-y-4">
                  <div className="grid grid-cols-2 gap-4 hover:scale-105 transition-transform duration-200">
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-purple-600" />
                      <span>{contractor.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-purple-600" />
                      <span>{contractor.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <DollarSign className="w-4 h-4 text-purple-600" />
                      <span>${contractor.hourlyRate}/hr</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="w-4 h-4 text-purple-600" />
                      <span>{contractor.experience}</span>
                    </div>
                  </div>

                  <motion.div 
                    className="mt-4"
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    <h3 className="font-semibold mb-2">Recent Project</h3>
                    {contractor.completedProjects?.[0] && (
                      <div className="bg-purple-50 p-4 rounded-lg border border-purple-100 hover:border-purple-300 transition-colors duration-200">
                        <p className="font-medium">{contractor.completedProjects[0].projectName}</p>
                        <p className="text-sm text-gray-600 mt-1">
                          {contractor.completedProjects[0].description}
                        </p>
                        <p className="text-sm italic mt-2">
                          "{contractor.completedProjects[0].feedback}"
                        </p>
                      </div>
                    )}
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      {/* Contractor Detail Modal */}
      <AnimatePresence>
        {selectedContractor && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <motion.div
              className="bg-white rounded-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              <div className="sticky top-0 bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 rounded-t-xl">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold flex items-center gap-3">
                      <User className="w-8 h-8" />
                      {selectedContractor.name}
                    </h2>
                    <p className="text-purple-100 mt-2">{selectedContractor.skills}</p>
                  </div>
                  <Button
                    variant="ghost"
                    className="text-white hover:bg-white/20"
                    onClick={() => setSelectedContractor(null)}
                  >
                    <X className="w-6 h-6" />
                  </Button>
                </div>
              </div>

              <div className="p-6 space-y-8">
                {/* Contact Information */}
                <Section title="Contact Information" icon={<Mail className="w-5 h-5" />}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem icon={<Mail />} label="Email" value={selectedContractor.email} />
                    <InfoItem icon={<Phone />} label="Phone" value={selectedContractor.phone} />
                    <InfoItem icon={<Phone />} label="Alternative Phone" value={selectedContractor.alternatePhone} />
                    <InfoItem icon={<Building />} label="Address" value={selectedContractor.address} />
                  </div>
                </Section>

                {/* Professional Details */}
                <Section title="Professional Details" icon={<Briefcase className="w-5 h-5" />}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <InfoItem icon={<Clock />} label="Experience" value={selectedContractor.experience} />
                    <InfoItem icon={<DollarSign />} label="Hourly Rate" value={`$${selectedContractor.hourlyRate}/hr`} />
                    <InfoItem icon={<Calendar />} label="Availability" value={selectedContractor.availability} />
                    <InfoItem icon={<Award />} label="Skills" value={selectedContractor.skills} />
                  </div>
                </Section>

                {/* Completed Projects */}
                <Section title="Completed Projects" icon={<CheckCircle className="w-5 h-5" />}>
                  {selectedContractor.completedProjects?.map((project, index) => (
                    <div key={index} className="bg-purple-50 p-4 rounded-lg mb-4">
                      <h4 className="font-semibold text-lg">{project.projectName}</h4>
                      <p className="text-gray-600 mt-1">{project.description}</p>
                      <div className="mt-2 text-sm text-gray-500">
                        <p>Completed: {project.completionDate}</p>
                        <p className="italic mt-2">"{project.feedback}"</p>
                      </div>
                    </div>
                  ))}
                </Section>

                {/* Additional Information */}
                {selectedContractor.professionalSummary && (
                  <Section title="Professional Summary" icon={<FileText className="w-5 h-5" />}>
                    <p className="text-gray-700">{selectedContractor.professionalSummary}</p>
                  </Section>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Helper components for the modal
const Section = ({ title, icon, children }) => (
  <div className="space-y-4">
    <div className="flex items-center gap-2 border-b pb-2">
      {icon}
      <h3 className="text-xl font-semibold">{title}</h3>
    </div>
    {children}
  </div>
);

const InfoItem = ({ icon, label, value }) => (
  <div className="flex items-center gap-2">
    <span className="text-purple-600">{icon}</span>
    <span className="font-medium">{label}:</span>
    <span className="text-gray-700">{value || 'N/A'}</span>
  </div>
);

export default ExploreContractors;
