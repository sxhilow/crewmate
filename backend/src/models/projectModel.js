import pool from "../config/db.js"
import { BadRequestError, NotFoundError, UnauthenticatedError } from '../errors/index.js';




export const getAllProjectsService = async (limit, offset) => {

    const projects = await pool.query("SELECT id, title, tagline FROM projects ORDER BY created_at DESC LIMIT $1 OFFSET $2", [limit, offset])
    
    return {projects: projects.rows}
    
}

export const getProjectService = async (projectId) => {
    const project = await pool.query("SELECT * FROM projects WHERE id=$1", [projectId])

    if(!project || project.rows.length === 0){
        throw new BadRequestError("Project with this ID does not exists")
    }

    return project.rows[0]
}

export const addProjectService = async (userId, projectData) => {
    const {title, tagline, description, stage, logo_url, github_url, skills = []} = projectData;

    if(!title || !description || !tagline || !stage){
        throw new BadRequestError("Title, Description, stage and tagline are required")
    }

    if (stage && stage.length > 10) throw new BadRequestError("Stage max length is 10");

    const project = await pool.query("INSERT INTO projects (user_id, title, tagline, description, stage, logo_url, github_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [userId, title, tagline, description, stage, logo_url, github_url]);

    const projectId = project.rows[0].id;
    
    const skillIds = skills.map(skill => skill.value);
    
    if(skillIds.length > 0){

        const insertValues = skills
        .map((_, index) => `($1, $${index + 2})`)
        .join(', ');
        
        await pool.query(`INSERT INTO project_skills (project_id, skill_id) VALUES ${insertValues}`, [projectId, ...skillIds])

    }

    const teamRes = await pool.query("INSERT INTO teams ( project_id, name ) VALUES ($1, $2) RETURNING *", [projectId, `${title} Team`])

    
    const teamId = teamRes.rows[0].id;  

    await pool.query("INSERT INTO team_members (team_id, user_id) VALUES ($1, $2) RETURNING *", [teamId, userId]);
    
    return {
        ...project.rows[0],
        skills: skillIds.map(id => ({id})),
        team: {
            id: teamId,
            name: `${title} Team`,
            members: [
                {userId}
            ]
        }
    }
}

export const deleteProjectService = async (projectId, userId) => {

    const project = await pool.query("DELETE FROM projects WHERE id=$1 and user_id=$2 RETURNING *", [projectId, userId])
    
    if(!project || !project.rows[0] || project.rows[0] === 0){
        throw new NotFoundError("Project not found")
    }

    return {msg: "Deleted successfully"}
}

export const sendProjectRequestService = async (projectId, userId) => {

    let ownerId = await pool.query("SELECT user_id FROM projects WHERE id=$1", [projectId])

    if(!ownerId.rows || ownerId.rows.length === 0){
        throw new NotFoundError("Project not found")
    }

    ownerId = ownerId.rows[0].user_id
    
    if(userId === ownerId){
        throw new BadRequestError("Cannot send request to yourself")
    }

    const existingReq = await pool.query("SELECT * FROM project_requests WHERE project_id=$1 AND user_id=$2", [projectId, userId]);

    if(existingReq.rows.length > 0){
        throw new BadRequestError("Request already sent");
    }

    const memberCheck = await pool.query("SELECT * FROM team_members WHERE user_id=$1", [userId]);

    if(memberCheck.rows.length > 0){
        throw new BadRequestError("You are already a part of this team")
    }
    
    const projectReq = await pool.query("INSERT INTO project_requests (project_id, user_id, status) VALUES ($1, $2, $3) RETURNING *",[projectId, userId, 'pending']);  
    

    const notification = await pool.query("INSERT INTO notifications (user_id, actor_id, type, seen) VALUES ($1, $2, $3, $4) RETURNING *", [ownerId, userId, 'join_request', false]);

    return {
        project_request: projectReq.rows[0],
        notification: notification.rows[0]
    }
} 

export const respondProjectRequestService = async (projectId, requestId, userId, decision) => {

    let senderId = await pool.query("SELECT user_id FROM project_requests WHERE id=$1", [requestId])
    senderId = senderId.rows[0].user_id;    
    if(!senderId) throw new BadRequestError("Request dose not exists")
    
    const requestCheck = await pool.query("SELECT * FROM project_requests WHERE id=$1", [requestId])
    if(!requestCheck.rows.length) throw new BadRequestError("Join request not found")

    const ownershipCheck = await pool.query("SELECT * FROM projects WHERE id=$1", [projectId])
    const ownerId = ownershipCheck.rows[0].user_id
    console.log(ownerId);
    
    if(ownerId !== userId) throw new UnauthenticatedError("Not authorized to respond to this request")

    const response = await pool.query("UPDATE project_requests SET status=$1 WHERE id=$2 RETURNING *", [decision, requestId]);


    const memberCheck = await pool.query("SELECT * FROM team_members WHERE user_id=$1", [senderId]);
    if(memberCheck.rows.length) throw new BadRequestError("Already a team member")
        

    const type = decision === 'accepted' ? 'join_request_accepted' : 'join_request_rejected';

    if(decision === 'accepted'){
        await pool.query("INSERT INTO team_members (team_id, user_id) VALUES ((SELECT id FROM teams WHERE project_id=$1), $2)", [projectId, senderId])
    }

    const notification = await pool.query("INSERT INTO notifications (user_id, actor_id, type, seen) VALUES ($1, $2, $3, $4) RETURNING *", [senderId, userId, type, false])

    return {
        response: response.rows[0],
        notification: notification.rows[0]
    }
}

export const getProjectRequestsService = async (userId) => {
    const requests = await pool.query(`SELECT pr.* 
                                        FROM project_requests pr 
                                        JOIN projects p ON pr.project_id = p.id
                                        WHERE p.user_id=$1`, [userId]);
    
    if(!requests.rows.length) throw new NotFoundError("No requests found")

    return {
        requests: requests.rows
    }
}
