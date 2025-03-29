import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import './BusinessDashboard.css';
import { getAllContracts, postContract } from '../api/api';
import {
  ContractorProfile,
  ProfileModalState,
  Notification,
} from '../types/businessDashboardTypes';
import { dummyContractors, dummyNotifications } from '../dummy-data/dummyData';

import SidebarNav from '../components/SidebarNav';
import ProfileModal from '../components/ProfileModal';
import FindContractorsView from '../components/FindContractorView';
import PostContractView from '../components/PostContractView';
import NotificationsView from '../components/NotificationsView';
import ComingSoonView from '../components/ComingSoonView';

const BusinessDashboard = () => {
  // --- State Management ---
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    hourlyRate: '',
    experience: '',
    availability: '',
  });
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

  useEffect(() => {
    setContractors(dummyContractors);
    setNotifications(dummyNotifications);
  }, []);

  const filteredContractors = contractors.filter(contractor => {
    const matchesSearch =
      contractor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.professionalSummary.toLowerCase().includes(searchQuery.toLowerCase()) ||
      contractor.experience.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesHourlyRate =
      !filters.hourlyRate ||
      (() => {
        const [min, max] = filters.hourlyRate
          .split('-')
          .map(num => (num === '+' ? Infinity : Number(num)));
        return (
          contractor.hourlyRate >= min && (max === Infinity ? true : contractor.hourlyRate <= max)
        );
      })();

    const matchesExperience =
      !filters.experience || contractor.experience.includes(filters.experience);
    const matchesAvailability =
      !filters.availability || contractor.availability === filters.availability;

    return matchesSearch && matchesHourlyRate && matchesExperience && matchesAvailability;
  });

  const getFilteredNotifications = () => {
    if (activeFilter === 'all') {
      return notifications;
    }
    return notifications.filter(notification => notification.relatedTo === activeFilter);
  };

  const unreadCount = notifications.filter(notification => !notification.isRead).length;

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleFilterChange = (value: string, filterType: string) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value,
    }));
  };

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

  const closeProfileModal = () => {
    setProfileModal({ isOpen: false, contractor: null });
  };

  const renderActiveView = () => {
    switch (activeItem) {
      case 'find-contractors':
        return (
          <FindContractorsView
            searchQuery={searchQuery}
            handleSearch={handleSearch}
            filters={filters}
            handleFilterChange={handleFilterChange}
            filteredContractors={filteredContractors}
            onViewProfile={openProfileModal}
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

  return (
    <div className="flex h-screen bg-background">
      <SidebarNav
        activeItem={activeItem}
        setActiveItem={setActiveItem}
        unreadCount={unreadCount}
      />

      <main className="flex-1 overflow-auto bg-background">{renderActiveView()}</main>

      {profileModal.isOpen && profileModal.contractor && (
        <ProfileModal contractor={profileModal.contractor} onClose={closeProfileModal} />
      )}
    </div>
  );
};

export default BusinessDashboard;