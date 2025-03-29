import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Briefcase, Clock } from 'lucide-react';
import { ContractorProfile } from '../types/businessDashboardTypes';

interface ContractorCardProps {
  contractor: ContractorProfile;
  onViewProfile: (contractor: ContractorProfile) => void;
}

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

const ContractorCard: React.FC<ContractorCardProps> = ({ contractor, onViewProfile }) => {
  return (
    <motion.div variants={cardVariants} whileHover="hover">
      <Card className="h-full flex flex-col">
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-medium">
              {contractor.name[0]}
            </div>
            <div>
              <CardTitle className="text-lg">{contractor.name}</CardTitle>
              <p className="text-sm text-muted-foreground">
                {contractor.experience}
              </p>
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
            ${contractor.hourlyRate}
            <span className="text-sm text-muted-foreground">/hr</span>
          </div>
        </CardContent>

        <div className="p-4 pt-0 mt-auto">
          <Button
            variant="outline"
            className="w-full"
            onClick={() => onViewProfile(contractor)}
          >
            View Profile
          </Button>
        </div>
      </Card>
    </motion.div>
  );
};

export default ContractorCard;