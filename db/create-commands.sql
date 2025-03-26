
CREATE TYPE task_status AS ENUM ('open', 'assigned', 'in_progress', 'completed', 'cancelled');

CREATE TABLE contractors (
    contractor_id SERIAL PRIMARY KEY,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    linkedin_profile VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE companies (
    company_id SERIAL PRIMARY KEY,
    company_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    address VARCHAR(255),
    description TEXT,            
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE tasks (
    task_id SERIAL PRIMARY KEY,
    company_id INT NOT NULL,
    contractor_id INT DEFAULT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status task_status DEFAULT 'open',
    due_date DATE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (company_id) REFERENCES companies(company_id),
    FOREIGN KEY (contractor_id) REFERENCES contractors(contractor_id)
);
