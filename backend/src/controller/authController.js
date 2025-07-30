import { StatusCodes } from "http-status-codes";
import { meService } from "../models/authModel.js";
import { BadRequestError } from "../errors/bad-request.js";

export const me = async(req, res) => {

    if(!req.body || !req.body.id){
        throw new BadRequestError("Id is required")
    }

    const { id } = req.body;

    const user = await meService(id)
    res.status(StatusCodes.OK).json(user)
}

