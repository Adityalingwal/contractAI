import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import './ExploreContractors.css'; 
import ContractorDashboard from './ContractorDashboard';
import {
  Briefcase,
  FileText,
  DollarSign,
  Bell,
  User,
  FileCheck,
  Home,
  CreditCard,
  MessageSquare,
  Clock,
  Calendar,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';

// Sample payment status data
const dummyPayments = [
  { id: 'PAY-001', project: 'Kitchen Renovation', amount: '$2,500', date: '2023-10-15', status: 'Pending Approval' },
  { id: 'PAY-002', project: 'Bathroom Remodel', amount: '$1,800', date: '2023-09-28', status: 'Approved' },
  { id: 'PAY-003', project: 'Deck Construction', amount: '$3,200', date: '2023-11-05', status: 'Paid' },
  { id: 'PAY-004', project: 'Basement Finishing', amount: '$4,500', date: '2023-10-30', status: 'Rejected' },
];

// Sample contractor profile data
const dummyContractorProfile = {
  name: "John Carpenter",
  email: "john.carpenter@example.com",
  phone: "(555) 123-4567",
  specialty: "Carpentry & Woodworking",
  experience: "15 years",
  hourlyRate: "$75",
  availability: "Weekdays, 8am-5pm",
  bio: "Experienced carpenter specializing in custom cabinetry, furniture, and home renovations. Committed to quality craftsmanship and client satisfaction."
};

// Sample contracts data
const dummyContracts = [
  { id: 'CON-001', title: 'Kitchen Renovation', status: 'In Progress', startDate: '2023-10-01', endDate: '2023-12-01' },
  { id: 'CON-002', title: 'Bathroom Remodel', status: 'Completed', startDate: '2023-08-15', endDate: '2023-09-15' },
  { id: 'CON-003', title: 'Deck Construction', status: 'Pending', startDate: '2023-11-01', endDate: '2023-11-30' },
];

// My Contracts Component
const MyContracts: React.FC = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">My Contracts</CardTitle>
          <p className="text-muted-foreground">Track and manage your active and completed contracts</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Contract ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Start Date</TableHead>
                <TableHead>End Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyContracts.map((contract) => (
                <TableRow key={contract.id}>
                  <TableCell className="font-medium">{contract.id}</TableCell>
                  <TableCell>{contract.title}</TableCell>
                  <TableCell>
                    <Badge variant={
                      contract.status === 'Completed' ? 'secondary' : 
                      contract.status === 'In Progress' ? 'outline' : 
                      'destructive'
                    }>
                      {contract.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{contract.startDate}</TableCell>
                  <TableCell>{contract.endDate}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

// Payment Status Component
const PaymentStatus: React.FC = () => {
  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Payment Status</CardTitle>
          <p className="text-muted-foreground">View the status of your payments below. Contact support if you have any questions.</p>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Project</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummyPayments.map((payment) => (
                <TableRow key={payment.id}>
                  <TableCell className="font-medium">{payment.id}</TableCell>
                  <TableCell>{payment.project}</TableCell>
                  <TableCell>{payment.amount}</TableCell>
                  <TableCell>{payment.date}</TableCell>
                  <TableCell>
                    <Badge 
                      variant={
                        payment.status === 'Approved' ? 'secondary' : 
                        payment.status === 'Paid' ? 'secondary' :
                        payment.status === 'Rejected' ? 'destructive' : 
                        'outline'
                      }
                    >
                      {payment.status}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          
          <div className="mt-6 p-4 bg-muted rounded-lg">
            <h3 className="text-md font-semibold mb-2">Payment Status Information</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span><span className="font-semibold">Pending Approval:</span> Your payment is awaiting review by our finance team.</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-green-500" />
                <span><span className="font-semibold">Approved:</span> Your payment has been approved and will be processed within 2-3 business days.</span>
              </li>
              <li className="flex items-center gap-2">
                <CreditCard className="h-4 w-4 text-blue-500" />
                <span><span className="font-semibold">Paid:</span> Payment has been successfully transferred to your account.</span>
              </li>
              <li className="flex items-center gap-2">
                <AlertCircle className="h-4 w-4 text-red-500" />
                <span><span className="font-semibold">Rejected:</span> Your payment request was declined. Please contact support for more information.</span>
              </li>
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

// Edit Profile Component
const EditProfile: React.FC = () => {
  const [profile, setProfile] = useState(dummyContractorProfile);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setProfile(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Profile updated successfully!");
  };

  return (
    <div className="p-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-primary">Edit Profile</CardTitle>
          <p className="text-muted-foreground">Update your contractor profile information below</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input 
                  id="name" 
                  name="name" 
                  value={profile.name} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input 
                  id="email" 
                  name="email" 
                  type="email" 
                  value={profile.email} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input 
                  id="phone" 
                  name="phone" 
                  value={profile.phone} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="specialty">Specialty</Label>
                <Input 
                  id="specialty" 
                  name="specialty" 
                  value={profile.specialty} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Experience</Label>
                <Input 
                  id="experience" 
                  name="experience" 
                  value={profile.experience} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="hourlyRate">Hourly Rate</Label>
                <Input 
                  id="hourlyRate" 
                  name="hourlyRate" 
                  value={profile.hourlyRate} 
                  onChange={handleChange} 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="availability">Availability</Label>
                <Input 
                  id="availability" 
                  name="availability" 
                  value={profile.availability} 
                  onChange={handleChange} 
                  required 
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="bio">Bio / Description</Label>
              <Textarea 
                id="bio" 
                name="bio" 
                value={profile.bio} 
                onChange={handleChange} 
                rows={4} 
                required 
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit">Save Changes</Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

const ExploreContractors: React.FC = () => {
  const [activeTab, setActiveTab] = useState('createProfile');
  const location = useLocation();
  
  // Add animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Function to render the appropriate content based on active tab
  const renderContent = () => {
    switch(activeTab) {
      case 'createProfile':
        return <ContractorDashboard />;
      case 'paymentStatus':
        return <PaymentStatus />;
      case 'editProfile':
        return <EditProfile />;
      case 'myContracts':
        return <MyContracts />;
      default:
        return (
          <div className="p-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-3xl font-bold text-primary">Explore Contractors</CardTitle>
                <p className="text-muted-foreground">Welcome to the Explore Contractors portal. Select an option from the sidebar to get started.</p>
              </CardHeader>
              <CardContent>
                {location.state?.contractorData && (
                  <Card className="mt-6">
                    <CardHeader>
                      <h2 className="text-xl font-semibold text-primary">Recently Added Contractor:</h2>
                    </CardHeader>
                    <CardContent>
                      <pre className="bg-muted p-4 rounded-lg overflow-x-auto">
                        {JSON.stringify(location.state.contractorData, null, 2)}
                      </pre>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </div>
        );
    }
  };

  return (
    <div className="flex h-screen bg-background">
      {/* Left Sidebar - updated with more professional styling */}
      <motion.div 
        className="w-64 border-r bg-card flex flex-col shadow-sm"
        initial={{ x: -50, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <div className="p-4 border-b">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <h3 className="font-semibold text-lg text-primary">Contractor Portal</h3>
          </div>
        </div>
        
        <div className="py-4 flex-grow">
          <nav className="space-y-2 px-2">
            <Button 
              variant={activeTab === 'paymentStatus' ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab('paymentStatus')}
            >
              <CreditCard className="h-4 w-4 mr-2" />
              Payment Status
            </Button>

            <Button 
              variant={activeTab === 'editProfile' ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab('editProfile')}
            >
              <User className="h-4 w-4 mr-2" />
              Edit Profile
            </Button>

            <Button 
              variant={activeTab === 'myContracts' ? "secondary" : "ghost"} 
              className="w-full justify-start"
              onClick={() => setActiveTab('myContracts')}
            >
              <FileText className="h-4 w-4 mr-2" />
              My Contracts
            </Button>

            <Button
              variant={activeTab === 'createProfile' ? "secondary" : "ghost"}
              className="w-full justify-start"
              onClick={() => setActiveTab('createProfile')}
            >
              <FileCheck className="h-4 w-4 mr-2" />
              Create Profile
            </Button>
          </nav>
        </div>
        
        {/* Home link at the bottom */}
        <div className="px-2 py-4 border-t mt-auto">
          <Button variant="ghost" className="w-full justify-start" asChild>
            <Link to="/">
              <Home className="h-4 w-4 mr-2" />
              <span>Return to Home</span>
            </Link>
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <main className="flex-1 overflow-auto bg-background">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          {renderContent()}
        </motion.div>
      </main>
    </div>
  );
};

export default ExploreContractors;
