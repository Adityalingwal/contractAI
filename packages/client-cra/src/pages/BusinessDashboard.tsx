import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './BusinessDashboard.css';
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
  Home,
  CreditCard,
  FileText,
  Bell,
  PlusCircle,
  CheckCircle,
  AlertCircle,
  XCircle,
  Calendar,
  Users,
  MessageSquare,
  Info,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/select";
import { Badge } from '../components/ui/badge';
import { ScrollArea } from '../components/ui/scroll-area';
import { Textarea } from '../components/ui/textarea';
import { getAllContracts } from '../api/api'

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

// Add this new interface for notifications
interface Notification {
  id: number;
  type: 'success' | 'error' | 'warning' | 'info';
  title: string;
  message: string;
  date: string;
  isRead: boolean;
  relatedTo?: string;
}

// Add dummy notifications data
const dummyNotifications: Notification[] = [
  {
    id: 1,
    type: 'success',
    title: 'Payment Approved',
    message: 'Your payment of $750 to Sarah Johnson has been approved and is being processed.',
    date: '2024-07-10 09:15 AM',
    isRead: false,
    relatedTo: 'payment'
  },
  {
    id: 2,
    type: 'success',
    title: 'Payment Sent',
    message: 'Payment of $850 has been successfully sent to Michael Chen.',
    date: '2024-07-09 02:30 PM',
    isRead: true,
    relatedTo: 'payment'
  },
  {
    id: 3,
    type: 'error',
    title: 'Payment Failed',
    message: 'Payment to Emily Rodriguez failed. Please check your payment method.',
    date: '2024-07-08 11:45 AM',
    isRead: false,
    relatedTo: 'payment'
  },
  {
    id: 4,
    type: 'info',
    title: 'Contract Accepted',
    message: 'Emily Rodriguez has accepted your contract proposal for the AI Integration Project.',
    date: '2024-07-07 03:20 PM',
    isRead: true,
    relatedTo: 'contract'
  },
  {
    id: 5,
    type: 'warning',
    title: 'Contract Expiring Soon',
    message: 'Your contract with Sarah Johnson will expire in 5 days. Consider renewal.',
    date: '2024-07-06 10:10 AM',
    isRead: false,
    relatedTo: 'contract'
  },
  {
    id: 6,
    type: 'info',
    title: 'New Message',
    message: 'You have received a new message from Michael Chen regarding the Mobile App project.',
    date: '2024-07-05 04:45 PM',
    isRead: true,
    relatedTo: 'message'
  },
  {
    id: 7,
    type: 'success',
    title: 'Milestone Completed',
    message: 'Sarah Johnson has completed the first milestone for the E-commerce Platform Redesign.',
    date: '2024-07-04 01:30 PM',
    isRead: false,
    relatedTo: 'contract'
  },
  {
    id: 8,
    type: 'warning',
    title: 'Upcoming Meeting',
    message: 'Reminder: You have a scheduled meeting with Emily Rodriguez tomorrow at 2:00 PM.',
    date: '2024-07-03 09:00 AM',
    isRead: true,
    relatedTo: 'meeting'
  }
];

