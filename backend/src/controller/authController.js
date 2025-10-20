import { StatusCodes } from "http-status-codes";
import { meService } from "../models/authModel.js";
import { BadRequestError } from "../errors/bad-request.js";

export const me = async(req, res) => {

    const { userId } = req.user;
    const user = await meService(userId)
    res.status(StatusCodes.OK).json(user)
}

