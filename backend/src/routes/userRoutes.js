import express from "express"
import { completeProfile, checkUsername, getUser, updateUserProfile, searchUser, getUserByUsername, getRecommendedUsers } from "../controller/userController.js"



const router = express.Router()


router.patch("/complete-profile",  completeProfile);
router.get('/check-username', checkUsername)
router.get('/me', getUser)
router.patch('/edit-profile', updateUserProfile)
router.get("/search", searchUser)
router.get("/:username", getUserByUsername)
router.get("/recommended-user", getRecommendedUsers)

export default router;