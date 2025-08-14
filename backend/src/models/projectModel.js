import pool from "../config/db.js"



export const getAllProjectsService = async (limit, offset) => {

    const projects = await pool.query("SELECT id, title, tagline FROM projects ORDER BY created_at DESC LIMIT $1 OFFSET $2", [limit, offset])
    
    return {projects: projects.rows}
    
}

export const getProjectService = async (projectId) => {

}

export const addProjectService = async (projectData) => {

}

export const deleteProjectService = async (projectId) => {

}
