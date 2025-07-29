import pool  from "../config/db.js";
import { createAuthToken } from "../utils/jwt.js";


export const authService = async ({email, name, provider}) => {
    try {
        const exists = await pool.query("SELECT * FROM users WHERE email=$1", [email])    
        let user = exists.rows[0]

        if(!user){
            const tempUsername = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 10000);
            const createUser = await pool.query("INSERT INTO users (username, name, email, provider) VALUES ($1, $2, $3, $4) RETURNING *", [tempUsername, name, email, provider]);
            user = createUser.rows[0];
        }

        const token = createAuthToken({userId: user.id, name: user.name})

        return {token, user}
    } catch (error) {
        console.error("authService Error", error)
        throw new Error("Internal Server Error!!")
    }
}


// export const googleAuthService = async ({email, name}) => {
    
//     const result = await pool.query("SELECT * FROM users WHERE email=$1", [email])

//     let user = result.rows[0]

//     if(!user){
//         const username = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 10000)

//         const createUser = await pool.query("INSERT INTO users (username, name, email, provider) VALUES ($1, $2, $3, $4) RETURNING *", [username, name, email, 'google'])
        
//         user = createUser.rows[0]
//     }

//     const token = createAuthToken({userId: user.id, name: user.name})

//     return {token, user}
// }

// export const githubAuthService = async({email, name}) => {

//     const result = await pool.query("SELECT * FROM users WHERE email = $1", [email])
//     let user = result.rows[0]

//     if(!user){
//         const username = name.toLowerCase().replace(/\s+/g, '') + Math.floor(Math.random() * 10000)

//         const createUser = await pool.query("INSERT INTO users (username, name, email, provider) VALUES ($1, $2, $3, $4) RETURNING *", [username, name, email, 'github'])
        
//         user = createUser.rows[0]
//     }

//     const token = createAuthToken({userId: user.id, name: user.name})

//     return {token, user}
// }