const BusinessDashboard = () => {
  // State for search and filters
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    hourlyRate: '',
    experience: '',
    availability: ''
  });
  
  // Add state to track active sidebar item
  const [activeItem, setActiveItem] = useState('find-contractors');
  
  // Add state for the contract form
  const [contractForm, setContractForm] = useState({
    name: '',
    description: '',
    requiredExperience: '',
    location: '',
    startDate: '',
    endDate: '',
    paymentType: 'hourly',
    paymentAmount: '',
    skills: ''
  });

  // This would be replaced with actual API call to fetch contractor profiles
  const [contractors, setContractors] = useState<ContractorProfile[]>([]);

  // Add new state for the profile modal
  const [profileModal, setProfileModal] = useState<ProfileModalState>({
    isOpen: false,
    contractor: null
  });

  // Add notification state
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');

  // Update useEffect to also load notifications
  useEffect(() => {
    // Simulating API calls with dummy data
    setContractors(dummyContractors);
    setNotifications(dummyNotifications);
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setContractForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContractSubmit = async(e: React.FormEvent) => {
    e.preventDefault();

    const response = await getAllContracts()

    if(!response.message){
      alert('fetched successfully')
    }
 
  
    alert('Contract posted successfully!');
    setContractForm({
      name: '',
      description: '',
      requiredExperience: '',
      location: '',
      startDate: '',
      endDate: '',
      paymentType: 'hourly',
      paymentAmount: '',
      skills: ''
    });
  };

  // Add a function to mark notifications as read
  const markAsRead = (id: number) => {
    setNotifications(prev => 
      prev.map(notification => 
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  // Add a function to filter notifications
  const getFilteredNotifications = () => {
    if (activeFilter === 'all') {
      return notifications;
    }
    return notifications.filter(notification => notification.relatedTo === activeFilter);
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

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
    <div className="flex h-screen bg-background">
      {/* Enhanced Left Sidebar - updated with more professional colors */}
      <motion.div 
        className="w-64 border-r bg-card flex flex-col shadow-sm"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg text-primary">Business Portal</h3>
          </div>
        </div>
        
        <div className="py-4 flex-grow">
          <nav className="space-y-2 px-2">
            <Button 
              variant={activeItem === 'find-contractors' ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveItem('find-contractors')}
            >
              <Briefcase className="h-4 w-4 mr-2" />
              <span>Find Contractors</span>
            </Button>
            
            <Button 
              variant={activeItem === 'post-contract' ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveItem('post-contract')}
            >
              <PlusCircle className="h-4 w-4 mr-2" />
              <span>Post a Contract</span>
            </Button>
            
            <Button 
              variant={activeItem === 'contract-status' ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveItem('contract-status')}
            >
              <FileText className="h-4 w-4 mr-2" />
              <span>Contract Status</span>
            </Button>
            
            <Button 
              variant={activeItem === 'send-payment' ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveItem('send-payment')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              <span>Send Payment</span>
            </Button>
            
            <Button 
              variant={activeItem === 'notifications' ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveItem('notifications')}
            >
              <Bell className="h-4 w-4 mr-2" />
              <span>Notifications</span>
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-auto">{unreadCount}</Badge>
              )}
            </Button>
          </nav>
        </div>
        
        {/* Home link at the bottom */}
        <div className="px-2 py-4 border-t mt-auto">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              <span>Return to Home</span>
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Main Content - updated with more professional styling */}
      <main className="flex-1 overflow-auto bg-background">
        {activeItem === 'find-contractors' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="p-6"
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">Find Expert Contractors</CardTitle>
                <p className="text-muted-foreground">Connect with skilled professionals for your projects</p>
              </CardHeader>
              <CardContent>
                {/* Search Box */}
                <motion.div variants={itemVariants} className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      className="pl-10"
                      placeholder="Search contractors by name or experience..."
                      value={searchQuery}
                      onChange={handleSearch}
                    />
                  </div>
                </motion.div>

                {/* Filters */}
                <motion.div variants={itemVariants} className="mb-6 space-y-4">
                  <h3 className="text-lg font-medium">Filter Results</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <Label className="mb-2 block">Hourly Rate</Label>
                      <Select onValueChange={(value) => handleFilterChange(value, 'hourlyRate')}>
                        <SelectTrigger>
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

                    <div>
                      <Label className="mb-2 block">Experience</Label>
                      <Select onValueChange={(value) => handleFilterChange(value, 'experience')}>
                        <SelectTrigger>
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

                    <div>
                      <Label className="mb-2 block">Availability</Label>
                      <Select onValueChange={(value) => handleFilterChange(value, 'availability')}>
                        <SelectTrigger>
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
              </CardContent>
            </Card>

            {/* Results Section */}
            <motion.div variants={itemVariants}>
              {filteredContractors.length === 0 ? (
                <Card className="p-12 text-center">
                  <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-medium text-primary mb-2">No contractors found</h3>
                  <p className="text-muted-foreground">Try adjusting your search or filters</p>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredContractors.map((contractor) => (
                    <motion.div
                      key={contractor.id}
                      variants={cardVariants}
                      whileHover="hover"
                    >
                      <Card className="h-full flex flex-col">
                        <CardHeader>
                          <div className="flex items-center gap-4">
                            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
                              {contractor.name[0]}
                            </div>
                            <div>
                              <CardTitle className="text-lg">{contractor.name}</CardTitle>
                              <p className="text-sm text-muted-foreground">{contractor.experience}</p>
                            </div>
                          </div>
                        </CardHeader>
                        
                        <CardContent className="flex-grow">
                          <div className="flex items-center gap-4 mb-3">
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Briefcase className="h-3 w-3" />
                              {contractor.completedProjects.length} Projects
                            </Badge>
                            <Badge variant="outline" className="flex items-center gap-1">
                              <Clock className="h-3 w-3" />
                              {contractor.availability}
                            </Badge>
                          </div>
                          
                          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                            {contractor.professionalSummary}
                          </p>
                          
                          <div className="text-lg font-medium text-primary">
                            ${contractor.hourlyRate}<span className="text-sm text-muted-foreground">/hr</span>
                          </div>
                        </CardContent>
                        
                        <div className="p-4 pt-0 mt-auto">
                          <Button 
                            variant="outline"
                            className="w-full"
                            onClick={() => setProfileModal({ isOpen: true, contractor })}
                          >
                            View Profile
                          </Button>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}

        {activeItem === 'post-contract' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="p-6"
          >
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">Post a New Contract</CardTitle>
                <p className="text-muted-foreground">Find the perfect professional for your project</p>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleContractSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="name">Contract Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={contractForm.name}
                        onChange={handleInputChange}
                        placeholder="E.g., Website Redesign Project"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="requiredExperience">Required Experience</Label>
                      <Select name="requiredExperience" onValueChange={(value) => setContractForm(prev => ({ ...prev, requiredExperience: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select experience level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="0-2 years">0-2 years</SelectItem>
                          <SelectItem value="3-5 years">3-5 years</SelectItem>
                          <SelectItem value="5-10 years">5-10 years</SelectItem>
                          <SelectItem value="10+ years">10+ years</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        name="location"
                        value={contractForm.location}
                        onChange={handleInputChange}
                        placeholder="E.g., Remote, New York, etc."
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="startDate">Start Date</Label>
                      <Input
                        id="startDate"
                        name="startDate"
                        type="date"
                        value={contractForm.startDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="endDate">End Date</Label>
                      <Input
                        id="endDate"
                        name="endDate"
                        type="date"
                        value={contractForm.endDate}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="paymentAmount">Payment Amount ($)</Label>
                      <Input
                        id="paymentAmount"
                        name="paymentAmount"
                        type="number"
                        value={contractForm.paymentAmount}
                        onChange={handleInputChange}
                        placeholder="E.g., 25"
                        required
                      />
                    </div>
                    
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="description">Project Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={contractForm.description}
                        onChange={handleInputChange}
                        rows={5}
                        placeholder="Describe the project, requirements, and expectations..."
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      Post Your Contract
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Notifications panel */}
        {activeItem === 'notifications' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="p-6"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">Notifications Center</CardTitle>
                <p className="text-muted-foreground">Stay updated on your contracts and payments</p>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-muted-foreground">{unreadCount} unread</span>
                    {unreadCount > 0 && (
                      <Button 
                        variant="ghost" 
                        size="sm"
                        className="text-xs text-primary hover:text-primary/80 transition-colors font-medium"
                        onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
                      >
                        Mark all as read
                      </Button>
                    )}
                  </div>
                </div>
                
                <div className="flex gap-2 overflow-x-auto pb-4">
                  <Button
                    variant={activeFilter === 'all' ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter('all')}
                  >
                    All
                  </Button>
                  <Button
                    variant={activeFilter === 'payment' ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter('payment')}
                  >
                    Payments
                  </Button>
                  <Button
                    variant={activeFilter === 'contract' ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter('contract')}
                  >
                    Contracts
                  </Button>
                  <Button
                    variant={activeFilter === 'message' ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter('message')}
                  >
                    Messages
                  </Button>
                  <Button
                    variant={activeFilter === 'meeting' ? "secondary" : "outline"}
                    size="sm"
                    onClick={() => setActiveFilter('meeting')}
                  >
                    Meetings
                  </Button>
                </div>
                
                <div className="border rounded-md">
                  {getFilteredNotifications().length === 0 ? (
                    <div className="p-12 text-center">
                      <Bell className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                      <p className="text-muted-foreground">No notifications to display</p>
                    </div>
                  ) : (
                    <ScrollArea className="max-h-[600px]">
                      <div className="divide-y">
                        {getFilteredNotifications().map((notification) => (
                          <motion.div 
                            key={notification.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-4 relative ${!notification.isRead ? 'bg-muted/40' : ''}`}
                          >
                            <div className="flex gap-4">
                              <div className={`flex-shrink-0 rounded-full p-2 ${
                                notification.type === 'success' ? 'bg-green-100 text-green-600' :
                                notification.type === 'error' ? 'bg-red-100 text-red-600' :
                                notification.type === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                                'bg-blue-100 text-blue-600'
                              }`}>
                                {notification.type === 'success' && <CheckCircle className="h-5 w-5" />}
                                {notification.type === 'error' && <XCircle className="h-5 w-5" />}
                                {notification.type === 'warning' && <AlertCircle className="h-5 w-5" />}
                                {notification.type === 'info' && <Info className="h-5 w-5" />}
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <h3 className={`font-medium ${!notification.isRead ? 'text-primary' : ''}`}>
                                    {notification.title}
                                  </h3>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    className="h-6 w-6"
                                    onClick={() => markAsRead(notification.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">{notification.message}</p>
                                <p className="text-xs text-muted-foreground mt-2">{notification.date}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}
        
        {/* Placeholder for other sections */}
        {(activeItem === 'contract-status' || activeItem === 'send-payment') && (
          <div className="p-6 text-center">
            <Card className="p-12">
              <CardContent>
                <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-medium text-primary mb-2">
                  {activeItem === 'contract-status' ? 'Contract Status' : 'Send Payment'}
                </h3>
                <p className="text-muted-foreground">This feature is coming soon.</p>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      {/* Profile Modal - keep this existing implementation */}
      {profileModal.isOpen && profileModal.contractor && (
        <ProfileModal 
          contractor={profileModal.contractor} 
          onClose={() => setProfileModal({ isOpen: false, contractor: null })} 
        />
      )}
    </div>
  );
};

export default BusinessDashboard;
