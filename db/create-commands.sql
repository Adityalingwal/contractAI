
DROP TABLE IF EXISTS invoices;
DROP TABLE IF EXISTS tasks; 
DROP TABLE IF EXISTS contractors;
DROP TABLE IF EXISTS companies;
DROP TABLE IF EXISTS skills;
DROP TABLE IF EXISTS contractor_skills;

DROP TYPE IF EXISTS task_status;
DROP TYPE IF EXISTS payment_method;
DROP TYPE IF EXISTS invoice_status;
DROP TYPE IF EXISTS experience_level;
DROP TYPE IF EXISTS availability_type;

CREATE TYPE task_status AS ENUM ('open', 'assigned', 'in_progress', 'completed', 'cancelled');
CREATE TYPE payment_method AS ENUM ('ACH', 'USDC', 'TEST_RAILS');
CREATE TYPE invoice_status AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE experience_level AS ENUM ('entry', 'intermediate', 'expert');
CREATE TYPE availability_type AS ENUM ('fullTime', 'partTime', 'limited');

CREATE TABLE contractors (
    contractor_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    full_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    professional_title VARCHAR(100) NOT NULL,
    bio TEXT NOT NULL,
    experience_level experience_level NOT NULL DEFAULT 'intermediate',
    hourly_rate DECIMAL(10,2) NOT NULL,
    skills TEXT NOT NULL,
    portfolio_link VARCHAR(255),
    availability availability_type NOT NULL DEFAULT 'fullTime',
    available_from DATE NOT NULL,
    linkedin_profile VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- -- Create companies table
-- CREATE TABLE companies (
--     company_id SERIAL PRIMARY KEY,
--     company_name VARCHAR(100) NOT NULL,
--     email VARCHAR(100) NOT NULL UNIQUE,
--     address VARCHAR(255),
--     description TEXT,            
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
-- );

-- -- Create tasks table
-- CREATE TABLE tasks (
--     task_id SERIAL PRIMARY KEY,
--     company_id INT NOT NULL,
--     contractor_id uuid DEFAULT NULL,
--     title VARCHAR(255) NOT NULL,
--     description TEXT,
--     status task_status DEFAULT 'open',
--     due_date DATE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (company_id) REFERENCES companies(company_id),
--     FOREIGN KEY (contractor_id) REFERENCES contractors(contractor_id)
-- );

-- -- Create invoices table
-- CREATE TABLE invoices (
--     invoice_id SERIAL PRIMARY KEY,
--     task_id INT NOT NULL,
--     contractor_id uuid NOT NULL,
--     company_id INT NOT NULL,
--     invoice_date DATE,
--     amount DECIMAL(10,2) NOT NULL,
--     payment_method payment_method NOT NULL,
--     status invoice_status DEFAULT 'pending',
--     payment_date DATE,
--     created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
--     FOREIGN KEY (task_id) REFERENCES tasks(task_id),
--     FOREIGN KEY (contractor_id) REFERENCES contractors(contractor_id),
--     FOREIGN KEY (company_id) REFERENCES companies(company_id)
-- );