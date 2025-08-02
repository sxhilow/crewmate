import { StatusCodes } from "http-status-codes";
import { searchSkillsService } from "../models/skillModel.js";

export const searchSkills = async (req, res) => { 
    const {search} = req.query || '';   
    const skills = await searchSkillsService(search);
    res.status(StatusCodes.OK).json(skills)
}