import { StatusCodes } from "http-status-codes"
import { getAllProjectsService } from "../models/projectModel.js"

export const getAllProjects = async (req, res) => {
    console.log(req.query.limit);

    const {limit, offset} = req.query || 12
    const projects = await getAllProjectsService(limit, offset)
    res.status(StatusCodes.OK).json(projects)
}
export const getProject = async (req, res) => {
    res.send('get a project')
}
export const addProject = async (req, res) => {
    res.send('share project')
}
export const deleteProject = async (req, res) => {
    res.send('delete project')
}