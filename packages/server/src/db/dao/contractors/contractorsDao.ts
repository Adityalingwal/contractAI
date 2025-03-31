import { pool } from '../../dbClient';
import { Contractor, ContractorDB, ContractAssignment, GigWithStatus } from './types';
import { mapToContractor } from './utils';

export async function upsertContractor(contractor: Contractor): Promise<Contractor> {
  const query = contractor.contractorId
    ? `UPDATE contractors SET 
        full_name = $1, 
        email = $2, 
        professional_title = $3, 
        bio = $4, 
        experience_level = $5, 
        hourly_rate = $6, 
        skills = $7, 
        portfolio_link = $8, 
        availability = $9, 
        available_from = $10,
        linkedin_profile = $11
      WHERE contractor_id = $12 
      RETURNING *`
    : `INSERT INTO contractors 
        (full_name, email, professional_title, bio, experience_level, hourly_rate, skills, 
         portfolio_link, availability, available_from, linkedin_profile)
      VALUES 
        ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *`;

  const values = [
    contractor.fullName,
    contractor.email,
    contractor.professionalTitle,
    contractor.bio,
    contractor.experienceLevel,
    contractor.hourlyRate,
    contractor.skills,
    contractor.portfolioLink || null,
    contractor.availability,
    contractor.availableFrom,
    contractor.linkedinProfile || null,
  ];

  if (contractor.contractorId) {
    values.push(contractor.contractorId);
  }

  const result = await pool.query(query, values);
  return mapToContractor(result.rows[0]);
}

export async function fetchContractorById(id: number): Promise<Contractor | undefined> {
  const result = await pool.query(
    'SELECT * FROM contractors WHERE contractor_id = $1',
    [id]
  );

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapToContractor(result.rows[0]);
}

export async function fetchContractorByEmail(email: string): Promise<Contractor | undefined> {
  const result = await pool.query('SELECT * FROM contractors WHERE email = $1', [
    email,
  ]);

  if (result.rows.length === 0) {
    return undefined;
  }

  return mapToContractor(result.rows[0]);
}

export async function fetchAllContractors(): Promise<Contractor[]> {
  const result = await pool.query('SELECT * FROM contractors');
  return result.rows.map(mapToContractor);
}

export async function deleteContractor(id: number): Promise<void> {
  await pool.query('DELETE FROM contractors WHERE contractor_id = $1', [id]);
}

export async function assignContractToContractor(gigId: string, contractorId: string): Promise<ContractAssignment> {
  await pool.query(
    'UPDATE gigs SET status = $1 WHERE gig_id = $2',
    ['assigned', gigId]
  );
  
  const result = await pool.query(
    `INSERT INTO gig_assignments
      (gig_id, contractor_id, assigned_at, status)
     VALUES
      ($1, $2, CURRENT_TIMESTAMP, 'assigned')
     RETURNING *`,
    [gigId, contractorId]
  );
  
  return {
    assignmentId: result.rows[0].assignment_id,
    gigId: result.rows[0].gig_id,
    contractorId: result.rows[0].contractor_id,
    assignedAt: result.rows[0].assigned_at,
    status: result.rows[0].status,
    completedAt: result.rows[0].completed_at,
  };
}

export async function getAssignmentsByContractorId(contractorId: string): Promise<ContractAssignment[]> {
  const result = await pool.query(
    'SELECT * FROM gig_assignments WHERE contractor_id = $1',
    [contractorId]
  );
  
  return result.rows.map((row:any) => ({
    assignmentId: row.assignment_id,
    gigId: row.gig_id,
    contractorId: row.contractor_id,
    assignedAt: row.assigned_at,
    status: row.status,
    completedAt: row.completed_at,
  }));
}

export async function getAssignmentsByGigId(gigId: string): Promise<ContractAssignment[]> {
  const result = await pool.query(
    'SELECT * FROM gig_assignments WHERE gig_id = $1',
    [gigId]
  );
  
  return result.rows.map((row:any) => ({
    assignmentId: row.assignment_id,
    gigId: row.gig_id,
    contractorId: row.contractor_id,
    assignedAt: row.assigned_at,
    status: row.status,
    completedAt: row.completed_at,
  }));
}

export async function getContractorAssignments(contractorId: string): Promise<any[]> {
  const query = `
    SELECT 
      ga.assignment_id,
      ga.gig_id,
      ga.contractor_id,
      ga.assigned_at,
      ga.status as assignment_status,
      ga.completed_at,
      g.title,
      g.description,
      g.required_skills,
      g.experience_level,
      g.estimated_duration,
      g.hourly_rate,
      g.status as gig_status,
      g.payment_method,
      g.created_at,
      g.updated_at
    FROM 
      gig_assignments ga
    JOIN 
      gigs g ON ga.gig_id = g.gig_id
    WHERE 
      ga.contractor_id = $1
    ORDER BY 
      ga.assigned_at DESC
  `;
  
  const result = await pool.query(query, [contractorId]);
  return result.rows.map((row: any) => ({
    assignmentId: row.assignment_id,
    gigId: row.gig_id,
    contractorId: row.contractor_id,
    title: row.title,
    description: row.description,
    requiredSkills: row.required_skills,
    experienceLevel: row.experience_level,
    estimatedDuration: row.estimated_duration,
    hourlyRate: row.hourly_rate,
    assignmentStatus: row.assignment_status,
    gigStatus: row.gig_status,
    assignedAt: row.assigned_at,
    completedAt: row.completed_at,
    paymentMethod: row.payment_method,
    createdAt: row.created_at,
    updatedAt: row.updated_at
  }));
}

