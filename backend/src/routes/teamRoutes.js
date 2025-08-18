import express from "express"
import { getAllteams, getTeam } from "../controller/teamController.js";

const router = express.Router();

router.get('/', getAllteams)
router.get('/:id', getTeam)

export default router