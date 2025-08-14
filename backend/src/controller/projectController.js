import { StatusCodes } from "http-status-codes"
import { getAllProjectsService, getProjectService } from "../models/projectModel.js"
import { BadRequestError } from '../errors/index.js';


export const getAllProjects = async (req, res) => {
    const {limit, offset} = req.query || 12
    const projects = await getAllProjectsService(limit, offset)
    res.status(StatusCodes.OK).json(projects)
}
export const getProject = async (req, res) => {
    const {id} = req.params;
    if(!id){
        throw new BadRequestError("ID is required")
    }
    const project = await getProjectService(id)
    res.status(StatusCodes.OK).json(project)
}
export const addProject = async (req, res) => {
    res.send('share project')
}
export const deleteProject = async (req, res) => {
    res.send('delete project')
}