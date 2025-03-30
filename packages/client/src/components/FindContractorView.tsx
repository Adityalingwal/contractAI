import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Briefcase, Clock, Link, Mail, Linkedin, X, ArrowLeft } from 'lucide-react';

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

  const handleViewProfile = (contractor: any) => {
    setSelectedContractor(contractor);
    onViewProfile(contractor);
  };

  const handleBackToList = () => {
    setSelectedContractor(null);
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

  const renderContractorProfile = () => {
    if (!selectedContractor) return null;

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-primary mb-2">Detailed Profile View</h1>
          <p className="text-base text-muted-foreground">View complete information and details about this contractor</p>
        </div>
        
        <Card className="w-full shadow-lg overflow-hidden border-t-4 border-blue-500">
          <div className="relative h-32 bg-gradient-to-r from-blue-500 to-blue-600 flex items-end">
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-4 left-5 bg-white/20 hover:bg-white/40 text-white"
              onClick={handleBackToList}
            >
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to contractors list
            </Button>
            
            <div className="absolute -bottom-8 left-8 h-16 w-16 rounded-full border-2 border-white bg-blue-500 flex items-center justify-center text-white text-2xl font-bold shadow-md">
              {selectedContractor.name?.charAt(0) || selectedContractor.fullName?.charAt(0) || '?'}
            </div>
          </div>
          
          <div className="pt-12 pb-6 px-8">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold">
                  {selectedContractor.fullName || selectedContractor.name || 'Unnamed Contractor'}
                </h2>
                <p className="text-base text-muted-foreground mt-1">
                  {selectedContractor.professionalTitle || 'Professional'}
                </p>
              </div>
              
              <div className="mt-3 sm:mt-0 flex items-center gap-4">
                <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1 text-sm">
                  {selectedContractor.experienceLevel || 'Experience not specified'}
                </Badge>
                <div className="text-xl font-semibold text-blue-600">
                  ${selectedContractor.hourlyRate || 0}<span className="text-sm text-muted-foreground">/hr</span>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
              <div className="md:col-span-2 space-y-5">
                <Card className="p-5 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">About</h3>
                  <p className="text-base text-muted-foreground leading-relaxed">
                    {selectedContractor.bio || 'No bio available.'}
                  </p>
                </Card>
                
                <Card className="p-5 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Skills</h3>
                  {selectedContractor.skills ? (
                    <div className="flex flex-wrap gap-2">
                      {selectedContractor.skills.split(',').map((skill: string, index: number) => (
                        <Badge key={index} variant="secondary" className="px-3 py-1 text-sm">
                          {skill.trim()}
                        </Badge>
                      ))}
                    </div>
                  ) : (
                    <p className="text-base text-muted-foreground">No skills listed</p>
                  )}
                </Card>
              </div>
              
              <div className="space-y-5">
                <Card className="p-5 shadow-sm">
                  <h3 className="text-lg font-semibold mb-3">Contact & Details</h3>
                  
                  <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h4 className="text-sm font-medium text-muted-foreground">Availability</h4>
                    <Badge variant="outline" className="text-sm">
                      {selectedContractor.availability || 'Not specified'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-3">
                    {selectedContractor.email && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Mail className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm font-medium">Email</span>
                        </div>
                        <a href={`mailto:${selectedContractor.email}`} className="text-blue-500 hover:underline text-sm truncate max-w-[170px]">
                          {selectedContractor.email}
                        </a>
                      </div>
                    )}
                    
                    {selectedContractor.linkedinProfile && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Linkedin className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm font-medium">LinkedIn</span>
                        </div>
                        <a href={selectedContractor.linkedinProfile} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                          View Profile
                        </a>
                      </div>
                    )}
                    
                    {selectedContractor.portfolioLink && (
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <Link className="h-5 w-5 text-muted-foreground mr-2" />
                          <span className="text-sm font-medium">Portfolio</span>
                        </div>
                        <a href={selectedContractor.portfolioLink} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline text-sm">
                          View Website
                        </a>
                      </div>
                    )}
                    
                    {!selectedContractor.email && !selectedContractor.linkedinProfile && !selectedContractor.portfolioLink && (
                      <p className="text-muted-foreground text-sm">No contact information provided</p>
                    )}
                  </div>
                </Card>
                
                <Button 
                  variant="default" 
                  className="w-full bg-blue-500 hover:bg-blue-600 py-3 text-base font-medium"
                >
                  Assign Contract
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="container mx-auto px-5 py-6"
    >
      {!selectedContractor && (
        <Card className="mb-6 w-full -mt-8">
          <CardHeader className="py-5">
            <CardTitle className="text-3xl font-bold text-primary">
              Find Expert Contractors
            </CardTitle>
            <p className="text-base text-muted-foreground mt-1">
              Connect with skilled professionals for your projects
            </p>
          </CardHeader>
        </Card>
      )}

      {!selectedContractor ? (
        <motion.div variants={itemVariants} className="w-full">
          {isLoading ? (
            <Card className="p-10 text-center w-full">
              <div className="h-12 w-12 animate-spin rounded-full border-4 border-primary border-t-transparent mx-auto mb-4" />
              <h3 className="text-xl font-medium text-primary mb-2">Loading contractors...</h3>
            </Card>
          ) : error ? (
            <Card className="p-10 text-center w-full">
              <Briefcase className="h-12 w-12 text-destructive mx-auto mb-4" />
              <h3 className="text-xl font-medium text-destructive mb-2">Error loading contractors</h3>
              <p className="text-base text-muted-foreground">{error}</p>
            </Card>
          ) : contractors.length === 0 ? (
            <Card className="p-10 text-center w-full">
              <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-xl font-medium text-primary mb-2">No contractors found</h3>
              <p className="text-base text-muted-foreground">No contractors are currently available</p>
            </Card>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
              {contractors.map(contractor => renderContractorCard(contractor))}
            </div>
          )}
        </motion.div>
      ) : (
        renderContractorProfile()
      )}
    </motion.div>
  );
};

export default FindContractorsView;