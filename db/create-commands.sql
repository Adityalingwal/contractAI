-- Define ENUM types
CREATE TYPE task_status AS ENUM ('open', 'assigned', 'in_progress', 'completed', 'cancelled');
CREATE TYPE payment_method AS ENUM ('ACH', 'USDC');
CREATE TYPE invoice_status AS ENUM ('pending', 'paid', 'failed');

-- Contractors Table
CREATE TABLE contractors (
    contractor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    address VARCHAR(255),
    tax_id VARCHAR(50),           -- Tax identification number (SSN/TIN)
    bank_account VARCHAR(50),     -- Bank account number (consider encryption)
    linkedin_profile VARCHAR(255),-- LinkedIn or portfolio URL
    profile_picture VARCHAR(255), -- Profile image URL
    resume VARCHAR(255),          -- Resume file path or URL
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Companies Table
CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    phone VARCHAR(15),
    address VARCHAR(255),
    description TEXT,            
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tasks Table
CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    contractor_id INT DEFAULT NULL,  -- Updated once a contractor is assigned
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_status DEFAULT 'open',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (contractor_id) REFERENCES contractors(contractor_id)
);

-- Skills Table
CREATE TABLE skills (
    skill_id SERIAL PRIMARY KEY,
    skill_name VARCHAR(100) NOT NULL UNIQUE
);

-- Contractor_Skills Mapping Table
CREATE TABLE contractor_skills (
    contractor_id INT,
    skill_id INT,
    PRIMARY KEY (contractor_id, skill_id),
    FOREIGN KEY (contractor_id) REFERENCES contractors(contractor_id),
    FOREIGN KEY (skill_id) REFERENCES skills(skill_id)
);

-- Invoices Table
CREATE TABLE invoices (
    invoice_id SERIAL PRIMARY KEY,
    task_id INT NOT NULL,
    contractor_id INT NOT NULL,
    company_id INT NOT NULL,
    invoice_date DATE,
    amount DECIMAL(10,2) NOT NULL,
    tax_deduction DECIMAL(10,2) DEFAULT 0.00,
    payment_method payment_method NOT NULL,
    status invoice_status DEFAULT 'pending',
    payment_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (task_id) REFERENCES tasks(task_id),
    FOREIGN KEY (contractor_id) REFERENCES contractors(contractor_id),
    FOREIGN KEY (company_id) REFERENCES companies(company_id)
);
