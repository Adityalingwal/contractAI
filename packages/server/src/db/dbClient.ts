import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const connectionString = process.env.DATABASE_URL;
const updatedConnectionString = connectionString?.includes('sslmode=') 
  ? connectionString 
  : `${connectionString}${connectionString?.includes('?') ? '&' : '?'}sslmode=require`;

export const pool = new Pool({
  connectionString: updatedConnectionString,
  ssl: {
    rejectUnauthorized: false
  }
});

pool.query('SELECT NOW()', (err:Error, res:any) => {
  if (err) {
    console.error('Database connection error:', err.stack);
  } else {
    console.log('Database connected successfully at:', res.rows[0].now);
  }
});

export default {
  query: (text: string, params?: any[]) => pool.query(text, params),
  getClient: () => pool.connect(),
};
