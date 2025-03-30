import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './BusinessDashboard.css';
import { getAllContracts, postContract, getAllContractors } from '../api/api';
import {
  Notification,
} from '../types/businessDashboardTypes';
import { dummyNotifications } from '../dummy-data/dummyData';

import SidebarNav from '../components/SidebarNav';
import FindContractorsView from '../components/FindContractorView';
import PostContractView from '../components/PostContractView';
import NotificationsView from '../components/NotificationsView';
import ComingSoonView from '../components/ComingSoonView';

export interface ContractorProfile {
  contractorId: string;
  fullName: string;
  experienceLevel: string;
  bio: string;
  availability: string;
  hourlyRate: number;
  professionalTitle: string;
  skills?: string;
  portfolioLink?: string;
  linkedinProfile?: string;
  email?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ProfileModalState {
  isOpen: boolean;
  contractor: ContractorProfile | null;
}

const BusinessDashboard = () => {
  // --- State Management ---
  const [activeItem, setActiveItem] = useState('find-contractors');
  
  const [contractForm, setContractForm] = useState({
    title: '',
    description: '',
    required_skills: '',
    experience_level: '',
    estimated_duration: '',
    hourly_rate: '',
  });
  
  const [contractors, setContractors] = useState<ContractorProfile[]>([]);
  const [profileModal, setProfileModal] = useState<ProfileModalState>({
    isOpen: false,
    contractor: null,
  });
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setNotifications(dummyNotifications);
    
    // Fetch contractors from API
    const fetchContractors = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await getAllContractors();
        if (response && response.contractors) {
          const formattedContractors = response.contractors.map((contractor: ContractorProfile) => ({
            id: contractor.contractorId,
            name: contractor.fullName,
            experience: contractor.experienceLevel,
            availability: contractor.availability === 'fullTime' ? 'Full-time' : contractor.availability,
            professionalTitle: contractor.professionalTitle,
            bio: contractor.bio,
            hourlyRate: contractor.hourlyRate,
          }));
          setContractors(formattedContractors);
        } else {
          setError('No contractor data received');
        }
      } catch (err) {
        console.error('Error fetching contractors:', err);
        setError('Failed to load contractors');
      } finally {
        setIsLoading(false);
      }
    };

    fetchContractors();
  }, []);

  const getFilteredNotifications = () => {
    if (activeFilter === 'all') {
      return notifications;
    }
    return notifications.filter(notification => notification.relatedTo === activeFilter);
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setContractForm(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContractSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const contractData = {
        title: contractForm.title,
        description: contractForm.description,
        required_skills: contractForm.required_skills,
        experience_level: contractForm.experience_level,
        estimated_duration: contractForm.estimated_duration,
        hourly_rate: contractForm.hourly_rate
      };
      
      const response = await postContract({ contractData });
      
      alert('Gig posted successfully!');
      
      setContractForm({
        title: '',
        description: '',
        required_skills: '',
        experience_level: '',
        estimated_duration: '',
        hourly_rate: ''
      });
    } catch (error) {
      alert('Error posting gig');
    }
  };

  const markAsRead = (id: number) => {
    setNotifications(prev =>
      prev.map(notification =>
        notification.id === id ? { ...notification, isRead: true } : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, isRead: true })));
  };

  const openProfileModal = (contractor: ContractorProfile) => {
    setProfileModal({ isOpen: true, contractor });
  };

  const renderActiveView = () => {
    switch (activeItem) {
      case 'find-contractors':
        return (
          <FindContractorsView
            contractors={contractors}
            onViewProfile={openProfileModal}
            isLoading={isLoading}
            error={error}
          />
        );
      case 'post-contract':
        return (
          <PostContractView
            contractForm={contractForm}
            handleInputChange={handleInputChange}
            handleContractSubmit={handleContractSubmit}
            setContractForm={setContractForm}
          />
        );
      case 'notifications':
        return (
          <NotificationsView
            notifications={getFilteredNotifications()}
            unreadCount={unreadCount}
            activeFilter={activeFilter}
            setActiveFilter={setActiveFilter}
            markAsRead={markAsRead}
            markAllAsRead={markAllAsRead}
          />
        );
      case 'contract-status':
        return <ComingSoonView title="Contract Status" />;
      case 'send-payment':
        return <ComingSoonView title="Send Payment" />;
      default:
        return null;
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5,
        ease: "easeOut" 
      }
    }
  };

  return (
    <div className="flex h-screen bg-gradient-to-br from-blue-50 to-white">
      <SidebarNav
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        unreadCount={unreadCount}
      />

      <main className="flex-1 overflow-auto bg-white p-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
          className="h-full w-full mx-auto bg-white text-black p-6"
        >
          <motion.div variants={itemVariants}>
            {renderActiveView()}
          </motion.div>
        </motion.div>
      </main>
    </div>
  );
};

export default BusinessDashboard;