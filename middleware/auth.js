import admin from "../models/Admin.js"
import Users  from "../models/User.js"
import jwt from "jsonwebtoken"

export const isAuthenticated = async (req,res,next)=> {
    const {token} = req.cookies

    if(!token) return res.status(404).json({
        success: false,
        message:"please login"
    })

    const decoded = jwt.verify(token,process.env.JWT_SECRET)

    req.user = await Users.findById(decoded._id)

    next()
    
}

export const isAdminAuthenticated = async (req,res,next)=> {
    const {admin_token} = req.cookies

    if(!admin_token) return res.status(404).json({
        success: false,
        message:"please login"
    })

    const decoded = jwt.verify(admin_token,process.env.JWT_SECRET)

    req.user = await admin.findById(decoded._id)

    next()
    
}