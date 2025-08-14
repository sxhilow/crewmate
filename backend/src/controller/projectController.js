import { StatusCodes } from "http-status-codes"
import { addProjectService, deleteProjectService, getAllProjectsService, getProjectService } from "../models/projectModel.js"
import { BadRequestError } from '../errors/index.js';


export const getAllProjects = async (req, res) => {
    const {limit, offset} = req.query || 12
    const projects = await getAllProjectsService(limit, offset)
    res.status(StatusCodes.OK).json(projects)
}
export const getProject = async (req, res) => {
    const {id} = req.params;
    const project = await getProjectService(id)
    res.status(StatusCodes.OK).json(project)
}
export const addProject = async (req, res) => {
    const { userId } = req.user;
    const { projectData } = req.body;
    const result = await addProjectService(userId, projectData)
    res.status(StatusCodes.OK).json(result)
}
export const deleteProject = async (req, res) => {
    const {userId} = req.user;
    const {id} = req.params;
    const result = await deleteProjectService(id, userId)
    res.status(StatusCodes.OK).json(result)
}