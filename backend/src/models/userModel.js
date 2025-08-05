import pool from "../config/db.js"
import { BadRequestError } from "../errors/bad-request.js"

export const checkUsernameService = async (username) => {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [username])
    const user = result.rows[0]

    if(user){
        throw new BadRequestError("Username is taken")
    }

    return {msg: "Available"}
}

export const completeProfileService = async (userId, username, name, skills) => {

    await checkUsernameService(username)

    await pool.query("UPDATE users SET username=$1, name=$2, is_profile_complete=true WHERE id=$3", [username, name, userId])

    const userSkills = skills.map(skill => (
        pool.query("INSERT INTO user_skills (user_id, skill_id) VALUES($1, $2) ON CONFLICT DO NOTHING", [userId, skill])
    ))

    await Promise.all(userSkills)
}

export const getUserService = async (userId) => {
    
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [userId])
    const user = result.rows[0]

    if(!user){
        throw BadRequestError("User dose not exist")
    }

    const skillsResult = await pool.query(`SELECT s.name 
                                            FROM skills s 
                                            INNER JOIN user_skills us ON us.skill_id = s.id
                                            WHERE us.user_id = $1`, [userId])

    
    const skills = skillsResult.rows.map(row => row.name)

    const projectsResult = await pool.query('SELECT * FROM projects WHERE user_id = $1', [userId])

    const project = projectsResult.rows.map(row => ({
        title: row.title,
        tagline: row.tagline,
        stage: row.stage
    }))
    
    return {user, skills, project}
} 