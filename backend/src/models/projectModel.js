import pool from "../config/db.js"
import { BadRequestError, NotFoundError } from '../errors/index.js';




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
    const {title, tagline, description, stage, logo_url, github_url} = projectData;

    if(!title || !description || !tagline || !stage){
        throw new BadRequestError("Title, Description, stage and tagline are required")
    }

    if (stage && stage.length > 10) throw new BadRequestError("Stage max length is 10");

    const project = await pool.query("INSERT INTO projects (user_id, title, tagline, description, stage, logo_url, github_url) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *", [userId, title, tagline, description, stage, logo_url, github_url]);
    
    return project.rows[0]
}

export const deleteProjectService = async (projectId, userId) => {

    const project = await pool.query("DELETE FROM projects WHERE id=$1 and user_id=$2 RETURNING *", [projectId, userId])
    
    if(!project || !project.rows[0] || project.rows[0] === 0){
        throw new NotFoundError("Project not found")
    }

    return {msg: "Deleted successfully"}
}
