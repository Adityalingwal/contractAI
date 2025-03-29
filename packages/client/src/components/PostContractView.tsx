import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Button } from '../components/ui/button';
import { Textarea } from '../components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';

interface PostContractViewProps {
  contractForm: {
    name: string;
    description: string;
    requiredExperience: string;
    location: string;
    startDate: string;
    endDate: string;
    paymentType: string;
    paymentAmount: string;
    skills: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleContractSubmit: (e: React.FormEvent) => void;
  setContractForm: React.Dispatch<
    React.SetStateAction<{
      name: string;
      description: string;
      requiredExperience: string;
      location: string;
      startDate: string;
      endDate: string;
      paymentType: string;
      paymentAmount: string;
      skills: string;
    }>
  >;
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

const PostContractView: React.FC<PostContractViewProps> = ({
  contractForm,
  handleInputChange,
  handleContractSubmit,
  setContractForm,
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
            Post a New Contract
          </CardTitle>
          <p className="text-muted-foreground">
            Find the perfect professional for your project
          </p>
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
                <Select
                  name="requiredExperience"
                  onValueChange={value =>
                    setContractForm(prev => ({ ...prev, requiredExperience: value }))
                  }
                >
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
              <Button type="submit">Post Your Contract</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostContractView;