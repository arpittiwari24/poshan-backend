import express from "express";
import blogs from "../models/Blogs.js";
import { isAdminAuthenticated } from "../middleware/auth.js";

const blogRouter = express.Router()

blogRouter.post("/post", async (req,res) => {
    isAdminAuthenticated()
    
    try {
        const {title, author, content} = req.body
        const post = await blogs.create({title, author, content})
        res.status(201).json({post})
    } catch (error) {
        res.status(500).json({message: "Internal Server error"})
    }

})

blogRouter.get("/all", async (req,res) => {

    try {
        const data = await blogs.find()
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json({message: "Couldn't get blogs"})
    }
})

export default blogRouter