import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Search,
  Filter,
  DollarSign,
  Star,
  Clock,
  Briefcase,
  Mail,
  Phone,
  X,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";

interface ContractorProfile {
  id: number;
  name: string;
  email: string;
  phone: string;
  experience: string;
  hourlyRate: number;
  availability: string;
  completedProjects: {
    projectName: string;
    clientName: string;
    completionDate: string;
    description: string;
    feedback: string;
  }[];
  professionalSummary: string;
}

// Add this dummy data after the ContractorProfile interface and before the BusinessDashboard component
const dummyContractors: ContractorProfile[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    experience: "5-10 years",
    hourlyRate: 75,
    availability: "full-time",
    completedProjects: [
      {
        projectName: "E-commerce Platform Redesign",
        clientName: "TechCorp Inc.",
        completionDate: "2023-12-15",
        description: "Complete redesign of client's e-commerce platform",
        feedback: "Excellent work and communication"
      }
    ],
    professionalSummary: "Senior full-stack developer specialized in React and Node.js with extensive e-commerce experience."
  },
  {
    id: 2,
    name: "Michael Chen",
    email: "m.chen@example.com",
    phone: "+1 (555) 234-5678",
    experience: "3-5 years",
    hourlyRate: 60,
    availability: "contract",
    completedProjects: [
      {
        projectName: "Mobile App Development",
        clientName: "HealthTech Solutions",
        completionDate: "2024-01-20",
        description: "Healthcare monitoring mobile application",
        feedback: "Great attention to detail"
      }
    ],
    professionalSummary: "Mobile app developer with focus on React Native and iOS development. Healthcare industry expert."
  },
  {
    id: 3,
    name: "Emily Rodriguez",
    email: "e.rodriguez@example.com",
    phone: "+1 (555) 345-6789",
    experience: "10+ years",
    hourlyRate: 95,
    availability: "freelance",
    completedProjects: [
      {
        projectName: "AI Integration Project",
        clientName: "DataSmart Analytics",
        completionDate: "2024-02-01",
        description: "Implementation of ML models in production",
        feedback: "Outstanding technical expertise"
      }
    ],
    professionalSummary: "AI/ML specialist with extensive experience in Python and TensorFlow. Led multiple successful AI implementations."
  }
];

// Add this new interface for the modal state
interface ProfileModalState {
  isOpen: boolean;
  contractor: ContractorProfile | null;
}

