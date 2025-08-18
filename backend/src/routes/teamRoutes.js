import express from "express"
import { getAllteams, getTeam, getTeamMessages, sendTeamMessages } from "../controller/teamController.js";

const router = express.Router();

router.get('/', getAllteams)
router.get('/:id/messages', getTeamMessages)
router.get('/:id', getTeam)
router.post('/:id/messages', sendTeamMessages)

export default router