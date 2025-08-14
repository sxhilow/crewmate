import pool from "../config/db.js"
import { BadRequestError } from '../errors/index.js';




export const getAllProjectsService = async (limit, offset) => {

    const projects = await pool.query("SELECT id, title, tagline FROM projects ORDER BY created_at DESC LIMIT $1 OFFSET $2", [limit, offset])
    
    return {projects: projects.rows}
    
}

export const getProjectService = async (projectId) => {
    const project = await pool.query("SELECT * FROM projects WHERE id=$1", [projectId])

    if(!project || project.rows.length === 0){
        throw new BadRequestError("Project with this ID does not exists")
    }

    return {project: project.rows[0]}
}

export const addProjectService = async (projectData) => {
    
}

export const deleteProjectService = async (projectId) => {

}
