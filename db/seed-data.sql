-- Insert sample companies
INSERT INTO companies (company_name, email, phone, address, description)
VALUES 
  ('TechCorp Inc.', 'contact@techcorp.com', '555-123-4567', '123 Tech Avenue, San Francisco, CA 94105', 'Leading technology solutions provider'),
  ('HealthTech Solutions', 'info@healthtech.com', '555-234-5678', '456 Medical Drive, Boston, MA 02115', 'Healthcare software and services'),
  ('DataSmart Analytics', 'support@datasmart.com', '555-345-6789', '789 Data Lane, Austin, TX 78701', 'Big data and analytics services');

-- Insert sample contractors
INSERT INTO contractors (first_name, last_name, email, phone, address, tax_id, bank_account, linkedin_profile, profile_picture, resume)
VALUES 
  ('Sarah', 'Johnson', 'sarah.j@example.com', '555-123-4567', '123 Developer St, Seattle, WA 98101', '123-45-6789', 'BANK-001', 'linkedin.com/in/sarahjohnson', 'https://randomuser.me/api/portraits/women/1.jpg', 'resumes/sarah_johnson.pdf'),
  ('Michael', 'Chen', 'm.chen@example.com', '555-234-5678', '456 Coder Ave, Portland, OR 97201', '234-56-7890', 'BANK-002', 'linkedin.com/in/michaelchen', 'https://randomuser.me/api/portraits/men/2.jpg', 'resumes/michael_chen.pdf'),
  ('Emily', 'Rodriguez', 'e.rodriguez@example.com', '555-345-6789', '789 Tech Blvd, Austin, TX 78701', '345-67-8901', 'BANK-003', 'linkedin.com/in/emilyrodriguez', 'https://randomuser.me/api/portraits/women/3.jpg', 'resumes/emily_rodriguez.pdf');

-- Insert sample skills
INSERT INTO skills (skill_name)
VALUES 
  ('React'), 
  ('Node.js'),
  ('TypeScript'),
  ('Python'),
  ('TensorFlow'),
  ('React Native'),
  ('PostgreSQL'),
  ('AWS'),
  ('Docker'),
  ('GraphQL');

-- Insert sample contractor_skills (run this after contractors and skills are inserted)
INSERT INTO contractor_skills (contractor_id, skill_id)
VALUES 
  (1, 1), -- Sarah Johnson knows React
  (1, 2), -- Sarah Johnson knows Node.js
  (1, 3), -- Sarah Johnson knows TypeScript
  (2, 6), -- Michael Chen knows React Native
  (2, 1), -- Michael Chen knows React
  (2, 7), -- Michael Chen knows PostgreSQL
  (3, 4), -- Emily Rodriguez knows Python
  (3, 5), -- Emily Rodriguez knows TensorFlow
  (3, 8); -- Emily Rodriguez knows AWS

-- Insert sample tasks (run this after companies and contractors are inserted)
INSERT INTO tasks (company_id, contractor_id, title, description, status, due_date)
VALUES 
  (1, 1, 'E-commerce Platform Redesign', 'Complete redesign of client''s e-commerce platform using React and Node.js', 'completed', '2023-12-15'),
  (2, 2, 'Mobile App Development', 'Healthcare monitoring mobile application using React Native', 'in_progress', '2024-09-20'),
  (3, 3, 'AI Integration Project', 'Implementation of ML models in production environment using TensorFlow', 'assigned', '2024-10-15'),
  (1, NULL, 'Backend API Development', 'Develop new backend API endpoints for customer management', 'open', '2024-10-30'),
  (2, NULL, 'Database Optimization', 'Optimize database queries and architecture for performance', 'open', '2024-11-05');

-- Insert sample invoices (run this after tasks, contractors and companies are inserted)
INSERT INTO invoices (task_id, contractor_id, company_id, invoice_date, amount, tax_deduction, payment_method, status, payment_date)
VALUES 
  (1, 1, 1, '2023-12-20', 5000.00, 500.00, 'ACH', 'paid', '2023-12-25'),
  (2, 2, 2, '2024-07-15', 3500.00, 350.00, 'ACH', 'pending', NULL),
  (3, 3, 3, '2024-07-01', 7500.00, 750.00, 'USDC', 'pending', NULL);