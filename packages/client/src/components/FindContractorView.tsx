import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Search, Briefcase } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { ContractorProfile } from '../types/businessDashboardTypes';
import ContractorCard from './ContractorCard';

interface FindContractorsViewProps {
  searchQuery: string;
  handleSearch: (e: React.ChangeEvent<HTMLInputElement>) => void;
  filters: {
    hourlyRate: string;
    experience: string;
    availability: string;
  };
  handleFilterChange: (value: string, filterType: string) => void;
  filteredContractors: ContractorProfile[];
  onViewProfile: (contractor: ContractorProfile) => void;
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

const FindContractorsView: React.FC<FindContractorsViewProps> = ({
  searchQuery,
  handleSearch,
  filters,
  handleFilterChange,
  filteredContractors,
  onViewProfile,
}) => {
  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6"
    >
      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            Find Expert Contractors
          </CardTitle>
          <p className="text-muted-foreground">
            Connect with skilled professionals for your projects
          </p>
        </CardHeader>
        <CardContent>
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

          <motion.div variants={itemVariants} className="mb-6 space-y-4">
            <h3 className="text-lg font-medium">Filter Results</h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <Label className="mb-2 block">Hourly Rate</Label>
                <Select onValueChange={value => handleFilterChange(value, 'hourlyRate')}>
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
                <Select onValueChange={value => handleFilterChange(value, 'experience')}>
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
                <Select onValueChange={value => handleFilterChange(value, 'availability')}>
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

      <motion.div variants={itemVariants}>
        {filteredContractors.length === 0 ? (
          <Card className="p-12 text-center">
            <Briefcase className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-xl font-medium text-primary mb-2">No contractors found</h3>
            <p className="text-muted-foreground">Try adjusting your search or filters</p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContractors.map(contractor => (
              <ContractorCard
                key={contractor.id}
                contractor={contractor}
                onViewProfile={onViewProfile}
              />
            ))}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default FindContractorsView;