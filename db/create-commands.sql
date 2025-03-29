

CREATE TYPE task_status AS ENUM ('open', 'assigned', 'in_progress', 'completed', 'cancelled');
CREATE TYPE payment_type AS ENUM ('ACH', 'USDC', 'TEST_RAILS');
CREATE TYPE invoice_status AS ENUM ('pending', 'paid', 'failed');
CREATE TYPE experience_type AS ENUM ('entry', 'intermediate', 'expert');
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

CREATE TABLE gigs (
    gig_id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    company_id uuid NOT NULL,
    title VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    required_skills TEXT NOT NULL,
    experience_level experience_type NOT NULL,
    estimated_duration VARCHAR(50) NOT NULL,
    hourly_rate DECIMAL(10,2) NOT NULL,
    status task_status NOT NULL DEFAULT 'open',
    payment_method payment_type NOT NULL DEFAULT 'TEST_RAILS',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
