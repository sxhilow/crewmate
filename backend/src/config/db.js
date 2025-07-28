import dotenv from "dotenv"
import pkg from"pg";

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

pool.on("connect", () => {
    
    try {
        console.log("Database connection successfull");
    } catch (error) {
        console.log("Error: ", error);
        
    }
    
})

export default pool

