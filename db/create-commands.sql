
DROP TABLE IF EXISTS payments;
DROP TABLE IF EXISTS tenants;
DROP TABLE IF EXISTS contractors;
DROP TABLE IF EXISTS buildings;

-- Create Buildings table
CREATE TABLE buildings (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  address VARCHAR(255),
  occupancy INTEGER,
  monthly_revenue DECIMAL(10, 2),
  health_score INTEGER,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Tenants table
CREATE TABLE tenants (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  unit VARCHAR(20) NOT NULL,
  account_id VARCHAR(20) UNIQUE,
  building_id INTEGER REFERENCES buildings(id),
  due_date DATE,
  last_payment DATE,
  status VARCHAR(20) CHECK (status IN ('ontime', 'late', 'unmatched')),
  score INTEGER,
  email VARCHAR(100),
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Contractors table
CREATE TABLE contractors (
  id SERIAL PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  email VARCHAR(100) UNIQUE,
  phone VARCHAR(20),
  task_count INTEGER DEFAULT 0,
  active_task_count INTEGER DEFAULT 0,
  last_payment DATE,
  payment_status VARCHAR(20) CHECK (payment_status IN ('paid', 'pending', 'failed')),
  compliance_status VARCHAR(20) CHECK (compliance_status IN ('compliant', 'pending', 'non-compliant')),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create Payments table
CREATE TABLE payments (
  id SERIAL PRIMARY KEY,
  payment_id VARCHAR(20) UNIQUE,
  tenant_id INTEGER REFERENCES tenants(id),
  amount DECIMAL(10, 2) NOT NULL,
  payment_date DATE NOT NULL,
  status VARCHAR(20) CHECK (status IN ('ontime', 'late', 'unmatched')),
  payment_method VARCHAR(50),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create index for faster lookups
CREATE INDEX idx_tenant_building ON tenants(building_id);
CREATE INDEX idx_payments_tenant ON payments(tenant_id);