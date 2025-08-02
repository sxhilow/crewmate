import express from "express"
import { completeProfile, checkUsername } from "../controller/userController.js"


const router = express.Router()

router.patch("/complete-profile",  completeProfile);
router.get('/check-username', checkUsername)


export default router;