 export const dummyPayments = [
  { id: 'PAY-001', project: 'Kitchen Renovation', amount: '$2,500', date: '2023-10-15', status: 'Pending Approval' },
  { id: 'PAY-002', project: 'Bathroom Remodel', amount: '$1,800', date: '2023-09-28', status: 'Approved' },
  { id: 'PAY-003', project: 'Deck Construction', amount: '$3,200', date: '2023-11-05', status: 'Paid' },
  { id: 'PAY-004', project: 'Basement Finishing', amount: '$4,500', date: '2023-10-30', status: 'Rejected' },
];

export const dummyContractorProfile = {
  name: "John Carpenter",
  email: "john.carpenter@example.com",
  phone: "(555) 123-4567",
  specialty: "Carpentry & Woodworking",
  experience: "15 years",
  hourlyRate: "$75",
  availability: "Weekdays, 8am-5pm",
  bio: "Experienced carpenter specializing in custom cabinetry, furniture, and home renovations. Committed to quality craftsmanship and client satisfaction."
};

export const dummyContracts = [
  { id: 'CON-001', title: 'Kitchen Renovation', status: 'In Progress', startDate: '2023-10-01', endDate: '2023-12-01' },
  { id: 'CON-002', title: 'Bathroom Remodel', status: 'Completed', startDate: '2023-08-15', endDate: '2023-09-15' },
  { id: 'CON-003', title: 'Deck Construction', status: 'Pending', startDate: '2023-11-01', endDate: '2023-11-30' },
];