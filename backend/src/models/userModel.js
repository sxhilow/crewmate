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
        pool.query("INSERT INTO user_skills (user_id, skill_id) VALUES($1, $2) ON CONFLICT DO NOTHING", [userId, skill.value])
    ))

    await Promise.all(userSkills)

}