const BusinessDashboard = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    hourlyRate: '',
    experience: '',
    availability: ''
  });

  // This would be replaced with actual API call to fetch contractor profiles
  const [contractors, setContractors] = useState<ContractorProfile[]>([]);

  // Add new state for the profile modal
  const [profileModal, setProfileModal] = useState<ProfileModalState>({
    isOpen: false,
    contractor: null
  });

  // Replace the useEffect with this updated version
  useEffect(() => {
    // Simulating API call with dummy data
    setContractors(dummyContractors);
  }, []);

  // Add this function to filter contractors based on search query and filters
  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch = contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.professionalSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.experience.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesHourlyRate = !filters.hourlyRate || (() => {
      const [min, max] = filters.hourlyRate.split('-').map(num => num === '+' ? Infinity : Number(num));
      return contractor.hourlyRate >= min && (max === Infinity ? true : contractor.hourlyRate <= max);
    })();

    const matchesExperience = !filters.experience || contractor.experience.includes(filters.experience);
    const matchesAvailability = !filters.availability || contractor.availability === filters.availability;

    return matchesSearch && matchesHourlyRate && matchesExperience && matchesAvailability;
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (value: string, filterType: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const cardVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
      transition: {
        type: "spring",
        stiffness: 400,
        damping: 10
      }
    }
  };

  // Add this new component for the profile modal
  const ProfileModal = ({ contractor, onClose }: { contractor: ContractorProfile; onClose: () => void }) => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto"
      >
        <div className="p-6 space-y-6">
          {/* Header */}
          <div className="flex justify-between items-center border-b pb-4">
            <div className="flex items-center gap-4">
              <div className="h-16 w-16 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-2xl font-bold">
                {contractor.name[0]}
              </div>
              <div>
                <h2 className="text-2xl font-bold text-purple-900">{contractor.name}</h2>
                <p className="text-purple-600">{contractor.experience}</p>
              </div>
            </div>
            <Button variant="outline" onClick={onClose} className="rounded-full p-2">
              <X className="h-4 w-4" />
            </Button>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-900">Contact Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-purple-500" />
                <span>{contractor.email}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-purple-500" />
                <span>{contractor.phone}</span>
              </div>
            </div>
          </div>

          {/* Professional Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-900">Professional Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-purple-500" />
                <span>${contractor.hourlyRate}/hr</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-purple-500" />
                <span>{contractor.availability}</span>
              </div>
            </div>
            <div className="bg-purple-50 p-4 rounded-lg">
              <p className="text-purple-900">{contractor.professionalSummary}</p>
            </div>
          </div>

          {/* Completed Projects */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-purple-900">Completed Projects</h3>
            <div className="space-y-4">
              {contractor.completedProjects.map((project, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg space-y-2">
                  <h4 className="font-semibold text-purple-900">{project.projectName}</h4>
                  <p className="text-sm text-gray-600">Client: {project.clientName}</p>
                  <p className="text-sm text-gray-600">Completed: {project.completionDate}</p>
                  <p className="text-sm">{project.description}</p>
                  <div className="flex items-center gap-2 text-yellow-500">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm italic">{project.feedback}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-purple-50 via-white to-purple-50 py-12 px-4"
    >
      <Card className="max-w-6xl mx-auto shadow-xl border-0 overflow-hidden">
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <CardHeader className="text-center pb-8 pt-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10"></div>
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CardTitle className="text-4xl font-bold text-white mb-4">
                Find Expert Contractors
              </CardTitle>
              <p className="text-purple-100 text-lg">
                Connect with skilled professionals for your projects
              </p>
            </motion.div>
          </CardHeader>
        </motion.div>

        <CardContent className="p-8">
          <motion.div className="space-y-8" variants={containerVariants}>
            {/* Search Box */}
            <motion.div variants={itemVariants} className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-purple-400" />
              <Input
                placeholder="Search contractors by name or experience..."
                className="pl-10 pr-4 py-6 text-lg shadow-md hover:shadow-lg transition-shadow border-purple-100 focus:border-purple-500"
                value={searchQuery}
                onChange={handleSearch}
              />
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants} className="bg-white p-6 rounded-xl shadow-md">
              <h3 className="text-lg font-semibold mb-4 text-purple-800">Filter Results</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-2">
                  <Label className="text-sm font-medium text-purple-700">Hourly Rate</Label>
                  <Select onValueChange={(value) => handleFilterChange(value, 'hourlyRate')}>
                    <SelectTrigger className="border-purple-100 hover:border-purple-300 transition-colors">
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-25">$0 - $25</SelectItem>
                      <SelectItem value="26-50">$26 - $50</SelectItem>
                      <SelectItem value="51-100">$51 - $100</SelectItem>
                      <SelectItem value="100+">$100+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-purple-700">Experience</Label>
                  <Select onValueChange={(value) => handleFilterChange(value, 'experience')}>
                    <SelectTrigger className="border-purple-100 hover:border-purple-300 transition-colors">
                      <SelectValue placeholder="Select experience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="0-2">0-2 years</SelectItem>
                      <SelectItem value="3-5">3-5 years</SelectItem>
                      <SelectItem value="5-10">5-10 years</SelectItem>
                      <SelectItem value="10+">10+ years</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label className="text-sm font-medium text-purple-700">Availability</Label>
                  <Select onValueChange={(value) => handleFilterChange(value, 'availability')}>
                    <SelectTrigger className="border-purple-100 hover:border-purple-300 transition-colors">
                      <SelectValue placeholder="Select availability" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="full-time">Full-time</SelectItem>
                      <SelectItem value="part-time">Part-time</SelectItem>
                      <SelectItem value="contract">Contract</SelectItem>
                      <SelectItem value="freelance">Freelance</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>

            {/* Results Section */}
            <motion.div variants={itemVariants} className="mt-8 space-y-6">
              {filteredContractors.map((contractor, index) => (
                <motion.div
                  key={contractor.id}
                  variants={cardVariants}
                  whileHover="hover"
                  custom={index}
                >
                  <Card className="p-6 bg-white/50 backdrop-blur-sm border border-purple-100">
                    <div className="flex flex-col md:flex-row justify-between gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-3">
                          <div className="h-12 w-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center text-white text-xl font-bold">
                            {contractor.name[0]}
                          </div>
                          <div>
                            <h3 className="text-xl font-semibold text-purple-900">{contractor.name}</h3>
                            <p className="text-purple-600">{contractor.experience}</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-4 text-gray-600">
                          <span className="flex items-center gap-1">
                            <Briefcase className="w-4 h-4" />
                            {contractor.completedProjects.length} Projects
                          </span>
                          <span className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            {contractor.availability}
                          </span>
                        </div>
                        <p className="text-gray-600 line-clamp-2">
                          {contractor.professionalSummary}
                        </p>
                      </div>
                      <div className="flex flex-col items-end gap-4">
                        <div className="text-right">
                          <p className="text-2xl font-bold text-purple-600">
                            ${contractor.hourlyRate}
                            <span className="text-sm text-purple-400">/hr</span>
                          </p>
                        </div>
                        <Button 
                          className="bg-purple-600 hover:bg-purple-700 text-white w-full"
                          onClick={() => setProfileModal({ isOpen: true, contractor })}
                        >
                          View Profile
                        </Button>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </CardContent>
      </Card>

      {/* Add the modal to the main return statement, just before the closing </motion.div> */}
      {profileModal.isOpen && profileModal.contractor && (
        <ProfileModal 
          contractor={profileModal.contractor} 
          onClose={() => setProfileModal({ isOpen: false, contractor: null })} 
        />
      )}
    </motion.div>
  );
};

export default BusinessDashboard;
