import { StatusCodes } from "http-status-codes"
import { getAllteamsService, getTeamService } from "../models/teamModel.js"

export const getAllteams = async (req, res) => {
    const {userId} = req.user
    const result = await getAllteamsService(userId)
    res.status(StatusCodes.OK).json(result)
}

export const getTeam = async (req, res) => {
    const {id} = req.params;
    const {userId} = req.user;
    console.log(id);    
    const result = await getTeamService(id, userId)
    res.status(StatusCodes.OK).json(result)
}