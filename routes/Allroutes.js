import express from "express"
import { login, logout, myProfile, register } from "../controllers/Auth.js"
import { isAuthenticated } from "../middleware/auth.js"

const router = express.Router()

router.post("/signup",register)
router.post("/login",login)
router.get("/me",isAuthenticated,myProfile)
router.get("/logout",logout)

export default router