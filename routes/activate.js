import express from "express"

const activate = express.Router()

activate.get("/get", async (req,res) => {
    res.json("Everything's fine")
})

export default activate