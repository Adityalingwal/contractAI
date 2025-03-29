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
    title: string;
    description: string;
    required_skills: string;
    experience_level: string; // entry, intermediate, expert
    estimated_duration: string;
    hourly_rate: string;
  };
  handleInputChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => void;
  handleContractSubmit: (e: React.FormEvent) => void;
  setContractForm: React.Dispatch<
    React.SetStateAction<{
      title: string;
      description: string;
      required_skills: string;
      experience_level: string;
      estimated_duration: string;
      hourly_rate: string;
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
      <Card className="mb-6 -mt-7">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">
            Post a New Gig
          </CardTitle>
          <p className="text-muted-foreground">
            Find the perfect professional for your project
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleContractSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2 ">
                <Label htmlFor="title" className="text-black font-medium">Gig Title</Label>
                <Input
                  id="title"
                  name="title"
                  value={contractForm.title}
                  onChange={handleInputChange}
                  placeholder="E.g., Website Redesign Project"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience_level" className="text-black font-medium">Experience Level</Label>
                <Select
                  name="experience_level"
                  value={contractForm.experience_level}
                  onValueChange={value =>
                    setContractForm(prev => ({ ...prev, experience_level: value }))
                  }
                >
                  <SelectTrigger id="experience_level">
                    <SelectValue placeholder="Select experience level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="entry">Entry Level</SelectItem>
                    <SelectItem value="intermediate">Intermediate</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="estimated_duration" className="text-black font-medium">Estimated Duration</Label>
                <Input
                  id="estimated_duration"
                  name="estimated_duration"
                  value={contractForm.estimated_duration}
                  onChange={handleInputChange}
                  placeholder="E.g., 2 weeks, 3 months"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="hourly_rate" className="text-black font-medium">Hourly Rate ($)</Label>
                <Input
                  id="hourly_rate"
                  name="hourly_rate"
                  type="number"
                  value={contractForm.hourly_rate}
                  onChange={handleInputChange}
                  placeholder="E.g., 25"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="required_skills" className="text-black font-medium">Required Skills</Label>
                <Textarea
                  id="required_skills"
                  name="required_skills"
                  value={contractForm.required_skills}
                  onChange={handleInputChange}
                  rows={2}
                  placeholder="E.g., React, Node.js, PostgreSQL (comma separated)"
                  required
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description" className="text-black font-medium">Project Description</Label>
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
              <Button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white">Post Your Gig</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PostContractView;