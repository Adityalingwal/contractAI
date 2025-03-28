import { ContractorProfile, Notification } from '../types/businessDashboardTypes'

export const dummyPayments = [
  {
    id: 'PAY-001',
    project: 'Kitchen Renovation',
    amount: '$2,500',
    date: '2023-10-15',
    status: 'Pending Approval',
  },
  {
    id: 'PAY-002',
    project: 'Bathroom Remodel',
    amount: '$1,800',
    date: '2023-09-28',
    status: 'Approved',
  },
  {
    id: 'PAY-003',
    project: 'Deck Construction',
    amount: '$3,200',
    date: '2023-11-05',
    status: 'Paid',
  },
  {
    id: 'PAY-004',
    project: 'Basement Finishing',
    amount: '$4,500',
    date: '2023-10-30',
    status: 'Rejected',
  },
];

export const dummyContractorProfile = {
  name: 'John Carpenter',
  email: 'john.carpenter@example.com',
  phone: '(555) 123-4567',
  specialty: 'Carpentry & Woodworking',
  experience: '15 years',
  hourlyRate: '$75',
  availability: 'Weekdays, 8am-5pm',
  bio: 'Experienced carpenter specializing in custom cabinetry, furniture, and home renovations. Committed to quality craftsmanship and client satisfaction.',
};

export const dummyContracts = [
  {
    id: 'CON-001',
    title: 'Kitchen Renovation',
    status: 'In Progress',
    startDate: '2023-10-01',
    endDate: '2023-12-01',
  },
  {
    id: 'CON-002',
    title: 'Bathroom Remodel',
    status: 'Completed',
    startDate: '2023-08-15',
    endDate: '2023-09-15',
  },
  {
    id: 'CON-003',
    title: 'Deck Construction',
    status: 'Pending',
    startDate: '2023-11-01',
    endDate: '2023-11-30',
  },
];

export const dummyContractors: ContractorProfile[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    email: 'sarah.j@example.com',
    phone: '+1 (555) 123-4567',
    experience: '5-10 years',
    hourlyRate: 75,
    availability: 'full-time',
    completedProjects: [
      {
        projectName: 'E-commerce Platform Redesign',
        clientName: 'TechCorp Inc.',
        completionDate: '2023-12-15',
        description: "Complete redesign of client's e-commerce platform",
        feedback: 'Excellent work and communication',
      },
    ],
    professionalSummary:
      'Senior full-stack developer specialized in React and Node.js with extensive e-commerce experience.',
  },
  {
    id: 2,
    name: 'Michael Chen',
    email: 'm.chen@example.com',
    phone: '+1 (555) 234-5678',
    experience: '3-5 years',
    hourlyRate: 60,
    availability: 'contract',
    completedProjects: [
      {
        projectName: 'Mobile App Development',
        clientName: 'HealthTech Solutions',
        completionDate: '2024-01-20',
        description: 'Healthcare monitoring mobile application',
        feedback: 'Great attention to detail',
      },
    ],
    professionalSummary:
      'Mobile app developer with focus on React Native and iOS development. Healthcare industry expert.',
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    email: 'e.rodriguez@example.com',
    phone: '+1 (555) 345-6789',
    experience: '10+ years',
    hourlyRate: 95,
    availability: 'freelance',
    completedProjects: [
      {
        projectName: 'AI Integration Project',
        clientName: 'DataSmart Analytics',
        completionDate: '2024-02-01',
        description: 'Implementation of ML models in production',
        feedback: 'Outstanding technical expertise',
      },
    ],
    professionalSummary:
      'AI/ML specialist with extensive experience in Python and TensorFlow. Led multiple successful AI implementations.',
  },
];

export const dummyNotifications: Notification[] = [
  {
    id: 1,
    type: 'success',
    title: 'Payment Approved',
    message: 'Your payment of $750 to Sarah Johnson has been approved and is being processed.',
    date: '2024-07-10 09:15 AM',
    isRead: false,
    relatedTo: 'payment',
  },
  {
    id: 2,
    type: 'success',
    title: 'Payment Sent',
    message: 'Payment of $850 has been successfully sent to Michael Chen.',
    date: '2024-07-09 02:30 PM',
    isRead: true,
    relatedTo: 'payment',
  },
  {
    id: 3,
    type: 'error',
    title: 'Payment Failed',
    message: 'Payment to Emily Rodriguez failed. Please check your payment method.',
    date: '2024-07-08 11:45 AM',
    isRead: false,
    relatedTo: 'payment',
  },
  {
    id: 4,
    type: 'info',
    title: 'Contract Accepted',
    message: 'Emily Rodriguez has accepted your contract proposal for the AI Integration Project.',
    date: '2024-07-07 03:20 PM',
    isRead: true,
    relatedTo: 'contract',
  },
  {
    id: 5,
    type: 'warning',
    title: 'Contract Expiring Soon',
    message: 'Your contract with Sarah Johnson will expire in 5 days. Consider renewal.',
    date: '2024-07-06 10:10 AM',
    isRead: false,
    relatedTo: 'contract',
  },
  {
    id: 6,
    type: 'info',
    title: 'New Message',
    message: 'You have received a new message from Michael Chen regarding the Mobile App project.',
    date: '2024-07-05 04:45 PM',
    isRead: true,
    relatedTo: 'message',
  },
  {
    id: 7,
    type: 'success',
    title: 'Milestone Completed',
    message:
      'Sarah Johnson has completed the first milestone for the E-commerce Platform Redesign.',
    date: '2024-07-04 01:30 PM',
    isRead: false,
    relatedTo: 'contract',
  },
  {
    id: 8,
    type: 'warning',
    title: 'Upcoming Meeting',
    message: 'Reminder: You have a scheduled meeting with Emily Rodriguez tomorrow at 2:00 PM.',
    date: '2024-07-03 09:00 AM',
    isRead: true,
    relatedTo: 'meeting',
  },
];
