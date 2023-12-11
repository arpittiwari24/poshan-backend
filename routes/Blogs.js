import express from "express";
import blogs from "../models/Blogs.js";
import { isAdminAuthenticated } from "../middleware/auth.js";

const blogRouter = express.Router()

blogRouter.post("/post", async (req,res) => {
    const newBlog = new blogs(req.body)
    try {
        const post = await newBlog.save()
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

blogRouter.get("/:id", async (req, res) => {
    try {
      const post = await blogs.findById(req.params.id);
      res.status(200).json(post);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  blogRouter.put("/:id", async (req, res) => {
        try {
          const updatedPost = await blogs.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          );
          res.status(200).json(updatedPost);
        } catch (err) {
      res.status(500).json(err);
    }
  });

  blogRouter.delete("/:id", async (req, res) => {
    try {
          await blogs.findByIdAndDelete(req.params.id);
          res.status(200).json("Post has been deleted...");
    } catch (err) {
      res.status(500).json(err);
    }
  });

export default blogRouter