export async function completeGigAssignment(
  assignmentId: string, 
  projectLink: string
): Promise<ContractAssignment> {
  const result = await pool.query(
    `UPDATE gig_assignments 
     SET 
       status = 'completed', 
       completed_at = CURRENT_TIMESTAMP,
       project_link = $1
     WHERE 
       assignment_id = $2
     RETURNING *`,
    [projectLink, assignmentId]
  );
  
  if (result.rows.length === 0) {
    throw new Error('Assignment not found');
  }
  
  await pool.query(
    `UPDATE gigs 
     SET status = 'completed' 
     WHERE gig_id = $1`,
    [result.rows[0].gig_id]
  );
  
  return {
    assignmentId: result.rows[0].assignment_id,
    gigId: result.rows[0].gig_id,
    contractorId: result.rows[0].contractor_id,
    assignedAt: result.rows[0].assigned_at,
    status: result.rows[0].status,
    completedAt: result.rows[0].completed_at,
    projectLink: result.rows[0].project_link
  };
}


export async function fetchGigsWithStatus(): Promise<GigWithStatus[]> {
  const query = `
    SELECT 
      g.gig_id,
      g.title,
      g.description,
      g.required_skills,
      g.experience_level,
      g.estimated_duration,
      g.hourly_rate,
      g.status,
      g.payment_method,
      g.created_at,
      g.updated_at,
      ga.contractor_id,
      c.full_name as contractor_name,
      ga.assigned_at,
      ga.completed_at,
      ga.project_link
    FROM 
      gigs g
    LEFT JOIN 
      gig_assignments ga ON g.gig_id = ga.gig_id
    LEFT JOIN
      contractors c ON ga.contractor_id = c.contractor_id
    ORDER BY 
      g.created_at DESC
  `;

  const result = await pool.query(query);
  
  return result.rows.map((row: any) => ({
    gigId: row.gig_id,
    title: row.title,
    description: row.description,
    requiredSkills: row.required_skills,
    experienceLevel: row.experience_level,
    estimatedDuration: row.estimated_duration,
    hourlyRate: row.hourly_rate,
    status: row.status,
    paymentMethod: row.payment_method,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    contractorId: row.contractor_id,
    contractorName: row.contractor_name,
    assignedAt: row.assigned_at,
    completedAt: row.completed_at,
    projectLink: row.project_link
  }));
}

export async function createContractor(contractorData: any): Promise<any> {
  try {
    const result = await pool.query(
      `INSERT INTO contractors (
        full_name, 
        email, 
        bio, 
        professional_title, 
        skills, 
        experience_level, 
        availability, 
        hourly_rate, 
        available_from, 
        portfolio_link, 
        linkedin_profile,
        payee_id
      ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12) RETURNING *`,
      [
        contractorData.fullName,
        contractorData.email,
        contractorData.bio,
        contractorData.professionalTitle,
        contractorData.skills,
        contractorData.experienceLevel,
        contractorData.availability,
        contractorData.hourlyRate,
        contractorData.availableFrom,
        contractorData.portfolioLink,
        contractorData.linkedinProfile,
        contractorData.payeeId
      ]
    );

    return {
      contractorId: result.rows[0].contractor_id,
      fullName: result.rows[0].full_name,
      email: result.rows[0].email,
      bio: result.rows[0].bio,
      professionalTitle: result.rows[0].professional_title,
      skills: result.rows[0].skills,
      experienceLevel: result.rows[0].experience_level,
      availability: result.rows[0].availability,
      hourlyRate: result.rows[0].hourly_rate,
      availableFrom: result.rows[0].available_from,
      portfolioLink: result.rows[0].portfolio_link,
      linkedinProfile: result.rows[0].linkedin_profile,
      payeeId: result.rows[0].payee_id,
      createdAt: result.rows[0].created_at,
      updatedAt: result.rows[0].updated_at
    };
  } catch (error) {
    console.error('Error creating contractor:', error);
    throw error;
  }
}



export interface ContractorPayment {
  paymentId: string;
  assignmentId: string;
  gigTitle: string;
  amount: string;
  paymentDate: Date;
  status: string;
  projectLink: string;
}

export async function fetchContractorPayments(contractorId: string): Promise<ContractorPayment[]> {
  const query = `
    SELECT 
      ga.payment_id,
      ga.assignment_id,
      g.title as gig_title,
      g.hourly_rate as amount,
      ga.payment_sent_at as payment_date,
      ga.payment_status as status,
      ga.project_link
    FROM 
      gig_assignments ga
    JOIN 
      gigs g ON ga.gig_id = g.gig_id
    WHERE 
      ga.contractor_id = $1
      AND ga.payment_id IS NOT NULL
    ORDER BY 
      ga.payment_sent_at DESC
  `;

  const result = await pool.query(query, [contractorId]);
  
  return result.rows.map((row:any) => ({
    paymentId: row.payment_id,
    assignmentId: row.assignment_id,
    gigTitle: row.gig_title,
    amount: `$${row.amount}`,
    paymentDate: row.payment_date,
    status: row.status || 'paid',
    projectLink: row.project_link
  }));
}

