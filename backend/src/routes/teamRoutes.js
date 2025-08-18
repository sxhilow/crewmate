import express from "express"
import { getAllteams, getTeams } from "../controller/teamController.js";

const router = express.Router();

router.get('/', getAllteams)
router.get('/:id', getTeams)

export default router