import pkg from"pg";
import dotenv from 'dotenv';

dotenv.config();

const { Pool } = pkg;

const pool = new Pool({

    // docker postgre instance
    // user: process.env.DB_USER,
    // host: process.env.DB_HOST,
    // database: process.env.DB,
    // password: process.env.DB_PASSWORD,
    // port: process.env.DB_PORT

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
    release(); // release the client back to the pool
  }
});

export default pool

