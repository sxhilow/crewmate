import { StatusCodes } from "http-status-codes";
import { checkUsernameService, completeProfileService, getUserByUsernameService, getUserService, searchUserService, updateUserProfileService } from "../models/userModel.js";

export const completeProfile = async (req, res) => {
    const {userId} = req.user;    
    const userData = req.body;

    await completeProfileService(userData, userId)


    res.status(StatusCodes.OK).send("Profile completed")
}

export const checkUsername = async (req, res) => {
    const {userId} = req.user;
    const { username } = req.body;
    const available = await checkUsernameService(username, userId)
    res.status(StatusCodes.OK).json(available)
}

export const getUser = async (req, res) => {
    const {userId} = req.user;    
    const user = await getUserService(userId)
    res.status(StatusCodes.OK).json(user)
}

export const updateUserProfile = async(req, res) => {
    const {userId} = req.user;
    const {userData} = req.body;      
    const update = await updateUserProfileService(userData, userId);
    res.status(StatusCodes.OK).json(update)
}

export const searchUser = async (req, res) => {
    const { q } = req.query || '';    
    const users = await searchUserService(q);
    res.status(StatusCodes.OK).json(users)
}

export const getUserByUsername = async (req, res) => {
    const {username} = req.params;
    const user = await getUserByUsernameService(username);
    res.status(StatusCodes.OK).json(user)
}

export const getRecommendedUsers = async (req, res) => {
    res.send("Recommended users")
}