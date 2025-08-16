import { StatusCodes } from "http-status-codes";
import { getAllNotificationsService } from "../models/notificationModel.js";

export const getAllNotifications = async (req, res) => {
    const {userId} = req.user;
    const result = await getAllNotificationsService(userId);
    res.status(StatusCodes.OK).json(result)
}