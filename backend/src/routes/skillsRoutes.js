import express from "express"
import { searchSkills } from "../controller/skillController.js";

const router = express.Router();

router.get("/", searchSkills)

export default router