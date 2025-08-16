import express from "express"
import { authMiddleware } from "../middlewares/auth.js"
import { getAllNotifications } from "../controller/notificationController.js"

const router = express.Router()

router.get('/', authMiddleware, getAllNotifications)

export default router