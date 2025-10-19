import pool from "../config/db.js"
import { BadRequestError } from "../errors/index.js";

export const checkUsernameService = async (username, userId) => {
    
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [username])
    const user = result.rows[0]    
    
    if(user && user.id !== userId){
        throw new BadRequestError("Username is not available")
    }

    return {msg: "Available"}
}

export const completeProfileService = async (userData, userId) => {

    const {
        username, 
        name, 
        bio,
        skills = [], 
        campus, 
        year, 
        program,
        github_url = null,
        x_url = null
    } = userData;

    await checkUsernameService(username, userId)


    await pool.query("UPDATE users SET username=$1, name=$2, campus=$3, year=$4, program=$5, is_profile_complete=true, github_url=$6, x_url=$7, bio=$8 WHERE id=$9", [username, name, campus, year, program, github_url, x_url, bio, userId])
    

    if(Array.isArray(skills) && skills.length > 0){

        const userSkills = skills.map(skill => (
            pool.query("INSERT INTO user_skills (user_id, skill_id) VALUES($1, $2) ON CONFLICT DO NOTHING", [userId, skill])
        ))

        await Promise.all(userSkills)
    }

    
}

export const getUserService = async (userId) => {
    
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [userId])
    const user = result.rows[0]

    if(!user){
        throw BadRequestError("User dose not exist")
    }

    const skillsResult = await pool.query(`SELECT s.name, s.id
                                            FROM skills s 
                                            INNER JOIN user_skills us ON us.skill_id = s.id
                                            WHERE us.user_id = $1`, [userId])

    
    const skills = skillsResult.rows.map(row => ({label: row.name, value: row.id}))

    const projectsResult = await pool.query('SELECT * FROM projects WHERE user_id = $1', [userId])

    const project = projectsResult.rows.map(row => ({
        id: row.id,
        title: row.title,
        tagline: row.tagline,
        stage: row.stage
    }))
    
    return {user, skills, project}
} 

export const updateUserProfileService = async (userData, userId) => {

     const {
        username, 
        name, 
        bio,
        skills = [], 
        campus, 
        year, 
        program,
        github_url = null,
        x_url = null
    } = userData;
    
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [userId])
    const user = result.rows[0]

    if(!user){
        throw new BadRequestError("User dose not exists")
    }

    if(username && username != user.username){
        await checkUsernameService(username, userId)
    }

    await pool.query("UPDATE users SET username=$1, name=$2, bio=$3, github_url=$4, x_url=$5, campus=$6, year=$7, program=$8, updated_at = NOW() WHERE id=$9", [username, name, bio, github_url, x_url, campus, year, program, userId]);

    const skillIds = skills.map(skill => skill.value);
    
    if(skillIds.length > 0){
        await pool.query("DELETE FROM user_skills WHERE user_id=$1", [userId])

        const insertValues = skills
        .map((_, index) => `($1, $${index + 2})`)
        .join(', ');
        console.log(insertValues);
        
        await pool.query(`INSERT INTO user_skills (user_id, skill_id) VALUES ${insertValues}`, [userId, ...skillIds])
    }
 
    

    return {msg: "updated"}
}

export const searchUserService = async (searchItem) => {
    let searchResults;

    if(searchItem && searchItem.trim() !== ""){
        searchResults = await pool.query("SELECT id, username, name, bio FROM users WHERE username ILIKE $1 ORDER BY username LIMIT 10", [`%${searchItem}%`]) 

        if(searchResults.rows.length === 0 || !searchResults){
            throw new NotFoundError("No user Found")
        }

    }else{
        searchResults = { rows: [] } 
    }


    const result = searchResults.rows.map((user) => ({
        id: user.id,
        username: user.username,
        name: user.name,
        bio: user.bio
    }))

    return result;
}

export const getUserByUsernameService = async (username) => {
    const result = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
    const user = result.rows[0]
    

    if(!user){
        throw new BadRequestError("User dosent exists")
    }

    const userId = user.id

    const skillsResult = await pool.query(`SELECT s.name, s.id
                                            FROM skills s 
                                            INNER JOIN user_skills us ON us.skill_id = s.id
                                            WHERE us.user_id = $1`, [userId])

    
    const skills = skillsResult.rows.map(row => ({label: row.name, value: row.id}))

    const projectsResult = await pool.query('SELECT * FROM projects WHERE user_id = $1', [userId])

    const project = projectsResult.rows.map(row => ({
        id: row.id,
        title: row.title,
        tagline: row.tagline,
        stage: row.stage
    }))
    
    return {user, skills, project}
}

export const getRecommendedUsersModel = async () => {

}