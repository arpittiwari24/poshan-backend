import admin from "../models/Admin.js";
import bcrypt from "bcrypt"
import { storeCookie, storeAdminCookie } from "../utils/features.js";
import Users from "../models/User.js";


export const adminRegister = async (req,res) => {
    try {
    
    const {name, email, password} = req.body

    let user = await admin.findOne({ email })
    
    if(user) return res.status(400).json({message: "Email already exists"})

    let hashedPassword = await bcrypt.hash(password,10)

    user = await admin.create({name , email, password: hashedPassword})

    storeAdminCookie(user,res, "Registered Successfully",201)

    } catch (error) {
        console.log(error)
    }
}

export const adminLogin = async (req,res) => {
    try {
        const {email, password} = req.body

        let user = await admin.findOne({ email }).select("+password")

        if(!user) return res.status(400).json({message: "Incorrect email or password"})

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return res.status(400).json({message: "Incorrect email or password"})

        storeAdminCookie(user,res,`Welcome back ${user.name}`,201)
    } catch (error) {
        console.log(err)
    }
}

export const adminLogout = (req, res) => {
    
      res.clearCookie("token")
  };

  export const adminMyProfile = (req,res) => {
    
    const name = req.user.name
    res.status(200).json({
          success: true,
          name: name,
        });
}

export const getAllUsers = async (req,res) => {
    try {
        const users = await Users.find()
        res.status(200).json({users})
    } catch (error) {
        console.log(error)
    }
}