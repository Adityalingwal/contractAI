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

  const handleContractSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would send the form data to your API
    console.log('Contract form submitted:', contractForm);
    // Show success message or redirect
    alert('Contract posted successfully!');
    // Reset form
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

  // Contract posting form component with improved visuals and animations
  const ContractPostingForm = () => (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-gradient-to-br from-white to-purple-50 rounded-xl shadow-lg p-8 relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full opacity-20 -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-0 w-40 h-40 bg-blue-200 rounded-full opacity-20 -ml-10 -mb-10"></div>
      
      <motion.div
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-700 to-blue-600 bg-clip-text text-transparent mb-8">
          Post a New Contract
        </h2>
      </motion.div>
      
      <form onSubmit={handleContractSubmit} className="space-y-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Contract Name with animation */}
          <motion.div 
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
          >
            <Label htmlFor="name" className="text-md font-medium text-purple-800">Contract Name</Label>
            <Input
              id="name"
              name="name"
              value={contractForm.name}
              onChange={handleInputChange}
              placeholder="E.g., Website Redesign Project"
              className="border-purple-200 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 py-6 text-lg transition-all"
              required
            />
          </motion.div>
          
          {/* Required Experience with animation */}
          <motion.div 
            className="space-y-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <Label htmlFor="requiredExperience" className="text-md font-medium text-purple-800">Required Experience</Label>
            <Select name="requiredExperience" onValueChange={(value) => setContractForm(prev => ({ ...prev, requiredExperience: value }))}>
              <SelectTrigger className="border-purple-200 shadow-sm hover:border-purple-300 focus:border-purple-500 py-6 text-lg transition-all">
                <SelectValue placeholder="Select experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="0-2 years">0-2 years</SelectItem>
                <SelectItem value="3-5 years">3-5 years</SelectItem>
                <SelectItem value="5-10 years">5-10 years</SelectItem>
                <SelectItem value="10+ years">10+ years</SelectItem>
              </SelectContent>
            </Select>
          </motion.div>
          
          {/* Location with animation */}
          <motion.div 
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <Label htmlFor="location" className="text-md font-medium text-purple-800">Location</Label>
            <Input
              id="location"
              name="location"
              value={contractForm.location}
              onChange={handleInputChange}
              placeholder="E.g., Remote, New York, etc."
              className="border-purple-200 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 py-6 text-lg transition-all"
              required
            />
          </motion.div>
          
          {/* Start Date with animation */}
          <motion.div 
            className="space-y-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <Label htmlFor="startDate" className="text-md font-medium text-purple-800">Start Date</Label>
            <Input
              id="startDate"
              name="startDate"
              type="date"
              value={contractForm.startDate}
              onChange={handleInputChange}
              className="border-purple-200 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 py-6 text-lg transition-all"
              required
            />
          </motion.div>
          
          {/* End Date with animation */}
          <motion.div 
            className="space-y-2"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <Label htmlFor="endDate" className="text-md font-medium text-purple-800">End Date</Label>
            <Input
              id="endDate"
              name="endDate"
              type="date"
              value={contractForm.endDate}
              onChange={handleInputChange}
              className="border-purple-200 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 py-6 text-lg transition-all"
              required
            />
          </motion.div>
          
          {/* Payment Amount with animation */}
          <motion.div 
            className="space-y-2"
            initial={{ x: 20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.6 }}
          >
            <Label htmlFor="paymentAmount" className="text-md font-medium text-purple-800">
              Payment Amount ($)
            </Label>
            <Input
              id="paymentAmount"
              name="paymentAmount"
              type="number"
              value={contractForm.paymentAmount}
              onChange={handleInputChange}
              placeholder="E.g., 25"
              className="border-purple-200 shadow-sm focus:border-purple-500 focus:ring-2 focus:ring-purple-200 py-6 text-lg transition-all"
              required
            />
          </motion.div>
          
          {/* Description with animation */}
          <motion.div 
            className="space-y-2 md:col-span-2"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Label htmlFor="description" className="text-md font-medium text-purple-800">Project Description</Label>
            <textarea
              id="description"
              name="description"
              value={contractForm.description}
              onChange={handleInputChange}
              rows={5}
              placeholder="Describe the project, requirements, and expectations..."
              className="w-full rounded-md border border-purple-200 p-4 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all text-lg resize-none shadow-sm"
              required
            />
          </motion.div>
        </div>
        
        {/* Submit Button with animation */}
        <motion.div 
          className="text-right mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button 
              type="submit" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-bold px-8 py-6 rounded-xl shadow-lg text-lg"
            >
              Post Your Contract
            </Button>
          </motion.div>
        </motion.div>
      </form>
    </motion.div>
  );

  // Add notifications component
  const NotificationsPanel = () => {
    const filteredNotifications = getFilteredNotifications();
    
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="bg-white rounded-xl shadow-lg overflow-hidden"
      >
        {/* Header with filter tabs */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold text-purple-900">Notifications</h2>
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-500">{unreadCount} unread</span>
              {unreadCount > 0 && (
                <button 
                  className="text-xs text-purple-700 hover:text-purple-900 transition-colors font-medium"
                  onClick={() => setNotifications(prev => prev.map(n => ({ ...n, isRead: true })))}
                >
                  Mark all as read
                </button>
              )}
            </div>
          </div>
          
          <div className="flex gap-2 overflow-x-auto pb-2">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'all' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('all')}
            >
              All
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'payment' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('payment')}
            >
              Payments
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'contract' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('contract')}
            >
              Contracts
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'message' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('message')}
            >
              Messages
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeFilter === 'meeting' 
                  ? 'bg-purple-100 text-purple-800' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
              onClick={() => setActiveFilter('meeting')}
            >
              Meetings
            </motion.button>
          </div>
        </div>
        
        {/* Notifications list */}
        <div className="max-h-[70vh] overflow-y-auto">
          {filteredNotifications.length === 0 ? (
            <div className="p-12 text-center">
              <div className="flex justify-center mb-4">
                <Bell className="h-12 w-12 text-gray-300" />
              </div>
              <p className="text-gray-500">No notifications to display</p>
            </div>
          ) : (
            <ul className="divide-y divide-gray-100">
              {filteredNotifications.map((notification) => (
                <motion.li 
                  key={notification.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  whileHover={{ backgroundColor: '#fafafa' }}
                  className={`p-6 relative ${!notification.isRead ? 'bg-purple-50' : ''}`}
                >
                  {!notification.isRead && (
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 w-2 h-2 rounded-full bg-purple-600"></div>
                  )}
                  <div className="flex gap-4">
                    <div className={`flex-shrink-0 rounded-full p-2 ${
                      notification.type === 'success' ? 'bg-green-100 text-green-500' :
                      notification.type === 'error' ? 'bg-red-100 text-red-500' :
                      notification.type === 'warning' ? 'bg-yellow-100 text-yellow-500' :
                      'bg-blue-100 text-blue-500'
                    }`}>
                      {notification.type === 'success' && <CheckCircle className="h-6 w-6" />}
                      {notification.type === 'error' && <XCircle className="h-6 w-6" />}
                      {notification.type === 'warning' && <AlertCircle className="h-6 w-6" />}
                      {notification.type === 'info' && <Info className="h-6 w-6" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <h3 className={`font-semibold ${!notification.isRead ? 'text-purple-900' : 'text-gray-700'}`}>
                          {notification.title}
                        </h3>
                        <button
                          onClick={() => markAsRead(notification.id)}
                          className="text-gray-400 hover:text-gray-600"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </div>
                      <p className="text-gray-600 mt-1">{notification.message}</p>
                      <p className="text-xs text-gray-400 mt-2">{notification.date}</p>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <div className="dashboard-container">
      {/* Enhanced Left Sidebar */}
      <motion.div 
        className="sidebar"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="sidebar-header">
          <div className="logo-container">
            <div className="logo-bg"></div>
            <Briefcase className="w-6 h-6 absolute top-1/2 left-3 transform -translate-y-1/2 text-white" />
            <h3 className="logo-text">Business Portal</h3>
          </div>
        </div>
        
        <div className="sidebar-menu">
          <ul>
            <motion.li 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Link 
                to="#" 
                className={`menu-item ${activeItem === 'find-contractors' ? 'active' : ''}`}
                onClick={() => setActiveItem('find-contractors')}
              >
                <div className="icon-container">
                  <Briefcase className="h-5 w-5" />
                </div>
                <span>Find Contractors</span>
                {activeItem === 'find-contractors' && 
                  <motion.div className="active-indicator" layoutId="activeIndicator" />
                }
              </Link>
            </motion.li>
            <motion.li 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Link 
                to="#" 
                className={`menu-item ${activeItem === 'post-contract' ? 'active' : ''}`}
                onClick={() => setActiveItem('post-contract')}
              >
                <div className="icon-container">
                  <PlusCircle className="h-5 w-5" />
                </div>
                <span>Post a Contract</span>
                {activeItem === 'post-contract' && 
                  <motion.div className="active-indicator" layoutId="activeIndicator" />
                }
              </Link>
            </motion.li>
            <motion.li 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Link 
                to="#" 
                className={`menu-item ${activeItem === 'contract-status' ? 'active' : ''}`}
                onClick={() => setActiveItem('contract-status')}
              >
                <div className="icon-container">
                  <FileText className="h-5 w-5" />
                </div>
                <span>Contract Status</span>
                {activeItem === 'contract-status' && 
                  <motion.div className="active-indicator" layoutId="activeIndicator" />
                }
              </Link>
            </motion.li>
            <motion.li 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
            >
              <Link 
                to="#" 
                className={`menu-item ${activeItem === 'send-payment' ? 'active' : ''}`}
                onClick={() => setActiveItem('send-payment')}
              >
                <div className="icon-container">
                  <CreditCard className="h-5 w-5" />
                </div>
                <span>Send Payment</span>
                {activeItem === 'send-payment' && 
                  <motion.div className="active-indicator" layoutId="activeIndicator" />
                }
              </Link>
            </motion.li>
            <motion.li 
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              <Link 
                to="#" 
                className={`menu-item ${activeItem === 'notifications' ? 'active' : ''}`}
                onClick={() => setActiveItem('notifications')}
              >
                <div className="icon-container">
                  <Bell className="h-5 w-5" />
                </div>
                <span>Notifications</span>
                {activeItem === 'notifications' && 
                  <motion.div className="active-indicator" layoutId="activeIndicator" />
                }
              </Link>
            </motion.li>
          </ul>
          
          {/* Home link at the bottom */}
          <motion.div 
            className="home-link-container"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7 }}
          >
            <Link to="/" className="menu-item home-link">
              <div className="icon-container home-icon">
                <Home className="h-5 w-5" />
              </div>
              <span>Return to Home</span>
            </Link>
          </motion.div>
        </div>
        
        {/* Decorative elements */}
        <div className="sidebar-decorations">
          <div className="decoration-circle-1"></div>
          <div className="decoration-circle-2"></div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="main-content">
        {activeItem === 'find-contractors' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="find-contractors-section"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="content-header text-center mb-8"
            >
              <h1 className="text-3xl font-bold text-purple-900 mb-3">Find Expert Contractors</h1>
              <p className="text-purple-600 text-xl max-w-lg mx-auto">Connect with skilled professionals for your projects</p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
            </motion.div>
            
            {/* Search Box */}
            <motion.div 
              variants={itemVariants} 
              className="search-container"
            >
              <div className="search-box">
                <Search className="search-icon" />
                <Input
                  placeholder="Search contractors by name or experience..."
                  value={searchQuery}
                  onChange={handleSearch}
                />
              </div>
            </motion.div>

            {/* Filters */}
            <motion.div variants={itemVariants} className="filters-panel">
              <h3>Filter Results</h3>
              <div className="filters-grid">
                <div className="filter-item">
                  <Label className="filter-label">Hourly Rate</Label>
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

                <div className="filter-item">
                  <Label className="filter-label">Experience</Label>
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

                <div className="filter-item">
                  <Label className="filter-label">Availability</Label>
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

            {/* Results Section */}
            <motion.div variants={itemVariants} className="mt-8">
              {filteredContractors.length === 0 ? (
                <div className="empty-results">
                  <Briefcase />
                  <h3>No contractors found</h3>
                  <p>Try adjusting your search or filters</p>
                </div>
              ) : (
                <div className="contractors-grid">
                  {filteredContractors.map((contractor) => (
                    <motion.div
                      key={contractor.id}
                      variants={cardVariants}
                      whileHover="hover"
                      className="contractor-card"
                    >
                      <div className="contractor-card-header">
                        <div className="contractor-avatar">
                          {contractor.name[0]}
                        </div>
                        <div className="contractor-info">
                          <h3 className="contractor-name">{contractor.name}</h3>
                          <p className="contractor-experience">{contractor.experience}</p>
                        </div>
                      </div>
                      
                      <div className="contractor-body">
                        <div className="contractor-stats">
                          <span className="contractor-stat">
                            <Briefcase className="w-4 h-4" />
                            {contractor.completedProjects.length} Projects
                          </span>
                          <span className="contractor-stat">
                            <Clock className="w-4 h-4" />
                            {contractor.availability}
                          </span>
                        </div>
                        
                        <p className="contractor-summary">
                          {contractor.professionalSummary}
                        </p>
                        
                        <div className="contractor-rate">
                          ${contractor.hourlyRate}<span>/hr</span>
                        </div>
                      </div>
                      
                      <div className="contractor-card-footer">
                        <button 
                          className="view-profile-btn"
                          onClick={() => setProfileModal({ isOpen: true, contractor })}
                        >
                          View Profile
                        </button>
                      </div>
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
            className="pt-4"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="content-header mb-8 text-center"
            >
              <h1 className="text-3xl font-bold text-purple-900 mb-3">Post a New Contract</h1>
              <p className="text-violet-600 text-xl max-w-lg mx-auto">Find the perfect professional for your project</p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
            </motion.div>
            
            <ContractPostingForm />
          </motion.div>
        )}

        {/* Add notifications content */}
        {activeItem === 'notifications' && (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            className="pt-4"
          >
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="content-header mb-8 text-center"
            >
              <h1 className="text-4xl font-bold text-purple-900 mb-3">Notifications Center</h1>
              <p className="text-purple-600 text-xl">Stay updated on your contracts and payments</p>
              <div className="w-24 h-1 bg-gradient-to-r from-purple-500 to-blue-500 mx-auto mt-4 rounded-full"></div>
            </motion.div>
            
            <NotificationsPanel />
          </motion.div>
        )}
      </div>

      {/* Modal */}
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
