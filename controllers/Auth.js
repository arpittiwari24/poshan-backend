import Users from "../models/User.js";
import bcrypt from "bcrypt"
import { storeCookie } from "../utils/features.js";


export const register = async (req,res) => {
    try {
    
    const {name, email, password} = req.body

    let user = await Users.findOne({ email })
    
    if(user) return res.status(400).json({message: "Email already exists"})

    let hashedPassword = await bcrypt.hash(password,10)

    user = await Users.create({name , email, password: hashedPassword})

    storeCookie(user,res, "Registered Successfully",201)

    } catch (error) {
        console.log(error)
    }
}

export const login = async (req,res) => {
    try {
        const {email, password} = req.body

        let user = await Users.findOne({ email }).select("+password")

        if(!user) return res.status(400).json({message: "Incorrect email or password"})

        const isMatch = await bcrypt.compare(password, user.password)

        if(!isMatch) return res.status(400).json({message: "Incorrect email or password"})

        storeCookie(user,res,`Welcome back ${user.name}`,201)
    } catch (error) {
        console.log(err)
    }
}

export const logout = (req, res) => {
    
      res.clearCookie("token")
  };

  export const myProfile = (req,res) => {
    
    const name = req.user.name
    res.status(200).json({
          success: true,
          name: name,
        });
}