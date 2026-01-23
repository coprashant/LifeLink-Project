const { Pool } = require('pg');
require('dotenv').config();

// Initialize the connection pool
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT || 5432,
});

ssl: { rejectUnauthorized: false }

// Test the connection immediately on startup
pool.on('connect', () => {
  console.log('Connected to LifeLink PostgreSQL Database');
});

pool.on('error', (err) => {
  console.error('Unexpected error on idle client', err);
  process.exit(-1);
});

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool: pool
};

