import express from "express"
import { completeProfile, checkUsername, getUser } from "../controller/userController.js"


const router = express.Router()

router.patch("/complete-profile",  completeProfile);
router.get('/check-username', checkUsername)
router.get('/me', getUser)


export default router;