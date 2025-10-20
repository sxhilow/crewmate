import { StatusCodes } from "http-status-codes"
import { addProjectService, deleteProjectService, getAllProjectsService, getProjectRequestsService, getProjectService, getRecommendedProjectsService, respondProjectRequestService, sendProjectRequestService } from "../models/projectModel.js"



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
    console.log(projectData);
    
    const result = await addProjectService(userId, projectData)
    res.status(StatusCodes.OK).json(result)
}
export const deleteProject = async (req, res) => {
    const {userId} = req.user;
    const {id} = req.params;
    const result = await deleteProjectService(id, userId)
    res.status(StatusCodes.OK).json(result)
}

export const sendProjectRequest = async (req, res) => {
    const {userId} = req.user;
    const {id} = req.params;

    const result = await sendProjectRequestService(id, userId);
    res.status(StatusCodes.OK).json(result)
}

export const respondProjectRequest = async (req, res) => {
    const { userId } = req.user;    
    const {id:ProjectId} = req.params;
    const {id:requestId, decision} = req.body
    const result = await respondProjectRequestService(ProjectId, requestId, userId, decision);
    res.status(StatusCodes.OK).json(result)
}

export const getAllRequests = async (req, res) => {
    const {userId} = req.user;
    const result = await getProjectRequestsService(userId)
    res.status(StatusCodes.OK).json(result)
}

export const getRecommendedProject = async (req, res) => {
    const {userId} = req.user;
    const result = await getRecommendedProjectsService(userId);
    res.status(StatusCodes.OK).json(result)
}