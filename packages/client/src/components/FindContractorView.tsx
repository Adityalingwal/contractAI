import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Briefcase, Clock, Link, Mail, Linkedin, X } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '../components/ui/dialog';

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

interface FindContractorsViewProps {
  contractors: ContractorProfile[];
  onViewProfile: (contractor: ContractorProfile) => void;
  isLoading?: boolean;
  error?: string | null;
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
};

const cardVariants = {
  hidden: { scale: 0.95, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      type: 'spring',
      stiffness: 100,
    },
  },
  hover: {
    scale: 1.02,
    boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 10,
    },
  },
};

const FindContractorsView: React.FC<FindContractorsViewProps> = ({
  contractors,
  onViewProfile,
  isLoading = false,
  error = null,
}) => {
  const [selectedContractor, setSelectedContractor] = useState<any | null>(null);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const handleViewProfile = (contractor: any) => {
    setSelectedContractor(contractor);
    setIsProfileOpen(true);
    onViewProfile(contractor);
  };

  const renderContractorCard = (contractor: any) => (
    <motion.div key={contractor.id || contractor.contractorId} variants={cardVariants} whileHover="hover">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold shadow-sm">
              {contractor.name ? contractor.name.charAt(0) : '?'}
            </div>
            <div>
              <h3 className="font-medium">{contractor.name || 'Unnamed'}</h3>
            </div>
          </div>
        </CardHeader>

        <CardContent className="flex-grow">
          <div className="flex items-center gap-4 mb-3">
            <Badge variant="outline" className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {contractor.availability || 'Not specified'}
            </Badge>
          </div>

          <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
            {contractor.professionalTitle || 'No title specified'}
          </p>

          <div className="text-lg font-medium text-primary mt-auto">
            ${contractor.hourlyRate || 0}
            <span className="text-sm text-muted-foreground">/hr</span>
          </div>
        </CardContent>

        <div className="p-4 pt-0 mt-auto gap-4 flex flex-col space-y-1">
          <Button
            variant="default"
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => handleViewProfile(contractor)}
          >
            View Profile
          </Button>

          <Button
            variant="default"
            className="w-full bg-blue-500 hover:bg-blue-600"
            onClick={() => onViewProfile(contractor)}
          >
            Assign contract
          </Button>
        </div>
      </Card>
    </motion.div>
  );

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto p-4 md:p-6"
    >
      <Card className="mb-6 w-full -mt-8">
        <CardHeader className="pb-2">
          <CardTitle className="text-2xl md:text-3xl font-bold text-primary">
            Find Expert Contractors
          </CardTitle>
          <p className="text-muted-foreground">
            Connect with skilled professionals for your projects
          </p>
        </CardHeader>
      </Card>

      <motion.div variants={itemVariants} className="w-full">
        {isLoading ? (
          <Card className="p-8 md:p-12 text-center w-full">
            <div className="h-10 w-10 md:h-12 md:w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-medium text-primary mb-2">Loading contractors...</h3>
          </Card>
        ) : error ? (
          <Card className="p-8 md:p-12 text-center w-full">
            <Briefcase className="h-10 w-10 md:h-12 md:w-12 text-destructive mx-auto mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-medium text-destructive mb-2">Error loading contractors</h3>
            <p className="text-muted-foreground">{error}</p>
          </Card>
        ) : contractors.length === 0 ? (
          <Card className="p-8 md:p-12 text-center w-full">
            <Briefcase className="h-10 w-10 md:h-12 md:w-12 text-muted-foreground mx-auto mb-3 md:mb-4" />
            <h3 className="text-lg md:text-xl font-medium text-primary mb-2">No contractors found</h3>
            <p className="text-muted-foreground">No contractors are currently available</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {contractors.map(contractor => renderContractorCard(contractor))}
          </div>
        )}
      </motion.div>

      {/* Profile Dialog */}
      <Dialog open={isProfileOpen} onOpenChange={setIsProfileOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold flex items-center">
              <div className="h-10 w-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-semibold shadow-sm mr-3">
                {selectedContractor?.name?.charAt(0) || '?'}
              </div>
              {selectedContractor?.name || 'Contractor Profile'}
            </DialogTitle>
            <DialogDescription>
              {selectedContractor?.professionalTitle || 'Professional'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedContractor && (
            <div className="space-y-6 py-4">
              <div className="flex justify-between items-center">
                <Badge className="text-md px-3 py-1">
                  {selectedContractor.availability || 'Availability not specified'}
                </Badge>
                <div className="text-xl font-semibold text-primary">
                  ${selectedContractor.hourlyRate || 0}
                  <span className="text-sm text-muted-foreground">/hr</span>
                </div>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">About</h3>
                <p className="text-sm text-muted-foreground">
                  {selectedContractor.bio || 'No bio available.'}
                </p>
              </div>
              
              {selectedContractor.experienceLevel && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Experience Level</h3>
                  <p className="text-sm text-muted-foreground">{selectedContractor.experienceLevel}</p>
                </div>
              )}
              
              {selectedContractor.skills && (
                <div>
                  <h3 className="text-lg font-semibold mb-2">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {selectedContractor.skills.split(',').map((skill: string, index: number) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill.trim()}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Contact Information</h3>
                <div className="space-y-2">
                  {selectedContractor.email && (
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <a href={`mailto:${selectedContractor.email}`} className="text-sm text-blue-500 hover:underline">
                        {selectedContractor.email}
                      </a>
                    </div>
                  )}
                  
                  {selectedContractor.linkedinProfile && (
                    <div className="flex items-center gap-2">
                      <Linkedin className="h-4 w-4 text-muted-foreground" />
                      <a href={selectedContractor.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                        LinkedIn Profile
                      </a>
                    </div>
                  )}
                  
                  {selectedContractor.portfolioLink && (
                    <div className="flex items-center gap-2">
                      <Link className="h-4 w-4 text-muted-foreground" />
                      <a href={selectedContractor.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-500 hover:underline">
                        Portfolio
                      </a>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="default" 
              className="w-full bg-blue-500 hover:bg-blue-600"
              onClick={() => setIsProfileOpen(false)}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </motion.div>
  );
};

export default FindContractorsView;