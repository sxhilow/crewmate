import pkg from"pg";
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({
    // supabase instance
    connectionString: process.env.DB_URL,
    ssl: {
        rejectUnauthorized: false, 
    },
})

pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Database connection failed:", err)
  } else {
    console.log("✅ Database connection successful");
    release();
  }
});

export default pool

