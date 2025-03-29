import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { ContractorProfile } from '../types/businessDashboardTypes';
import {
  X,
  Mail,
  Phone,
  DollarSign,
  Clock,
  Star,
} from 'lucide-react';

interface ProfileModalProps {
  contractor: ContractorProfile;
  onClose: () => void;
}

const ProfileModal: React.FC<ProfileModalProps> = ({ contractor, onClose }) => {
  return (
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
};

export default ProfileModal;