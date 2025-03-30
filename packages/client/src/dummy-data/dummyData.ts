import { ContractorProfile, Notification } from '../types/businessDashboardTypes'
import { Gig } from '../types/gigsTypes'

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
        projectName: 'Kitchen Renovation',
        clientName: 'Thompson Family',
        completionDate: '2023-12-15',
        description: "Complete kitchen remodel including custom cabinetry and island installation",
        feedback: 'Excellent work and craftsmanship',
      },
    ],
    professionalSummary:
      'Licensed general contractor specializing in kitchen and bathroom renovations with expertise in modern designs.',
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
        projectName: 'Roofing Replacement',
        clientName: 'Westside Properties',
        completionDate: '2024-01-20',
        description: 'Complete roof replacement with weatherproofing upgrades',
        feedback: 'Great attention to detail and finished ahead of schedule',
      },
    ],
    professionalSummary:
      'Roofing specialist with certification in several roofing systems. Experienced in residential and commercial properties.',
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
        projectName: 'Home Addition Project',
        clientName: 'Garcia Family',
        completionDate: '2024-02-01',
        description: 'Design and construction of 500 sq ft master suite addition',
        feedback: 'Outstanding work quality and excellent project management',
      },
    ],
    professionalSummary:
      'Master carpenter and licensed contractor specializing in home additions and structural renovations. Known for quality craftsmanship.',
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


export const dummyGigs: Gig[] = [
  {
    id: 1,
    title: 'Web Development Project',
    category: 'Web Development',
    description:
      'Need a React developer to build a responsive website with multiple pages, contact forms, and user authentication. Must be completed within 2-3 weeks.',
    budget: '$1500',
    details:
      'In-depth Details:\n\nThis project involves creating a fully responsive website for a local business. The website should include:\n• 5-7 pages (Home, About, Services, Contact, etc.)\n• A secure login system for users\n• Basic data collection using a form\n• Integration with a third-party API\n\nWe are looking for someone with experience in:\n• React & TypeScript\n• Responsive design with Tailwind CSS\n• Integrating forms and authentication\n\nTimeline: 2-3 weeks\nBudget: $1500\nPayment will be delivered in milestones upon completion of key project parts.',
  },
  {
    id: 2,
    title: 'Mobile App UI Design',
    category: 'UI/UX Design',
    description:
      'Looking for a designer to create wireframes and high-fidelity mockups for a cross-platform mobile app.',
    budget: '$1000',
    details:
      'In-depth Details:\n\nThis project is focused on designing a mobile app that will be used for event management. The designer should:\n• Provide wireframes for at least 5 main screens\n• Create high-fidelity mockups in Figma\n• Deliver a design system (colors, typography, components)\n\nKey Skills:\n• Strong UI/UX portfolio\n• Familiarity with Figma\n• Experience designing mobile-first applications\n\nTimeline: 2 weeks\nBudget: $1000\nPayment is negotiable based on scope and additional features.',
  },
  {
    id: 3,
    title: 'E-commerce Marketing Strategy',
    category: 'Digital Marketing',
    description:
      'Seeking an experienced digital marketer to develop a strategy for boosting sales on our e-commerce platform.',
    budget: '$800',
    details:
      'In-depth Details:\n\nWe have an online store selling handmade crafts. We need:\n• A comprehensive marketing plan focusing on social media ads\n• Keyword research for SEO\n• Email marketing campaign strategy\n• Recommendations for increasing conversion rates\n\nPreferred Skills:\n• Experience with Google Ads, Facebook Ads, and Instagram marketing\n• Knowledge of e-commerce best practices\n\nTimeline: 1-2 weeks\nBudget: $800\nPayment terms can be discussed based on milestones and performance metrics.',
  },
]
