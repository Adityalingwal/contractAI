import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { 
  Briefcase, Mail, Phone, Star, Award, Clock, DollarSign, 
  User, Calendar, Building, FileText, CheckCircle 
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContractorForm = () => {
  const [formData, setFormData] = useState({
    // Personal Info
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    address: '',

    // Professional Details
    skills: '',
    experience: '',
    hourlyRate: '',
    availability: '',

    // Previous Projects
    completedProjects: [{
      projectName: '',
      clientName: '',
      completionDate: '',
      description: '',
      feedback: ''
    }],

    // Payment Info
    lastPaymentAmount: '',
    lastPaymentDate: '',
    lastProjectCompletionDate: '',
    
    // Additional Info
    professionalSummary: '',
    certifications: '',
    preferredWorkHours: ''
  });

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

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      navigate('/explore-contractors', { 
        state: { 
          contractorData: formData 
        }
      });
    } catch (error) {
      console.error('Error submitting form:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;

    if (name.includes('.')) {
      const [parent, index, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: prev[parent].map((item: any, i: number) => 
          i === parseInt(index) ? { ...item, [child]: value } : item
        )
      }));
    } else {
 
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };

  const handleAddProject = (type: 'completed') => {
    setFormData(prev => ({
      ...prev,
      completedProjects: [
        ...prev.completedProjects,
        {
          projectName: '',
          clientName: '',
          completionDate: '',
          description: '',
          feedback: ''
        }
      ]
    }));
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen bg-gradient-to-b from-purple-50 to-white py-12 px-4"
    >
      <Card className="max-w-5xl mx-auto shadow-xl border-0">
        <CardHeader className="text-center pb-8 pt-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-t-xl">
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <User className="w-16 h-16 mx-auto text-white mb-4" />
            <CardTitle className="text-3xl font-bold text-white">
              Detailed Contractor Profile
            </CardTitle>
            <p className="text-purple-100 mt-2">Please provide comprehensive information about your professional experience</p>
          </motion.div>
        </CardHeader>

        <CardContent className="p-8">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Personal Information Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 border-b pb-2">
                <User className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-semibold">Personal Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Full Name"
                  name="name"
                  icon={<User className="w-4 h-4" />}
                  required
                />
                <InputField
                  label="Email"
                  name="email"
                  type="email"
                  icon={<Mail className="w-4 h-4" />}
                  required
                />
                <InputField
                  label="Primary Phone"
                  name="phone"
                  icon={<Phone className="w-4 h-4" />}
                  required
                />
                <InputField
                  label="Alternative Phone"
                  name="alternatePhone"
                  icon={<Phone className="w-4 h-4" />}
                />
                <div className="col-span-2">
                  <InputField
                    label="Address"
                    name="address"
                    icon={<Building className="w-4 h-4" />}
                  />
                </div>
              </div>
            </motion.div>

            {/* Previous Projects Section */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 border-b pb-2">
                <CheckCircle className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-semibold">Previous Projects</h3>
              </div>
              <div className="bg-purple-50 p-6 rounded-xl space-y-6">
                {formData.completedProjects.map((_, index) => (
                  <div key={index} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <InputField
                        label="Project Name"
                        name={`completedProjects.${index}.projectName`}
                        required
                      />
                      <InputField
                        label="Completion Date"
                        name={`completedProjects.${index}.completionDate`}
                        type="date"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium">Project Description</Label>
                      <Textarea
                        placeholder="Describe the project scope and your role"
                        className="w-full mt-2"
                        name={`completedProjects.${index}.description`}
                        rows={3}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label className="font-medium">Client Feedback</Label>
                      <Textarea
                        placeholder="Add any feedback received from the client"
                        className="w-full mt-2"
                        name={`completedProjects.${index}.feedback`}
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => handleAddProject('completed')}
                  className="mt-4"
                >
                  Add More Projects
                </Button>
              </div>
            </motion.div>

            {/* Payment Information */}
            <motion.div variants={itemVariants} className="space-y-6">
              <div className="flex items-center gap-2 border-b pb-2">
                <DollarSign className="w-6 h-6 text-purple-600" />
                <h3 className="text-xl font-semibold">Payment Information</h3>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputField
                  label="Last Payment Amount"
                  name="lastPaymentAmount"
                  type="number"
                  icon={<DollarSign className="w-4 h-4" />}
                  required
                />
                <InputField
                  label="Last Payment Date"
                  name="lastPaymentDate"
                  type="date"
                  icon={<Calendar className="w-4 h-4" />}
                  required
                />
                <InputField
                  label="Last Project Completion Date"
                  name="lastProjectCompletionDate"
                  type="date"
                  icon={<CheckCircle className="w-4 h-4" />}
                  required
                />
                <InputField
                  label="Hourly Rate"
                  name="hourlyRate"
                  type="number"
                  icon={<DollarSign className="w-4 h-4" />}
                  required
                />
              </div>
            </motion.div>

            {/* Submit Button */}
            <motion.div 
              variants={itemVariants}
              className="flex justify-end gap-4 pt-6"
            >
              <Button
                type="button"
                variant="outline"
                className="hover:bg-purple-50"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-2 rounded-lg transition-all duration-300 transform hover:scale-105"
              >
                Save Complete Profile
              </Button>
            </motion.div>
          </form>
        </CardContent>
      </Card>
    </motion.div>
  );
};

// Helper component for input fields
const InputField = ({ label, name, type = "text", icon = null, required = false }) => (
  <div className="space-y-2">
    <Label className="flex items-center gap-2">
      {icon && icon}
      {label}
    </Label>
    <Input
      type={type}
      name={name}
      required={required}
      className="transition-all duration-300 border-purple-100 focus:border-purple-500 focus:ring-purple-500 hover:border-purple-300"
    />
  </div>
);

export default ContractorForm; 