import express from "express"
import { adminLogin, adminLogout, adminMyProfile, adminRegister, getAllUsers } from "../controllers/AdminAuth.js"
import { isAdminAuthenticated } from "../middleware/auth.js"

const adminAuth = express.Router()

adminAuth.post("/signup",adminRegister)
adminAuth.post("/login",adminLogin)
adminAuth.get("/my-profile",isAdminAuthenticated,adminMyProfile)
adminAuth.get("/logout",adminLogout)
adminAuth.get("/all-users",isAdminAuthenticated,getAllUsers)

export default adminAuth