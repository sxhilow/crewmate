import pool from "../config/db.js"
import { BadRequestError } from "../errors/bad-request.js"

export const checkUsernameService = async (username) => {
    const result = await pool.query("SELECT * FROM users WHERE username=$1", [username])
    const user = result.rows[0]

    if(user){
        throw new BadRequestError("Username is not available")
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

    const {name, bio, username, github_url, x_url, skills = []} = userData;
    
    const result = await pool.query("SELECT * FROM users WHERE id=$1", [userId])
    const user = result.rows[0]

    if(!user){
        throw new BadRequestError("User dose not exists")
    }

    if(username && username != user.username){
        checkUsernameService(username)
    }

    await pool.query("UPDATE users SET username=$1, name=$2, bio=$3, github_url=$4, x_url=$5, updated_at = NOW() WHERE id=$6", [username, name, bio, github_url, x_url, userId]);

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
    const result = await pool.query("SELECT id, name, username, bio, github_url, x_url FROM users WHERE username = $1", [username]);
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