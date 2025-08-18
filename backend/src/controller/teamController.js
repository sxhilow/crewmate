import { StatusCodes } from "http-status-codes"
import { getAllteamsService } from "../models/teamModel.js"

export const getAllteams = async (req, res) => {
    const {userId} = req.user
    const result = await getAllteamsService(userId)
    res.status(StatusCodes.OK).json(result)
}

export const getTeams = async (req, res) => {
    res.send("Got a team")
}