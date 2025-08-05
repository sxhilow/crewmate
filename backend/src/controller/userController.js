import { StatusCodes } from "http-status-codes";
import { checkUsernameService, completeProfileService, getUserService, updateUserProfileService } from "../models/userModel.js";

export const completeProfile = async (req, res) => {
    const {userId} = req.user;    
    const {username, name, skills} = req.body;

    await completeProfileService(userId, username, name, skills)

    res.status(StatusCodes.OK).send("completed")
}

export const checkUsername = async (req, res) => {
    const { username } = req.body;
    const available = await checkUsernameService(username)
    res.status(StatusCodes.OK).json(available)
}

export const getUser = async (req, res) => {
    const {userId} = req.user;    
    const user = await getUserService(userId)
    res.status(StatusCodes.OK).json(user)
}

export const updateUserProfile = async(req, res) => {
    const {userId} = req.user;
    const {username, name, bio} = req.body;    
    const update = await updateUserProfileService(userId, username, name, bio);
    res.status(StatusCodes.OK).json(update)
}